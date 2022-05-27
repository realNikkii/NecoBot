require('dotenv').config();

module.exports = {
    name: 'restart',
    description: 'Restarts the bot (admin only!).',
    aliases:'res',
    usage:'`b!restart`',
    cooldown: 0,
    admin: true,
    execute(message, client) {

        message.reply('Client is restarting...').then(async () => {
            await client.destroy();
            await client.login(process.env.TOKEN);
            message.reply('Restart successful!');
        });

    }

}