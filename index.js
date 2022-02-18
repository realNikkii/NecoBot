const Discord = require('discord.js'); 
const client = new Discord.Client( { intents:['GUILDS', 'GUILD_MESSAGES']} ); //Instatiates new client (bot) with intents

require('dotenv').config(); //Enviroment variables

    client.userCooldowns = new Set();           //Set for cooldowns and collection for commands
    client.commands = new Discord.Collection();

    [ 'connectDBHandler', 'commandHandler', 'eventHandler' ].forEach(handler => { //Requires of all handlers
        require(`./handlers/${handler}`)(client, Discord);
    });

client.login(process.env.TOKEN); //Bot logs into discord using TOKEN from enviroment variables