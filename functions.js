const profileModel = require('./models/profileSchema');
const { prefix } = require('./config.json');

module.exports = {

	async checkDBProfileExists(discordUserID) {

		let discordUserDBProfile = await profileModel.findOne({ userID: discordUserID });

		if (!discordUserDBProfile) {
			const profile = await profileModel.create({
				userID: discordUserID,
				level: 1,
				experience: 0,
				necoCoins: 1000
			});

			discordUserDBProfile = profile;
			profile.save();
		}

		return discordUserDBProfile;
	},
	cooldownCheck(client, message, commandObject, commandString) {

		// Unique string consisting of the users discord id and command name, seperated by a dot
		const commandOnCooldownID = `${message.author.id}.${commandObject.name}`;

		if (!client.userCooldowns.has(commandOnCooldownID)) {

			commandObject.execute(message, client, commandObject, commandString);


			if (commandObject.cooldown > 0) {

				client.userCooldowns.add(commandOnCooldownID);

				setTimeout(() => {

					client.userCooldowns.delete(commandOnCooldownID);

				}, commandObject.cooldown * 1000);
			}

		}
		else {

			message.reply(`You need to wait ${commandObject.cooldown} seconds to execute ${commandObject.name}, bibibi...`);

		}
	},

	evaluateSlashCommandOnCooldown(client, interaction) {

		const commandOnCooldownId = `${interaction.user.id}.{interaction.commandName}`;

		if (!client.userCooldowns.has(commandOnCooldownId)) {
			
			return false;
			
		}


	},

	getArguments(message) {

		return message.content.slice(prefix.length).trim().split(/ +/g);

	},


	passCLIArgs() {
		
		let argsMap = new Map();

		process.argv.forEach(arg => {

			if (arg.startsWith('--')) {

				const argValues = arg.split('=');
				const mapKey = argValues[0].replace('--', '');
				const mapValue = argValues[1];

				argsMap.set(mapKey, mapValue);

			}
		});

		return argsMap;
	}
	
};
