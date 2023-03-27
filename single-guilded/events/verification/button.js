const {
  ButtonInteraction,
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {ButtonInteraction} interaction
   */
  async execute(interaction, client) {
    if (!interaction.isButton()) return;

    const role = interaction.guild.roles.cache.get("YOUR_VERIFIED_ROLE_ID"); // Set your verification role
    if (interaction.member.roles.cache.has(role.id)) {
      return interaction.reply({
        content: "`❌` You are already verified",
        ephemeral: true,
      });
    }

    if (interaction.customId === "start_verification") {
      await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Blurple")
            .setDescription(
              [
                `**(1) Respect**\n\`\`\`Be respectful. Hate-speech, sexual  harassment, personal attacks, threats, impersonation, abuse or trolling to the point that people feel uncomfortable is not allowed.\`\`\``,
                `**(2) Discussions**\n\`\`\`Do not start or bring any unnecessary drama. Topics such as religion and politics are deemed too inflammatory/controversial and provocative.\`\`\``,
                `**(3) Advertisement**\n\`\`\`Advertisement, either through discord name or through direct messages is not tolerated and will result in a permanent ban.\`\`\``,
                `**(4) Terms of Service**\n\`\`\`Do not break Discord ToS. Do not request products which break ToS, we can and will report you for such requests.\`\`\``,
                `**(5) Acceptable Use**\n\`\`\`Users are solely responsible for making sure that their use of the Service violates no applicable law, regulations or third-party rights. ${interaction.guild.name} Services reserves the right to take any appropriate measure to protect its legitimate interests including by denying Users access to the Service, terminating contracts, reporting any misconduct performed through the Service to the competent authorities – such as judicial or administrative authorities - whenever Users engage or are suspected to have violated laws, infringe any third-party rights or considerably impair the Owner's legitimate interests.\`\`\``,
              ].join("\n")
            ),
        ],
        components: [
          new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId("continue_verification")
              .setDisabled(false)
              .setLabel("Continue Verification")
              .setStyle(ButtonStyle.Primary)
          ),
        ],
        ephemeral: true,
      });
    }
    if (interaction.customId === "continue_verification") {
      await interaction.update({
        embeds: [
          new EmbedBuilder()
            .setColor("Blurple")
            .setAuthor({
              name: `${interaction.guild.name} |  Agreement to TOS`,
              iconURL: `${interaction.guild.iconURL()}`,
            })
            .setTitle(`__Verification Agreement - ${interaction.guild.name}__`)
            .setDescription(
              [
                '> As a member of our discord server, it is a essential that you fully comprehend and acknowledge the Terms of Service ("TOS") that have been put in place to govern the usage of our server & pruducts.',
                " ",
                `So therefore do you agree to (\"${interaction.guild.name}\")'s **Term's of Service** & agree to obey them at all times while/using pruducts in our discord server`,
              ].join("\n")
            ),
        ],
        components: [
          new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId("agree_verification")
              .setDisabled(false)
              .setLabel("Agree")
              .setStyle(ButtonStyle.Success)
          ),
        ],
      });
    }

    if (interaction.customId === "agree_verification") {
      interaction.member.roles.add(role);
      await interaction.update({
        embeds: [
          new EmbedBuilder()
            .setColor("Green")
            .setDescription(
              [
                `You successfully verified!`,
                `Welcome to ${interaction.guild.name}`,
              ].join("\n")
            ),
        ],
        components: [],
      });
    }
  },
};
