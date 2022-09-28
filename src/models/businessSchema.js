const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
	companyName: { type: String, require: true, unique: true },
	exchangeRate: { type: Number, require: true, default: 5.0 },
	popularity: { type: Number, default: 10 },
});

const model = mongoose.model('BusinessModels', businessSchema);

module.exports = model;