// commands/welcome/setwelcomechannel.js

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { welcomeChannelID } = require('../../config.json'); // Adjust path to your config file

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setwelcomechannel')
        .setDescription('Set the channel for welcome messages.')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel to send welcome messages to')
                .setRequired(true)),
    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');

        // Save the channel ID to your configuration or database
        // For example, save it to a config file or a database
        welcomeChannelID = channel.id;

        // Update config or database here

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Welcome Channel Set')
            .setDescription(`Welcome messages will now be sent to ${channel}`);

        await interaction.reply({ embeds: [embed] });
    },
};
