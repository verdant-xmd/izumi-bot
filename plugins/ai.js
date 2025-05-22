const { izumi, mode } = require("../lib");
izumi({
    pattern: 'flux ?(.*)',
    fromMe: mode,
    desc: 'text to image',
    type: 'ai',
}, async (message, match, client) => {
await message.client.sendMessage(
  message.jid,
  {
    image: { url: `https://api.eypz.ct.ws/api/ai/flux?prompt=${match}`},
    caption: match,
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
