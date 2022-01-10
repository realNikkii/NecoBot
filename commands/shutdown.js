

// DOES NOT WORK YET!!!

module.exports = {
    name: 'shutdown',
    description: 'Shuts down the bot',
    execute(message, args){
        message.channel.send('Shutting down... nya...').then(() =>{
             client.destroy()
             
        })
    }
}