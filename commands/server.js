
const {MessageEmbed} = require('discord.js')

module.exports ={
    name: 'server',
    description: 'Returns various infos about the Guild',
    event: 'messageCreate',
    execute(message, args, client){
        console.log('Going into server.js')
        
        let guild = message.guild
        if(guild.available){

        description = guild.description

        if(guild.description === null){
            description = 'No description set'
        }
            const serverEmbed = new MessageEmbed()
             .setColor('RANDOM')
             .setTitle(`Infos about ${guild.name}`)   
             .setThumbnail(guild.iconURL())
             .addFields(
                 {name: 'Members', value: `${guild.memberCount}`},
                 {name: 'Description', value: `${description}`},
                 {name: 'Server ID', value: `${guild.id}`},
                 {name: 'Partner Status', value: `${guild.partnered}`},
                 {name: 'Created at', value: `${guild.createdAt}`}
             )
                message.reply({embeds: [serverEmbed]})
           }
           else{
               console.log('Cannot get response from server!')
           }
        }
}