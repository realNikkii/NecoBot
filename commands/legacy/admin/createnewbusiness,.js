const profileModel = require('../../../models/businessSchema');

require('dotenv').config();

module.exports = {
    name: 'createnewbusiness',
    description: 'Creates a new stockmarket business (admin only!)',
    usage: 'b!createnewbusiness "<name>" <level> <exchange rate> <popularity>',
    cooldown: 0,
    admin: true,
    async execute(message){

        console.log('Going into createnewbusiness.js');

        const args = message.content.substring('"').slice(process.env.PREFIX.length).trim().split(/ +/g);


        const companyName = message.content.substring(
            message.content.indexOf('"') + 1,
            message.content.lastIndexOf('"')
        );
    
            const profile = await profileModel.create({
                companyName: companyName,
                exchangeRate: args[0],
                popularity: args[1],

            });
            profile.save();
            message.reply(`Successfully created business ${companyName}`);
    }
}