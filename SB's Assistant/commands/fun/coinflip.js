// commands/fun/coinflip.js

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('coinflip')
        .setDescription('Flip a coin and get heads or tails.'),
    async execute(interaction) {
        const result = Math.random() < 0.5 ? 'Heads' : 'Tails';

        await interaction.reply(`The coin landed on: **${result}**`);
    },
};
