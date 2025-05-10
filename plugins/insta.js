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
    if (!match[1]) {
        return await message.reply('Please provide an Instagram URL!');
    }

    const api = `https://eypz.koyeb.app/api/dl/instagram?url=${encodeURIComponent(match)}`;

    try {
        const response = await fetch(api);
        const data = await response.json();

        if (data.status !== 'success') {
            return await message.reply('Failed to fetch Instagram content. Please check the URL.');
        }

        const { videos, images } = data;

        if (videos.length === 0 && images.length === 0) {
            return await message.reply('No media found in this post.');
        }

        for (const vid of videos) {
            await client.sendMessage(message.jid, {
                video: { url: vid },
                caption: caption,
                mimetype: "video/mp4"
            }, { quoted: message.data });
        }

        for (const img of images) {
            await client.sendMessage(message.jid, {
                image: { url: img },
                caption: caption 
            }, { quoted: message.data });
        }
    } catch (error) {
        await message.reply('An error occurred while processing your request.');
        console.error(error);
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
