module.exports = {
  run: ({ message, args }) => {
    if (args.length === 0) {
      return message.replyError('Digite uma mensagem.');
    }
    message.delete();
    return message.channel.send(args.join(' '));
  },
  name: 'say',
  aliases: ['falar', 'dizer'],
  category: 'Entretenimento',
  description: 'Dizer uma mensagem pelo bot',
};
