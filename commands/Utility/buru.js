module.exports = {
	name: 'buru',
	description: 'Simple ping pong command, displays latency',
	usage: '`b!buru`',
	cooldown: 0,
	async execute(message, client) {
		console.log('Going into buru.js');
		const currentTime = Date.now();
		const messageCreated = await message.createdTimestamp;
		message.reply(`nyu! \n------------------------\n**Bot latency: ${currentTime - messageCreated} ms\nAPI latency: ${Math.round(client.ws.ping)} ms**`);
	},
};