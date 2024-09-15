// commands/fun/guessnumber.js

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('guessnumber')
        .setDescription('Guess a random number between 1 and 100.')
        .addIntegerOption(option =>
            option.setName('guess')
                .setDescription('Your guess')
                .setRequired(true)),
    async execute(interaction) {
        const guess = interaction.options.getInteger('guess');
        const number = Math.floor(Math.random() * 100) + 1;

        if (guess === number) {
            await interaction.reply(`Congratulations! You guessed the correct number: **${number}**.`);
        } else {
            await interaction.reply(`Sorry! The correct number was **${number}**.`);
        }
    },
};
