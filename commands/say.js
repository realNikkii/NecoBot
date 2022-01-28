module.exports = {
    name: 'say',
    description: 'Makes it look like as if the bot said something',
    event: 'messageCreate',
    execute(message, args){
        
        const botSay = message.content.slice(6)
        const channel = message.channel

        message.delete()

        channel.send(botSay)
    }
}