module.exports = {
	name: 'coin',
	description: 'Flips a coin.',
	usage: '`b!coin`',
	cooldown: 0,
	execute(message) {
		console.log('Going into coin.js');
		const headOrTails = Math.round(Math.random());

		if (headOrTails === 0) {
			message.channel.send('It landed on... heads! Nya! :coin:');
		} else {

			message.channel.send('It landed on... tails! Nya! :coin:');
		}
	}
};