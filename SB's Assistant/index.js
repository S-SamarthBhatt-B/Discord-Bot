const { Client, GatewayIntentBits, Collection, EmbedBuilder } = require('discord.js');
const { token, prefix } = require('./config.json');
const fs = require('fs');
const path = require('path');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates
    ]
});

// Load commands
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const folders = fs.readdirSync(commandsPath);

for (const folder of folders) {
    const folderPath = path.join(commandsPath, folder);
    const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(folderPath, file);
        const command = require(filePath);
        const commandName = command.data?.name || command.name || file.replace('.js', '');

        if (commandName) {
            client.commands.set(commandName, command);
        } else {
            console.error(`Command file ${file} does not export a valid command.`);
        }
    }
}

// Load channel settings from a file
let channelSettings = {
    welcomeChannelID: null,
    leavingChannelID: null,
    voicelogChannelID: null,
    channellogChannelID: null,
    messagelogChannelID: null,
    levelingChannelID: null
};

function loadChannelSettings() {
    try {
        const data = fs.readFileSync('./channelSettings.json', 'utf8');
        channelSettings = JSON.parse(data);
    } catch (err) {
        console.error('Error loading channel settings:', err);
    }
}

loadChannelSettings();

// Event handler for when the bot is ready
client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // Rotating status
    const activities = ['for SB', 'SB code', 'in Server', 'SB command'];
    setInterval(() => {
        const status = activities[Math.floor(Math.random() * activities.length)];
        client.user.setPresence({ activities: [{ name: status }], status: 'online' });
    }, 5000);

    // Register slash commands with Discord API
    try {
        const slashCommands = client.commands.filter(cmd => cmd.data && typeof cmd.data.toJSON === 'function');
        const data = slashCommands.map(cmd => cmd.data.toJSON());
        await client.application.commands.set(data);
        console.log('Slash commands registered.');
    } catch (error) {
        console.error('Failed to register slash commands:', error);
    }
});

// Event handler for message commands and leveling
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    // Handle prefix commands
    if (message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName);

        if (command) {
            try {
                if (command.executePrefix) {
                    await command.executePrefix(message, args);
                } else {
                    await message.reply('This command does not support prefix usage.');
                }
            } catch (error) {
                console.error('Error executing prefix command:', error);
                await message.reply('There was an error executing that command.');
            }
        } else {
            await message.reply('Command not found.');
        }
    }

    // Leveling system logic
    const levelingChannel = message.guild.channels.cache.get(channelSettings.levelingChannelID);
    if (levelingChannel) {
        // Add leveling system logic here
        const embed = new EmbedBuilder()
            .setColor('#800080')
            .setTitle('Level Up!')
            .setDescription(`${message.author.username} has leveled up!`)
            .setTimestamp();
        levelingChannel.send({ embeds: [embed] });
    }

    // Message logging
    const messageLogChannel = message.guild.channels.cache.get(channelSettings.messagelogChannelID);
    if (messageLogChannel) {
        const embed = new EmbedBuilder()
            .setColor('#FFA500')
            .setTitle('Message Logged')
            .setDescription(`User: ${message.author.tag}\nMessage: ${message.content}`)
            .setTimestamp();
        messageLogChannel.send({ embeds: [embed] });
    }
});

// Event handler for when a slash command is used
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error('Error executing slash command:', error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

// Event handler for when a new member joins
client.on('guildMemberAdd', (member) => {
    const channel = member.guild.channels.cache.get(channelSettings.welcomeChannelID);
    if (channel) {
        const embed = new EmbedBuilder()
            .setColor('#00FF00')
            .setTitle('Welcome to the Server!')
            .setDescription(`Hello ${member.user.username}, welcome to ${member.guild.name}! We're glad to have you here. 🎉`)
            .setThumbnail(member.user.displayAvatarURL())
            .addFields({ name: 'Read the Rules', value: 'Please make sure to read the rules and guidelines in the #rules channel.' })
            .setFooter({ text: 'Enjoy your stay!' })
            .setTimestamp();
        channel.send({ embeds: [embed] });
    }
});

// Event handler for when a member leaves
client.on('guildMemberRemove', (member) => {
    const channel = member.guild.channels.cache.get(channelSettings.leavingChannelID);
    if (channel) {
        const embed = new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle('Goodbye!')
            .setDescription(`We’re sad to see you go, ${member.user.username}. If you ever decide to return, we’ll be here. 👋`)
            .setThumbnail(member.user.displayAvatarURL())
            .setFooter({ text: 'Farewell!' })
            .setTimestamp();
        channel.send({ embeds: [embed] });
    }
});

// Event handler for voice state updates
client.on('voiceStateUpdate', (oldState, newState) => {
    const voiceLogChannel = newState.guild.channels.cache.get(channelSettings.voicelogChannelID);
    if (voiceLogChannel) {
        const embed = new EmbedBuilder()
            .setColor('#00FFFF')
            .setTitle('Voice State Updated')
            .setDescription(`User: ${newState.member.user.tag}\nOld State: ${oldState.channel ? oldState.channel.name : 'None'}\nNew State: ${newState.channel ? newState.channel.name : 'None'}`)
            .setTimestamp();
        voiceLogChannel.send({ embeds: [embed] });
    }
});

// Event handler for channel updates
client.on('channelUpdate', (oldChannel, newChannel) => {
    const channelLogChannel = newChannel.guild.channels.cache.get(channelSettings.channellogChannelID);
    if (channelLogChannel) {
        const embed = new EmbedBuilder()
            .setColor('#FFFF00')
            .setTitle('Channel Updated')
            .setDescription(`Channel: ${newChannel.name}\nOld Type: ${oldChannel.type}\nNew Type: ${newChannel.type}`)
            .setTimestamp();
        channelLogChannel.send({ embeds: [embed] });
    }
});

// Login to Discord with your app's token
client.login(token);
