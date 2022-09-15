const { connect, connection } = require('mongoose');
const { mongoDbSRV } = require('../config.json');

module.exports = async client => {

	console.log('Going into connectDBHandler.js');

	await connect(mongoDbSRV)
	.then(
		console.log('Connected to the database')
	)
	.catch(err => {
		client.noDb = true;
		console.error('Database connection error');
		console.error(err);
	});

	connection.on('error', err => {
		console.error('Unexepcted database error');
		console.error(err);
		client.noDb = true;
	});
};
