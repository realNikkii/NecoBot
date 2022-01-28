module.exports = {
    name: 'buru',
    description: 'Simple ping pong command',
    event: 'messageCreate',
    execute(message){
        message.reply("nyu!")
        
    }
}