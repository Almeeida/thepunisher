module.exports = function run() {
  this.user.setActivity(`${this.users.cache.size.toLocaleString()} usuários.`,
    {
      url: 'https://twitch.tv/alanzoka', type: 'STREAMING',
    });
  console.log('Bot iniciado com sucesso!\nStatus carregado com sucesso!');
};
