const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Displays detailed information about the server.'),
    async execute(interaction) {
        const { guild } = interaction;
        const owner = await guild.fetchOwner();  // Fetch the server owner
        const serverIcon = guild.iconURL({ dynamic: true, size: 512 });  // Server avatar
        const createdDate = `<t:${Math.floor(guild.createdTimestamp / 1000)}:F>`;  // Formatted created date

        const embed = new EmbedBuilder()
            .setTitle(`Server Information: ${guild.name}`)
            .setThumbnail(serverIcon)
            .setColor('#7289da')
            .addFields(
                { name: 'Server Name', value: guild.name, inline: true },
                { name: 'Owner', value: owner.user.tag, inline: true },
                { name: 'Total Members', value: `${guild.memberCount}`, inline: true },
                { name: 'Created On', value: createdDate, inline: true }
            )
            .setFooter({ text: `Server ID: ${guild.id}` })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
