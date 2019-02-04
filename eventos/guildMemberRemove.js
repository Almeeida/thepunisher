const Discord = require("discord.js");
module.exports = {
	run: async function(member) {

		try {
			let channel = member.guild.channels.find(ch => ch.name === "🎉saiu");
			let category = member.guild.channels.find(ch => ch.name === "👾ENTRADA/SAIDA")
			const embed = new Discord.RichEmbed()
      			.setColor("#3fdb20")
      			.setThumbnail(member.user.avatarURL)
      			.setDescription(`${member}, saiu do servidor.`)
      			.addField('Atualmente temos:', member.guild.memberCount)
      			.setTimestamp(new Date())
      			.setFooter(member.guild.name, member.guild.iconURL)
    		if (!member.guild.me.hasPermission("MANAGE_CHANNELS")) {
    			return;
			} else if (!category && !channel) {
				category = await member.guild.createChannel("👾ENTRADA/SAIDA", "category");
				channel = await member.guild.createChannel("🎉saiu", "text" [{
					id: member.guild.id,
					deny: ["SEND_MESSAGES"],
					allow: ["ADD_REACTIONS", "VIEW_CHANNEL"]
				}]);
				channel.setParent(category.id);
				await channel.send(embed);
			} else {
				if (channel && category) {
					channel.send(embed);
				}
			}
		} catch(e) {
			const channel = this.channels.find(ch => ch.name === "❌logs-de-erros-the-punisher");
			console.log(e);
			channel.send(`Ocorreu um erro no evento **guildMemberAdd** | Servidor ${member.guild.name}. Erro: ${e}`);
		}	
	}
}