const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
                .setName('say')
                .setDescription('Makes it look like as if the bot said something.')
                .addStringOption(option =>{
                    option.setName('text')
                            .setDescription('Text the bot should say.')
                            .setRequired(true);
                    return option;
                }),
    cooldown: 0,
    async execute(interaction) {

        console.log('Going into say.js');
        
		const botSay = interaction.options.getString('text');

		interaction.reply(botSay);

    }
}