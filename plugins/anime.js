const { izumi, mode, getJson } = require("../lib");
const config = require("../config");

izumi({
  pattern: "waifu",
  fromMe: mode,
  desc: "Random waifu image",
  type: "Anime",
}, async (message) => {
  const { url } = await getJson("https://api.waifu.pics/sfw/waifu");
  await message.sendFromUrl(url, { caption: config.CAPTION });
});

izumi({
  pattern: "neko",
  fromMe: mode,
  desc: "Random neko image",
  type: "Anime",
}, async (message) => {
  const { url } = await getJson("https://api.waifu.pics/sfw/neko");
  await message.sendFromUrl(url, { caption: config.CAPTION });
});

izumi({
  pattern: "loli",
  fromMe: mode,
  desc: "Random loli image",
  type: "Anime",
}, async (message) => {
  const { url } = await getJson("https://api.waifu.pics/sfw/neko");
  await message.sendFromUrl(url, { caption: config.CAPTION });
});

izumi({
  pattern: "shinobu",
  fromMe: mode,
  desc: "Random Shinobu image",
  type: "Anime",
}, async (message) => {
  const { url } = await getJson("https://api.waifu.pics/sfw/shinobu");
  await message.sendFromUrl(url, { caption: config.CAPTION });
});

izumi({
  pattern: "megumin",
  fromMe: mode,
  desc: "Random Megumin image",
  type: "Anime",
}, async (message) => {
  const { url } = await getJson("https://api.waifu.pics/sfw/megumin");
  await message.sendFromUrl(url, { caption: config.CAPTION });
});
