require('dotenv').config();

const { MessageEmbed } = require('discord.js');

const Tenor = require('tenorjs').client({
	'Key': process.env.TENOR_KEY,
	'Filter': 'off',
	'Locale': 'en_US',
	'MediaFilter': 'minimal',
	'DateFormat': 'D/MM/YYYY - H:mm:ss A',
});

module.exports = {
	name: 'randgif',
	description: 'Displays a random query gif from Tenor.',
	aliases: 'rgif',
	usage: '`b!randgif <query>`',
	cooldown: 0,
	async execute(message) {
		console.log('Going into randgif.js');

		const query = message.content.substring(message.content.indexOf('f') + 2);

		if (!query) return message.reply('I need something to search for!');

		await Tenor.Search.Random(query, '1').then(Results => {
			Results.forEach(Post => {

				const randGifEmbed = new MessageEmbed()
					.setColor('RANDOM')
					.setDescription(`Random gif for "${query}"`)
					.setImage(Post.media[0].gif.url);

				message.reply({ embeds: [randGifEmbed] });
			});
		});
	},
};
