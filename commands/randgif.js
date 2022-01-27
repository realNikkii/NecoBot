require('dotenv').config()

const Tenor = require("tenorjs").client({
    'Key': process.env.TENOR_KEY,
    'Filter': 'off',
    'Locale': 'en_US',
    'MediaFilter': 'minimal',
    'DateFormat': 'D/MM/YYYY - H:mm:ss A'
})

module.exports ={
    name: 'randgif',
    description: 'Displays a random query gif from Tenor',
    execute(message, args, client){

        console.log("Going into randgif.js")

        const query = message.content.slice(8)
        
        Tenor.Search.Random(query, '1').then(Results =>{
            Results.forEach(Post => {
                message.channel.send(Post.itemurl)
            })
        })
    }
}