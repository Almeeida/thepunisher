const Discord = require("discord.js");
const moment = require("moment");
moment.locale("pt-BR"); 

module.exports = {
  run: (bot, message, args) => {
  
  const member = message.mentions.members.first() || message.member || message.guild.members.get(args[0]) || message.guild.members.find(m => m.user.username.startsWith(args.join(" ")));
  const administrator = member.hasPermission("ADMINISTRATOR")? "Sim" : "Não";
  const status = {
    "online": "<:online:529179015865434132> Disponível",
    "offline": "<:offline:529178943882788866> Invisível",
    "idle": "<:ausente:529179085402931212> Ausente",
    "dnd": "<:ocupado:529178886647578626> Não perturbar"
  }

  const embed = new Discord.RichEmbed()
  .setAuthor(`» 📚 Informações do usuário: ${member.user.username}`, member.user.displayAvatarURL)
  .setThumbnail(member.user.displayAvatarURL)
  .addField("» 👤 Usuário:", member.user.tag, true)
  .addField("» 🗂 ID:", member.user.id, true)
  .addField("» 🏷 Apelido:", `${member.user.nickname? member.user.nickname : "Sem apelido", true)
  .addField("» 🚦 Status:", status[member.user.presence.status], true)
  .addField("» 🎮 Jogando:", member.user.presence.game ? member.user.presence.game : "O usuário não está jogando nada no momento.", false)
  .addField("» 📆 Entrou em:", moment(member.joinedAt).format("LLLL"), true)
  .addField("» 📆 Dias no Discord:", moment().diff(member.user.createdAt, "days"), true)
  .addField("» 📆 Conta criada em:", moment(member.user.createdAt).format("LLL"), true)
  .addField("» 📆 Dias no servidor:", moment().diff(member.joinedAt, "days"), true)
  .addField("» 👾 Total de Cargos:", member.roles.size? member.roles.size : "Sem cargos.", true)
  .addField("» 🛡 Administrador:", administrator, true)
  .setColor(member.displayColor)
  .setTimestamp(new Date())
  .setFooter(`» Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL)
  message.channel.send(embed);

},
  aliases: ["perfil", "info"],
  category: "Moderação",
  description: "Mostrar as informações do usuário."
}
