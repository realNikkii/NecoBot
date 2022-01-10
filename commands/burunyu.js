client.on('message', message => {
    if(!message.content.startWith(prefix) || message.author.bot) return;
    const args = message.content .slice(prefix.length )
})