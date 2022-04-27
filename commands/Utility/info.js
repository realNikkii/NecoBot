const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'info',
	description: 'Displays info about the message author, if someone is mentioned it shows their info instead.',
	usage: '`b!info [user]`',
	cooldown: 0,
	execute(message) {
		console.log('Going into info.js');

		const user = message.mentions.members.first() || message.author;

		const infoEmbedAuthor = new MessageEmbed()
			.setColor('RANDOM')
			.setTitle(`Info about user ${user.username}`)
			.setThumbnail(user.avatarURL())
			.addFields(
				{ name: 'Username', value: `${user.username}` },
				{ name: 'Tag', value: `${user.tag}` },
				{ name: 'ID', value: `${user.id}` },
				{ name: 'Account creation date', value: `${user.createdAt}` },

			);
		message.reply({ embeds: [infoEmbedAuthor] });
	},
};