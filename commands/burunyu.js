module.exports = {
    name: 'burunyu',
    description: 'Simple ping pong command',
    event: 'messageCreate',
    execute(message, args, client){
        message.reply("nyu!")
        
    }
}