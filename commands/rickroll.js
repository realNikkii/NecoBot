module.exports ={
    name: 'rickroll',
    description: 'Sends a pinged User a DM with a Rickroll (hilarious)',
    execute(message, args, client){
        
            const mentionedUser = message.mentions.members.first()

            if(!mentionedUser) return message.reply('You need to @ an user!')

            message.channel.send('What a devious rickroll... nya...')

            client.users.fetch(mentionedUser.user.id).then(user => {
                user.send('YOU JUST GOT RICKROLLED')
                user.send('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
            })
    }    
}