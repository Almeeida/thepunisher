const Discord = require("discord.js");
module.exports = {
	run: async function(member) {

		const eventRef = await database.ref(`Servidores/${message.guild.id}/Eventos/guildMemberAdd`);
		eventRef.once("value").then(async function(event) {
			if (event.val() == true) {
				member.guild.channels.get(member.guild.channels.first().id).send("Bem-vindo" + member)
			} else {
				if (event.val() == false) {
					return;
				}
			}
		});
	}
}