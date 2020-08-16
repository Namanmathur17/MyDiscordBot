const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');
const { prefix, token } = require('./config.json');
client.once('ready', () => {
  console.log('Ready!');
 });
 client.once('reconnecting', () => {
  console.log('Reconnecting!');
 });
 client.once('disconnect', () => {
  console.log('Disconnect!');
 });



client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./Commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./Commands/${file}`);
  client.commands.set(command.name, command);
  console.log(file)
}
client.on('message', message => {
  if (message.author.bot) return;

  if (message.content.startsWith(`${prefix}`)) {
  
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
   
    const command = client.commands.get(commandName)
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
   
    if (!command) return;

    if (command.guildOnly && message.channel.type !== 'text') {
      return message.reply('I can\'t execute that command inside DMs!');
    }
  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;
  
  if (command.usage) {
    reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    }
  return message.channel.send(reply);
  }

try {
	command.execute(message, args);
} catch (error) {
	console.error(error);
	message.reply('there was an error trying to execute that command!');
}
    
   if (commandName === 'take') {
    const amount = parseInt(args[0]);
    if (isNaN(amount)) {
      return message.reply('that doesn\'t seem to be a valid number.');
    } else {
      message.channel.send('&transfer'+ ' ' + message.author + ' ' + amount)
    }
  }
  if (commandName === 'avatar' || commandName === 'icon' || commandName === 'pfp') {
    function getAvatar(user) {
      const avatarEmbed = new Discord.MessageEmbed()
          .setColor('#228B22')
          .setTitle('Your Avatar')
          .setImage(user.displayAvatarURL())
return message.channel.send(avatarEmbed)
}
    var id = args[0]
    client.users.fetch(id)
    .then (user => {getAvatar(user)});
  }

}  
});


client.login(`${token}`);
