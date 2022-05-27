const { getArguments } = require('../../functions');
const mongoose = require('mongoose');

module.exports = {
    name: 'stockmarket',
    description: 'Check the stockmarket or interact with it!',
    aliases: 'market',
    usage: 'b!stockmarket [option]',
    cooldown: 0,
    async execute(message){

    const args = getArguments(message);

    switch(args[1]){

        case 'checkMarket':
            checkMarket(message);
            break;

        default:

    }

    

    function checkMarket(message){

        

    }


    }
}