// commands/welcome/setleavingchannel.js

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { leavingChannelID } = require('../../config.json'); // Adjust path to your config file

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setleavingchannel')
        .setDescription('Set the channel for leaving messages.')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel to send leaving messages to')
                .setRequired(true)),
    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');

        // Save the channel ID to your configuration or database
        // For example, save it to a config file or a database
        leavingChannelID = channel.id;

        // Update config or database here

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Leaving Channel Set')
            .setDescription(`Leaving messages will now be sent to ${channel}`);

        await interaction.reply({ embeds: [embed] });
    },
};
