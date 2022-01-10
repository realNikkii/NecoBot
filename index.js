const Discord = require("discord.js");

require('dotenv').config()

const Client = new Discord.Client({ intents:["GUILDS", "GUILD_MESSAGES"]})



Client.once('ready', () =>{
    console.log('Nya! Online!')
});

const prefix = 'b!'

Client.on('messageCreate', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()
    
    if(command === 'buru'){
        message.channel.send("nyu!")

    }
    
    if(command === 'shutdown'){
        message.channel.send('Shutting down... nya...').then(() =>{
            Client.destroy()
        })
    }

})

Client.login(process.env.TOKEN)