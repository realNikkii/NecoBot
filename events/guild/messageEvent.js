const functions = require('../../functions')

module.exports ={
    name: 'messageCreate',
    once: 'false',
    description: 'Callback to when a message is created in a Guild',
    async execute(message, client){

        const prefix = 'b!';

    if(!message.content.startsWith(prefix) || message.author.bot) return;

        profileData = await functions.checkDBProfileExists(message.author.id);
    
        const args = message.content.slice(prefix.length).split(/ +/); //Slices the message by the prefix length so we are left with just the message itself, splits it afterwards, saved into args
        const command = args.shift().toLowerCase(); //command saved as the args shifted to lowercase so if you would type the command in all caps it'd be fine

        if(!client.commands.get(command)) return;

        else{

            client.commands.get(command).execute(message, client, args, command, profileData);

        }
    }
}
