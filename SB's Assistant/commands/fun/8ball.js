const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('Ask the magic 8-ball a question')
        .addStringOption(option =>
            option.setName('question')
                .setDescription('The question you want to ask')
                .setRequired(true)),
    async execute(interaction) {
        const question = interaction.options.getString('question');

        const responses = [
            // Positive
            "Yes, absolutely!", "Without a doubt!", "It is certain!", "Most definitely!",
            "You may rely on it.", "Outlook is good.", "Signs point to yes.", 
            "As I see it, yes.", "Yes, of course!", "All signs say yes!",
            
            // Negative
            "Don't count on it.", "No way!", "My sources say no.", "Outlook not so good.",
            "I wouldn't bet on it.", "Very doubtful.", "Nope, sorry!", 
            "Chances aren't good.", "Not in this lifetime!", "Definitely not.",
            
            // Neutral
            "Ask again later.", "I'm not sure, try again.", "Concentrate and ask again.",
            "Cannot predict now.", "It's unclear, ask again.", "Better not tell you now.",
            "You’ll know soon enough.", "It’s a mystery!", "It’s hazy, ask later.", 
            "The universe isn't ready to answer.",
            
            // Funny/Sarcastic
            "Do you really want to know?", "Are you sure you can handle the truth?",
            "You wish!", "Only if you're lucky.", "Haha, good luck with that!",
            "I'd rather not say.", "I have my doubts, but okay.", 
            "Well, maybe...maybe not.", "Try flipping a coin instead!", "I’ll never tell!"
        ];

        const response = responses[Math.floor(Math.random() * responses.length)];

        await interaction.reply(`🎱 **Question**: ${question}\n**Answer**: ${response}`);
    },
};
