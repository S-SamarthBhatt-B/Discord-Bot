// commands/moderation/removetimeout.js

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removetimeout')
        .setDescription('Remove a timeout from a user.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to remove timeout from')
                .setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const member = interaction.guild.members.cache.get(user.id);

        if (!member) {
            return interaction.reply({ content: 'User not found in the guild.', ephemeral: true });
        }

        try {
            await member.timeout(null);
            const embed = new MessageEmbed()
                .setColor('#00ff00')
                .setTitle('Timeout Removed')
                .setDescription(`${user.tag}'s timeout has been removed.`);

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            await interaction.reply({ content: 'There was an error trying to remove the timeout.', ephemeral: true });
        }
    },
};
