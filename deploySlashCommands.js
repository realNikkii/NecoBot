const { REST } = require('@discordjs/rest');
const {
    Routes,
} = require('discord-api-types/v9');
const { token, clientId } = require('./config.json');
const path = require ('path');
const { readdirSync } = require('fs');

    const commandsJson = [];

	const loadCommandDirs = (dirs) => {

		const commandFiles = readdirSync(path.join(__dirname, `./commands/slash/${dirs}`)).filter(file => file.endsWith('.js'));

		for (const file of commandFiles) {

			const slashCommand = require(path.join(__dirname, `./commands/slash/${dirs}/${file}`));
            commandsJson.push(slashCommand.data.toJSON());
        }

		console.log(`Done with collection for directory ${dirs} slash`);
	};

    const getSlashCommandDirectories = source =>
	    readdirSync(source, { withFileTypes: true })
		    .filter(dirent => dirent.isDirectory())
		    .map(dirent => dirent.name);

        getSlashCommandDirectories(path.join(__dirname, './commands/slash')).forEach(dir => loadCommandDirs(dir));

        const rest = new REST({ version: '10' }).setToken(token);

        (async () => {
            try {
                console.log(`Started refreshing ${commandsJson.length} application (/) commands.`);

                const data = await rest.put(
                    Routes.applicationCommands(clientId),
                    { body: commandsJson }
                );
        
                console.log(`Successfully reloaded ${data.length} application (/) commands.`);
            } catch (error) {
                console.error(error);
            }
        })();
