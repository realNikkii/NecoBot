const mongoose = require('mongoose');

require('dotenv').config();


module.exports = function DBConnect() {

    console.log('Going into DBConnect.js');
    
    mongoose.connect(process.env.MONGODB_SRV, {
    }).then(() =>{
        console.log('Connected to the necoBotDB');
    })
    .catch((err) =>{
        console.log(err);
    })

}