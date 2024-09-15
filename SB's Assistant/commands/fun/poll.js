// commands/fun/poll.js

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('Create a poll with two options.')
        .addStringOption(option =>
            option.setName('question')
                .setDescription('The question to ask in the poll')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('option1')
                .setDescription('The first option')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('option2')
                .setDescription('The second option')
                .setRequired(true)),
    async execute(interaction) {
        const question = interaction.options.getString('question');
        const option1 = interaction.options.getString('option1');
        const option2 = interaction.options.getString('option2');

        // Create a poll embed
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Poll')
            .setDescription(question)
            .addFields(
                { name: 'Option 1', value: option1, inline: true },
                { name: 'Option 2', value: option2, inline: true }
            )
            .setFooter('React with the corresponding emoji to vote.');

        // Create action buttons for voting
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('vote_option1')
                    .setLabel(option1)
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('vote_option2')
                    .setLabel(option2)
                    .setStyle('PRIMARY')
            );

        // Send the poll message
        await interaction.reply({ content: 'Poll created!', ephemeral: true });
        await interaction.channel.send({ embeds: [embed], components: [row] });
    },
};
