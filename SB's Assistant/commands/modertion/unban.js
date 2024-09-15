const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Unban a user from the server')
        .addStringOption(option => 
            option.setName('userid')
                .setDescription('The ID of the user to unban')
                .setRequired(true)),
    async execute(interaction) {
        // Defer reply to prevent interaction expiration
        await interaction.deferReply({ ephemeral: true });

        const userId = interaction.options.getString('userid');

        try {
            // Fetch the banned users list
            const bans = await interaction.guild.bans.fetch();
            const user = bans.get(userId);

            if (!user) {
                return await interaction.editReply({ content: `User with ID ${userId} is not banned or does not exist.` });
            }

            // Unban the user
            await interaction.guild.bans.remove(userId);
            await interaction.editReply({ content: `Successfully unbanned user with ID ${userId}.` });
        } catch (error) {
            console.error(error);
            await interaction.editReply({ content: `Failed to unban user with ID ${userId}. Ensure the bot has the required permissions.` });
        }
    },
};
