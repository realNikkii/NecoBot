module.exports = {
    name: 'buru',
    description: 'Simple ping pong command',
    event: 'messageCreate',

    execute(message){
        console.log('Going into buru')
        message.reply("nyu!")
    }
}