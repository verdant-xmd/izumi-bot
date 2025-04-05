const { izumi,mode, isAdmin ,parsedJid} = require("../lib");
const { downloadContentFromMessage } = require('@adiwajshing/baileys');
const config = require('../config');

let autoStatusEnabled = false;

izumi({
  pattern: 'autostatusview',
  fromMe: true,
  dontAddCommandList: true,
  desc: 'Check auto status view status',
  type: 'automation'
}, async (message, client) => {
  if (config.AUTO_STATUS_VIEW) {
    return await message.reply('Auto status viewer is *enabled* from config.');
  } else {
    return await message.reply('Please enable *AUTO_STATUS_VIEW* in environment variables to activate auto status view.');
  }
});

if (config.AUTO_STATUS_VIEW && !autoStatusEnabled) {
  autoStatusEnabled = true;

  client.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    if (!msg || !msg.key || msg.key.remoteJid !== 'status@broadcast') return;

    try {
      await client.readMessages([msg.key]);

      if (msg.message?.imageMessage || msg.message?.videoMessage) {
        const type = msg.message.imageMessage ? 'image' : 'video';
        const stream = await downloadContentFromMessage(msg.message[type + 'Message'], type);
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
          buffer = Buffer.concat([buffer, chunk]);
        }
        console.log(`Downloaded status ${type} from:`, msg.pushName || msg.key.participant);
      }

      console.log('✅ Auto-viewed a status.');
    } catch (err) {
      console.error('❌ Failed to view status:', err);
    }
  });

  console.log('✅ Auto status viewer is running.');
}
izumi(
  {
    pattern: 'block ?(.*)',
    fromMe: true,
    desc: "Block a person",
    type: "user",
  },
  async (message, match) => {
    if (message.isGroup) {
      let jid = message.mention[0] || message.reply_message.jid;
      if (!jid) return await message.reply("_Reply to a person or mention_");
      await message.block(jid);
      return await message.sendMessage(
        `_@${jid.split("@")[0]} Blocked_`,
        {
          mentions: [jid],
        }
      );
    } else {
      await message.block(message.jid);
      return await message.reply("_User blocked_");
    }
  }
);

izumi(
  {
    pattern: "unblock",
    fromMe: true,
    desc: "Unblock a person",
    type: "user",
  },
  async (message, match) => {
    if (message.isGroup) {
      let jid = message.mention[0] || message.reply_message.jid;
      if (!jid) return await message.reply("_Reply to a person or mention_");
      await message.unblock(jid);
      return await message.sendMessage(
        message.jid,
        `_@${jid.split("@")[0]} unblocked_`,
        {
          mentions: [jid],
        }
      );
    } else {
      await message.unblock(message.jid);
      return await message.reply("_User unblocked_");
    }
  }
);
izumi(
  {
    pattern: "forward ?(.*)",
    fromMe: true,
    desc: "Forwards the replied Message",
    type: "user",
  },
  async (message, match) => {
    if (!message.quoted) return message.reply('Reply to something');
    
    let jids = parsedJid(match);
    for (let i of jids) {
      const eypz = {
        text: message.quoted ? message.quoted.message : "Replied message",
        contextInfo: {
          isForwarded: false
        }
      };
      
      await message.forwardMessage(i, message.reply_message.data, eypz);
    }
  }
);
