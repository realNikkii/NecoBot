const { MessageEmbed } = require('discord.js')

module.exports ={
    name: 'info',
    description: 'Displays info about the message author, if someone is mentioned it shows their info instead',
    event: 'messageCreate',
    execute(message){
        console.log('Going into info.js');

        const mentionedUser = message.mentions.members.first();

        if(!mentionedUser){

            user = message.author;

        }else{
            user = mentionedUser.user
        }
            
            infoEmbedAuthor = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`Info about user ${user.username}`)
            .setThumbnail(user.avatarURL())
            .addFields(
                {name: 'Username', value: `${user.username}`},
                {name: 'Tag', value: `${user.tag}`},
                {name: 'ID', value: `${user.id}`},
                {name: 'Account creation date', value: `${user.createdAt}`}

            )
            message.reply({embeds: [infoEmbedAuthor]});
    }
}