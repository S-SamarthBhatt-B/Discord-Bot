const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Displays the avatar of a user.')
        .addUserOption(option => 
            option.setName('target')
                .setDescription('Select a user to view their avatar')
                .setRequired(false)),

    async execute(interaction) {
        const user = interaction.options.getUser('target') || interaction.user; // Target user or interaction user
        const member = interaction.guild.members.cache.get(user.id); // Get the member object

        // User and server info
        const avatarURL = user.displayAvatarURL({ dynamic: true, size: 512 });
        const serverName = interaction.guild.name;

        // Create an embed to display the user's avatar and server info
        const avatarEmbed = new EmbedBuilder()
            .setColor('#00ffcc')
            .setTitle(`${user.username}'s Avatar`)
            .setDescription(`Here's the avatar of ${user} in the server **${serverName}**.`)
            .setImage(avatarURL) // Show the avatar image
            .addFields(
                { name: 'Server Name', value: serverName, inline: true },
                { name: 'User', value: user.tag, inline: true },
            )
            .setFooter({ text: `Requested by ${interaction.user.tag}` })
            .setTimestamp();

        // Send the embed
        await interaction.reply({ embeds: [avatarEmbed] });
    },
};
