const Discord = require("discord.js");
const ms = require("ms");

module.exports = {
  run: async function (bot, message, args) {

    const member = message.mentions.members.first() || message.guild.members.get(args[0]);
    let role = message.guild.roles.find(r => r.name === "The Punisher | 🔇 Muted");
    const time = args[1];
    const reason = args.slice(2).join(" ");

    if (!message.member.hasPermission("MUTE_MEMBERS")) {
      return message.channel.send(`**${message.author.username}** | Desculpe, você não tem permissão para executar este comando. Permissão requirida: **MUTE_MEMBERS**`)
    } else if (!member) {
      return message.channel.send(`**${message.author.username}** | Por favor insira o id ou mencione o usuário que deseja banir.`);
    } else if (!time) {
      return message.channel.send(`**${message.author.username}** | Por favor insira um tempo para banir este usuário. Exemplo: t.tempute @usuário 30s motivo`)
    } else if (!reason) {
      return message.channel.send(`**${message.author.username}** | Por favor insira um motivo para mutar este usuário.`);
    } else if (!role) {
      try {

      role = await message.guild.createRole({
        name: "The Punisher | 🔇 Muted",
        color: "#ff0000",
        permissions:[]
      });
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(role, {
          SEND_MESSAGES: false,
          SPEAK: false,
          CONNECT: true
        });
      });

      } catch(e) {
      console.log(e);
      }

    } else {
      await member.addRole(role);
      const embed = new Discord.RichEmbed()
      .setAuthor("*MUTE*")
      .setDescription(`O usuário ${member} foi mutado por **${ms(ms(time))}.**\n \n**• Motivo:** » ${reason}\n \nApós o termino da punição o usuário será desmutado automaticamente.`)
      .setThumbnail(member.user.displayAvatarURL)
      .setColor("#ff0000")
      .setTimestamp(new Date())
      .setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL)
      message.channel.send(embed);

      setTimeout(function() {
      member.removeRole(role);
      const embed = new Discord.RichEmbed()
      .setAuthor(`**DESMUTE**`, bot.user.displayAvatarURL)
      .setDescription(`O usuário ${member} que havia sido mutado por **${ms(ms(time))}**, finalizou seu tempo de punição e foi desmutado.`)
      .setThumbnail(member.user.displayAvatarURL)
      .setColor("#ff0000")
      .setTimestamp(new Date())
      .setFooter(message.guild.name, message.guild.iconURL)
      message.channel.send(embed);
      }, ms(time));
    }
},
  aliases: ["mute", "mutar", "silenciar"],
  category: "Moderação",
  description: "Mutar um usuário por um determinado tempo."
}