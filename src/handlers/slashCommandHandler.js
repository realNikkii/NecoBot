const path = require ('path');
const { readdirSync } = require('fs');

module.exports = client => {

    console.log('Going into slashCommandCollection.js');

	const loadCommandDirs = dirs => {

		const commandFiles = readdirSync(path.join(__dirname, `../commands/slash/${dirs}`)).filter(file => file.endsWith('.js'));

		for (const file of commandFiles) {

			const slashCommand = require(path.join(__dirname, `../commands/slash/${dirs}/${file}`));
            client.slashCommands.set(slashCommand.data.name, slashCommand);
		
        }

		console.log(`Done with collection for directory ${dirs} slash`);
	};

    const getSlashCommandDirectories = source =>
	    readdirSync(source, { withFileTypes: true })
		    .filter(dirent => dirent.isDirectory())
		    .map(dirent => dirent.name);

        getSlashCommandDirectories(path.join(__dirname, '../commands/slash')).forEach(dir => loadCommandDirs(dir));

};
