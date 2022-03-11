const profileModel = require('../../models/profileSchema')
const Discord = require('discord.js')

module.exports = {
    name: 'blackjack',
    description: 'A game of blackjack, score 21 or more than Neco to win!',
    usage: '`b!blackjack <+amount>`',
    cooldown: 0,
    async execute(message, command) {
        // YOUR TOTAL CARD NUMBER: X
        // NECO's TOTAL CARD NUMBER: X (hidden until the game ends)

        // React with emote1 to take a card
        // React with emote2 to finish

        // I guess maybe say what the card was?
        // Number cards: 2-10 
        // King and other cards: 10
        // Ace card: either 1 or 11

        // If drew 21 then win instantly unless Neco also drew 21
        // If drew more than Neco then win
        // If drew less than Neco or went over 21 then lose
        // If drew exactly the same number as Neco then tie

        // Make Neco stop drawing at 21 or more
        // Make Neco draw a maximum of 5 cards and a minimum of 2

        console.log('Going into blackjack.js')
        const betAmount = Number.parseInt(message.content.substring(this.name.length + 3));

		if (!betAmount || Math.sign(betAmount) == -1 || typeof betAmount != 'number') return message.reply(`You use the command like this: ${this.usage} nya!`);
        
        let cardValue = 0
        let necoValue = 0

        const bjMessage = await message.reply(`Your current card value: ${cardValue}\nNeco Arc's card value: (hidden)\n
React to the message with :bangbang: to take another card, or with :white_check_mark: to finish.`)

        console.log(bjMessage)

        bjMessage.react('‼️');
        bjMessage.react('✅');

        const filter = (reaction, user) => {
            return reaction.emoji.name === '‼️' && user.id === message.author.id;
        };
        
        console.log('guh')
        //console.log(reaction.emoji.name)
        //console.log(user.id)
        
        const collector = bjMessage.createReactionCollector({ filter, time: 15000 });

        collector.on('collect', (reaction, user) => {
            console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
        })

        collector.on('end', collected => {
            console.log(`Collected ${collected.size} items`);
        });

        /*bjMessage.awaitReactions({ filter, max: 1, time: 10000}) // The code waits out the time and then does stuff, I need to fix this
            //console.log('helllo')
            .then(collected => {
                //console.log(reaction.emoji.name)
                //console.log(user.id)
                //console.log(message.author.id)
                console.log(collected)
                const reaction = collected.first(); // Apparently collected is empty even though I react, the filter must be broken.

                if (reaction.emoji.name === '‼️') {
                    message.channel.send('add another card')
                    console.log('guh3')
                }
                if (reaction.emoji.name === '✅') {
                    message.channel.send('done')
                    console.log('guh4')
                }
            })
            .catch(collected => {
                message.channel.send('You did not react in time.')
            })
        console.log('finalguh')
        */
        
        /*let gameFinished = false
        do {
            if (userResponse == 1) {
                let card = Math.floor(Math.random() * 13) + 1;

                if (card <= 13){
                    // Face card, jack, queen, and king are always 10 
                    continue
                }
                if (card <= 10){
                    // Number card, from 2 to 10
                    continue
                }
                if (card == 1){
                    // Ace, either 1 or 11 whichever is more favourable
                    continue
                }

            }
            gameFinished = true
        }
        while(gameFinished == false)
        */

    }
}
