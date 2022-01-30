module.exports ={
    name: 'rickroll',
    description: 'Sends a pinged User a DM with a Rickroll (hilarious)',
    event: 'messageCreate',
    execute(message, client){
            console.log('Going into rickroll')

            const mentionedUser = message.mentions.members.first()

            if(!mentionedUser) return message.reply('You need to @ an user!')
            if(mentionedUser.id === client.user.id) return message.reply ('You cannot make me rickroll myself! Doridoridoridori~')

            message.channel.send('What a devious rickroll... nya...')

            client.users.fetch(mentionedUser.user.id).then(user => {
                user.send('YOU JUST GOT RICKROLLED! :D')
                user.send('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
            })
    }    
}