const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userID: { type: String, require: true, unique},
    serverID: { type: String, require: true},
    level: { type: Number, default: 1},
    experience: { type: Number},
    necoCoins: { type: Number, default: 500}
})

const model = mongoose.model('ProfileModels', profileSchema);

module.exports = model;