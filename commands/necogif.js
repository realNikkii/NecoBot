require('dotenv').config()
const { DiscordAPIError } = require('discord.js');
const {MessageEmbed} = require("discord.js")
const Tenor = require("tenorjs").client({
    'Key': process.env.TENOR_KEY,
    'Filter': 'off',
    'Locale': 'en_US',
    'MediaFilter': 'minimal',
    'DateFormat': 'D/MM/YYYY - H:mm:ss A'
})

module.exports ={
    name: 'necogif',
    description: 'Displays a random Neco-Arc related gif from Tenor',
    execute(message, args, client){
        const test = Tenor.Search.Random('neco arc', '1').results[1]
        message.channel.send(test)
    }
}