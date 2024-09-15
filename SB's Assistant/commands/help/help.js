const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Displays a list of available commands'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#00FF00')
            .setTitle('📜 Help Menu')
            .setDescription('Here are the available commands, categorized for easy access!')

            .addFields(
                { name: '⚙️ Moderation Commands', value: '🔨 `ban` - Ban a user\n🦵 `kick` - Kick a user\n🤐 `mute` - Mute a user\n🔇 `timeout` - Timeout a user\n🔄 `unmute` - Unmute a user\n🛑 `removetimeout` - Remove timeout from a user\n🚪 `unban` - Unban a user\n⚠️ `warn` - Warn a user\n🧹 `clear` - Clear a specific number of messages' },
                { name: '🎲 Fun Commands', value: '🎱 `8ball` - Ask the magic 8-ball a yes/no question\n🪙 `coinflip` - Flip a coin\n🎲 `roll` - Roll a dice\n👊 `rps` - Play Rock-Paper-Scissors\n🎯 `guessnumber` - Guess the random number\n📋 `poll` - Create a poll' },
                { name: '🔧 Utility Commands', value: '📊 `serverinfo` - Get server info\n🛠️ `userinfo` - Get user info\n⏰ `reminder` - Set a reminder\n📶 `ping` - Check bot\'s ping\n✉️ `quote` - Get a random quote' },
                { name: '📷 Media Commands', value: '🖼️ `avatar` - Show user\'s avatar' },
                { name: '📈 Leveling Commands', value: '📊 `level` - Check your level\n🎖️ `leaderboard` - Show top-ranked users\n🔝 `setlevelchannel` - Set the level-up message channel\n🎉 `levelrole` - Assign roles for specific levels' },
                { name: '🚪 Welcome/Leaving System', value: '👋 `setwelcomechannel` - Set welcome messages channel\n🚶 `setleavingchannel` - Set leaving messages channel' },
                { name: '🔍 Logging Commands', value: '🎤 `setvoicelog` - Log voice channel activities\n📝 `setmessagelog` - Log messages\n🔍 `setchannellog` - Log specific channels' }
            )
            .setFooter({ text: 'Use `help` followed by the command name to learn more about a specific command.' });

        await interaction.reply({ embeds: [embed], ephemeral: true });
    },
};
