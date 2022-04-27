/*	╔═══════════════════════╗
 	║	U	S	A	G	E	║
	╠═══════════════════════╣
	║	|	|	|	|	|	║
	╠═══════════════════════╩══════════════════════════════════════════════════════════════════════════════════════════╗
	║ eventHandler.js runs any event callback that it can find in the events folder (rn only on not once events),	   ║
	║ through the ...args it passes any variable the callback gives us i.e. messageEvent -> message object             ║
	╚══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
*/

const fs = require('fs');
const path = require('path');

module.exports = (client, Discord) => {
	console.log('Going into eventCollection.js');
	const loadEventDirs = (dirs) => {

		const eventFiles = fs.readdirSync(path.join(__dirname, `../events/${dirs}`)).filter(file => file.endsWith('.js'));

		for (const file of eventFiles) {

			const event = require(path.join(__dirname, `../events/${dirs}/${file}`));

			client.on(event.name, (...args) => event.execute(...args, client, Discord));

		}

		console.log(`Done with collection for directory ${dirs}`);

	};

	['client', 'guild'].forEach(e => loadEventDirs(e));

};