module.exports = {
    name: 'burunyu',
    description: 'Simple test command',
    execute(message, args, client){
        message.channel.send("nyu!")
    }
}