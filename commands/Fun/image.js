require('dotenv').config();

const imageSearch = require('image-search-google');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

const googleClient = new imageSearch(process.env.CSE_ID, process.env.GOOGLE_KEY);
const options = {page:1}

module.exports = {
    name: 'image',
    description: 'Searches in Google with the input of the user',
    event: 'messageCreate',
    execute(message){
        console.log('Going into image.js');
        const query = message.content.slice(8);
        if(!query) return message.reply('You need to give me something to search for!');

        console.log(query);

        googleClient.search(query, options).then(images => {
            //TODO: Add buttons that show the next image on the page, and one to go to a previous image
            if(!images[0]) return message.reply('No search results found!');
            console.log(images[0]);
            const googleSearchEmbed = new MessageEmbed()
                .setColor('RANDOM')
                .setImage(images[0].url)
                .setTitle(images[0].snippet)
                .setDescription(images[0].context)

            message.reply({ embeds: [googleSearchEmbed] });
        })
    }
}