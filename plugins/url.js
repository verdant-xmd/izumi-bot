const { izumi, mode, blackVideo } = require("../lib/");
const axios = require('axios');
const crypto = require('crypto');
const fs = require('fs');
const fileType = require('file-type');
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
      const videoBuffer = await blackVideo(audioPath);
      fs.unlinkSync(audioPath);
      mediaBuffer = videoBuffer;
      ext = 'mp4';
    } else {
      mediaBuffer = await message.quoted.download('buffer');

      if (message.quoted.image) {
        ext = 'png';
      } else {
        const hash = crypto.createHash('sha256').update(mediaBuffer).digest('hex');
        const tempPath = `/tmp/${hash}`;
        fs.writeFileSync(tempPath, mediaBuffer);

        const type = await fileType.fromFile(tempPath);
        ext = type && ['jpg', 'jpeg', 'png', 'mp4', 'mp3'].includes(type.ext)
          ? (type.ext === 'jpeg' ? 'jpg' : type.ext)
          : 'bin';

        fs.unlinkSync(tempPath);
      }
    }

    const hash = crypto.createHash('sha256').update(mediaBuffer).digest('hex');
    const base64 = mediaBuffer.toString('base64');

    const { data: uploadRes } = await axios.post('https://cdn.eypz.ct.ws/upload', {
      base64, ext, filename: hash
    });

    const fileId = Object.values(uploadRes.result).find(x => x?.file_id)?.file_id;

    if (!fileId) {
      return await message.reply('Upload succeeded, but no file ID returned.');
    }

    const { data } = await axios.get(`https:cdn.eypz.ct.ws/getFileUrl?fileId=${fileId}`);

    await message.reply(data.streamUrl || 'URL not found.');
  } catch (err) {
    const errorMsg = err.response?.data?.message || err.message || 'Something went wrong.';
    await message.reply(`Failed: ${errorMsg}`);
  }
});
