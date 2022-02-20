const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'help',
	description: 'Displays all available commands and their description.',
	usage: '`b!help [command]`',
	cooldown: 0,
	execute(message, client) {

		const commandArrayFull = Array.from(client.commands.values());
		const commandArrayNames = new Array(commandArrayFull.length);

		const helpQuery = message.content.slice(7);

		if (!helpQuery) {

			for (let i = 0; i < commandArrayFull.length; ++i) {

				commandArrayNames[i] = commandArrayFull[i].name;

			}

			const helpEmbedNames = new MessageEmbed()
				.setTitle('All Neco-Bot commands')
				.setColor('RANDOM')
				.setDescription('You can use b!help <command> on any existing command to get up-to-date help on it, nya!')
				.addField('Commands', '`' + commandArrayNames.join(', ') + '`', true);

			message.reply({ embeds: [helpEmbedNames] });

		}
		else {

			if (!client.commands.get(helpQuery)) return message.reply('No command under that name, GUBEH!');

			const helpEmbedDescription = new MessageEmbed()
				.setTitle(`Information about ${client.commands.get(helpQuery).name}`)
				.setColor('RANDOM')
				.addFields(
					{ name: 'Description', value: `${client.commands.get(helpQuery).description}` },
					{ name: 'Usage', value: `${client.commands.get(helpQuery).usage}` },
				)
				.setFooter(
					{ text: 'Optional parameters are marked with []\nRequired parameters are marked with <>' },
				);
			message.reply({ embeds: [helpEmbedDescription] });
		}
	},
};
