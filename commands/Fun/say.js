module.exports = {
	name: 'say',
	description: 'Makes it look like as if the bot said something.',
	usage: '`b!say <message>`',
	cooldown: 0,
	execute(message) {
		console.log('Going into say.js');

		const botSay = message.content.substring(message.content.indexOf('y') + 2);
		if (!botSay) return message.reply('C\'mon you need to give me something to say, burunyu!');
		const channel = message.channel;

		message.delete();

		channel.send(botSay);
	},
};