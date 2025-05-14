const axios = require("axios");
const yts = require("yt-search");
const fs = require('fs');
const { exec } = require('child_process');
const sharp = require("sharp");
const { izumi, mode, getJson, searchAndSendYouTubeOptions, sendYtResults } = require("../lib");
izumi({
  pattern: "video ?(.*)",
  fromMe: mode,
  desc: "Download YouTube videos ",
  type: "downloader",
}, async (message, match, client) => {
  if (!match) return await message.reply("Please provide a search query.");

  try {
    const { videos } = await yts(match);
    if (!videos.length) return await message.reply("No videos found!");
    const video = videos[0];

    await message.reply(`_*Downloading: ${video.title}...*_`);

    const apiUrl = `https://eypz.koyeb.app/api/dl/ytv?url=${encodeURIComponent(video.url)}&quality=720&apikey=akshay-eypz`;
    const { data } = await axios.get(apiUrl, { 
      headers: { 
        'Cache-Control': 'no-cache',
        'User-Agent': 'WhatsAppBot/1.0'
      }
    });

    if (!data?.media_url) return await message.reply("Failed to get download link.");

    const tempFile = `temp_${Date.now()}.mp4`;
    const finalFile = `final_${Date.now()}.mp4`;

    const response = await axios({ url: data.media_url, responseType: 'stream' });
    const writer = fs.createWriteStream(tempFile);
    response.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });

    // Fast metadata fix without re-encoding
    await new Promise((resolve, reject) => {
      exec(`ffmpeg -i ${tempFile} -c copy -movflags faststart ${finalFile}`, 
        (error) => {
          if (error) reject(error);
          else resolve();
        }
      );
    });

    const imageBuffer = await axios.get(video.thumbnail, { responseType: "arraybuffer" }).then(res => res.data);
    const jpegThumbnail = await sharp(imageBuffer).resize(300, 300).jpeg().toBuffer();

    await client.sendMessage(message.jid, {
      video: fs.readFileSync(finalFile),
      mimetype: 'video/mp4',
      caption: `*${video.title}*`,
    }, { quoted: message.data });
    
    await client.sendMessage(message.jid, {
      document: fs.readFileSync(finalFile),
      fileName: `${video.title}.mp4`,
      mimetype: 'video/mp4',
      caption: `*${video.title}*`,
      jpegThumbnail: jpegThumbnail
    }, { quoted: message.data });

    // Clean up
    fs.unlinkSync(tempFile);
    fs.unlinkSync(finalFile);

  } catch (err) {
    console.error("Error:", err);
    await message.reply("Failed to process video. Error: " + err.message);
  }
});

izumi({
  pattern: "ytv ?(.*)",
  fromMe: mode,
  desc: "Download YouTube videos ",
  type: "downloader",
}, async (message, match, client) => {
  if (!match) return await message.reply("Please provide a url.");

  try {
    const apiUrl = `https://eypz.koyeb.app/api/dl/ytv?url=${encodeURIComponent(match)}&quality=720&apikey=akshay-eypz`;
    const { data } = await axios.get(apiUrl, { 
      headers: { 
        'Cache-Control': 'no-cache',
        'User-Agent': 'WhatsAppBot/1.0'
      }
    });
    if (!data?.media_url) return await message.reply("Failed to get download link.");

    await message.reply(`_*Downloading: ${data.title}...*_`);
    
    const tempFile = `temp_${Date.now()}.mp4`;
    const finalFile = `final_${Date.now()}.mp4`;

    const response = await axios({ url: data.media_url, responseType: 'stream' });
    const writer = fs.createWriteStream(tempFile);
    response.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });

    // Fast metadata fix without re-encoding
    await new Promise((resolve, reject) => {
      exec(`ffmpeg -i ${tempFile} -c copy -movflags faststart ${finalFile}`, 
        (error) => {
          if (error) reject(error);
          else resolve();
        }
      );
    });

    const imageBuffer = await axios.get(data.thumbnail, { responseType: "arraybuffer" }).then(res => res.data);
    const jpegThumbnail = await sharp(imageBuffer).resize(300, 300).jpeg().toBuffer();

    await client.sendMessage(message.jid, {
      video: fs.readFileSync(finalFile),
      mimetype: 'video/mp4',
      caption: `*${data.title}*`,
    }, { quoted: message.data });
    
    await client.sendMessage(message.jid, {
      document: fs.readFileSync(finalFile),
      fileName: `${data.title}.mp4`,
      mimetype: 'video/mp4',
      caption: `*${data.title}*`,
      jpegThumbnail: jpegThumbnail
    }, { quoted: message.data });

    // Clean up
    fs.unlinkSync(tempFile);
    fs.unlinkSync(finalFile);

  } catch (err) {
    console.error("Error:", err);
    await message.reply("Failed to process video. Error: " + err.message);
  }
});

izumi({
  pattern: "song ?(.*)",
  fromMe: mode,
  desc: "Download YouTube audio",
  type: "downloader",
}, async (message, match, client) => {
  if (!match) return await message.reply("Please provide a search query or url.");

  try {
    const { videos } = await yts(match);
    if (!videos.length) return await message.reply("No videos found!");
    const video = videos[0];

    await message.reply(`_*Downloading: ${video.title}...*_`);

    const apiUrl = `https://eypz.koyeb.app/api/dl/yta?url=${encodeURIComponent(video.url)}&quality=128&apikey=akshay-eypz`;
    const { data } = await axios.get(apiUrl, {
      headers: {
        'Cache-Control': 'no-cache',
        'User-Agent': 'WhatsAppBot/1.0'
      }
    });

    if (!data?.media_url) return await message.reply("Failed to get audio link.");

    const tempFile = `temp_${Date.now()}.mp4`; // Usually .mp4 (audio stream)
    const finalFile = `final_${Date.now()}.mp3`;

    const response = await axios({ url: data.media_url, responseType: 'stream' });
    const writer = fs.createWriteStream(tempFile);
    response.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });

    // Extract audio without re-encoding (stream copy)
    await new Promise((resolve, reject) => {
      exec(`ffmpeg -i ${tempFile} -vn -acodec copy ${finalFile}`, (error) => {
        if (error) reject(error);
        else resolve();
      });
    });

    const imageBuffer = await axios.get(video.thumbnail, { responseType: "arraybuffer" }).then(res => res.data);
    const jpegThumbnail = await sharp(imageBuffer).resize(300, 300).jpeg().toBuffer();

    await client.sendMessage(message.jid, {
  audio: fs.readFileSync(finalFile),
  mimetype: 'audio/mp4',
  ptt: false, 
  contextInfo: {
    externalAdReply: {
      title: video.title,
      body: video.author.name,
      mediaType: 2,
      thumbnail: jpegThumbnail,
      mediaUrl: "https://github.com/Akshay-Eypz/izumi-bot",
      sourceUrl: "https://github.com/Akshay-Eypz/izumi-bot",
      showAdAttribution: true
    }
  }
}, { quoted: message.data });
    
    await client.sendMessage(message.jid, {
      document: fs.readFileSync(finalFile),
      fileName: `${video.title}.mp3`,
      mimetype: 'audio/mp3',
      caption: `*${video.title}*`,
      jpegThumbnail: jpegThumbnail
    }, { quoted: message.data });

    fs.unlinkSync(tempFile);
    fs.unlinkSync(finalFile);

  } catch (err) {
    console.error("Error:", err);
    await message.reply("Failed to process audio. Error: " + err.message);
  }
});

izumi({
  pattern: "yta ?(.*)",
  fromMe: mode,
  desc: "Download YouTube audio",
  type: "downloader",
}, async (message, match, client) => {
  if (!match) return await message.reply("Please provide a search query or url.");

  try {
    
    const apiUrl = `https://eypz.koyeb.app/api/dl/yta?url=${encodeURIComponent(match)}&quality=128&apikey=akshay-eypz`;
    const { data } = await axios.get(apiUrl, {
      headers: {
        'Cache-Control': 'no-cache',
        'User-Agent': 'WhatsAppBot/1.0'
      }
    });

    if (!data?.media_url) return await message.reply("Failed to get audio link.");

    await message.reply(`_*Downloading: ${data.title}...*_`);
    const tempFile = `temp_${Date.now()}.mp4`; // Usually .mp4 (audio stream)
    const finalFile = `final_${Date.now()}.mp3`;

    const response = await axios({ url: data.media_url, responseType: 'stream' });
    const writer = fs.createWriteStream(tempFile);
    response.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });

    // Extract audio without re-encoding (stream copy)
    await new Promise((resolve, reject) => {
      exec(`ffmpeg -i ${tempFile} -vn -acodec copy ${finalFile}`, (error) => {
        if (error) reject(error);
        else resolve();
      });
    });

    const imageBuffer = await axios.get(data.thumbnail, { responseType: "arraybuffer" }).then(res => res.data);
    const jpegThumbnail = await sharp(imageBuffer).resize(300, 300).jpeg().toBuffer();

    await client.sendMessage(message.jid, {
  audio: fs.readFileSync(finalFile),
  mimetype: 'audio/mp4',
  ptt: false, 
  contextInfo: {
    externalAdReply: {
      title: data.title,
      body: "",
      mediaType: 2,
      thumbnail: jpegThumbnail,
      mediaUrl: "https://github.com/Akshay-Eypz/izumi-bot",
      sourceUrl: "https://github.com/Akshay-Eypz/izumi-bot",
      showAdAttribution: true
    }
  }
}, { quoted: message.data });
    
    await client.sendMessage(message.jid, {
      document: fs.readFileSync(finalFile),
      fileName: `${data.title}.mp3`,
      mimetype: 'audio/mp3',
      caption: `*${data.title}*`,
      jpegThumbnail: jpegThumbnail
    }, { quoted: message.data });

    fs.unlinkSync(tempFile);
    fs.unlinkSync(finalFile);

  } catch (err) {
    console.error("Error:", err);
    await message.reply("Failed to process audio. Error: " + err.message);
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
    pattern: 'yts ?(.*)',
    fromMe: true,
    desc: 'Search YouTube videos',
    type: 'search'
}, async (message, match, client) => {
    if (!match) return await message.reply('Please provide a search query.');
    await sendYtResults(match, message.jid, client, message.data);
});
