const { passCLIArgs } = require ('../../functions.js');

module.exports = {
	name: 'ready',
	once: 'true',
	execute(client) {

		const cliArgs = passCLIArgs();
		const runType = cliArgs.get('runType');

		if (runType === 'admin') {

			client.user.setActivity(`admin mode!`, { type: 'PLAYING'});
			client.user.setStatus('dnd');

		} else {

			client.user.setActivity(`in the great neco war`, { type: 'COMPETING'});
			client.user.setStatus('online');

		}

		console.log('Online!');
	},
};