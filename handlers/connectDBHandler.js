/*	╔═══════════════════════╗
 	║	U	S	A	G	E	║
	╠═══════════════════════╣
	║	|	|	|	|	|	║
	╠═══════════════════════╩══════════════════════════════════════════════════════════════════════════════════════════╗
	║ Connects to the MongoDB database which necoBot uses, it attempts to connect to the database, if it fails then it ║
	║ gives out the error message, if it succeeds then it will say it connected in the console output.				   ║
	╚══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
*/
const { connect } = require('mongoose');

require('dotenv').config();

module.exports = () => {

	console.log('Going into connectDBHandler.js');

	connect(process.env.MONGODB_SRV, {
	}).then(() => {
		console.log('Connected to the necoBotDB');
	})
		.catch((err) => {
			console.log(err);
		});


};