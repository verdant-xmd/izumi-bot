const { izumi, mode, getJson } = require("../lib");
const config = require("../config");

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
