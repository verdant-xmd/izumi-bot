const axios = require("axios");
const yts = require("yt-search");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const { exec } = require("child_process");
const { izumi, mode, searchAndSendYouTubeOptions, sendYtResults } = require("../lib");

async function downloadAndSendVideo(message, client, videoUrl, title, videoId) {
  try {
    const apiUrl = `https://api.eypz.ct.ws/api/dl/yt?url=${encodeURIComponent(videoUrl)}&format=mp4`;
    const { data } = await axios.get(apiUrl, {
      headers: {
        "Cache-Control": "no-cache",
        "User-Agent": "WhatsAppBot/1.0",
      },
    });

    if (!data?.downloadURL) return await message.reply("Failed to get download link.");

    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    const tempFile = path.join(__dirname, `temp_${Date.now()}.mp4`);

    const response = await axios.get(data.downloadURL, { responseType: "stream" });
    const writer = fs.createWriteStream(tempFile);
    response.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    const imageBuffer = await axios.get(thumbnailUrl, { responseType: "arraybuffer" }).then((res) => res.data);
    const jpegThumbnail = await sharp(imageBuffer).resize(300, 300).jpeg().toBuffer();
    const title = data.title;
    await client.sendMessage(
      message.jid,
      {
        video: fs.readFileSync(tempFile),
        mimetype: "video/mp4",
        caption: `*${title}*`,
      },
      { quoted: message.data }
    );

    await client.sendMessage(
      message.jid,
      {
        document: fs.readFileSync(tempFile),
        fileName: `${title}.mp4`,
        mimetype: "video/mp4",
        caption: `*${title}*`,
        jpegThumbnail,
      },
      { quoted: message.data }
    );

    fs.unlinkSync(tempFile);
  } catch (err) {
    console.error("Error:", err);
    await message.reply("Failed to process video. Error: " + err.message);
  }
}

async function downloadAndSendAudio(message, client, videoUrl, title, videoId) {
  try {
    const apiUrl = `https://api.eypz.ct.ws/api/dl/yt?url=${encodeURIComponent(videoUrl)}&format=mp4`;
    const { data } = await axios.get(apiUrl, {
      headers: {
        "Cache-Control": "no-cache",
        "User-Agent": "WhatsAppBot/1.0",
      },
    });

    if (!data?.downloadURL) return await message.reply("Failed to get audio link.");

    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    const tempFile = path.join(__dirname, `temp_${Date.now()}.mp4`);
    const finalFile = path.join(__dirname, `final_${Date.now()}.mp3`);
    
    const response = await axios.get(data.downloadURL, { responseType: "stream" });
    const writer = fs.createWriteStream(tempFile);
    response.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    await new Promise((resolve, reject) => {
  exec(`ffmpeg -i "${tempFile}" -vn -ar 44100 -ac 2 -b:a 192k "${finalFile}"`, (error) => {
    if (error) reject(error);
    else resolve();
  });
});

    const imageBuffer = await axios.get(thumbnailUrl, { responseType: "arraybuffer" }).then((res) => res.data);
    const jpegThumbnail = await sharp(imageBuffer).resize(300, 300).jpeg().toBuffer();
    const title = data.title;
    
    await client.sendMessage(
      message.jid,
      {
        audio: fs.readFileSync(finalFile),
        mimetype: "audio/mp4",
        ptt: false,
        contextInfo: {
          externalAdReply: {
            title: title,
            body: "",
            mediaType: 2,
            thumbnail: jpegThumbnail,
            mediaUrl: "https://github.com/Akshay-Eypz/izumi-bot",
            sourceUrl: "https://github.com/Akshay-Eypz/izumi-bot",
            showAdAttribution: true,
          },
        },
      },
      { quoted: message.data }
    );

    await client.sendMessage(
      message.jid,
      {
        document: fs.readFileSync(finalFile),
        fileName: `${title}.mp3`,
        mimetype: "audio/mp3",
        caption: `*${title}*`,
        jpegThumbnail,
      },
      { quoted: message.data }
    );

    fs.unlinkSync(tempFile);
    fs.unlinkSync(finalFile);
  } catch (err) {
    console.error("Error:", err);
    await message.reply("Failed to process audio. Error: " + err.message);
  }
}

izumi({
  pattern: "video ?(.*)",
  fromMe: mode,
  desc: "Download YouTube videos",
  type: "downloader",
}, async (message, match, client) => {
  if (!match) return await message.reply("Please provide a search query.");

  const { videos } = await yts(match);
  if (!videos.length) return await message.reply("No videos found!");
  const video = videos[0];

  await message.reply(`_*Downloading: ${video.title}...*_`);

  const videoIdMatch = video.url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=|youtube\.com\/shorts\/|v=)([a-zA-Z0-9_-]{11})/);
  const videoId = videoIdMatch ? videoIdMatch[1] : null;
  if (!videoId) return await message.reply("Could not extract video ID.");

  await downloadAndSendVideo(message, client, video.url, video.title, videoId);
});

izumi({
  pattern: "ytv ?(.*)",
  fromMe: mode,
  desc: "Download YouTube video by URL",
  type: "downloader",
}, async (message, match, client) => {
  if (!match) return await message.reply("Please provide a video URL.");

  const videoIdMatch = match.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=|youtube\.com\/shorts\/|v=)([a-zA-Z0-9_-]{11})/);
  const videoId = videoIdMatch ? videoIdMatch[1] : null;
  if (!videoId) return await message.reply("Invalid YouTube URL.");

  await downloadAndSendVideo(message, client, match, "YouTube Video", videoId);
});

izumi({
  pattern: "song ?(.*)",
  fromMe: mode,
  desc: "Download YouTube audio",
  type: "downloader",
}, async (message, match, client) => {
  if (!match) return await message.reply("Please provide a search query.");

  const { videos } = await yts(match);
  if (!videos.length) return await message.reply("No videos found!");
  const video = videos[0];

  await message.reply(`_*Downloading: ${video.title}...*_`);

  const videoIdMatch = video.url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=|youtube\.com\/shorts\/|v=)([a-zA-Z0-9_-]{11})/);
  const videoId = videoIdMatch ? videoIdMatch[1] : null;
  if (!videoId) return await message.reply("Could not extract video ID.");

  await downloadAndSendAudio(message, client, video.url, video.title, videoId);
});

izumi({
  pattern: "yta ?(.*)",
  fromMe: mode,
  desc: "Download YouTube audio by URL",
  type: "downloader",
}, async (message, match, client) => {
  if (!match) return await message.reply("Please provide a URL.");

  const videoIdMatch = match.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=|youtube\.com\/shorts\/|v=)([a-zA-Z0-9_-]{11})/);
  const videoId = videoIdMatch ? videoIdMatch[1] : null;
  if (!videoId) return await message.reply("Invalid YouTube URL.");

  await downloadAndSendAudio(message, client, match, "YouTube Audio", videoId);
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
    pattern: 'yts ?(.*)',
    fromMe: true,
    desc: 'Search YouTube videos',
    type: 'search'
}, async (message, match, client) => {
    if (!match) return await message.reply('Please provide a search query.');
    await sendYtResults(match, message.jid, client, message.data);
});
