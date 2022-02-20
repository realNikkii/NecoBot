const { Client, Collection } = require('discord.js');
const client = new Client({ intents:['GUILDS', 'GUILD_MESSAGES'] }); // Instatiates new client (bot) with intents

require('dotenv').config(); // Enviroment variables

client.userCooldowns = new Set(); // Set for cooldowns and collection for commands
client.aliases = new Collection();
client.commands = new Collection();

[ 'connectDBHandler', 'commandHandler', 'eventHandler' ].forEach(handler => { // Requires of all handlers
	require(`./handlers/${handler}`)(client);
});

client.login(process.env.TOKEN); // Bot logs into discord using TOKEN from enviroment variables