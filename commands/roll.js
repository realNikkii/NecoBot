

module.exports = {
    name: 'roll',
    description: 'Rolls a dice to the users specifications',
    execute(message, args){
        
        const test = message.content.slice('d')

        message.channel.send(test)

    }
}