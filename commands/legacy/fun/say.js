const { invalidCommandUsage } = require('../../../handlers/errorHandler');

module.exports = {
	name: 'say',
	description: 'Makes it look like as if the bot said something.',
	usage: '`b!say <message>`',
	cooldown: 0,
	execute(message) {

		console.log('Going into say.js');

		const messageStartIndex = 3;
		const botSay = message.content.slice(message.content.indexOf(this.name) + messageStartIndex);

		if (!botSay) return invalidCommandUsage(message, this.name, this.usage);
		const channel = message.channel;

		message.delete();

		channel.send(botSay);
	}
};
