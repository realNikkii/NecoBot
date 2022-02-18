const functions = require('../../functions');
const profileModel = require('../../models/profileSchema');

module.exports = {
    name: 'give',
    description: 'Transfer necoCoins to another user.',
    usage: '`b!give <user> <+amount>`',
    cooldown: 0,        
    async execute(message){
        
        const mentionedUser = message.mentions.members.first();
        const giveAmount = Number.parseInt(message.content.substring(message.content.indexOf('>') + 1 ));

        if(!mentionedUser || !giveAmount || Math.sign(giveAmount) == -1 || typeof giveAmount != 'number') return message.reply(`You use the command like this: ${this.usage} nya!`);

        const authorProfile = await profileModel.findOne({ userID: message.author.id });
        
        if(authorProfile.necoCoins < giveAmount) return message.reply(`You don't own that many necoCoins... muda muda...`);
             
        await profileModel.findOneAndUpdate({ //Profile of the message author
             userID: message.author.id,
         },  {
             $inc: {
                 necoCoins: -giveAmount,
             },
         }
         ).catch((err) =>{
             message.channel.send(`A fatal error occured: ${err}`);
         });     
         
        await functions.checkDBProfileExists(mentionedUser.user.id)

        await profileModel.findOneAndUpdate({ //Profile of the mentioned user
             userID: mentionedUser.user.id,
         },  {
             $inc: {
                 necoCoins: giveAmount,
             },
         }
         );

         message.reply(`You gave ${mentionedUser.user.username} ${giveAmount} necoCoins!`);

    }
}