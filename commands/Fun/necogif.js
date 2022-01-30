require('dotenv').config()

const Tenor = require("tenorjs").client({
    'Key': process.env.TENOR_KEY,
    'Filter': 'off',
    'Locale': 'en_US',
    'MediaFilter': 'minimal',
    'DateFormat': 'D/MM/YYYY - H:mm:ss A'
})

module.exports ={
    name: 'necogif',
    description: 'Displays a random Neco-Arc related gif from Tenor',
    event: 'messageCreate',

    execute(message){
        console.log('Going into necogif')

        Tenor.Search.Random('neco arc', '1').then(Results =>{
            Results.forEach(Post => {
                message.channel.send(Post.itemurl)
            })
        })
    }
}