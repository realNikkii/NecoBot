
const {MessageEmbed} = require('discord.js')

module.exports ={
    name: 'server',
    description: 'Returns various infos about the Guild',
    execute(message, args, client){
        let guild = message.guild
       if(guild.available){
            const serverEmbed = new MessageEmbed()
             .setColor('RANDOM')
             .setTitle(`Infos about ${guild.name}`)   
             .setImage(guild.iconURL())
             .addFields(
                 {name: 'Members', value: `${guild.memberCount}`},
                 {name: 'Description', value: `${guild.descrpition}`},
                 {name: 'Partner Status', value: `${guild.partnered}`},
                 {name: 'Created at', value: `${guild.createdAt}`}
             )
                message.reply({embeds: [serverEmbed]})
           }
        }
}