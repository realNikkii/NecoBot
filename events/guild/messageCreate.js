const { checkDBProfileExists, passCLIArgs, cooldownCheck, getArguments } = require('../../functions');
const { commandError } = require('../../handlers/errorHandler');
const { prefix, admin } = require('../../config.json');

module.exports = {
	name: 'messageCreate',
	once: false,
	async execute(message, client) {

		if (!message.content.startsWith(prefix) || message.author.bot) return;

		const cliArgs = passCLIArgs();
		const runType = cliArgs.get('runType');

		if (runType === 'admin' && message.author !== admin) return message.reply('Bot is currently in admin mode... nya...');
		

		if (!client.noDb) await checkDBProfileExists(message.author.id);

		// Slices the message by the prefix length so we are left with just the message itself, splits it afterwards, saved into args
		const args = getArguments(message); 
		// Command saved as the args shifted to lowercase so if you would type the command in all caps it'd be fine
		const commandString = args.shift().toLowerCase(); 

		const commandObject = client.commands.get(commandString) || client.aliases.get(commandString);

		if (!commandObject) return;

		if (commandObject.dbReq && client.noDb) {

			return commandError(message, 'Bueh! Need a database connection, unfortunately there is none right now... try again later! Nya!' , commandObject.name);
		
		}

		if (commandObject.admin === true && message.author.id !== admin) {

			return message.reply('This command is admin only!');

		}

		cooldownCheck(client, message, commandObject, commandString);
	}
};