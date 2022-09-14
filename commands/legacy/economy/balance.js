const { MessageEmbed } = require('discord.js');
const { checkDBProfileExists } = require('../../../functions.js');

module.exports = {
	name: 'balance',
	description: 'Checks your current balance.',
	aliases: 'bal',
	usage: '`b!balance [user]`',
	cooldown: 0,
	dbReq: true,
	async execute(message) {
		console.log('Going into balance.js');

		let user;
		const mentionedUser = message.mentions.members.first();

		if (!mentionedUser) {

			user = message.author;

		}
		else {

			user = mentionedUser.user;

		}
		const userProfile = await checkDBProfileExists(user.id);

		const balanceEmbed = new MessageEmbed()

			.setColor('RANDOM')
			.setAuthor({ name: `Balance of ${user.username}`, iconURL: `${user.displayAvatarURL()}` })
			.addField('Balance', `${user.username}'s current balance is: ${userProfile.necoCoins} NecoCoins`, true);

		message.reply({ embeds: [balanceEmbed] });
	},
};
