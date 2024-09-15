// commands/moderation/unmute.js

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unmute')
        .setDescription('Unmute a user in the server.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to unmute')
                .setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const member = interaction.guild.members.cache.get(user.id);

        if (!member) {
            return interaction.reply({ content: 'User not found in the guild.', ephemeral: true });
        }

        // Assuming you have a role named 'Muted'
        const muteRole = interaction.guild.roles.cache.find(role => role.name === 'Muted');

        if (!muteRole) {
            return interaction.reply({ content: 'Muted role not found. Please create a role named "Muted".', ephemeral: true });
        }

        try {
            await member.roles.remove(muteRole);
            const embed = new MessageEmbed()
                .setColor('#00ff00')
                .setTitle('User Unmuted')
                .setDescription(`${user.tag} has been unmuted.`);

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            await interaction.reply({ content: 'There was an error trying to unmute the user.', ephemeral: true });
        }
    },
};
