// commands/moderation/kick.js

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick a user from the server.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to kick')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for the kick')
                .setRequired(false)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'No reason provided';
        const member = interaction.guild.members.cache.get(user.id);

        if (!member) {
            return interaction.reply({ content: 'User not found in the guild.', ephemeral: true });
        }

        try {
            await member.kick(reason);
            const embed = new MessageEmbed()
                .setColor('#ff0000')
                .setTitle('User Kicked')
                .setDescription(`${user.tag} has been kicked.\n**Reason:** ${reason}`);

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            await interaction.reply({ content: 'There was an error trying to kick the user.', ephemeral: true });
        }
    },
};
