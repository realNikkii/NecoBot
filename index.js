const { Client, Collection } = require('discord.js');
const client = new Client({ intents:['GUILDS', 'GUILD_MESSAGES'] });

require('dotenv').config();

client.userCooldowns = new Set(); 
client.aliases = new Collection();
client.commands = new Collection();
client.slashCommands = new Collection();
client.noDb = false;

[ 'connectDBHandler', 'legacyCommandHandler', 'eventHandler' ].forEach(handler => { 
	require(`./handlers/${handler}`)(client);
});

client.login(process.env.TOKEN); 