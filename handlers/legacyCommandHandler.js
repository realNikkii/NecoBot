const fs = require('fs');
const path = require('path');

module.exports = (client) => {

	console.log('Going into commandCollection');

	const loadCommandDirs = (dirs) => {

		const commandFiles = fs.readdirSync(path.join(__dirname, `../commands/legacy/${dirs}`)).filter(file => file.endsWith('.js'));

		for (const file of commandFiles) {
			const command = require(path.join(__dirname, `../commands/legacy/${dirs}/${file}`));

			if (command.name) {
				client.commands.set(command.name, command);
				if (command.aliases) {
					// Commands have max 1 alias
					client.aliases.set(command.aliases, command); 
				}
			}
		}

		console.log(`Done with collection for directory ${dirs}`);
	};

	const legacyCommandDirectories = source =>
	readdirSync(source, { withFileTypes: true })
	  .filter(dirent => dirent.isDirectory())
	  .map(dirent => dirent.name)

	legacyCommandDirectories.forEach(dir => loadCommandDirs(dir));
};
