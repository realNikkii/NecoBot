const {MessageEmbed} = require("discord.js")

module.exports = {
    name: 'avatar',
    description: 'Gets your current Avatar, or if you mention someone, theirs',
    execute(message, args, client){

        console.log('Going into avatar.js')

        const mentionedUser = message.mentions.members.first()

        if(!mentionedUser){
        const profileEmbed = new MessageEmbed()
                .setTitle('Profile Picture of ' + message.author.username)
                .setDescription(message.author.displayAvatarURL())
                .setImage(message.author.displayAvatarURL())
    
            message.reply({ embeds: [profileEmbed]})   
        }
        if(typeof mentionedUser !== 'undefined'){
            const profileEmbed = new MessageEmbed()
                .setTitle('Profile Picture of ' + mentionedUser.user.username)
                .setDescription(mentionedUser.displayAvatarURL())
                .setImage(mentionedUser.displayAvatarURL())

            message.reply({ embeds: [profileEmbed]})   
        }
        
    }
}