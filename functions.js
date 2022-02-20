const profileModel = require('./models/profileSchema');

module.exports = {

	async checkDBProfileExists(discordUserID) {

		let discordUserDBProfile = await profileModel.findOne({ userID: discordUserID });

		if (!discordUserDBProfile) {
			var profile = await profileModel.create({
				userID: discordUserID,
				level: 1,
				experience: 0,
				necoCoins: 1000,
			});

			discordUserDBProfile = profile;
			profile.save();
		}

		return discordUserDBProfile;
	},
	cooldownCheck(client, message, commandObject, commandString) {

		const commandOnCooldownID = `${message.author.id}.${commandObject.name}`; // Unique string consisting of the users discord id and command name, seperated by a dot

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

			message.reply(`You need to wait ${commandString.cooldown} seconds to execute ${commandString.name}, bibibi...`);

		}
	},
};
