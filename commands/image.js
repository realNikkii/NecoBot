require('dotenv').config()

const imageSearch = require('image-search-google')
const {MessageEmbed} = require('discord.js')

const googleClient = new imageSearch(process.env.CSE_ID, process.env.GOOGLE_KEY)
const options = {page:1}

module.exports = {
    name: 'google',
    description: 'Searches in Google with the input of the user',
    execute(message, args, client, command){

        const query = args.slice(command.length)
        client.search(query, options).then(images => {
            message.channel.send(item.link)
        })

    }
}