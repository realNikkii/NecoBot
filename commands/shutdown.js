module.exports = {
    name: 'shutdown',
    description: 'Shuts down the bot',
    execute(message, args, client){
        message.channel.send('Shutting down... nya...').then(() =>{
             client.destroy()
             
        })
    }
}