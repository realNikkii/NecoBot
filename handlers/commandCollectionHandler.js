const fs = require('fs')
const path = require('path')
const Discord = require('discord.js')


module.exports = (client) =>{
 
    console.log('Going into commandCollection')

    client.commands = new Discord.Collection() //Makes a collection for my commands

    const commandFiles = fs.readdirSync(path.join(__dirname, '../commands/')).filter(file => file.endsWith('.js')) //Pretty much just filters out the files that end with .js in my commands folder and saves em in the const commandFiles
    for(const file of commandFiles){ //for loop to loop through all the files
        const command = require(path.join(__dirname, `../commands/${file}`)) //Honestly, I don't really remember what this does??? It is probably important
    
        client.commands.set(command.name, command) //Same here,,,
    }
}