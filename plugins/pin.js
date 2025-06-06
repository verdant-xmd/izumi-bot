const { izumi, mode, getJson } = require("../lib");
const config = require("../config");
const gis = require("../lib/gis");
izumi(
  {
    pattern: "pinterest ?(.*)",
    fromMe: mode,
    desc: "Download Pinterest videos or images",
    type: "downloader",
  },
  async (message, match) => {
    try {
      match = match || message.reply_message.text || message.quoted?.text;
     if (!match) {
        await message.reply("Please provide a Pinterest URL", {}, "text", message);
        return;
      }
      const result = await getJson(`https://eypz.koyeb.app/api/dl/pin?url=${match}`);
      if (!result || result.status !== "success" || !result.media_urls) {
        await message.reply("Invalid response from the API", {}, "text", message);
        return;
      }
      const media = result.media_urls.video || result.media_urls.image;
      if (!media) {
        await message.reply("No media found in the provided URL", {}, "text", message);
        return;
      }
      await message.sendFromUrl(media, { quoted: message.data });
    } catch (error) {
      console.error(error);
      await message.reply("An error occurred while processing your request.", {}, "text", message);
    }
  }
);

izumi({
  pattern: 'img ?(.*)',
  fromMe: mode,
  desc: 'google image',
  type: 'search',
}, async (message, match, client) => {
  const searchTerm = match;
  const results = await gis(searchTerm);
  const validImageExtensions = /\.(jpg|jpeg|png|gif|bmp|webp)$/i;
  const imageUrls = results
    .map(r => r.url)
    .filter(url => validImageExtensions.test(url))
    .slice(0, 5);
  if (imageUrls.length === 0) {
    return message.reply("No valid image URLs found.");
  }
  for (const url of imageUrls) {
    try {
      const buffer = (await axios.get(url, { responseType: "arraybuffer" })).data;
      await client.sendMessage(message.jid, { image: buffer, caption: `Result for: ${searchTerm}` }, { quoted: message.data });
    } catch (err) {
      console.warn(`Failed to send image from: ${url}`);
    }
  }
});
