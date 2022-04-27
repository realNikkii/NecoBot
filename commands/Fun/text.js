require('dotenv').config();

const { MessageAttachment } = require('discord.js');
const { loadImage, createCanvas } = require('canvas');
const { invalidCommandUsage } = require('../../handlers/errorHandler.js')

module.exports = {
    name: 'text',
    description: 'Add text to an image',
    usage: '`b!text <text> <image url/embed (png, jpeg, gif)> <font size>`',
    cooldown: 0,
    async execute(message){

        const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
        // args[0] would be the command i.e. b!text
        const imageText = args[1];
        let sentImage;

        if(!imageText) return invalidCommandUsage(message, this.name, this.usage);

        if(!args[2]) {


            // Does the message have an attachment?
            if(message.attachments.first()){

            // If yes take the attachment as the image to be modified    
                sentImage = await loadImage(message.attachments.first().url);

            // If no return error    
            } else {

                return invalidCommandUsage(message, this.name, this.usage);

            }

        } else {

            //If there is a link given, load the image with that link, should there be an error it will just be caught

                sentImage = await loadImage(args[2]).catch(err => {
                console.log(err)
            });

        }

        if(!sentImage) return invalidCommandUsage(message, this.name, this.usage)

        const canvas = createCanvas(sentImage.width, sentImage.height); 
        const ctx = canvas.getContext('2d');

        ctx.drawImage(sentImage, 0, 0, canvas.width, canvas.height);
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        ctx.font = this.evaluateFontSize(ctx, canvas, imageText)
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'center';

        ctx.fillText(imageText, canvas.width / 2 , canvas.height / 2);

        const canvasAttachment = new MessageAttachment(canvas.toBuffer(), 'textImage.png')
        
        message.reply({ files: [canvasAttachment] });
    },

    evaluateFontSize(context, canvas, text){

        let evaluatedFontSize = 120;

        do {

            context.font = `${evaluatedFontSize -= 10}px sans-serif`

        } while (context.measureText(text).width > canvas.width)

        return context.font
    }
}