const { CSE_ID, googleKey } = require('../../../config.json');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const imageSearch = require('image-search-google');
const googleClient = new imageSearch(CSE_ID, googleKey);

module.exports = {
	data: new SlashCommandBuilder()
                .setName('image')
                .setDescription('Search for something via google image search.')
                .addStringOption(option =>{
                    option.setName('query')
                            .setDescription('Search query.')
                            .setRequired(true);
                    return option;
                }),
	cooldown: 2,
	async execute(interaction) {

		console.log('Going into image.js');

		let imageIndex = 0;
		const query = interaction.options.getString('query');

		googleClient.search(query).then(async images => {
			// TODO: Add buttons that show the next image on the page, and one to go to a previous image
			if (!images[0]) return interaction.reply({ content: 'No search results found!', ephemeral: true });

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
				);

			if (googleSearchEmbed.description === images[0].context) googleSearchActionRow.components[0].setDisabled(true);

			const timeOutMs = 500;
			const originMessage = await interaction.reply({fetchReply: true, embeds: [googleSearchEmbed], components: [googleSearchActionRow] });
			const searchButtonCollector = originMessage.createMessageComponentCollector({ componentType: 'BUTTON', time: 10000});

			searchButtonCollector.on('collect', async button => {

				searchButtonCollector.resetTimer();

				if (button.user.id !== interaction.user.id) return;

				switch(button.customId){

					case 'googleSearchPrevious':
							imageIndex--;
							break;
	
						case 'googleSearchNext':
							imageIndex++;
							break;
							
						case 'googleSearchRandom':
							imageIndex = Math.floor(Math.random() * images.length);
							break;
				}

				const searchPrevBtn = 0;
				const searchNextBtn = 2;

				googleSearchEmbed
						.setImage(images[imageIndex].url)
						.setTitle(images[imageIndex].snippet)
						.setDescription(images[imageIndex].context)
						.setFooter({ text: `Images for ${query} | Result ${imageIndex + 1}/10`});
	
					if (googleSearchEmbed.image.url !== images[0].url) googleSearchActionRow.components[searchPrevBtn].setDisabled(false);
					else googleSearchActionRow.components[searchPrevBtn].setDisabled(true);
	
					if (googleSearchEmbed.image.url !== images[images.length - 1].url) googleSearchActionRow.components[searchNextBtn].setDisabled(false);
					else googleSearchActionRow.components[searchNextBtn].setDisabled(true);
	
					await button.deferUpdate();
					await originMessage.edit({ embeds: [googleSearchEmbed], components: [googleSearchActionRow] });

				}, timeOutMs);

				searchButtonCollector.on('end', () => {

					googleSearchEmbed.setFooter({ text: `Images for ${query} | Search timed out`});
					googleSearchActionRow.components.forEach(component => component.setDisabled(true));

					originMessage.edit({ embeds: [googleSearchEmbed], components: [googleSearchActionRow]});
				});
		});
	}
};
