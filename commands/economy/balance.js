const { MessageEmbed } = require('discord.js');
const functions = require('../../functions');

module.exports = {
	name: 'balance',
	description: 'Checks your current balance.',
	usage: '`b!balance [user]`',
	cooldown: 0,
	async execute(message) {
		console.log('Going into balance.js');

		const mentionedUser = message.mentions.members.first();

		if (!mentionedUser) {

			var user = message.author;

		}
		else {

			user = mentionedUser.user;

		}
		const userProfile = await functions.checkDBProfileExists(user.id);

		const balanceEmbed = new MessageEmbed()

			.setColor('RANDOM')
			.setAuthor({ name: `Balance of ${user.username}`, iconURL: `${user.displayAvatarURL()}` })
			.addField('Balance', `Your current balance is: ${userProfile.necoCoins} NecoCoins`, true);

		message.reply({ embeds: [balanceEmbed] });
	},
};
