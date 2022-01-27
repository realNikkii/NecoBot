require('dotenv').config()

module.exports = {
    name: 'shutdown',
    description: 'Shuts down the bot',
    execute(message, args, client){
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