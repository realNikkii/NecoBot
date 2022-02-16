require('dotenv').config();

module.exports = {
    name: 'rickroll',
    description: 'Sends a pinged User a DM with a Rickroll (hilarious).',
    usage: '`b!rickroll <user>`',
    cooldown: 0,
    async execute(message, client){
        console.log('Going into rickroll.js');

        const mentionedUser = message.mentions.members.first();

        if (!mentionedUser) return message.reply('You need to @ an user!');
        if (mentionedUser.user.id === client.user.id) return message.reply('You cannot make me rickroll myself! Doridoridoridori~');

    try{
        if (Math.floor(Math.random() * 100) > 5) {
          await mentionedUser.user.send('YOU JUST GOT RICKROLLED! :D\n https://www.youtube.com/watch?v=dQw4w9WgXcQ')
            message.channel.send('What a devious rickroll... nya...');
                
        } else {

          
          await message.author.send('YOU ACTUALLY GET RICKROLLED INSTEAD!!!\n https://www.youtube.com/watch?v=dQw4w9WgXcQ')
            message.channel.send('Uh oh... seems like it backfired... nya');
        }

    }catch(DiscordAPIError) { message.reply('GUBEH! I cannot send messages to this user!'); }

    }
}