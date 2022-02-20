require('dotenv').config();

const imageSearch = require('image-search-google');
const { MessageEmbed } = require('discord.js');

const googleClient = new imageSearch(process.env.CSE_ID, process.env.GOOGLE_KEY);


module.exports = {
	name: 'image',
	description: 'Searches in Google with the input of the user.',
	aliases: 'img',
	usage: '`b!image <query>`',
	cooldown: 0,
	async execute(message, client, commandObject, command) {

		console.log('Going into image.js');

		const query = message.content.slice(command.length + 3);

		if (!query) return message.reply('You need to give me something to search for!');

		googleClient.search(query, { page:1 }).then(images => {
			// TODO: Add buttons that show the next image on the page, and one to go to a previous image
			if (!images[0]) return message.reply('No search results found!');

			const googleSearchEmbed = new MessageEmbed()
				.setColor('RANDOM')
				.setImage(images[0].url)
				.setTitle(images[0].snippet)
				.setDescription(images[0].context)
				.setFooter({ text: `Images for ${query}` });

			message.reply({ embeds: [googleSearchEmbed] });
		});
	},
};
