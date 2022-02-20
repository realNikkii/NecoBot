const functions = require('../../functions');

require('dotenv').config();

module.exports = {
	name: 'messageCreate',
	once: 'false',
	async execute(message, client) {

		if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;

		await functions.checkDBProfileExists(message.author.id);

		const args = message.content.slice(process.env.PREFIX.length).split(/ +/); // Slices the message by the prefix length so we are left with just the message itself, splits it afterwards, saved into args
		const commandString = args.shift().toLowerCase(); // command saved as the args shifted to lowercase so if you would type the command in all caps it'd be fine

		const commandObject = client.commands.get(commandString) || client.aliases.get(commandString);

		if (!commandObject) return;

		functions.cooldownCheck(client, message, commandObject, commandString);
	},
};
