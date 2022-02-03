const {MessageEmbed} = require("discord.js")

module.exports = {
    name: 'avatar',
    description: 'Gets your current Avatar, or if you mention someone, theirs',
    event: 'messageCreate',
    execute(message){
        console.log('Going into avatar.js');

        const mentionedUser = message.mentions.members.first();

        if(!mentionedUser){

            user = message.author;

        }else{
            user = mentionedUser.user
        }
        const profileEmbed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('Profile Picture of ' + user.username)
                .setDescription(user.displayAvatarURL())
                .setImage(user.displayAvatarURL())
    
            message.reply({ embeds: [profileEmbed]});   
    }
}