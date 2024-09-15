// commands/logging/setmessagelog.js

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setmessagelog')
        .setDescription('Set the channel for message logging.')
        .addChannelOption(option => 
            option.setName('channel')
                  .setDescription('The channel for logging messages')
                  .setRequired(true)),
    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');

        // Save the channel ID to your logging configuration
        // Example placeholder: update your logging settings here

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Message Logging Channel Set')
            .setDescription(`Message logging will now be done in **${channel.name}**.`)
            .setFooter('Logging system');

        await interaction.reply({ embeds: [embed] });

        // Optionally, save this information to a file or database
        // Example placeholder: save channel ID to a file or database
    },
};
