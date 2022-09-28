const { tenorKey } = require('../../../config.json');
const { SlashCommandBuilder } = require('@discordjs/builders');

const Tenor = require('tenorjs').client({
	'Key': tenorKey,
	'Filter': 'off',
	'Locale': 'en_US',
	'MediaFilter': 'minimal',
	'DateFormat': 'D/MM/YYYY - H:mm:ss A'
});

module.exports = {
	data: new SlashCommandBuilder()
                .setName('necogif')
                .setDescription('A random gif of me! Very humbling...'),
	async execute(interaction) {
		console.log('Going into necogif.js');

		Tenor.Search.Random('neco arc', '1').then(Results => {
			Results.forEach(Post => {
				interaction.reply(Post.itemurl);
			});
		});
	}
};
