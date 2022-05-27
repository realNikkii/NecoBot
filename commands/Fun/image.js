require('dotenv').config();

const { invalidCommandUsage } = require('../../handlers/errorHandler');
const imageSearch = require('image-search-google');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const googleClient = new imageSearch(process.env.CSE_ID, process.env.GOOGLE_KEY);

module.exports = {
	name: 'image',
	description: 'Searches in Google with the input of the user.',
	aliases: 'img',
	usage: '`b!image <query>`',
	cooldown: 0,
	async execute(message, __client, _commandObject, command) {

		console.log('Going into image.js');


		let imageIndex = 0;
		const query = message.content.slice(command.length + 3);

		if (!query) return invalidCommandUsage(message, this.name, this.usage);

		googleClient.search(query).then(async images => {
			// TODO: Add buttons that show the next image on the page, and one to go to a previous image
			if (!images[0]) return message.reply('No search results found!');

			const googleSearchEmbed = new MessageEmbed()
				.setColor('RANDOM')
				.setImage(images[imageIndex].url)
				.setTitle(images[imageIndex].snippet)
				.setDescription(images[imageIndex].context)
				.setFooter({ text: `Images for ${query} | Result ${imageIndex + 1}/10`});

			const googleSearchActionRow = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setCustomId('googleSearchPrevious')
						.setLabel('<')
						.setStyle('PRIMARY'),
					new MessageButton()
						.setCustomId('googleSearchRandom')
						.setLabel('?')
						.setStyle('PRIMARY'),	
					new MessageButton()
						.setCustomId('googleSearchNext')
						.setLabel('>')
						.setStyle('PRIMARY')
				)

			if (googleSearchEmbed.description === images[0].context) googleSearchActionRow.components[0].setDisabled(true);

			const originMessage = await message.reply({fetchReply: true, embeds: [googleSearchEmbed], components: [googleSearchActionRow] });

			console.log(originMessage);

			const searchButtonCollector = originMessage.createMessageComponentCollector({ componentType: 'BUTTON', time: 10000});
			searchButtonCollector.on('collect', async button => {

				searchButtonCollector.resetTimer();

				if (button.user.id !== message.author.id) return;

				switch(button.customId){

					case 'googleSearchPrevious':
							imageIndex--
							break;
	
						case 'googleSearchNext':
							imageIndex++
							break;
							
						case 'googleSearchRandom':
							imageIndex = Math.floor(Math.random() * images.length);
							break;
				}

				googleSearchEmbed
						.setImage(images[imageIndex].url)
						.setTitle(images[imageIndex].snippet)
						.setDescription(images[imageIndex].context)
						.setFooter({ text: `Images for ${query} | Result ${imageIndex + 1}/10`});
	
					if (googleSearchEmbed.image.url !== images[0].url) googleSearchActionRow.components[0].setDisabled(false);
					else googleSearchActionRow.components[0].setDisabled(true);
	
					if (googleSearchEmbed.image.url !== images[images.length - 1].url) googleSearchActionRow.components[2].setDisabled(false);
					else googleSearchActionRow.components[2].setDisabled(true);
	
					await button.deferUpdate();
					await originMessage.edit({ embeds: [googleSearchEmbed], components: [googleSearchActionRow] });

				}, 500)

				searchButtonCollector.on('end', () => {

					googleSearchEmbed.setFooter({ text: `Images for ${query} | Search timed out`});
					googleSearchActionRow.components.forEach(component => component.setDisabled(true));

					originMessage.edit({ embeds: [googleSearchEmbed], components: [googleSearchActionRow]});
				})
		});
	},
};
