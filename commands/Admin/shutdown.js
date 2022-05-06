require('dotenv').config();

module.exports = {
	name: 'shutdown',
	description: 'Shuts down the bot (admin only!).',
	aliases: 'die',
	usage: '`b!shutdown`',
	cooldown: 0,
	execute(message, client) {
		console.log('Going into shutdown.js');

		if (message.author != process.env.ADMIN) {
			message.reply('Only the owner can use this command, sorry nya.');
		}
		else {
			message.channel.send('Shutting down... nya...').then(() => {
				client.destroy();

			});
		}
	},
};