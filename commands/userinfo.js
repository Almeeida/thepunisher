const Discord = require("discord.js");
const moment = require("moment");
moment.locale("pt-BR"); 

module.exports = {
  run: (bot, message, args) => {
  
    const member = message.mentions.members.first() || message.member || message.guild.members.get(args[0]) || message.guild.members.find(m => m.user.username.toLowerCase().startsWith(args.join(" ")));
    const administrator = member.hasPermission("ADMINISTRATOR")? "Sim" : "Não";
    const status = {
      "online": "<:online:529179015865434132> Disponível",
      "offline": "<:offline:529178943882788866> Invisível",
      "idle": "<:ausente:529179085402931212> Ausente",
      "dnd": "<:ocupado:529178886647578626> Não perturbar"
    }
    const gamePresence = {
      "Visual Studio Code": "<:vsc:536600505099616267> Visual Studio Code",
      "Youtube": "<:Youtube:536605153759985665> Youtube",
      "Spotify": "<:Spotify:536607195949694977> Spotify",
      "Sublime Text": "<:SublimeText:536606178323726387> Sublime Text",
      "Counter-Strike: Global Offensive": "<:CSGO:536606981192941568> Counter-Strike: Global Offensive",
      "Netflix": "<:Netflix:536605205916155904> Netflix",
      "Adobe Photoshop": "<:AdobePhotoshop:536607935909068800> Adobe Photoshop",
      "Adobe Illustrator": "<:Adobe_Illustrator:536607785581019163> Adobe Illustrator",
      "League of Legends": "<:LeagueOfLegends:536606575947808779> League of Legends",
      "World of Warcraft": "<:WoW:536608041056075786> World of Warcraft",
      "Fortnite": "<:fortnite:537665269464825866> Fortnite",
      "PLAYERUNKNOWN'S BATTLEGROUNDS": "<:PUBG:537667392029982744> PLAYERUNKNOWN'S BATTLEGROUNDS"
    }
    const embed = new Discord.RichEmbed()
    .setAuthor(`» 📚 Informações do usuário: ${member.user.username}`, member.user.displayAvatarURL)
    .setThumbnail(member.user.displayAvatarURL)
    .addField("» 👤 Usuário:", member.user.tag, true)
    .addField("» 🗂 ID:", member.user.id, true)
    .addField("» 🏷 Apelido:", member.user.nickname? member.user.nickname : "Sem apelido", true)
    .addField("» 🚦 Status:", status[member.user.presence.status], true)
    .addField("» 📆 Entrou em:", moment(member.joinedAt).format("LL"), true)
    .addField("» 📆 Dias no Discord:", moment().diff(member.user.createdAt, "days"), true)
    .addField("» 📆 Conta criada em:", moment(member.user.createdAt).format("LL"), true)
    .addField("» 📆 Dias no servidor:", moment().diff(member.joinedAt, "days"), true)
    .addField("» 👾 Total de Cargos:", member.roles.size? member.roles.size : "Sem cargos.", true)
    .addField("» 🛡 Administrador:", administrator, true)
    .addField("» 🎮 Jogando:", member.user.presence.game ? gamePresence[member.user.presence.game] || member.user.presence.game : "O usuário não está jogando nada no momento.", false)
    .setColor(member.displayColor)
    .setTimestamp(new Date())
    .setFooter(`» Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL)
      message.channel.send(embed);
},
  aliases: ["perfil", "info"],
  category: "Moderação",
  description: "Mostrar as informações do usuário."
}
