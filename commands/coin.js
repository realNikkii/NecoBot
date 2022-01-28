module.exports ={
    name: 'coin',
    description: 'Flips a coin',
    event: 'messageCreate',
    execute(message, args, clients){
        console.log('Going into coin.js') 
        const headOrTails = Math.round(Math.random())

        if(headOrTails === 0){
            message.channel.send('It landed on... heads! Nya! :coin:')
        }
        else if(headOrTails === 1){
            message.channel.send('It landed on... tails! Nya! :coin:')
        }

    }
}