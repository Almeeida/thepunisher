const Discord = require("discord.js");

module.exports = {
    run: async function (bot, message, args) {
    try {
        // criando um Object com todas categorias
        let categorias = bot.commands.reduce((o, comando, nome) => {
            if (!o[comando.category]) o[comando.category] = {};
            o[comando.category][nome] = comando;
            return o;
        }, {});
        /*
            embed = simples RicheEmbed
            opcoes = JSON das opçoes das categorias
        */
        let embed = new Discord.RichEmbed()
            .setTitle('Categorias')
            .setThumbnail(bot.user.avatarURL)
            .setColor('RANDOM');
        let opcoes = require('../categorias.json');
        
        // adicionando todas categorias 
        embed.setDescription(Object.keys(categorias)
            .map((nome) =>
             opcoes[nome] ?
             (`${opcoes[nome].emoji ? opcoes[nome].emoji : ''} **${nome}** ${opcoes[nome].description ? opcoes[nome].description : ''}`) :
             nome));
    
        // enviando msg no privado
        let msg = await message.author.send(embed);
        message.channel.send(`» **${message.author.username}**, olhe seu privado! Mandei meus comandos lá! 📨`);
        message.react(":correto:505155063963058187");
        for (const x in opcoes) 
        if (opcoes[x].emoji) await msg.react(opcoes[x].emoji);
    
         // msg avisando q foi enviado no pv
    
        const filter = (r, u) => r.me && (u.id === message.author.id)
        const collect = msg.createReactionCollector(filter, { time: 60000 });

        collect.on("collect", async ({emoji}) => {
            
            let categoria = Object.entries(opcoes).find(([nome, opt]) => opt.emoji === emoji.name);
            if (categoria) {
                let [nome, opcoes] = categoria;
                let embed = new Discord.RichEmbed()
                    .setDescription(opcoes.description)
                    .setTitle(nome)
                    .setColor(opcoes.color)
                    .addField('Comandos', Object.entries(categorias[nome]).map(([name, command]) => process.env.prefix + name + (command.description ? ' ' + command.description : '')).join('\n '));
                await msg.edit(embed);
            } 
        });

        } catch(err) {
        message.channel.send(`Erro: » **${message.author.username}**, ative suas mensagens diretas para que possa enviar meus comandos.`);
        message.react(":negado:505155029636874250");
        console.log(err);
    }       
    

        return this.name;
    },
        aliases: ['h', 'ajuda'],
        category: "Informações", 
        description: "Informações do bot"
}


