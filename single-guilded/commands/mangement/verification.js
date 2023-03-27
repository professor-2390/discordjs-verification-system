const {
  SlashCommandBuilder,
  CommandInteraction,
  PermissionFlagsBits,
  EmbedBuilder,
  Client,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("verification")
    .setDescription("Setup the verification system")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
  /**
   *
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  execute(interaction, client) {
    interaction
      .reply({
        content: "Successfully created the verification system!",
        ephemeral: true,
      })
      .then(async () => {
        return interaction.channel.send({
          embeds: [
            new EmbedBuilder()
              .setColor("Blurple")
              .setTitle(`${client.user.username} | Verification`)
              .setDescription(
                [
                  `Welcome to **${interaction.guild.name}**!`,
                  `This server is protected using a Verification system`,
                  `To verify you need to click the **"Begin Verification"** button`,
                  `And follow the required steps to grant access to the whole server.`,
                ].join("\n")
              ),
          ],
          components: [
            new ActionRowBuilder().addComponents(
              new ButtonBuilder()
                .setCustomId("start_verification")
                .setDisabled(false)
                .setLabel("Begin Verification")
                .setStyle(ButtonStyle.Primary)
            ),
          ],
        });
      });
  },
};
