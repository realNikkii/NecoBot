const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders')
const { tenorKey } = require('../../../config.json');

const Tenor = require('tenorjs').client({
	'Key': tenorKey,
	'Filter': 'off',
	'Locale': 'en_US',
	'MediaFilter': 'minimal',
	'DateFormat': 'D/MM/YYYY - H:mm:ss A',
});

module.exports = {
	data: new SlashCommandBuilder()
                .setName('hug')
                .setDescription('Hug someone!')
                .addStringOption(option =>{
                    option.setName('receiver')
                            .setDescription('Person or object or anything you want to hug.')
                            .setRequired(true);
                    return option;
                }),
	execute(interaction) {

		const huggedUser = interaction.options.getString('receiver'); 

		Tenor.Search.Random('anime hug', '1').then(Results => {
			Results.forEach(Post => {
				const hugEmbed = new MessageEmbed()
					.setColor('RANDOM')
					.setDescription(`${interaction.user.username} hugs ${huggedUser}! How wholesome... nya`)
					.setImage(Post.media[0].gif.url);

				interaction.reply({ embeds: [hugEmbed] });
			});
		});
	}
};
