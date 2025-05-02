const { izumi, mode, getJson } = require("../lib");
const config = require("../config");
const animeSearch = require('../lib/animeSearch');

izumi({
  pattern: "searchanime (.*)$",
  fromMe: mode,
  desc: 'Search for anime and display results',
  type: 'anime'
}, async (message, match, client) => {
  const myr = match;
  const [query, limit] = myr.split(",");


  const searchQuery = query.trim();
  const resultLimit = limit ? parseInt(limit) : 1;

  if (!searchQuery) {
    return message.client.sendMessage(message.jid, { text: 'Please provide an anime name.' });
  }

  try {
    const res = await animeSearch(searchQuery, resultLimit);

    const data = typeof res === 'string' ? JSON.parse(res) : res;

    if (!data.results || data.results.length === 0) {
      await message.client.sendMessage(message.jid, { text: 'No anime found.' });
    } else {
      const results = data.results.slice(0, resultLimit);

      for (const anime of results) {
        const {
          title: { english, romaji, native },
          status = "Unknown",
          format = "Unknown",
          seasonYear,
          averageScore,
          episodes,
          genres = [],
          coverImage: { extraLarge, medium },
          id
        } = anime;

        const titleEnglish = english || "Unknown Title";
        const titleRomaji = romaji || "Unknown Romaji Title";
        const titleNative = native || "Unknown Native Title";
        const season = seasonYear ? `${anime.season} ${seasonYear}` : "Unknown";
        const score = averageScore ? `${averageScore}/100` : "No rating";
        const episodeCount = episodes ? `${episodes} Episodes` : "Unknown episodes";
        const genreList = genres.join(", ") || "No genres";

        const caption = `
*Anime Information*

*English Title:* ${titleEnglish}
*Romaji Title:* ${titleRomaji}
*Native Title:* ${titleNative}

*Status:* ${status}
*Format:* ${format}
*Season:* ${season}
*Score:* ${score}
*Episodes:* ${episodeCount}
*Genres:* ${genreList}
`;

        await client.sendMessage(message.jid, {
          image: { url: extraLarge },
          caption,
          contextInfo: {
            externalAdReply: {
              showAdAttribution: true,
              title: titleEnglish,
              body: `Score: ${score}`,
              mediaType: 1,
              thumbnailUrl: medium,
              renderLargerThumbnail: false,
              mediaUrl: `https://anilist.co/anime/${id}`,
              sourceUrl: `https://anilist.co/anime/${id}`
            }
          }
        }, { quoted: message.data });
      }
    }
  } catch (error) {
    console.error(error);
    await message.client.sendMessage(message.jid, { text: 'An error occurred while fetching anime information.' });
  }
});

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
