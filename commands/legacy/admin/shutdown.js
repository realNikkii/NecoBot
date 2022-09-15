const { disconnect } = require('mongoose');

module.exports = {
	name: 'shutdown',
	description: 'Shuts down the bot (admin only!).',
	aliases: 'die',
	usage: '`b!shutdown`',
	cooldown: 0,
	admin: true,
	execute(message, client) {
		console.log('Going into shutdown.js');

			message.channel.send('Shutting down... nya...').then(async () => {
				await disconnect();
				console.info('Disconnected from necoBotDB, shutting down')
				client.destroy();

			});
	}
}
