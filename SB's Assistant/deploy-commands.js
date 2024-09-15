// deploy-commands.js

const { Client, Intents, Collection } = require('discord.js');
const { token } = require('./config.json'); // Ensure this path matches where your config file is located
const fs = require('fs');
const path = require('path');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

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
        // Ensure that the command has a 'data' property
        if (command.data && command.data.name) {
            client.commands.set(command.data.name, command);
        }
    }
}

// Deploy slash commands to Discord
client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // Collect command data for deployment
    const slashCommands = client.commands.filter(cmd => cmd.data);
    const data = slashCommands.map(cmd => cmd.data.toJSON());

    try {
        // Register commands with Discord
        await client.application.commands.set(data);
        console.log('Slash commands registered successfully.');
    } catch (error) {
        console.error('Error registering slash commands:', error);
    }

    client.destroy(); // Destroy the client after deployment to avoid unnecessary resource usage
});

// Login to Discord with your app's token
client.login(token);
