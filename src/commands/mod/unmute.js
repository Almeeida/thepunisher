const { MessageEmbed } = require('discord.js');

module.exports = {
  run: ({ message, args }) => {
    const role = message.guild.roles.find((r) => r.name === 'The Punisher | 🔇 Muted');
    const member = message.mentions.members.first() || message.guild.members.get(args[0]);
    const reason = args.slice(1).join(' ');

    if (!message.guild.me.hasPermission('MUTE_MEMBERS')) {
      return message.channel.send(`» **${message.author.username}** | Desculpe, eu preciso da permissão \`\`MUTE_MEMBERS\`\` para executar este comando.`);
    } if (!message.member.hasPermission('MUTE_MEMBERS')) {
      return message.channel.send(`» **${message.author.username}** | Desculpe, você não tem permissão para executar este comando. Permissão necessária: \`\`MUTE_MEMBERS.\`\``);
    } if (!member) {
      return message.channel.send(`**${message.author.username}** | Por favor, insira o id ou mencione que deseja desmutar.`);
    } if (!reason) {
      return message.channel.send(`**${message.author.username}** | Por favor, insira um motivo para desmutar este usuário.`);
    } if (!member.roles.has(role.id)) {
      return message.channel.send(`**${message.author.username}** | Desculpe, este usuário não está mutado.`);
    }
    member.roles.remove(role)
      .catch(console.error);
    message.channel.send(new MessageEmbed()
      .setTitle('**DESMUTE**')
      .setDescription(`O usuáro ${member} foi desmutado.\n \n• **• Motivo**: » ${reason}`)
      .setColor('#ff0000')
      .setTimestamp(new Date())
      .setThumbnail(member.user.displayAvatarURL())
      .setFooter(`Comando solicitado por ${message.author.tag}`, message.author.displayAvatarURL()));
  },
  name: 'unmute',
  aliases: ['desmute', 'desmutar'],
  category: 'Moderação',
  description: 'Desmutar um usuário.',
};
