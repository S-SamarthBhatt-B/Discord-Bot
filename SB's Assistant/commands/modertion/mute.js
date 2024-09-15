// commands/moderation/mute.js

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Mute a user in the server.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to mute')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for the mute')
                .setRequired(false)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'No reason provided';
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
            await member.roles.add(muteRole, reason);
            const embed = new MessageEmbed()
                .setColor('#ff0000')
                .setTitle('User Muted')
                .setDescription(`${user.tag} has been muted.\n**Reason:** ${reason}`);

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            await interaction.reply({ content: 'There was an error trying to mute the user.', ephemeral: true });
        }
    },
};
