const { MessageAttachment } = require('discord.js');
const { loadImage, createCanvas} = require('canvas');
const { invalidCommandUsage } = require('../../handlers/errorHandler.js')

module.exports = {
    name: 'text',
    description: 'Add text to an image',
    usage: '`b!text "<text in quotation marks>" <image url/embed>`',
    cooldown: 0,
    async execute(message){

        const imageText = message.content.substring(
            message.content.indexOf('"') + 1,
            message.content.lastIndexOf('"')
        );

        if(!imageText) return invalidCommandUsage(message, this.name, this.usage);

        console.log(imageText);

        if(!message.content.substring(this.name.length + 3 + imageText.length + 2)) {

            if(message.attachments.first()){

                var sentImage = await loadImage(message.attachments.first().url);

            } else {

                return invalidCommandUsage(message, this.name, this.usage);

            }

        } else {

            var sentImage = await loadImage(message.content.substring(this.name.length + 3 + imageText.length + 2));

        }

        const canvas = createCanvas(sentImage.width, sentImage.height); 
        const ctx = canvas.getContext('2d');

        ctx.drawImage(sentImage, 0, 0, canvas.width, canvas.height);
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        ctx.font = this.evaluateFontSize(ctx, canvas, imageText)
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'center';

        ctx.fillText(imageText, canvas.width / 2 , canvas.height / 2);

        const canvasAttachment = new MessageAttachment(canvas.toBuffer(), 'textImage.png')
        
        message.channel.send({ files: [canvasAttachment] });
    },

    evaluateFontSize(context, canvas, text){

        let evaluatedFontSize = 120;

        do {

            context.font = `${evaluatedFontSize -= 10}px sans-serif`

        } while (context.measureText(text).width > canvas.width)

        return context.font
    }
}