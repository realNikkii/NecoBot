module.exports = {
    name: 'buru',
    description: 'Simple ping pong command',
    event: 'messageCreate',

    execute(message){
        console.log('Going into buru.js');
        message.reply("nyu!");
    }
}