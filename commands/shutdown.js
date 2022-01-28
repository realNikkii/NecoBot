require('dotenv').config()

module.exports = {
    name: 'shutdown',
    description: 'Shuts down the bot',
    event: 'messageCreate',
    execute(message, args, client){
        console.log('Going into shutdown.js')

        if(message.author != process.env.ADMIN){
            message.reply('Invalid user!')
        }
        else{
        message.channel.send('Shutting down... nya...').then(() =>{
             client.destroy()
         
        })
    }
    }
}