const { izumi, mode, blackVideo } = require("../lib/");
const axios = require('axios');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

izumi({
  pattern: "url$",
  fromMe: mode,
  desc: 'Upload quoted media to server and get streamable URL',
  type: 'generator'
}, async (message) => {
  if (!message.quoted || !(message.quoted.image || message.quoted.video || message.quoted.audio)) {
    return await message.reply('Reply to an image, video, or audio.');
  }

  try {
    let mediaBuffer;
    let ext;

    if (message.quoted.audio) {
      const audioPath = await message.quoted.download();
      mediaBuffer = await blackVideo(audioPath); // Convert to black video
      fs.unlinkSync(audioPath);
      ext = 'mp4';
    } else {
      mediaBuffer = await message.quoted.download('buffer');
      ext = message.quoted.image ? 'png' : message.quoted.video ? 'mp4' : 'bin';
    }

    const hash = crypto.createHash('sha256').update(mediaBuffer).digest('hex');
    const filename = `${hash}.${ext}`;
    const base64 = mediaBuffer.toString('base64');

    const { data: uploadRes } = await axios.post('https://cdn.eypz.ct.ws/upload', {
      base64, ext, filename
    });

    const url = uploadRes?.url || uploadRes?.result?.url;

    if (!url) {
      return await message.reply('Upload failed: No URL returned.');
    }

    await message.reply(url);
  } catch (err) {
    const errorMsg = err.response?.data?.message || err.message || 'Something went wrong.';
    await message.reply(`Failed: ${errorMsg}`);
  }
});
