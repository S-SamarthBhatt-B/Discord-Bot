// commands/moderation/clear.js

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clear a specific number of messages.')
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('Number of messages to clear')
                .setRequired(true)),
    async execute(interaction) {
        const amount = interaction.options.getInteger('amount');

        if (amount < 1 || amount > 100) {
            return interaction.reply({ content: 'You need to input a number between 1 and 100.', ephemeral: true });
        }

        try {
            await interaction.channel.messages.fetch({ limit: amount }).then(messages => {
                interaction.channel.bulkDelete(messages);
            });

            const embed = new MessageEmbed()
                .setColor('#00ff00')
                .setTitle('Messages Cleared')
                .setDescription(`Cleared ${amount} messages.`);

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            await interaction.reply({ content: 'There was an error trying to clear messages.', ephemeral: true });
        }
    },
};
