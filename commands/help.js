const { MessageEmbed } = require('discord.js')
const { client } = require('tenorjs')
const commandCollection = require('../handlers/commandCollectionHandler')

module.exports = {
    name: 'help',
    description: 'Lists all commands and their description',
    event: 'messageCreate',
    execute(message, client, command){

        commandCollection(client) // To do: Make this part a little bit better

        const commandArray = Array.from(client.commands.values())
        //client.commands.set(command.name, command) Maybe this will do something


        const secondCommandArray = Array.toString(commandArray.name)
        
        console.log(Array.from(client.commands.values()))

        const helpEmbed = new MessageEmbed()
        
            .addFields({name: 'List of commands', value: `hello`})


            message.reply({ embeds: [helpEmbed]})

    }
} 