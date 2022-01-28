const Discord = require("discord.js") //Allows me to use discord.js
const client = new Discord.Client({ intents:["GUILDS", "GUILD_MESSAGES"]}) //Gets me the Discord Client, called just client in my code
const commandHandler = require('./commandHandler')

require('dotenv').config() //Need to import dotenv to use my TOKEN variable

client.once('ready', () =>{

    commandHandler(client) //Goes into commandHandler.js with the Parameter of client
    console.log('Online') //Message that pops up in console to notify me that the bot is sucessfully running
})


client.login(process.env.TOKEN) //Bot logs into Discord with the provided Token found in .env