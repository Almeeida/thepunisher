const { Command, Embed } = require('../../structures/');

class Ping extends Command {
    constructor(name, client) {
        super(name, client);
        this.aliases = ['pong'];
        this.argsRequired = true;
    }

    run(message) {
        return message.channel.send(new Embed(message).setDescription(`Pong! a latencia do bot é ${Math.floor(this.bot.ping)}`));
    } 
}

module.exports = Ping;