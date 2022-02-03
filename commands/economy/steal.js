const profileModel = require('../../models/profileSchema');

module.exports = {
    name: 'steal',
    description: 'Steal from random civillians, how fun!',
    event: 'messageCreate',
    async execute(message){

        const stolenMoney = Math.floor(Math.random() * 500) + 1;
        
        const response = await profileModel.findOneAndUpdate({
            userID: message.author.id,
        },  {
            $inc: {
                necoCoins: stolenMoney,
            },
        }
        );
        return message.reply(`${message.author.username} snatched coins from a random Neco-Arc and gained ${stolenMoney} NecoCoins... how mischevious nya nya nya!`);
    }
}