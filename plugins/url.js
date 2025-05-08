const { izumi, mode, blackVideo } = require("../lib/");
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const crypto = require("crypto");

izumi({
  pattern: 'url ?(.*)',
  fromMe: mode,
  desc: 'Upload files to Catbox.moe (fallback to personal CDN)',
  type: 'generator'
}, async (m, text) => {
  if (!m.quoted || !(m.quoted.image || m.quoted.video || m.quoted.audio)) {
    return m.reply("Please reply to an image, video, or audio.");
  }

  try {
    let mediaBuffer;
    let ext;
    let formData = new FormData();

    if (m.quoted.audio) {
      const audioPath = await m.quoted.download();
      mediaBuffer = await blackVideo(audioPath);
      fs.unlinkSync(audioPath);
      ext = 'mp4';
      fs.writeFileSync('temp.mp4', mediaBuffer);
      formData.append('reqtype', 'fileupload');
      formData.append('fileToUpload', fs.createReadStream('temp.mp4'), {
        filename: 'temp.mp4',
        contentType: 'video/mp4'
      });
    } else {
      mediaBuffer = await m.quoted.download('buffer');
      ext = m.quoted.image ? 'png' : 'mp4';
      const contentType = m.quoted.image ? 'image/png' : 'video/mp4';
      const filename = m.quoted.image ? 'upload.png' : 'video.mp4';

      formData.append('reqtype', 'fileupload');
      formData.append('fileToUpload', mediaBuffer, {
        filename,
        contentType
      });
    }

    // Try Catbox upload first
    try {
      const catboxRes = await axios.post('https://catbox.moe/user/api.php', formData, {
        headers: formData.getHeaders()
      });

      const fileUrl = catboxRes.data.trim();
      await m.reply(fileUrl);
    } catch (catboxErr) {
      // Fallback to personal server
      const hash = crypto.createHash('sha256').update(mediaBuffer).digest('hex');
      const base64 = mediaBuffer.toString('base64');

      const fallbackRes = await axios.post('https://cdn.eypz.ct.ws/upload', {
        base64,
        ext,
        filename: `${hash}.${ext}`
      });

      if (fallbackRes.data?.url) {
        await m.reply(fallbackRes.data.url);
      } else {
        await m.reply("Upload failed: No URL returned from fallback.");
      }
    }

    // Clean up if needed
    if (fs.existsSync('temp.mp4')) fs.unlinkSync('temp.mp4');

  } catch (error) {
    console.error('Error:', error);
    await m.reply(`Upload failed: ${error.message}`);
  }
});
