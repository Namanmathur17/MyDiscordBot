const Discord = require('discord.js');

module.exports = {
	name: 'avatar',
	category: 'Utility',
	description: 'Get the avatar URL of the tagged user(s), or your own avatar.',
	aliases: ['icon', 'pfp'],
	execute(message, args) {

    function getAvatar(user) {
        const avatarEmbed = new Discord.MessageEmbed()
            .setColor('#228B22')
            .setTitle('Your Avatar')
            .setImage(user.displayAvatarURL())
 return message.channel.send(avatarEmbed)
	}
	
		if (!message.mentions.users.size) {
			if (!args.length) {
            user = message.author
			getAvatar(user)
		} 
		} else {
	
   message.mentions.users.map(user => { return getAvatar(user);}); 
		}
	},
};



