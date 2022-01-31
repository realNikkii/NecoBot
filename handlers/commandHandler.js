const fs = require('fs');
const path = require('path');

module.exports = (client, Discord) =>{
 
    console.log('Going into commandCollection');

    const loadCommandDirs = (dirs) =>{ 

        const commandFiles = fs.readdirSync(path.join(__dirname, `../commands/${dirs}`)).filter(file => file.endsWith('.js'));

        for(const file of commandFiles){
            const command = require(path.join(__dirname, `../commands/${dirs}/${file}`)); 

            if(command.name){
                client.commands.set(command.name, command);
            }
            
        }

        console.log(`Done with collection for directory ${dirs}`);
        console.log(client.commands)    
    }
    
    ['admin', 'fun', 'utility'].forEach(e => loadCommandDirs(e));
}