const functions = require('../../functions');
const profileModel = require('../../models/profileSchema');
const { invalidCommandUsage } = require('../../handlers/errorHandler')

module.exports = {
	name: 'give',
	description: 'Transfer necoCoins to another user.',
	usage: '`b!give <user> <+amount>`',
	cooldown: 0,
	dbReq: true,
	async execute(message) {

		const mentionedUser = message.mentions.members.first();
		const giveAmount = Number.parseInt(message.content.substring(message.content.indexOf('>') + 1));

		if (!mentionedUser || !giveAmount || Math.sign(giveAmount) == -1 || typeof giveAmount != 'number') return invalidCommandUsage(message, this.name, this.usage);

		const authorProfile = await profileModel.findOne({ userID: message.author.id });

		if (authorProfile.necoCoins < giveAmount) return message.reply('You don\'t own that many necoCoins... muda muda...');
		// Profile of the message author
		await profileModel.findOneAndUpdate({
			userID: message.author.id,
		}, {
			$inc: {
				necoCoins: -giveAmount,
			},
		},
		).catch((err) => {
			message.channel.send(`A fatal error occured: ${err}`);
		});

		await functions.checkDBProfileExists(mentionedUser.user.id);
		// Profile of the mentioned user
		await profileModel.findOneAndUpdate({
			userID: mentionedUser.user.id,
		}, {
			$inc: {
				necoCoins: giveAmount,
			},
		},
		);

		message.reply(`You gave ${mentionedUser.user.username} ${giveAmount} necoCoins!`);

	},
};