module.exports = {
    name: 'rickroll',
    description: 'Sends a pinged User a DM with a Rickroll (hilarious)',
    event: 'messageCreate',
    execute(message, client){
        console.log('Going into rickroll.js');

        const mentionedUser = message.mentions.members.first();

        if (!mentionedUser) return message.reply('You need to @ an user!');
        if (mentionedUser.user.id === client.user.id) return message.reply('You cannot make me rickroll myself! Doridoridoridori~');

        message.channel.send('What a devious rickroll... nya...');

    // Spaghetti code :/
        if (Math.floor(Math.random() * 100) > 5) {

            mentionedUser.user.send('YOU JUST GOT RICKROLLED! :D\n https://www.youtube.com/watch?v=dQw4w9WgXcQ').catch(() =>{
                
                message.reply('GUBEH! I cannot send messages to this user!');

            })
            
        } else {

            message.channel.send('Uh oh... seems like it backfired... nya');
            message.author.send('YOU ACTUALLY GET RICKROLLED INSTEAD!!!\n https://www.youtube.com/watch?v=dQw4w9WgXcQ').catch(()=>{

                message.reply('GUBEH! I cannot send messages to this user!');

            })

        }

    }
}