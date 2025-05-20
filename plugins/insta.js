const { izumi, mode } = require("../lib");
const fetch = require("node-fetch");
const config = require("../config");
const caption = config.CAPTION;
 izumi({
    pattern: 'insta ?(.*)',
    fromMe: mode,
    desc: 'Download all Instagram media (reels/images)',
    type: 'downloader'
}, async (message, match, client) => {
    if (!match) {
        return await message.reply('Please provide an Instagram URL!');
    }

   const api = `https://fastrestapis.fasturl.cloud/downup/igdown/advanced?url=${match}&type=simple`;

(async () => {
  try {
    const response = await fetch(api);
    const data = await response.json();
    const result = data?.result;

    const images = result.images || [];
    const videos = result.videos || [];

    
    for (const url of images) {
      await message.client.sendMessage(message.chat, {
        image: { url },
        caption: caption
      }, { quoted: message.data });
    }

    
    for (const url of videos) {
      await message.client.sendMessage(message.chat, {
        video: { url },
        caption: caption
      }, { quoted: message.data });
    }
  } catch (err) {
    console.error("Error fetching media:", err);
    await message.client.sendMessage(message.chat, {
      text: "Error fetching media"
    }, { quoted: message.data });
  }
})();
});
izumi({
    pattern: 'fb ?(.*)',
    fromMe: mode,
    desc: 'Download facebook videos.',
    type: 'downloader',
}, async (message, match, client) => {
    try {
        const url = match || message.reply_message.text;
        if (!url) {
            return await message.reply("Please provide a valid Instagram URL.");
        }

        const fbApi = `https://api.siputzx.my.id/api/d/igdl?url=${url}`;
        const res = await fetch(fbApi);
        if (!res.ok) {
            return await message.reply("Please try again.");
        }
        
        const data = await res.json();
        const igmedia = data.data;

        if (igmedia && igmedia.length > 0) {
            let counter = 0;
            for (const media of igmedia) {
                if (counter >= 10) break;
                const mediaurl = media.url;
                await message.sendFile(mediaurl);
                counter++;
            }
        } else {
            await message.reply("No media found for the provided URL.");
        }
    } catch (error) {
        console.error(error);
        await message.reply(" 'error' ");
    }
});
