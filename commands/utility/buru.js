module.exports = {
	name: 'buru',
	description: 'Simple ping pong command, displays latency',
	usage: '`b!buru`',
	cooldown: 0,
	async execute(message, client) {
		console.log('Going into buru.js');
		const sent = await message.reply({ content: 'Pinging...', fetchReply: true});
		sent.edit(`nyu! \n------------------------\n**Bot latency: ${sent.createdTimestamp - message.createdTimestamp} ms\nAPI latency: ${Math.round(client.ws.ping)} ms**`);

	},
};