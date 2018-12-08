/**
 * Evento Message do Discord.js
 * @event message Emitido sempre que uma mensagem é criada.
 * @param {Message} message mensagem criada
 */
function Message (message) {
    if (message.author.bot || !message.content.startsWith(process.env.PREFIX))
        return
    
    let args = message.content.slice(process.env.PREFIX.length).split(/ +/g)
    let command = this.fetchCommand(args.shift())
    
    if (command) {
        return command.process(message, args)
    }    
}

module.exports = Message
