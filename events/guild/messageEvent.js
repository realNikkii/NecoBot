const { checkDBProfileExists, passCLIArgs, cooldownCheck, getArguments} = require('../../functions');

require('dotenv').config();

module.exports = {
	name: 'messageCreate',
	once: 'false',
	async execute(message, client) {

		if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;

		const cliArgs = passCLIArgs();
		const runType = cliArgs.get('runType');

		if (runType === 'admin') {

			if (message.author != process.env.ADMIN) return message.reply('Bot is currently in admin mode... nya...');
		}

		await checkDBProfileExists(message.author.id);

		const args = getArguments(message); // Slices the message by the prefix length so we are left with just the message itself, splits it afterwards, saved into args
		const commandString = args.shift().toLowerCase(); // command saved as the args shifted to lowercase so if you would type the command in all caps it'd be fine

		const commandObject = client.commands.get(commandString) || client.aliases.get(commandString);

		if (!commandObject) return;

		cooldownCheck(client, message, commandObject, commandString);
	},
};
