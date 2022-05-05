require('dotenv').config();

const { MessageEmbed } = require('discord.js');
const { getArguments } = require('../../functions')

const Tenor = require('tenorjs').client({
	'Key': process.env.TENOR_KEY,
	'Filter': 'off',
	'Locale': 'en_US',
	'MediaFilter': 'minimal',
	'DateFormat': 'D/MM/YYYY - H:mm:ss A',
});

module.exports = {
	name: 'hug',
	description: 'Hug someone!',
	usage: '`b!hug <user>`',
	cooldown: 0,
	execute(message) {

		const args = getArguments(message);

		const huggedUser = args[1];

		if (!huggedUser) return message.reply('What, you wanna hug yourself, nya?');

		Tenor.Search.Random('anime hug', '1').then(Results => {
			Results.forEach(Post => {
				const hugEmbed = new MessageEmbed()
					.setColor('RANDOM')
					.setDescription(`${message.author.username} hugs ${huggedUser}! How wholesome... nya`)
					.setImage(Post.media[0].gif.url);

				message.channel.send({ embeds: [hugEmbed] });
			});
		});
	},
};