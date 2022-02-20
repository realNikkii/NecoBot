module.exports = {
	name: 'buru',
	description: 'Simple ping pong command, displays latency',
	usage: '`b!buru`',
	cooldown: 0,
	execute(message, client) {
		console.log('Going into buru.js');
		const currentTime = Date.now();
		const messageCreated = message.createdTimestamp;
		message.reply(`nyu! \n------------------------\n**Bot latency: ${messageCreated - currentTime} ms\nAPI latency: ${Math.round(client.ws.ping)} ms**`);
	},
};