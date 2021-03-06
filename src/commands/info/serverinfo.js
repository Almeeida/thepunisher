const { MessageEmbed } = require('discord.js');
const moment = require('moment');

moment.locale('pt-BR');

module.exports = {
  run: ({ message }) => {
    const verificationGuild = {
      NONE: 'Nenhum (sem restrições)',
      LOW: 'Baixo: Precisa tem um e-mail verificado em sua conta do Discord.',
      MEDIUM: 'Médio: Também precisa ser registrado no Discord por pelo menos 5 minutos.',
      HIGH: 'Alto: Também precisa ser um membro deste servidor por pelo menos 10 minutos.',
      VERY_HIGH: 'Muito alto: Precisa ter um telefone verificado em sua conta do Discord.',
    };
    const online = message.guild.members.cache.filter((m) => m.presence.status === 'online').size;
    const ocupado = message.guild.members.cache.filter((m) => m.presence.status === 'dnd').size;
    const ausente = message.guild.members.cache.filter((m) => m.presence.status === 'idle').size;
    const offline = message.guild.members.cache.filter((m) => m.presence.status === 'offline').size;
    const bots = message.guild.members.cache.filter((b) => b.user.bot).size;
    const allMembers = message.guild.memberCount;
    const roles = message.guild.roles.cache.filter((r) => r.id !== message.guild.id)
      .sort((a, b) => b.position - a.position)
      .map((i) => i.toString());

    let rolesText;
    if (roles.length === 0) {
      rolesText = 'Nenhum cargo foi criado neste servidor.';
    } else if (roles.length > 10) {
      rolesText = `${roles.slice(0, 10).join(', ')} e mais ${roles.length - 10} cargos...`;
    } else {
      rolesText = roles.join(', ');
    }

    message.channel.send(new MessageEmbed()
      .setAuthor(`» ${message.guild.name}`, message.guild.iconURL())
      .setColor('#FF0000')
      .addField(':crown: » Dono:', message.guild.owner.toString(), true)
      .addField(':joy: » Total de Emojis:', message.guild.emojis.cache.size.toLocaleString(), true)
      .addField(':file_cabinet: » ID do servidor:', message.guild.id, true)
      .addField(`<:canal:513884866455273494> » Total de canais: [${message.guild.channels.cache.size.toLocaleString()}]`, `<:text:535162253604028417> Texto: ${message.guild.channels.cache.filter((ch) => ch.type === 'text').size.toLocaleString()}\n<:voice:535162220057985033> Voz: ${message.guild.channels.cache.filter((ch) => ch.type === 'voice').size.toLocaleString()}`, true)
      .addField('<:world:500147421641310229> » Região:', message.guild.region.toString().replace('brazil', ':flag_br: Brasil'), true)
      .addField(`<:user:500109138953633792> » Membros: [${allMembers.toLocaleString()}]`, `<:online:535161741873643531> Online: ${online.toLocaleString()}\n<:ausente:535161866415112192> Ausente: ${ausente.toLocaleString()}\n <:ocupado:535161952075251742> Ocupado: ${ocupado.toLocaleString()}\n <:offline:535161911956996104> Offline: ${offline.toLocaleString()}\n<:bots:535162824301740042> Bots: ${bots.toLocaleString()}`, false)
      .addField('🛡 » Nivel de verificação:', verificationGuild[message.guild.verificationLevel], false)
      .addField(`:beginner: » Total de cargos: [${roles.length}]`, rolesText, false)
      .setThumbnail(message.guild.iconURL({ size: 2048 }))
      .setFooter(`Comando solicitado por: ${message.author.tag}`, message.author.displayAvatarURL({ format: 'png', dynamic: true })));
  },
  name: 'serverinfo',
  aliases: ['si', 'server', 'servidor'],
  category: 'Moderação',
  description: 'Mostrar as informações do servidor.',
};
