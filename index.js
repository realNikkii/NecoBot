const { Client, Collection } = require('discord.js');
const client = new Client({ intents:['GUILDS', 'GUILD_MESSAGES'] });
const { token } = require('./config.json');

const currentTime = new Date().getTime();

client.userCooldowns = new Set(); 
client.aliases = new Collection();
client.commands = new Collection();
client.slashCommands = new Collection();
client.noDb = false;

[ 'connectDBHandler', 'legacyCommandHandler', 'slashCommandHandler' , 'eventHandler' ].forEach(handler => { 
	require(`./handlers/${handler}`)(client);
});

client.login(token);

console.log(`${Date.now() - currentTime} ms have elapsed, the bot is online.`)
