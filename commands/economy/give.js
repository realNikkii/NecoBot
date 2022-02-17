module.exports = {
    name: 'give',
    description: 'Transfer necoCoins to another user.',
    usage: '`b!give <user> <amount>`',
    cooldown: 0,
    async execute(message){

        const mentionedUser = message.mentions.members.first();
        const giveAmount = message.content.slice(30);

        if(!mentionedUser || !giveAmount) return message.reply(`You use the command like this: ${this.usage} nya!`);

        message.reply(`User: ${mentionedUser} Amount: ${giveAmount}`)        

    }
}