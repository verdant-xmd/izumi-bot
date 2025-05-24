const { izumi, getJson, mode } = require("../lib");
izumi({
    pattern: 'gpt3 ?(.*)',
    fromMe: mode,
    desc: 'chat gpt',
    type: 'ai',
}, async (message, match, client) => {
    const text = match || (message.reply_message && message.reply_message.text);
if (!text) return await message.reply("_*Need a query*_");
const data = await getJson(`https://api.eypz.ct.ws/api/ai/gpt?text=${text}&model=gpt3`);
const quotedMessage = {
  key: {
    fromMe: false,
    remoteJid: "18002428478@s.whatsapp.net",
    id: "FAKE_MESSAGE_ID",
    participant: "18002428478@s.whatsapp.net"
  },
  message: {
    extendedTextMessage: {
      text: "GPT-3"
    }
  }
};

await client.sendMessage(
  message.jid,
  {
    text: data.response,
    contextInfo: {
      mentionedJid: [message.sender],
      forwardingScore: 1,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363298577467093@newsletter",
        newsletterName: "GPT",
        serverMessageId: -1
      },
      externalAdReply: {
        title: "Chat Gpt 3",
        body: "Powered by Eypz API",
        mediaType: 2,
        thumbnailUrl: "https://files.catbox.moe/saleb0.png",
        showAdAttribution: true,
        mediaUrl: "https://eypz.rf.gd",
        sourceUrl: "https://eypz.rf.gd"
      }
    }
  },
  { quoted: quotedMessage }
)
});
izumi({
    pattern: 'gpt4 ?(.*)',
    fromMe: mode,
    desc: 'chat gpt',
    type: 'ai',
}, async (message, match, client) => {
    const text = match || (message.reply_message && message.reply_message.text);
if (!text) return await message.reply("_*Need a query*_");
const data = await getJson(`https://api.eypz.ct.ws/api/ai/gpt?text=${text}&model=gpt4`);
const quotedMessage = {
  key: {
    fromMe: false,
    remoteJid: "18002428478@s.whatsapp.net",
    id: "FAKE_MESSAGE_ID",
    participant: "18002428478@s.whatsapp.net"
  },
  message: {
    extendedTextMessage: {
      text: "GPT-4"
    }
  }
};

await client.sendMessage(
  message.jid,
  {
    text: data.response,
    contextInfo: {
      mentionedJid: [message.sender],
      forwardingScore: 1,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363298577467093@newsletter",
        newsletterName: "GPT",
        serverMessageId: -1
      },
      externalAdReply: {
        title: "Chat Gpt 4",
        body: "Powered by Eypz API",
        mediaType: 2,
        thumbnailUrl: "https://files.catbox.moe/saleb0.png",
        showAdAttribution: true,
        mediaUrl: "https://eypz.rf.gd",
        sourceUrl: "https://eypz.rf.gd"
      }
    }
  },
  { quoted: quotedMessage }
)
});
izumi({
    pattern: 'flux ?(.*)',
    fromMe: mode,
    desc: 'text to image',
    type: 'ai',
}, async (message, match, client) => {
const text = match || (message.reply_message && message.reply_message.text);
if (!text) return await message.reply("_*Need a query*_\nexample: _*.flux A realistic portrait of a Japanese teenage girl with white hair, sitting in front of a high-end gaming PC, playing GTA V. She is focused on the screen, wearing casual modern clothes, in a cozy gaming room with RGB lighting and gaming accessories around her_");
await message.client.sendMessage(
  message.jid,
  {
    image: { url: `https://api.eypz.ct.ws/api/ai/flux?prompt=${text}`},
    caption: text,
    contextInfo: {
      externalAdReply: {
        title: "AI Generated Image",
        body: "Powered by Eypz API",
        mediaType: 2,
        thumbnailUrl: "https://files.catbox.moe/1z6pjq.png",
        renderLargerThumbnail: false,
        showAdAttribution: true,
        sourceUrl: "https://api.eypz.ct.ws"
      }
    }
  },
  { quoted: message.data }
)
});
