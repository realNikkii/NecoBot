const {MessageEmbed} = require("discord.js")

module.exports = {
    name: 'avatar',
    description: 'Gets your current Avatar, might add that it gives the pinged Users Avatar',
    execute(message, args, client){
        const profileEmbed = new MessageEmbed()
                .setTitle('Profile Picture of ' + message.author.username)
                .setDescription(message.author.displayAvatarURL())
                .setImage(message.author.displayAvatarURL())
    
            message.reply({ embeds: [profileEmbed]})   
    }
}