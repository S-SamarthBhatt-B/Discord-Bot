const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Displays information about a user.')
        .addUserOption(option => 
            option.setName('target')
                .setDescription('The user to get information about')
                .setRequired(false)
        ),
    async execute(interaction) {
        const target = interaction.options.getUser('target') || interaction.user;  // Get the target user or default to the command invoker
        const member = await interaction.guild.members.fetch(target.id);  // Fetch guild member details
        
        const embed = new EmbedBuilder()
            .setTitle(`User Information: ${target.tag}`)
            .setThumbnail(target.displayAvatarURL({ dynamic: true, size: 512 }))
            .setColor('#3498db')
            .addFields(
                { name: 'Username', value: `${target.tag}`, inline: true },
                { name: 'ID', value: `${target.id}`, inline: true },
                { name: 'Joined Server On', value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:F>`, inline: true },
                { name: 'Account Created On', value: `<t:${Math.floor(target.createdTimestamp / 1000)}:F>`, inline: true },
                { name: 'Roles', value: member.roles.cache.map(role => role.name).join(', '), inline: true }
            )
            .setFooter({ text: `Requested by ${interaction.user.tag}` })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
