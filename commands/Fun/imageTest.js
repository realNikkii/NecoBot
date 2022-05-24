require('dotenv').config();

const { invalidCommandUsage } = require('../../handlers/errorHandler');
const imageSearch = require('image-search-google');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const googleClient = new imageSearch(process.env.CSE_ID, process.env.GOOGLE_KEY);

module.exports = {
	name: 'imageTest',
	description: 'Searches in Google with the input of the user.',
	aliases: 'imgT',
	usage: '`b!image <query>`',
	cooldown: 0,
	async execute(message, client, _commandObject, command) {

		console.log('Going into image.js');


		let imageIndex = 0;
		const query = message.content.slice(command.length + 3);

		if (!query) return invalidCommandUsage(message, this.name, this.usage);

		googleClient.search(query, { page:1 }).then(async images => {
			// TODO: Add buttons that show the next image on the page, and one to go to a previous image
			if (!images[0]) return message.reply('No search results found!');

			const googleSearchEmbed = new MessageEmbed()
				.setColor('RANDOM')
				.setImage(images[imageIndex].url)
				.setTitle(images[imageIndex].snippet)
				.setDescription(images[imageIndex].context)
				.setFooter({ text: `Images for ${query}` });

			const googleSearchActionRow = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setCustomId('googleSearchPrevious')
						.setLabel('<')
						.setStyle('PRIMARY'),
					new MessageButton()
						.setCustomId('googleSearchRandom')
						.setLabel('?')
						.setStyle('SUCCESS'),	
					new MessageButton()
						.setCustomId('googleSearchNext')
						.setLabel('>')
						.setStyle('PRIMARY')
				)

			if (googleSearchEmbed.description === images[0].context) googleSearchActionRow.components[0].setDisabled(true);

			const originMessage = await message.reply({fetchReply: true, embeds: [googleSearchEmbed], components: [googleSearchActionRow] });

			console.log(originMessage);

			client.on('interactionCreate', async interaction => {

				console.log('interactionCreate in image.js');


				switch(interaction.customId) {

					case 'googleSearchPrevious':
						imageIndex--
						break;

					case 'googleSearchNext':
						imageIndex++
						break;
						
					case 'googleSearchRandom':
						imageIndex = Math.floor(Math.random() * images.length + 1);
						break;

				}

				googleSearchEmbed
					.setImage(images[imageIndex].url)
					.setTitle(images[imageIndex].snippet)
					.setDescription(images[imageIndex].context)

				if (googleSearchEmbed.description !== images[0].context) googleSearchActionRow.components[0].setDisabled(false);
				else googleSearchActionRow.components[0].setDisabled(true);

				if (googleSearchEmbed.description !== images[images.length - 1]) googleSearchActionRow.components[2].setDisabled(false);
				else googleSearchActionRow.components[2].setDisabled(true);

				await interaction.deferUpdate();
				originMessage.edit({ embeds: [googleSearchEmbed], components: [googleSearchActionRow] });

			});
		});
	},
};
