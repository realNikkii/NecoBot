/*	╔═══════════════════════╗
 	║	U	S	A	G	E	║
	╠═══════════════════════╣
	║	|	|	|	|	|	║
	╠═══════════════════════╩══════════════════════════════════════════════════════════════════════════════════════════╗
	║ errorHandler.js currently only has one function, will probably add some more functionality and better error      ║
	║ handling through this module.                            														   ║
	╚══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
*/


const { MessageEmbed } = require('discord.js');

module.exports = {
/*	╔═══════════════════════════════════╗
 	║	F   U   N   C   T   I   O   N	║
	╠═══════════════════════════════════╣
	║ invalidCommandUsage() creates an  ║
    ║ embed, telling the user how to    ║
    ║ properly use a command.           ║
	╚═══════════════════════════════════╝
*/
    invalidCommandUsage(commandMessage, commandName, commandUsage){

        const errorEmbed = new MessageEmbed()
            .setColor('RED')
            .setTitle('⚠️ Incorrect command usage! Ueeeeuuueeee...')
            .setDescription(`The command "${commandName}" is used like this:\n${commandUsage}`)

        commandMessage.reply({ embeds: [errorEmbed]})

    }
}