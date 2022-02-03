const { MessageEmbed } = require('discord.js');
const functions = require('../../functions');

module.exports = {
    name: 'balance',
    description: 'Checks your current balance',
    event: 'messageCreate',
    async execute(message){
        console.log('Going into balance.js');

        const mentionedUser = message.mentions.members.first();

        if(!mentionedUser){

            user = message.author;

        }else{

            user = mentionedUser.user;

        }
            userProfile = await functions.checkDBProfileExists(user.id);

            const balanceEmbed = new MessageEmbed()

            .setColor('RANDOM')
            .setAuthor({ name: `Balance of ${user.username}`, iconURL: `${user.displayAvatarURL()}`})
            .addField('Balance', `Your current balance is: ${userProfile.necoCoins} NecoCoins`, true)

            message.reply({ embeds: [balanceEmbed] });
    }
}
