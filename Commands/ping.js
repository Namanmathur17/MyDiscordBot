const { prefix } = require('../config.json');

module.exports = {
name: 'ping',
category: 'None',
description: 'Ping!',
aliases: ['pg'],
execute(message, args) {
  message.channel.send(`${Date.now() - message.createdTimestamp} ms, Just like YARE YARE DAZE MAN!`);
  },
};
