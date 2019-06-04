module.exports = {
	run: async function(member) {

		member.guild.createRole({
			name: "Captcha Teste",
			color: "RED",
			permissions: [
				"ADD_REACTIONS",
				"READ_MESSAGE_HISTORY",
				"VIEW_CHANNEL"
			]
		});
		
		const role = member.guild.roles.find((r) => r.name === "Captcha Teste");
		member.addRole(role);

		member.guild.createChannel("captcha", "category");
		member.guild.createChannel(`captcha ${member.id}`, "text");
		
		const category = member.guild.channels.find((c) => c.name === "captcha");
		const channel = member.guild.channels.find((ch) => ch.name === `captcha ${member.id}`);
		
		if (!channel.category) {
			channel.setParent(category.id);
		}

		channel.overwritePermissions(role, {
			READ_MESSAGE_HISTORY: true,
			VIEW_CHANNEL: true,
			SEND_MESSAGES: false,
			ADD_REACTIONS: true
		});

		const msg = channel.send("Teste");
		msg.react("😜");
		const filter = (r, u) => r.emoji.name === "😜" && u.id === member.id;
		const collector = msg.createReactionCollector(filter, { max: 1 });

		collector.on("collect", async (r) => {
			member.guild.createRole({
				name: "Verificado",
				color: "GREEN",
				permissions: [
					"ADD_REACTIONS",
					"READ_MESSAGE_HISTORY",
					"VIEW_CHANNEL",
					"SEND_MESSAGES",
					"EMBED_LINKS",
					"ATTACH_FILES",
					"EXTERNAL_EMOJIS",
					"CONNECT",
					"SPEAK",
					"CHANGE_NICKNAME"
				]
			});

			const roleVerified = member.guild.roles.find((r) => r.name === "Verificado");
			member.guild.channels.forEach(async (channel) => {
				await channel.overwritePermissions(roleVerified, {
					ADD_REACTIONS: true,
					READ_MESSAGE_HISTORY: true,
					VIEW_CHANNEL: true,
					SEND_MESSAGES: true,
					EMBED_LINKS: true,
					ATTACH_FILES: true,
					EXTERNAL_EMOJIS: true,
					CONNECT: true,
					SPEAK: true,
				});
			});

			member.addRole(roleVerified);
			category.delete();
			member.send("Você foi verificado com sucesso! Agora você pode interagir no servidor.");		
		});
	}
}