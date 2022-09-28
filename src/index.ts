import { Client} from 'discord.js';
import { NecoBotClient } from './classes/necoBotClient';
const discordClient = new Client({ intents:['GUILDS', 'GUILD_MESSAGES'] });
const client = new NecoBotClient(discordClient);
import { token } from './config.json';

console.log(client.noDb);

const currentTime = new Date().getTime();

[ 'connectDBHandler', 'legacyCommandHandler', 'slashCommandHandler' , 'eventHandler' ].forEach(handler => { 
	require(`./handlers/${handler}`)(client);
});

client.discordClient.login(token);

console.log(`${Date.now() - currentTime} ms have elapsed, the bot is online.`)
