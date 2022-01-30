const { MessageEmbed } = require('discord.js')

module.exports ={
    name: 'info',
    description: 'Displays info about the message author, if someone is mentioned it shows their info instead',
    event: 'messageCreate',
    execute(message){
        console.log('Going into info')

        const mentionedUser = message.mentions.members.first()

        if(!mentionedUser){
            
            infoEmbedAuthor = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`Info about user ${message.author.username}`)
            .setThumbnail(message.author.avatarURL())
            .addFields(
                {name: 'Username', value: `${message.author.username}`},
                {name: 'Tag', value: `${message.author.tag}`},
                {name: 'ID', value: `${message.author.id}`},
                {name: 'Account creation date', value: `${message.author.createdAt}`}

            )
            message.reply({embeds: [infoEmbedAuthor]})
        }
        else if(typeof mentionedUser !== 'undefined'){
            infoEmbedMention = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`Info about user ${mentionedUser.user.username}`)
            .setThumbnail(mentionedUser.user.avatarURL())
            .addFields(
                {name: 'Username', value: `${mentionedUser.user.username}`},
                {name: 'Tag', value: `${mentionedUser.user.tag}`},
                {name: 'ID', value: `${mentionedUser.id}`},
                {name: 'Account creation date', value: `${mentionedUser.user.createdAt}`}

            )

            message.reply({embeds: [infoEmbedMention]})

        }
    }
}