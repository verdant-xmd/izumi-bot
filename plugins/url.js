const { izumi, mode, blackVideo, parsedUrl } = require("../lib/");
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const crypto = require("crypto");

izumi({
  pattern: 'url ?(.*)',
  fromMe: mode,
  desc: 'Upload files to cdn.vioo.my.id (with fallback)',
  type: 'generator'
}, async (m, text) => {
  if (!m.quoted || !(m.quoted.image || m.quoted.video || m.quoted.audio)) {
    return m.reply("Please reply to an image, video, or audio.");
  }

  try {
    let mediaBuffer;
    let ext;
    let filename;
    let formData = new FormData();

    if (m.quoted.audio) {
      const audioPath = await m.quoted.download();
      mediaBuffer = await blackVideo(audioPath);
      fs.unlinkSync(audioPath);
      ext = 'mp4';
      filename = 'temp.mp4';
      fs.writeFileSync(filename, mediaBuffer);
      formData.append('file', fs.createReadStream(filename), {
        filename,
        contentType: 'video/mp4'
      });
    } else {
      mediaBuffer = await m.quoted.download('buffer');
      if (mediaBuffer.length > 50 * 1024 * 1024) return m.reply('Max file size is 50MB.');

      if (m.quoted.image) {
        ext = 'png';
        filename = `upload_${Date.now()}.png`;
        formData.append('file', mediaBuffer, {
          filename,
          contentType: 'image/png'
        });
      } else {
        ext = 'mp4';
        filename = `upload_${Date.now()}.mp4`;
        formData.append('file', mediaBuffer, {
          filename,
          contentType: 'video/mp4'
        });
      }
    }

    try {
      const { data } = await axios.post('https://cdn.vioo.my.id/upload', formData, {
        headers: {
          ...formData.getHeaders(),
          'Accept': 'application/json'
        }
      });

      if (data?.data?.url) {
        await m.reply(data.data.url);
      } else {
        throw new Error('Upload failed: No URL returned.');
      }

    } catch (uploadErr) {
      const hash = crypto.createHash('sha256').update(mediaBuffer).digest('hex');
      const fallbackFilename = `${hash}.${ext}`;
      const base64Content = mediaBuffer.toString('base64');

      const fallbackRes = await axios.post('https://cdn.eypz.ct.ws/upload', {
        base64: base64Content,
        ext,
        filename: fallbackFilename
      });

      if (fallbackRes.data?.url) {
        await m.reply(fallbackRes.data.url);
      } else {
        await m.reply("Fallback upload failed: No URL returned.");
      }
    }

    if (fs.existsSync('temp.mp4')) fs.unlinkSync('temp.mp4');

  } catch (err) {
    const errorMsg = err.response?.data?.message || err.message || 'Upload failed.';
    await m.reply('Upload failed.');
  }
});

izumi(
  {
    pattern: "upload ?(.*)",
    fromMe: mode,
    desc: "send files from multiple URLs",
    type: "misc",
  },
  async (message, match) => {
    match = match || message.quoted?.text;
    if (!match) {
      return await message.send("_reply to a url_");
    }
        await message.sendFromUrl(parsedUrl(match));
      
  }
);

izumi({
  pattern: 'shorturl ?(.*)',
  fromMe: true,
  desc: 'Shorten URLs',
  type: 'generator'
}, async (message, match, client) => {
  if (!match) return await message.reply('Please provide a URL to shorten.');
const longUrl = match.trim();
const res = await axios.post('https://i.opz.rf.gd/shorten', {
  url: longUrl,
  apikey: 'izumi-x-api'
}, {
  headers: {
    'Content-Type': 'application/json'
  }
});
await message.reply(res.data.short_url)
})
