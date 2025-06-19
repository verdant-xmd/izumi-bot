const { izumi, mode, qrcode, readQr } = require('../lib/');
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const config = require("../config");
izumi({
  pattern: 'enhance$',
  fromMe: mode,
  desc: 'Enhance an image',
  type: 'tools'
}, async (m) => {
  if (!m.quoted || !m.quoted.image) {
    return m.reply("Please reply to an *image*.");
  }
  try {
    const imageBuffer = await m.quoted.download('buffer');
    if (imageBuffer.length > 50 * 1024 * 1024) return m.reply('Max file size is 50MB.');
    const filename = `upload_${Date.now()}.png`;
    const formData = new FormData();
    formData.append('file', imageBuffer, {
      filename,
      contentType: 'image/png'
    });
    const uploadRes = await axios.post('https://cdn.vioo.my.id/upload', formData, {
      headers: {
        ...formData.getHeaders(),
        'Accept': 'application/json'
      }
    });
    const fileUrl = uploadRes?.data?.data?.url;
    if (!fileUrl) return m.reply('Upload failed. Try again later.');
    const enhanceUrl = `https://bk9.fun/tools/enhance?url=https://apis.davidcyriltech.my.id/remini?url=${encodeURIComponent(fileUrl)}`;
    const finalImage = await axios.get(enhanceUrl, { responseType: 'arraybuffer' });
    await m.client.sendMessage(m.jid, {
      image: finalImage.data,
      caption: config.CAPTION || '',
    }, { quoted: m.data });
    await m.client.sendMessage(m.jid, {
      document: finalImage.data,
      fileName: `enhanced_${Date.now()}.jpg`,
      mimetype: 'image/jpeg',
      caption: `quotes: ${m.quoted?.text || ''}`,
    }, { quoted: m.data });

  } catch (err) {
    console.error(err);
    m.reply('Something went wrong! Please try again later.');
  }
});
izumi(
  {
    pattern: "qr ?(.*)",
    fromMe: mode,
    desc: "Write Qr.",
    type: "generator",
  },
  async (message, match) => {
    match = match || (message.reply_message && message.reply_message.text);

    if (match) {
      let buff = await qrcode(match);
      return await message.sendMessage(message.jid, buff, {}, "image");
    } else if (message.reply_message && message.reply_message.image) {
      const buffer = await message.reply_message.download();
      readQr(buffer)
        .then(async (data) => {
          return await message.sendMessage(message.jid, data);
        })
      .catch(async (error) => {
          console.error("Error:", error.message);
          return await message.sendMessage(message.jid, error.message);
        });
    } else {
      return await message.sendMessage(
        message.jid,
        "*Example : qr test*\n*Reply to a qr image.*"
      );
    }
  }
);
