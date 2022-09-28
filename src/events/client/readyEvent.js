const { passCLIArgs } = require ('../../functions.js');

module.exports = {
	name: 'ready',
	once: 'true',
	execute(client) {

		let runType = passCLIArgs().get('runType');

		if (client.noDb) runType = 'noDb';

		switch (runType) {
			
			case 'noDb':

				client.user.setActivity('for database connection...', { type: 'WATCHING'});
				client.user.setStatus('dnd');
				break;

			case 'admin':

				client.user.setActivity(`admin mode!`, { type: 'PLAYING'});
				client.user.setStatus('dnd');
				break;

			default:

				client.user.setActivity(`the great neco war`, { type: 'COMPETING'});
				client.user.setStatus('online');
				break;


		}
	}
};
