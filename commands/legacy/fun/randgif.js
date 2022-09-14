require('dotenv').config();
const { invalidCommandUsage } = require('../../../handlers/errorHandler')

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
	async execute(message, _client, _commandObject, command) {
		console.log('Going into randgif.js');

		const query = message.content.slice(command.length + 3);

		if (!query) return invalidCommandUsage(message, this.name, this.usage);

		await Tenor.Search.Random(query, '1').then(Results => {
			Results.forEach(post => {

				const randGifEmbed = new MessageEmbed()
					.setColor('RANDOM')
					.setDescription(`Random gif for "${query}"`)
					.setImage(post.media[0].gif.url);

				message.reply({ embeds: [randGifEmbed] });
			});
		});
	},
};
