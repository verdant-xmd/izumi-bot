const { izumi, mode } = require("../lib");
const fetch = require("node-fetch");
 izumi({
    pattern: 'insta ?(.*)',
    fromMe: mode,
    desc: 'Download instagram videos/image.',
    type: 'downloader',
}, async (message, match, client) => {
    try {
        const url = match || message.reply_message.text;
        if (!url) {
            return await message.reply("Please provide a valid Instagram URL.");
        }

        const igApi = `https://api.eypz.ct.ws/api/dl/instagram?url=${url}`;
        const res = await fetch(igApi);
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
                await message.sendFile(mediaurl, {quoted: message.data});
                counter++;
            }
        } else {
            await message.client.sendMessage(client.user.id, {
      text: "Error fetching media"
    }, { quoted: message.data });
        }
    } catch (error) {
        console.error(error);
        await message.client.sendMessage(client.user.id, {
      text: error
    }, { quoted: message.data });
    }
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
            return await message.reply("Please provide a valid facebook URL.");
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
