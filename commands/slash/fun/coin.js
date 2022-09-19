const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
                .setName('coin')
                .setDescription('Flips a coin.'),
    cooldown: 0,
    async execute(interaction) {

		console.log('Going into coin.js');
		const headOrTails = Math.round(Math.random());

		if (headOrTails === 0) {
			interaction.reply('It landed on... heads! Nya! :coin:');
		} else {

			interaction.reply('It landed on... tails! Nya! :coin:');
		}
	}
};