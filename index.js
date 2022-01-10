const Discord = require("discord.js")

require('dotenv').config()

const client = new Discord.Client({ intents:["GUILDS", "GUILD_MESSAGES"]})

const fs = require ('fs')

client.commands = new Discord.Collection()

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
for(const file of commandFiles){
    const command = require(`./commands/${file}`)

    client.commands.set(command.name, command)
}

client.once('ready', () =>{
    console.log('Nya! Online!')
});

const prefix = 'b!'

client.on('messageCreate', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()
    
    if(command === 'buru'){
        client.commands.get('burunyu').execute(message, args)

    }
    
    if(command === 'shutdown'){
        message.channel.send('Shutting down... nya...').then(() =>{
            client.destroy()
       })
    }

})

client.login(process.env.TOKEN)