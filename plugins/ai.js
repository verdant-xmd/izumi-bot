const { izumi, mode } = require("../lib");
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
