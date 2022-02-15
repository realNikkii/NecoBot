module.exports = {
    name: 'buru',
    description: 'Simple ping pong command.',
    usage: '`b!buru`',

    execute(message){
        console.log('Going into buru.js');
        message.reply("nyu!");
    }
}