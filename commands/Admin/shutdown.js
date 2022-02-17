require('dotenv').config();

module.exports = {
    name: 'shutdown',
    description: 'Shuts down the bot. Can only be used by the user with id set in ADMIN.',
    usage: '`b!shutdown`',
    cooldown: 0,
    execute(message, client){
        console.log('Going into shutdown.js');

        if(message.author != process.env.ADMIN){
            message.reply('Invalid user!');
        }
        else{
        message.channel.send('Shutting down... nya...').then(() =>{
             client.destroy();
         
        })
    }
    }
}