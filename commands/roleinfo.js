const Discord = require("discord.js");
const moment = require("moment");
moment.locale('pt-BR');

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("ADMINISTRATOR")) 
      return message.channel.send(new Discord.RichEmbed().setDescription(`<:cancel1:500150315304091649> Desculpe, você não tem permissão para executar este comando!`).setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL).setTimestamp().setColor("#ff0000"));
    let role = message.mentions.roles.first();
    if(!role) return message.channel.send(new Discord.RichEmbed().setDescription(`Por favor, mencione o cargo que deseja ver as informações.`).setFooter(`Comando solicitado por ${message.author.tag}`, message.author.displayAvatarURL).setColor("#ff0000").setTimestamp());
    const embed = new Discord.RichEmbed()
    .setAuthor(`Informações do cargo ${role.name}`)
    .setColor("RANDOM")
    .addField("Nome do cargo:", `${role.name}`)
    .addField("ID do cargo:", `${role.id}`)
    .addField("Cor:", `${role.hexColor}`)
    .addField("Cargo criado em:", `${moment(role.createdAt).format('LLL')}`)
    .addField('Permissões:', `\`\`\`css\n${Object.entries(role.serialize()).filter(([,has]) => has).map(([perm]) => perm).join(", ")}\`\`\``, false)
    .setFooter(`Comando solicitado por ${message.author.tag}`, message.author.displayAvatarURL)
    message.channel.send(embed);
    }
    
    module.exports.help = {
        name: "roleinfo"
    }
    