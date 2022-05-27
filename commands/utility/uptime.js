module.exports = {
    name: 'uptime',
    description: 'Shows NecoBots uptime',
    usage: '`b!uptime`',
    cooldown: 0,
    execute(message, client) {

        let seconds, minutes, hours, days = 0;
        
        seconds = Math.floor(client.uptime / 1000);
        minutes = Math.floor(seconds / 60);
        hours = Math.floor(minutes / 60);
        days = Math.floor(hours / 24);

        message.reply(`The bot's uptime is: ${days} days, ${hours - days * 24} hours, ${minutes - hours * 60} minutes and ${seconds - minutes * 60} seconds`);

    }
    
}