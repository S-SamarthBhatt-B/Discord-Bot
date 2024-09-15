// commands/fun/rps.js

const { SlashCommandBuilder } = require('@discordjs/builders');

const choices = ['rock', 'paper', 'scissors'];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rps')
        .setDescription('Play Rock-Paper-Scissors with the bot.')
        .addStringOption(option =>
            option.setName('choice')
                .setDescription('Your choice (rock, paper, or scissors)')
                .setRequired(true)
                .addChoices(choices.map(choice => ({ name: choice, value: choice })))),
    async execute(interaction) {
        const userChoice = interaction.options.getString('choice');
        const botChoice = choices[Math.floor(Math.random() * choices.length)];

        if (!choices.includes(userChoice)) return interaction.reply('Invalid choice.');

        let result;
        if (userChoice === botChoice) {
            result = 'It\'s a tie!';
        } else if (
            (userChoice === 'rock' && botChoice === 'scissors') ||
            (userChoice === 'paper' && botChoice === 'rock') ||
            (userChoice === 'scissors' && botChoice === 'paper')
        ) {
            result = 'You win!';
        } else {
            result = 'You lose!';
        }

        await interaction.reply(`You chose **${userChoice}**. The bot chose **${botChoice}**. ${result}`);
    },
};
