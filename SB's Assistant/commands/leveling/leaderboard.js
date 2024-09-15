// commands/leveling/leaderboard.js
const { EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = './data/levels.json';

module.exports = {
    name: 'leaderboard',
    description: 'Show the server leaderboard based on levels',

    async execute(interaction) {
        let userData = {};

        if (fs.existsSync(path)) {
            userData = JSON.parse(fs.readFileSync(path, 'utf8'));
        }

        // Convert userData to an array of objects and sort by level and XP
        const leaderboard = Object.keys(userData)
            .map(userId => ({
                userId: userId,
                level: userData[userId].level,
                xp: userData[userId].xp
            }))
            .sort((a, b) => b.level - a.level || b.xp - a.xp) // Sort by level, then XP
            .slice(0, 10); // Limit to top 10 users

        const leaderboardDescription = leaderboard.map((user, index) => {
            const userTag = interaction.guild.members.cache.get(user.userId)?.user.tag || "Unknown User";
            return `${index + 1}. **${userTag}** - Level: ${user.level}, XP: ${user.xp}`;
        }).join('\n');

        const leaderboardEmbed = new EmbedBuilder()
            .setColor('#ffcc00')
            .setTitle('Server Leaderboard')
            .setDescription(leaderboardDescription || 'No data available.')
            .setTimestamp();

        await interaction.reply({ embeds: [leaderboardEmbed] });
    }
};
