const { prefix } = require('../config.json');
const Discord = require('discord.js');

module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	category: 'None',
	aliases: ['commands', 'h'],
	usage: '[commandname]',
	execute(message, args) {
		const data = [];
		const { commands } = message.client;
		
		
		
		if (!args.length) {
const categ = commands.map(command => command.category)

			data.push('Here\'s a list of all my commands:');
		/*	data.push(commands.map(command => command.category)
			.then(() => {
				data.push(commands.map(command => command.name).join('\n'))}).join(`\n`)) */
		for (const command of categ) {
		   data.push(categ.category)
           data.push(categ.name.join(`\n`))
		}
			data.push(commands.map(command => command.name).join('\n'));
			data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);
        
		const HelpEmbed = new Discord.MessageEmbed()
          .setColor('#FF0000') 
          .setTitle('Help')
          .setAuthor('Created by Phoenix King', 'https://imgur.com/FJSkDF0.png')  
          .setDescription(data, { split: true })
          .setFooter('Help command page 1');

         return message.author.send(HelpEmbed)
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.reply('I\'ve sent you a DM with all my commands!');
				})
				.catch(error => {
					console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
					message.reply('it seems like I can\'t DM you!');
				});
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('That\'s not a valid command!');
		}

		data.push(`**Name:** ${command.name}`);
		
		if (command.category) data.push(`**Category:** ${command.category}`)
		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Description:** ${command.description}`);
		if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);
		
		const extHelpEmbed = new Discord.MessageEmbed()
		.setColor('#0000FF')
        .setTitle(`Help for ${command.name}`)
		.setAuthor('Phoenix King', 'https://imgur.com/FJSkDF0.png') 
		.setDescription(data, { split: true });
		
		message.channel.send(extHelpEmbed);
	},
};