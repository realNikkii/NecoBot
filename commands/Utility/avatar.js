const {MessageEmbed} = require("discord.js")

module.exports = {
    name: 'avatar',
    description: 'Gets your current Avatar, or if you mention someone, theirs',
    event: 'messageCreate',
    execute(message){
        console.log('Going into avatar.js')

        const mentionedUser = message.mentions.members.first()

        if(!mentionedUser){
        const profileEmbed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('Profile Picture of ' + message.author.username)
                .setDescription(message.author.displayAvatarURL())
                .setImage(message.author.displayAvatarURL())
    
            message.reply({ embeds: [profileEmbed]})   
        }
        else if(typeof mentionedUser !== 'undefined'){
            const profileEmbed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('Profile Picture of ' + mentionedUser.user.username)
                .setDescription(mentionedUser.displayAvatarURL())
                .setImage(mentionedUser.displayAvatarURL())

            message.reply({ embeds: [profileEmbed]})   
        }
    }
}