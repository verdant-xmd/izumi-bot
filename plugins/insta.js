const { izumi, mode } = require("../lib");
const axios = require("axios");
const config = require('../config')

izumi({
    pattern: 'insta ?(.*)',
    fromMe: mode,
    desc: 'Download instagram videos/image.',
    type: 'downloader',
}, async (message, match, client) => {
    try {
        const url = match || message.reply_message?.text;
        if (!url) return await message.reply("Please provide a valid Instagram URL.");

        const api = `https://api.eypz.ct.ws/api/dl/instagram?url=${url}`;
        const res = await axios.get(api);

        const mediaList = res.data?.result?.data;
        if (!mediaList || mediaList.length === 0) {
            return await message.reply("No media found.");
        }

        for (const media of mediaList) {
            if (media.url) {
                
                await message.sendFile(media.url, {}, { quoted: message.data });
            }
        }

    } catch (err) {
        console.error(err);
        await client.sendMessage(client.user.id, { text: "Error: " + err.message });
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

izumi({
  pattern: 'tiktok ?(.*)',
  fromMe: mode,
  desc: 'tiktok Downloader',
  type: 'downloader'
}, async (message, match, client) => {

    const query = match || '';
    if (!query.trim()) {
        return await client.sendMessage(
            message.jid,
            { text: "Need a URL to download.\nExample: .tiktok https://tiktok.com/..." },
            { quoted: message.data }
        );
    }

    try {
        const res = await axios.get(`https://api.eypz.ct.ws/api/dl/tiktok?url=${encodeURIComponent(query)}`);
        const data = res.data;

        if (data.status !== 'success' || !data.result) {
            return await client.sendMessage(
                message.jid,
                { text: "No result found." },
                { quoted: message.data }
            );
        }

        const result = data.result;

        if (result.type === 'video') {
            const replyText = `
*${result.title}*

Reply with:
1. SD
2. HD
            `.trim();

            const sentMsg = await client.sendMessage(
                message.jid,
                { text: replyText },
                { quoted: message.data }
            );

            client.ev.on('messages.upsert', async (msg) => {
                const newMessage = msg.messages[0];
                if (
                    newMessage.key.remoteJid === message.jid &&
                    newMessage.message?.extendedTextMessage?.contextInfo?.stanzaId === sentMsg.key.id
                ) {
                    const userReply = newMessage.message?.conversation || newMessage.message?.extendedTextMessage?.text;

                    if (userReply === '1') {
                        await message.sendFromUrl(result.video_sd, { caption: result.CAPTION });
                    } else if (userReply === '2') {
                        await message.sendFromUrl(result.video_hd, { caption: config.CAPTION });
                    }
                }
            });

        } else if (result.type === 'photo' && result.images?.length) {

            for (const img of result.images) {
                await message.sendFromUrl(img, { caption: config.CAPTION});
            }

        } else {
            await client.sendMessage(
                message.jid,
                { text: "Unsupported type or no media found." },
                { quoted: message.data }
            );
        }

    } catch (error) {
        console.error(error);
        return await client.sendMessage(
            message.jid,
            { text: "Something went wrong. Please try again later." },
            { quoted: message.data }
        );
    }
});


izumi({
  pattern: 'threads ?(.*)',
  fromMe: mode,
  desc: 'Threads downloader',
  type: 'downloader'
}, async (message, match, client) => {

    const query = match || '';
    if (!query.trim()) {
        return await client.sendMessage(
            message.jid,
            { text: "Need a URL to download.\nExample: .threads https://www.threads.net/..." },
            { quoted: message.data }
        );
    }

    try {
        const res = await axios.get(`https://api.eypz.ct.ws/api/dl/threads?url=${encodeURIComponent(query)}`);
        const data = res.data;

        if (data.status !== 'success' || !data.downloadUrls?.length) {
            return await client.sendMessage(
                message.jid,
                { text: "No media found." },
                { quoted: message.data }
            );
        }

        for (const url of data.downloadUrls) {
            await message.sendFromUrl(url, { caption: config.CAPTION });
        }

    } catch (error) {
        console.error(error);
        return await client.sendMessage(
            message.jid,
            { text: "Something went wrong. Please try again later." },
            { quoted: message.data }
        );
    }
});


izumi({
  pattern: 'twitter ?(.*)',
  fromMe: mode,
  desc: 'Twitter downloader',
  type: 'downloader'
}, async (message, match, client) => {

    const query = match || '';
    if (!query.trim()) {
        return await client.sendMessage(
            message.jid,
            { text: "Need a Twitter URL.\nExample: .twitter https://x.com/..." },
            { quoted: message.data }
        );
    }

    try {
        const res = await axios.get(`https://api.eypz.ct.ws/api/dl/twitter?url=${encodeURIComponent(query)}`);
        const data = res.data;

        if (data.status !== 'success' || !data.result?.length) {
            return await client.sendMessage(
                message.jid,
                { text: "No media found." },
                { quoted: message.data }
            );
        }

        if (data.type === 'video') {
            const videoQualities = data.result.filter(item => item.quality.toLowerCase() !== 'original');

            if (!videoQualities.length) {
                return await client.sendMessage(
                    message.jid,
                    { text: "No valid video qualities found." },
                    { quoted: message.data }
                );
            }

            let response = "*Choose Quality:*\n\n";
            videoQualities.forEach((item, index) => {
                response += `${index + 1}. ${item.quality}\n`;
            });

            const sentMsg = await client.sendMessage(
                message.jid,
                { text: response.trim() + `\n\nReply with: 1 / 2 / 3 ...` },
                { quoted: message.data }
            );

            client.ev.on('messages.upsert', async (msg) => {
                const newMessage = msg.messages[0];
                if (
                    newMessage.key.remoteJid === message.jid &&
                    newMessage.message?.extendedTextMessage?.contextInfo?.stanzaId === sentMsg.key.id
                ) {
                    const userReply = newMessage.message?.conversation || newMessage.message?.extendedTextMessage?.text;
                    const choice = parseInt(userReply.trim());

                    if (choice > 0 && choice <= videoQualities.length) {
                        const selected = videoQualities[choice - 1];
                        await message.sendFromUrl(selected.downloadUrl, { caption: config.CAPTION });
                    } else {
                        await client.sendMessage(
                            message.jid,
                            { text: "Invalid choice." },
                            { quoted: message.data }
                        );
                    }
                }
            });

        } else if (data.type === 'image') {
            for (const img of data.result) {
                await message.sendFromUrl(img.downloadUrl, { caption: config.CAPTION });
            }
        } else {
            await client.sendMessage(
                message.jid,
                { text: "Unsupported type." },
                { quoted: message.data }
            );
        }

    } catch (error) {
        console.error(error);
        return await client.sendMessage(
            message.jid,
            { text: "Something went wrong. Please try again later." },
            { quoted: message.data }
        );
    }
});
