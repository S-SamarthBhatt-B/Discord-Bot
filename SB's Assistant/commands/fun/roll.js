// commands/fun/roll.js

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Roll a dice with any number of sides.')
        .addIntegerOption(option =>
            option.setName('sides')
                .setDescription('Number of sides on the dice')
                .setRequired(true)),
    async execute(interaction) {
        const sides = interaction.options.getInteger('sides');
        if (sides < 1) return interaction.reply('The number of sides must be at least 1.');

        const result = Math.floor(Math.random() * sides) + 1;
        await interaction.reply(`You rolled a ${result} on a ${sides}-sided dice.`);
    },
};
