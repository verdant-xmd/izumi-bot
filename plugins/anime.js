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

izumi ({
    pattern: "naruto",
    fromMe: mode,
    desc: "random Naruto anime videos",
    type: "Anime",
}, async (message, match) => {
  const { result } = await getJson(eypzApi + 'naruto');
  message.sendFromUrl(result.url, {
    contextInfo: {
      mentionedJid: [message.sender],
      forwardingScore: 1,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363298577467093@newsletter',
        newsletterName: "Iᴢᴜᴍɪ-ᴠ3",
        serverMessageId: -1
      }
    },
    caption: `${config.CAPTION}`
  });
});

izumi ({
    pattern: "onepiece",
    fromMe: mode,
    desc: "random one-piece anime videos",
    type: "Anime",
}, async (message, match) => {
const url = apiUrl + 'api/anime/onepiece?apikey=izumi-v3'
  message.sendFromUrl(url, {
    contextInfo: {
      mentionedJid: [message.sender],
      forwardingScore: 1,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363298577467093@newsletter',
        newsletterName: "Iᴢᴜᴍɪ-ᴠ3",
        serverMessageId: -1
      }
    },
    caption: `${config.CAPTION}`
  });
});

izumi ({
    pattern: "demonslayer",
    fromMe: mode,
    desc: "random demonslayer anime video",
    type: "Anime",
}, async (message, match) => {
const url = apiUrl + 'api/anime/demonslayer?apikey=izumi-v3'
  message.sendFromUrl(url, {
    contextInfo: {
      mentionedJid: [message.sender],
      forwardingScore: 1,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363298577467093@newsletter',
        newsletterName: "Iᴢᴜᴍɪ-ᴠ3",
        serverMessageId: -1
      }
    },
    caption: `${config.CAPTION}`
  });
});
