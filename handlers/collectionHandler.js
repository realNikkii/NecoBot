const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');

module.exports = (client) =>{
 
    console.log('Going into commandCollection');

    client.commands = new Discord.Collection(); //Makes a collection for my commands
    client.events = new Discord.Collection();

    const loadDirs = (dirs) =>{ // Stuff stops here, why?

        const commandFiles = fs.readdirSync(path.join(__dirname, `../commands/${dirs}`)).filter(file => file.endsWith('.js'));

        for(const file of commandFiles){
            const command = require(path.join(__dirname, `../commands/${dirs}/${file}`)); 

            if(command.name){
                client.commands.set(command.name, command);
            }
            
        }

        console.log(`Done with collection for directory ${dirs}`);
     
    }

    ['Admin', 'Fun', 'Utility'].forEach(e => loadDirs(e));

}