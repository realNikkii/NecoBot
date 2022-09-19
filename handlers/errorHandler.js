const { MessageEmbed } = require('discord.js');

module.exports = {
	
    invalidCommandUsage(commandMessage, commandName, commandUsage){

        const errorEmbed = new MessageEmbed()
            .setColor('RED')
            .setTitle('⚠️ Incorrect command usage! Ueeeeuuueeee...')
            .setDescription(`The command "${commandName}" is used like this:\n${commandUsage}`)

        commandMessage.reply({ embeds: [errorEmbed]})

    },

    commandError(recipient, errorDescription, commandName){

        const errorEmbed = new MessageEmbed()
            .setColor('RED')
            .setTitle(`⚠️ Error while using ${commandName}, nya nya nya.`)
            .setDescription(errorDescription)

        recipient.reply({ embeds: [errorEmbed]});
    }
}