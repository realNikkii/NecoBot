const functions = require('../../functions')

require('dotenv').config();

module.exports ={
    name: 'messageCreate',
    once: 'false',
    async execute(message, client){

        if(!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;

        profileData = await functions.checkDBProfileExists(message.author.id);
    
        const args = message.content.slice(process.env.PREFIX.length).split(/ +/); //Slices the message by the prefix length so we are left with just the message itself, splits it afterwards, saved into args
        const command = args.shift().toLowerCase(); //command saved as the args shifted to lowercase so if you would type the command in all caps it'd be fine

        if(!client.commands.get(command)) return;

        const commandOnCooldownID = `${message.author.id}.${command}`; //Unique string consisting of the users discord id and command name, seperated by a string

        if(!client.userCooldowns.has(commandOnCooldownID)){

            client.commands.get(command).execute(message, client, args, command, profileData);
            client.userCooldowns.add(commandOnCooldownID);

            setTimeout(() =>{

                client.userCooldowns.delete(commandOnCooldownID);

            }, client.commands.get(command).cooldown * 1000);

        } else {

            message.reply(`You need to wait ${client.commands.get(command).cooldown} seconds to execute ${client.commands.get(command).name}, bibibi...`);
            
        }
    }
}
