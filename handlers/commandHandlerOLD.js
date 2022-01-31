module.exports = (client) =>{ //Makes this whole thing exportable to index.js so it can be used there
    
    console.log('Going into commandHandler'); //Just an info message

    prefix = 'b!'; //Prefix of the bot, might make a .json for stuff like this and my id

    client.on('messageCreate', message => { //Callback to when a message is created, pretty much just gives me info bout a message that was last sent
        if(!message.content.startsWith(prefix) || message.author.bot) return; //If the mssage does not start with the prefix or if the message was by the bot it just returns
    
        const args = message.content.slice(prefix.length).split(/ +/); //Slices the message by the prefix length so we are left with just the message itself, splits it afterwards, saved into args
        const command = args.shift().toLowerCase(); //command saved as the args shifted to lowercase so if you would type the command in all caps it'd be fine
        
            if(!client.commands.get(command)) return;

            else
            {
                client.commands.get(command).execute(message, args, client, command);

            };
    })
}