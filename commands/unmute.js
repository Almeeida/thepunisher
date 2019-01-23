const Discord = require("discord.js");

module.exports = {
  run: (bot, message, args) => {
  
  const role = message.guild.roles.find(r => r.name === "The Punisher | 🔇 Muted");
  const member = message.mentions.members.first() || message.guild.members.get(args[0]);
  const reason = args.slice(1).join(" ");

    if (!message.guild.me.hasPermission("MUTE_MEMBERS")) {
      return message.channel.send(`» **${message.author.username}** | Desculpe, eu preciso da permissão **MUTE_MEMBERS** para executar este comando.`);
    } else if (!message.member.hasPermission("MUTE_MEMBERS")) {
      return message.channel.send(`» **${message.author.username}** | Desculpe, você não tem permissão para executar este comando. Permissão necessária: **MUTE_MEMBERS**.`);
    } else if (!member) {
      return message.channel.send(`**${message.author.username}** | Por favor, insira o id ou mencione que deseja desmutar.`);
    } else if (!reason) {
      return message.channel.send(`**${message.author.username}** | Por favor, insira um motivo para desmutar este usuário.`);
    } else if (!member.roles.has(role.id)) {
      return message.channel.send(`**${message.author.username}** | Desculpe, este usuário não está mutado.`);
    } else {
      member.removeRole(role)
      .catch(console.error);
      const embed = new Discord.RichEmbed()
      .setTitle("**DESMUTE**")
      .setDescription(`O usuáro ${member} foi desmutado.\n \n• **• Motivo**: » ${reason}`)
      .setColor("#ff0000")
      .setTimestamp(new Date())
      .setThumbnail(member.user.displayAvatarURL)
      .setFooter(`Comando solicitado por ${message.author.tag}`, message.author.displayAvatarURL)
      message.channel.send(embed);
    }
},
  aliases: ["desmute", "desmutar"],
  category: "Moderação",
  description: "Desmutar um usuário."
}