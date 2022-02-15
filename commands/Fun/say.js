module.exports = {
    name: 'say',
    description: 'Makes it look like as if the bot said something.',
    usage: '`b!say <message>`',
    execute(message){
        console.log('Going into say');
        
        const botSay = message.content.slice(6);
        if(!botSay) return message.reply(`C'mon you need to give me something to say, burunyu!`)
        const channel = message.channel;

        message.delete();

        channel.send(botSay)
    }
}