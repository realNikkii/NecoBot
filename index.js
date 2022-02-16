const Discord = require('discord.js');
const client = new Discord.Client( { intents:['GUILDS', 'GUILD_MESSAGES']} ); //Gets me the Discord Client, called just client in my code

require('dotenv').config(); //Need to import dotenv to use my TOKEN variable

    client.userCooldowns = new Set();
    client.commands = new Discord.Collection();

    [ 'connectDBHandler', 'commandHandler', 'eventHandler' ].forEach(handler => {
        require(`./handlers/${handler}`)(client, Discord);
    });

client.login(process.env.TOKEN); //Bot logs into Discord with the provided Token found in .env