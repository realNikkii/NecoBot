const functions = require('../../functions')

require('dotenv').config();

module.exports ={
    name: 'messageCreate',
    once: 'false',
    async execute(message, client){

        if(!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;

        await functions.checkDBProfileExists(message.author.id);
    
        const args = message.content.slice(process.env.PREFIX.length).split(/ +/); //Slices the message by the prefix length so we are left with just the message itself, splits it afterwards, saved into args
        const command = args.shift().toLowerCase(); //command saved as the args shifted to lowercase so if you would type the command in all caps it'd be fine

        const sentCommand = client.commands.get(command);

        if(!sentCommand) return;

        const commandOnCooldownID = `${message.author.id}.${command}`; //Unique string consisting of the users discord id and command name, seperated by a string

        if(!client.userCooldowns.has(commandOnCooldownID)){

            sentCommand.execute(message, client, args, command);

            if(sentCommand.cooldown > 0){
                
                client.userCooldowns.add(commandOnCooldownID);

                setTimeout(() =>{

                    client.userCooldowns.delete(commandOnCooldownID);

                }, sentCommand.cooldown * 1000);
            }

        } else {

            message.reply(`You need to wait ${sentCommand.cooldown} seconds to execute ${sentCommand.name}, bibibi...`);
            
        }
    }
}
