const { prefix } = require('../config.json');

module.exports = {
    name: 'mirror',
    category: 'Unimportant',
    description: 'Mirrors your messages!',
    usage: '[message]',
    execute(message, args) {
    var mirroroutput = message.content.slice(prefix.length + this.name.length)  
    message.channel.send(mirroroutput)
    message.delete(100)
    }
}