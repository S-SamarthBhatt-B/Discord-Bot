const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('level')
        .setDescription('Get the level information of a user.')
        .addUserOption(option => 
            option.setName('user')
                .setDescription('The user to get the level for')
                .setRequired(false)),
    async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;

        // Replace the following placeholder with actual level data retrieval
        const level = 1; // Example level
        const xp = 100; // Example XP

        const levelEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`${user.username}'s Level Information`)
            .addFields(
                { name: 'Level', value: `${level}`, inline: true },
                { name: 'XP', value: `${xp}`, inline: true }
            )
            .setFooter({ text: 'Requested by ' + interaction.user.username });

        await interaction.reply({ embeds: [levelEmbed] });
    },
};
