const Discord = require("discord.js"); //Allows me to use discord.js
const client = new Discord.Client({ intents:["GUILDS", "GUILD_MESSAGES"]}); //Gets me the Discord Client, called just client in my code

require('dotenv').config(); //Need to import dotenv to use my TOKEN variable

    client.commands = new Discord.Collection(); //Makes a collection for my commands
    
    [ 'connectDBHandler', 'commandHandler', 'eventHandler' ].forEach(handler =>{ //Removed connectDBHandler because I can't access it while not home :(
        require(`./handlers/${handler}`)(client, Discord);
    });

client.login(process.env.TOKEN); //Bot logs into Discord with the provided Token found in .env