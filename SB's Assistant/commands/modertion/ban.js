const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a user from the server')
        .addUserOption(option => option.setName('target').setDescription('The user to ban').setRequired(true)),
    async execute(interaction) {
        // Defer the reply to ensure interaction doesn't expire
        await interaction.deferReply({ ephemeral: true });

        const user = interaction.options.getUser('target');
        const member = interaction.guild.members.cache.get(user.id);

        if (!member) {
            return interaction.editReply({ content: `User ${user.username} is not in this server.` });
        }

        try {
            await member.ban();
            await interaction.editReply({ content: `Successfully banned ${user.tag}` });
        } catch (error) {
            console.error(error);
            await interaction.editReply({ content: `Failed to ban ${user.tag}. Please check bot permissions.` });
        }
    },
};
