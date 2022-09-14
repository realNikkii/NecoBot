const { connect, connection } = require('mongoose');

require('dotenv').config();

module.exports = async (client) => {

	console.log('Going into connectDBHandler.js');

	await connect(process.env.MONGODB_SRV, {bufferCommands: false})
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
		console.error(err)
		client.noDb = true;
	});

}