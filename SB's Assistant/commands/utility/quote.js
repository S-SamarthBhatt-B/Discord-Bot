const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

const quotes = [
    "The only limit to our realization of tomorrow is our doubts of today. – Franklin D. Roosevelt",
    "The future belongs to those who believe in the beauty of their dreams. – Eleanor Roosevelt",
    "In the end, we will remember not the words of our enemies, but the silence of our friends. – Martin Luther King Jr.",
    "The best way to predict your future is to create it. – Peter Drucker",
    "You only live once, but if you do it right, once is enough. – Mae West",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill",
    "The purpose of our lives is to be happy. – Dalai Lama",
    "Life is what happens when you're busy making other plans. – John Lennon",
    "Get your facts first, then you can distort them as you please. – Mark Twain",
    "The only impossible journey is the one you never begin. – Tony Robbins",
    "In three words I can sum up everything I've learned about life: It goes on. – Robert Frost",
    "Life is short, and it's up to you to make it sweet. – Sarah Louise Delany",
    "You must be the change you wish to see in the world. – Mahatma Gandhi",
    "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment. – Ralph Waldo Emerson",
    "The best revenge is massive success. – Frank Sinatra",
    "Life is either a daring adventure or nothing at all. – Helen Keller",
    "The only way to do great work is to love what you do. – Steve Jobs",
    "Believe you can and you're halfway there. – Theodore Roosevelt",
    "The journey of a thousand miles begins with one step. – Lao Tzu",
    "The greatest glory in living lies not in never falling, but in rising every time we fall. – Nelson Mandela",
    "You have within you right now, everything you need to deal with whatever the world can throw at you. – Brian Tracy",
    "To live is the rarest thing in the world. Most people exist, that is all. – Oscar Wilde",
    "Don't watch the clock; do what it does. Keep going. – Sam Levenson",
    "The mind is everything. What you think you become. – Buddha",
    "You miss 100% of the shots you don’t take. – Wayne Gretzky",
    "The best time to plant a tree was 20 years ago. The second best time is now. – Chinese Proverb",
    "The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty. – Winston Churchill",
    "Don’t let yesterday take up too much of today. – Will Rogers",
    "We may encounter many defeats but we must not be defeated. – Maya Angelou",
    "The only way to achieve the impossible is to believe it is possible. – Charles Kingsleigh",
    "You do not find the happy life. You make it. – Camilla E. Kimball",
    "The secret of getting ahead is getting started. – Mark Twain",
    "It does not matter how slowly you go as long as you do not stop. – Confucius",
    "Everything you’ve ever wanted is on the other side of fear. – George Addair",
    "Opportunities don't happen, you create them. – Chris Grosser",
    "Success usually comes to those who are too busy to be looking for it. – Henry David Thoreau",
    "Don’t be pushed around by the fears in your mind. Be led by the dreams in your heart. – Roy T. Bennett",
    "The harder you work for something, the greater you’ll feel when you achieve it. – SB",
    "Dream bigger. Do bigger. – SB",
    "Don’t wait for opportunity. Create it. – SB",
    "Dream it. Wish it. Do it. – SB",
    "Success doesn’t just find you. You have to go out and get it. – SB",
    "The harder you work, the more opportunities you get. – SB",
    "Dream it. Believe it. Build it. – SB",
    "Great things never come from comfort zones. – SB",
    "Dream it. Believe it. Achieve it. – SB",
    "Success doesn’t just find you. You have to go out and get it. – SB",
    "Don’t let the noise of others’ opinions drown out your own inner voice. – Steve Jobs",
    "Your time is limited, don’t waste it living someone else’s life. – Steve Jobs",
    "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle. – Christian D. Larson",
    "Act as if what you do makes a difference. It does. – William James",
    "You are never too old to set another goal or to dream a new dream. – C.S. Lewis",
    "The only limit to our realization of tomorrow is our doubts of today. – Franklin D. Roosevelt",
    "The future belongs to those who believe in the beauty of their dreams. – Eleanor Roosevelt",
    "The only impossible journey is the one you never begin. – Tony Robbins",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill",
    "The purpose of our lives is to be happy. – Dalai Lama",
    "Life is what happens when you’re busy making other plans. – John Lennon",
    "Get your facts first, then you can distort them as you please. – Mark Twain",
    "The only impossible journey is the one you never begin. – Tony Robbins",
    "In three words I can sum up everything I’ve learned about life: It goes on. – Robert Frost",
    "Life is short, and it’s up to you to make it sweet. – Sarah Louise Delany",
    "You must be the change you wish to see in the world. – Mahatma Gandhi",
    "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment. – Ralph Waldo Emerson",
    "The best revenge is massive success. – Frank Sinatra",
    "Life is either a daring adventure or nothing at all. – Helen Keller",
    "The only way to do great work is to love what you do. – Steve Jobs",
    "Believe you can and you’re halfway there. – Theodore Roosevelt",
    "The journey of a thousand miles begins with one step. – Lao Tzu",
    "The greatest glory in living lies not in never falling, but in rising every time we fall. – Nelson Mandela",
    "You have within you right now, everything you need to deal with whatever the world can throw at you. – Brian Tracy",
    "To live is the rarest thing in the world. Most people exist, that is all. – Oscar Wilde",
    "Don’t watch the clock; do what it does. Keep going. – Sam Levenson",
    "The mind is everything. What you think you become. – Buddha",
    "In the end, we will remember not the words of our enemies, but the silence of our friends. – SB"
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quote')
        .setDescription('Get a random inspirational quote.'),
    async execute(interaction) {
        const quote = quotes[Math.floor(Math.random() * quotes.length)];
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Inspirational Quote')
            .setDescription(`"${quote}"`)
            .setFooter({ text: 'Requested by ' + interaction.user.username });

        await interaction.reply({ embeds: [embed] });
    },
};
