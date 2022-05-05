const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'avatar',
	description: 'Gets your current Avatar, or if you mention someone, theirs.',
	usage: '`b!avatar [user]`',
	cooldown: 0,
	execute(message) {
		console.log('Going into avatar.js');

		const mentionedUser = message.mentions.members.first();
		let user;

		if (!mentionedUser) user = message.author;
		else user = mentionedUser.user;
		
		
		const profileEmbed = new MessageEmbed()
			.setColor('RANDOM')
			.setTitle('Profile Picture of ' + user.username)
			.setImage(user.displayAvatarURL({ format: 'png' }))
			.setDescription(`[png](${user.displayAvatarURL({ format: 'png' })}) | [jpeg](${user.displayAvatarURL({ format: 'jpeg' })})`);

		message.reply({ embeds: [profileEmbed] });
	},
};