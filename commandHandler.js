const Discord = require('discord.js')
const fs = require ('fs') //fs (file system) allows me to interact with directories and stuff

require('dotenv').config()

module.exports = (client) =>{ //Makes this whole thing exportable to index.js so it can be used there
    
    console.log('Going into commandHandler') //Just an info message

    prefix = 'b!' //Prefix of the bot, might make a .json for stuff like this and my id
    client.commands = new Discord.Collection() //Makes a collection for my commands

    const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js')) //Pretty much just filters out the files that end with .js in my commands folder and saves em in the const commandFiles
    for(const file of commandFiles){ //for loop to loop through all the files
        const command = require(`./commands/${file}`) //Honestly, I don't really remember what this does??? It is probably important
    
        client.commands.set(command.name, command) //Same here,,,
    }

    client.on('messageCreate', message => { //Callback to when a message is created, pretty much just gives me info bout a message that was last sent
        if(!message.content.startsWith(prefix) || message.author.bot) return //If the mssage does not start with the prefix or if the message was by the bot it just returns
    
        const args = message.content.slice(prefix.length).split(/ +/) //Slices the message by the prefix length so we are left with just the message itself, splits it afterwards, saved into args
        const command = args.shift().toLowerCase() //command saved as the args shifted to lowercase so if you would type the command in all caps it'd be fine
        
        /*
          Alright so how this bottom part works is kind of cool, basically, it firstly checks if the message has a certain command, if it does, it then looks in the commands 
          collection, wether or not a command under that name exists, if so, then it executes that with the given parameters (message, args, client), works surprisingly well,,,

        */
        try{
        if(client.commands.get(command).name === command){ 
            client.commands.get(command).execute(message, args, client, command)
        }
        else{
            console.log('No command under this name')
        }
    }catch(error){
        message.channel.send('Fatal error occured! :warning:')
    }
    })
}