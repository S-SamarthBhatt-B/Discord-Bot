const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reminder')
        .setDescription('Set a reminder for yourself.')
        .addIntegerOption(option => 
            option.setName('minutes')
                .setDescription('The number of minutes until the reminder')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('message')
                .setDescription('The reminder message')
                .setRequired(true)),
    
    async execute(interaction) {
        const minutes = interaction.options.getInteger('minutes');
        const reminderMessage = interaction.options.getString('message');
        const currentTime = new Date().toLocaleString();

        if (minutes <= 0) {
            return interaction.reply('Please provide a valid number of minutes greater than 0.');
        }

        // Create an embed message confirming the reminder
        const reminderEmbed = new EmbedBuilder()
            .setColor('#ffcc00')
            .setTitle('Reminder Set!')
            .setDescription(`I will remind you in **${minutes} minutes** about: ${reminderMessage}`)
            .addFields({ name: 'Reminder Set Time', value: currentTime })
            .setTimestamp();

        // Reply to the user confirming the reminder
        await interaction.reply({ embeds: [reminderEmbed] });

        // Set a timeout to send the reminder after the specified time
        setTimeout(async () => {
            const reminderDM = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle('Reminder!')
                .setDescription(`⏰ Time's up! You asked me to remind you about: **${reminderMessage}**`)
                .addFields({ name: 'Reminder Created At', value: currentTime })
                .setTimestamp();

            try {
                // Send the reminder as a DM to the user
                await interaction.user.send({ embeds: [reminderDM] });
            } catch (error) {
                console.error(`Could not send DM to ${interaction.user.tag}. They might have DMs disabled.`);
                // If DM fails, send the reminder as a follow-up in the interaction
                await interaction.followUp({ content: `⏰ Time's up! You asked me to remind you about: **${reminderMessage}**`, embeds: [reminderDM] });
            }
        }, minutes * 60 * 1000); // Convert minutes to milliseconds
    },
};
