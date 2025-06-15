const { izumi, mode, generateTTS } = require('../lib');

const googleTTS = require('google-tts-api');
izumi({
    pattern: 'tts ?(.*)',
    fromMe: mode,
    desc: 'text to speech ',
    type: 'tts',
}, async (message, match) => {
    const full = match || (message.reply_message && message.reply_message.text);
    if (!full) return await message.reply("_*Need a query*_\nexample: _*.tts Hello I'm*_");
const parts = full.includes(";") ? full.split(";") : full.split(",");
const text = parts[0];
const lang = parts[1] || "en";
const url = googleTTS.getAudioUrl(text, {
  lang: lang,
  slow: false,
  host: 'https://translate.google.com',
});
await message.sendFromUrl(url, { mimetype: 'audio/mp4', ptt: true });
});

izumi({
    pattern: 'ttsnova ?(.*)',
    fromMe: mode,
    desc: 'text to speech - nova',
    type: 'tts',
}, async (message, match) => {
    const text = match || (message.reply_message && message.reply_message.text);
    if (!text) return await message.reply("_*Need a query*_\nexample: _*.ttsnova Hello I'm nova*_");
    const result = await generateTTS(text, 'nova', "1.00");
    if (result.url) {
        await message.sendFromUrl(result.url, { mimetype: 'audio/mp4', ptt: true });
    } else {
        await message.client.sendMessage(client.user.id, {
       text: "Limit extended\nIt will refresh in next day",
         ai: true
}, { quoted: message.data });
    }
});

izumi({
    pattern: 'ttsecho ?(.*)',
    fromMe: mode,
    desc: 'text to speech - echo',
    type: 'tts',
}, async (message, match) => {
    const text = match || (message.reply_message && message.reply_message.text);
    if (!text) return await message.reply("_*Need a query*_\nexample: _*.ttsecho Hello I'm echo*_");
    const result = await generateTTS(text, 'echo', "1.00");
    if (result.url) {
        await message.sendFromUrl(result.url, { mimetype: 'audio/mp4', ptt: true });
    } else {
        await message.client.sendMessage(client.user.id, {
       text: "Limit extended\nIt will refresh in next day",
         ai: true
}, { quoted: message.data });
    }
});

izumi({
    pattern: 'ttsalloy ?(.*)',
    fromMe: mode,
    desc: 'text to speech - alloy',
    type: 'tts',
}, async (message, match) => {
    const text = match || (message.reply_message && message.reply_message.text);
    if (!text) return await message.reply("_*Need a query*_\nexample: _*.ttsalloy Hello I'm alloy*_");
    const result = await generateTTS(text, 'alloy', "1.00");
    if (result.url) {
        await message.sendFromUrl(result.url, { mimetype: 'audio/mp4', ptt: true });
    } else {
        await message.client.sendMessage(client.user.id, {
       text: "Limit extended\nIt will refresh in next day",
         ai: true
}, { quoted: message.data });
    }
});

izumi({
    pattern: 'ttsash ?(.*)',
    fromMe: mode,
    desc: 'text to speech - ash',
    type: 'tts',
}, async (message, match) => {
    const text = match || (message.reply_message && message.reply_message.text);
    if (!text) return await message.reply("_*Need a query*_\nexample: _*.ttsash Hello I'm ash*_");
    const result = await generateTTS(text, 'ash', "1.00");
    if (result.url) {
        await message.sendFromUrl(result.url, { mimetype: 'audio/mp4', ptt: true });
    } else {
        await message.client.sendMessage(client.user.id, {
       text: "Limit extended\nIt will refresh in next day",
         ai: true
}, { quoted: message.data });
    }
});

izumi({
    pattern: 'ttscoral ?(.*)',
    fromMe: mode,
    desc: 'text to speech - coral',
    type: 'tts',
}, async (message, match) => {
    const text = match || (message.reply_message && message.reply_message.text);
    if (!text) return await message.reply("_*Need a query*_\nexample: _*.ttscoral Hello I'm coral*_");
    const result = await generateTTS(text, 'coral', "1.00");
    if (result.url) {
        await message.sendFromUrl(result.url, { mimetype: 'audio/mp4', ptt: true });
    } else {
        await message.client.sendMessage(client.user.id, {
       text: "Limit extended\nIt will refresh in next day",
         ai: true
}, { quoted: message.data });
    }
});

izumi({
    pattern: 'ttsfable ?(.*)',
    fromMe: mode,
    desc: 'text to speech - fable',
    type: 'tts',
}, async (message, match) => {
    const text = match || (message.reply_message && message.reply_message.text);
    if (!text) return await message.reply("_*Need a query*_\nexample: _*.ttsfable Hello I'm fable*_");
    const result = await generateTTS(text, 'fable', "1.00");
    if (result.url) {
        await message.sendFromUrl(result.url, { mimetype: 'audio/mp4', ptt: true });
    } else {
        await message.client.sendMessage(client.user.id, {
       text: "Limit extended\nIt will refresh in next day",
         ai: true
}, { quoted: message.data });
    }
});

izumi({
    pattern: 'ttsonyx ?(.*)',
    fromMe: mode,
    desc: 'text to speech - onyx',
    type: 'tts',
}, async (message, match) => {
    const text = match || (message.reply_message && message.reply_message.text);
    if (!text) return await message.reply("_*Need a query*_\nexample: _*.ttsonyx Hello I'm onyx*_");
    const result = await generateTTS(text, 'onyx', "1.00");
    if (result.url) {
        await message.sendFromUrl(result.url, { mimetype: 'audio/mp4', ptt: true });
    } else {
        await message.client.sendMessage(client.user.id, {
       text: "Limit extended\nIt will refresh in next day",
         ai: true
}, { quoted: message.data });
    }
});

izumi({
    pattern: 'ttssage ?(.*)',
    fromMe: mode,
    desc: 'text to speech - sage',
    type: 'tts',
}, async (message, match) => {
    const text = match || (message.reply_message && message.reply_message.text);
    if (!text) return await message.reply("_*Need a query*_\nexample: _*.ttssage Hello I'm sage*_");
    const result = await generateTTS(text, 'sage', "1.00");
    if (result.url) {
        await message.sendFromUrl(result.url, { mimetype: 'audio/mp4', ptt: true });
    } else {
        await message.client.sendMessage(client.user.id, {
       text: "Limit extended\nIt will refresh in next day",
         ai: true
}, { quoted: message.data });
    }
});

izumi({
    pattern: 'ttsshimmer ?(.*)',
    fromMe: mode,
    desc: 'text to speech - shimmer',
    type: 'tts',
}, async (message, match) => {
    const text = match || (message.reply_message && message.reply_message.text);
    if (!text) return await message.reply("_*Need a query*_\nexample: _*.ttsshimmer Hello I'm shimmer*_");
    const result = await generateTTS(text, 'shimmer', "1.00");
    if (result.url) {
        await message.sendFromUrl(result.url, { mimetype: 'audio/mp4', ptt: true });
    } else {
        await message.client.sendMessage(client.user.id, {
       text: "Limit extended\nIt will refresh in next day",
         ai: true
}, { quoted: message.data });
    }
});
