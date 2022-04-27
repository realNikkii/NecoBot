require('dotenv').config();

module.exports = {
	name: 'say',
	description: 'Makes it look like as if the bot said something.',
	usage: '`b!say <message>`',
	cooldown: 0,
	execute(message) {
		console.log('Going into say.js');

		const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
		const botSay = args[1];

		if (!botSay) return invalidCommandUsage(message, this.name, this.usage);
		const channel = message.channel;

		message.delete();

		channel.send(botSay);
	},
};