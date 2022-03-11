// USAGE: index.js is the entrypoint of the program, the Client is instantiated and the Collections / Sets are instantiated
// furthermore the sepetare handlers are required and executed, lastly the bot logs in with the .env Token

const { Client, Collection } = require('discord.js');
const client = new Client({ intents:['GUILDS', 'GUILD_MESSAGES'] });

require('dotenv').config();

client.userCooldowns = new Set(); 
client.aliases = new Collection();
client.commands = new Collection();

[ 'connectDBHandler', 'commandHandler', 'eventHandler' ].forEach(handler => { 
	require(`./handlers/${handler}`)(client);
});

client.login(process.env.TOKEN); 