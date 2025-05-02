const axios = require("axios");
const { izumi, mode, getJson, searchAndSendYouTubeOptions } = require("../lib");
const yts = require("yt-search");
const { sendYtResults } = require('../lib/ytsearch');
izumi({
  pattern: "song ?(.*)",
  fromMe: mode,
  desc: "Search and download audio from YouTube.",
  type: "downloader",
}, async (message, match, client) => {
  if (!match) {
    return await message.reply("Please provide a search query or YouTube URL.");
  }

  try {
    const res = await getJson("https://downloaders-sandy.vercel.app/api/v1/yta?query=" + match, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    if (!res?.data?.downloadUrl|| !res?.data?.title) {
      return message.reply("Download failed.");
    }

    await message.reply(`_Downloading ${res.data.title}_`);

    const video = await axios.get(res.data.downloadUrl, { responseType: 'arraybuffer' });

    await client.sendMessage(message.jid, {
      audio: Buffer.from(video.data),
      mimetype: 'audio/mp4',
      caption: res.data.title,
    }, { quoted: message.data });
  } catch (error) {
    console.error("Error:", error);
    await message.reply("An error occurred while processing your request. Please try again later.");
  }
});

izumi({
  pattern: "video ?(.*)",
  fromMe: mode,
  desc: "Search and download video from YouTube.",
  type: "downloader",
}, async (message, match, client) => {
  if (!match) {
    return await message.reply("Please provide a search query or YouTube URL.");
  }

  try {
    const { videos } = await yts(match);
    const firstVideo = videos[0];
    const url = firstVideo.url;
    const res = await getJson("https://api-aswin-sparky.koyeb.app/api/downloader/ytv?url=" + url, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    if (!res?.data?.dl || !res?.data?.title) {
      return message.reply("Download failed.");
    }

    await message.reply(`_Downloading ${res.data.title}_`);

    const video = await axios.get(res.data.dl, { responseType: 'arraybuffer' });

    await client.sendMessage(message.jid, {
      video: Buffer.from(video.data),
      mimetype: 'video/mp4',
      caption: res.data.title,
    }, { quoted: message.data });
  } catch (error) {
    console.error("Error:", error);
    await message.reply("An error occurred while processing your request. Please try again later.");
  }
});

izumi({
  pattern: "yta ?(.*)",
  fromMe: mode,
  desc: "Download video using another API.",
  type: "downloader",
}, async (message, match, client) => {
  if (!match) {
    return await message.reply("Please provide a YouTube URL.");
  }

  try {
    const res = await getJson("https://api-aswin-sparky.koyeb.app/api/downloader/ytv?url=" + match, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    if (!res?.data?.dl || !res?.data?.title) {
      return message.reply("Download failed.");
    }

    await message.reply(`_Downloading ${res.data.title}_`);

    const video = await axios.get(res.data.dl, { responseType: 'arraybuffer' });

    await client.sendMessage(message.jid, {
      audio: Buffer.from(video.data),
      mimetype: 'audio/mp4',
      caption: res.data.title,
    }, { quoted: message.data });
  } catch (error) {
    console.error("Error:", error);
    await message.reply("An error occurred while processing your request. Please try again later.");
  }
});


izumi({
  pattern: "ytv ?(.*)",
  fromMe: mode,
  desc: "Download video using another API.",
  type: "downloader",
}, async (message, match, client) => {
  if (!match) {
    return await message.reply("Please provide a YouTube URL.");
  }

  try {
    const res = await getJson("https://api-aswin-sparky.koyeb.app/api/downloader/ytv?url=" + match, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    if (!res?.data?.dl || !res?.data?.title) {
      return message.reply("Download failed.");
    }

    await message.reply(`_Downloading ${res.data.title}_`);

    const video = await axios.get(res.data.dl, { responseType: 'arraybuffer' });

    await client.sendMessage(message.jid, {
      video: Buffer.from(video.data),
      mimetype: 'video/mp4',
      caption: res.data.title,
    }, { quoted: message.data });
  } catch (error) {
    console.error("Error:", error);
    await message.reply("An error occurred while processing your request. Please try again later.");
  }
});
izumi({
    pattern: "play ?(.*)",
    fromMe: mode,
    desc: "Search YouTube and provide quick options.",
    type: "downloader",
}, async (message, match) => {
    await searchAndSendYouTubeOptions(message.client, message.jid, message.sender, match);
});
izumi({
    pattern: 'ytsearch ?(.*)',
    fromMe: true,
    desc: 'Search YouTube videos',
    type: 'search'
}, async (message, match, client) => {
    if (!match) return await message.reply('Please provide a search query.');
    await sendYtResults(match, message.jid, client, message.data);
});
