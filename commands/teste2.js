module.exports = {
    run: async function(bot, message, args) {

    let msg = await message.channel.send("reaction role");
    await msg.react('👦');
    await msg.react('👧');

    const filter = (r) => r.emoji.name === '👦';
    const collector = msg.createReactionCollector(filter);

    const filter1 = (r) => r.emoji.name === '👧';
    const collector1 = msg.createReactionCollector(filter1);

    
    collector.on('collect', r => {
    let role = message.guild.roles.find(r => r.name === "xupador de rola");
        message.member.addRole(role);
  });
   
       collector1.on('collect', r1 => {
    let role2 = message.guild.roles.find(r => r.name === "filmao lendario");
        message.member.addRole(role2);
  });
       
   }
}