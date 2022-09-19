const { checkDBProfileExists, passCLIArgs, cooldownCheck, getArguments } = require('../../functions');
const { commandError } = require('../../handlers/errorHandler');
const { admin } = require('../../config.json');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {

        if (interaction.isCommand()) {

            const cliArgs = passCLIArgs();
		    const runType = cliArgs.get('runType');

            if (runType === 'admin' && interaction.user !== admin) return await interaction
                                                                    .reply({content: 'Bot is currently in admin mode!' + 
                                                                    'Try again later... nya...', ephemeral: true});

            if (!client.noDb) await checkDBProfileExists(interaction.user.id);

            const commandObject = client.slashCommands.get(interaction.commandName);

            if (!commandObject) return;

            if (commandObject.dbReq && client.noDb) {

                return await interaction.reply('Bueh! Need a database connection, unfortunately there is none right now... try again later! Nya!');

            }
            // TODO: Refactor coooldownCheck to work with slash commands

            try {
                commandObject.execute(interaction);
            } catch (err) {
                return commandError(interaction, err.message, interaction.commandName)
            }
        }
    }
}