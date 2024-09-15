// commands/leveling/levelrole.js

const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('levelrole')
        .setDescription('Set roles based on specific levels')
        .addRoleOption(option => 
            option.setName('role')
                  .setDescription('The role to assign')
                  .setRequired(true))
        .addIntegerOption(option => 
            option.setName('level')
                  .setDescription('The level to assign the role at')
                  .setRequired(true)),
    async execute(interaction) {
        const role = interaction.options.getRole('role');
        const level = interaction.options.getInteger('level');

        // Here you would normally interact with a database to save this information.
        // For simplicity, we are just sending a confirmation message.

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Level Role Set')
            .setDescription(`Role **${role.name}** has been set for level **${level}**.`)
            .setFooter('Role leveling system');

        await interaction.reply({ embeds: [embed] });
    },
};
