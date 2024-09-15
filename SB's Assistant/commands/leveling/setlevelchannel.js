// commands/leveling/setlevelchannel.js

const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setlevelchannel')
        .setDescription('Set the channel where level-up messages will be sent')
        .addChannelOption(option => 
            option.setName('channel')
                  .setDescription('The channel to send level-up messages')
                  .setRequired(true)),
    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');

        // Here you would normally save this information to a database or file.
        // For simplicity, we're just sending a confirmation message.

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Level-Up Channel Set')
            .setDescription(`Level-up messages will now be sent to **${channel.name}**.`)
            .setFooter('Leveling system');

        await interaction.reply({ embeds: [embed] });
    },
};
