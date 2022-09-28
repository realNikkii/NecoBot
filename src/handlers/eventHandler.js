const { readdirSync } = require('fs');
const path = require('path');

module.exports = (client, Discord) => {
	console.log('Going into eventCollection.js');
	const loadEventDirs = (dirs) => {

		const eventFiles = readdirSync(path.join(__dirname, `../events/${dirs}`)).filter(file => file.endsWith('.js'));

		for (const file of eventFiles) {

			const event = require(path.join(__dirname, `../events/${dirs}/${file}`));

			client.on(event.name, (...args) => event.execute(...args, client, Discord));

		}

		console.log(`Done with collection for directory ${dirs}`);

	};

	const getEventDirectories = source =>
	readdirSync(source, { withFileTypes: true })
		.filter(dirent => dirent.isDirectory())
		.map(dirent => dirent.name);

	getEventDirectories(path.join(__dirname, `../events`)).forEach(d => loadEventDirs(d));

};
