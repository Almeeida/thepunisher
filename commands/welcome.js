module.exports = {
    run: async function(bot, message, args, database) {
        const eventRef = await database.ref(`Servidores/${message.guild.id}/Eventos`);

        eventRef.once("value").then(async function(event) {
            if (event.val() == null) {
                eventRef.set({
                    guildMemberAdd: true
                });
            } else if (event.val() == true) {
                message.channel.send("O evento de bem-vindo está ativado.");
            } else {
                if (event.val() == false) {
                    message.channel.send("O evento de bem-vindo está desativado.");
                }
            }
        });
    }
}