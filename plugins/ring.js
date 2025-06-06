const axios = require("axios");
const cheerio = require("cheerio");
const { izumi, mode } = require("../lib");
izumi({
  pattern: "ringtone ?(.*)",
  fromMe: mode,
  desc: "Download ringtone audio",
  type: "downloader"
}, async (message, match, client) => {
  if (!match) return await message.reply('_Example: ringtone the box_');
  
  const res = await axios.get(`https://meloboom.com/en/search/${match}`);
  const $ = cheerio.load(res.data);
  const hasil = [];

  $('#__next > main > section > div.jsx-2244708474.container > div > div > div > div:nth-child(4) > div > div > div > ul > li').each(function () {
    const title = $(this).find('h4').text();
    const source = 'https://meloboom.com/' + $(this).find('a').attr('href');
    const audio = $(this).find('audio').attr('src');
    if (title && audio) {
      hasil.push({ title, source, audio });
    }
  });

  if (!hasil.length) return await message.reply("No ringtones found.");

  let msg = `\`\`\`Search results for "${match}":\`\`\`\n_Reply with the desired number to download._\n\n`;
  const used = new Set();
  const selectedItems = [];

  while (used.size < 5 && used.size < hasil.length) {
    const rand = Math.floor(Math.random() * hasil.length);
    if (!used.has(rand)) {
      used.add(rand);
      const item = hasil[rand];
      selectedItems.push(item);
      msg += `${selectedItems.length}. *${item.title}*\n MP3: ${item.audio}\n\n`;
    }
  }

  const sentMsg = await client.sendMessage(message.jid, { text: msg.trim() }, { quoted: message.data });

  client.ev.on('messages.upsert', async (msg) => {
    const newMessage = msg.messages[0];
    if (
      newMessage.key.remoteJid === message.jid &&
      newMessage.message?.extendedTextMessage?.contextInfo?.stanzaId === sentMsg.key.id
    ) {
      const userReply = newMessage.message?.conversation || newMessage.message?.extendedTextMessage?.text;
      const num = parseInt(userReply);

      if (!isNaN(num) && num >= 1 && num <= selectedItems.length) {
        const item = selectedItems[num - 1];
        await client.sendMessage(message.jid, {
          audio: { url: item.audio },
          mimetype: 'audio/mp4'
        }, { quoted: newMessage });
      } else {
        await client.sendMessage(message.jid, { text: 'Invalid number. Please reply with a number between 1 and 5.' }, { quoted: newMessage });
      }
    }
  });
});
