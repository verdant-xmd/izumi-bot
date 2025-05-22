const { izumi, getJson, mode } = require("../lib");
const axios = require('axios');
const fs = require('fs');
const path = require('path');

izumi({
    pattern: 'ttsnova ?(.*)',
    fromMe: mode,
    desc: 'text to speech',
    type: 'tts',
}, async (message, match, client) => {
    const text = match || (message.reply_message && message.reply_message.text);
    if (!text) return await message.reply("_*Need a query*_\nexample: _*.tts-nova Hello I'm nova*_");
    const ttsJson = await getJson(`https://api.eypz.ct.ws/api/ai/tts?text=${encodeURIComponent(text)}&character=nova&speed=1.00`);
    if (!ttsJson || !ttsJson.url) return await message.reply("TTS URL not found.");
    const tempPath = path.join(__dirname, 'temp-tts.mp4');
    const writer = fs.createWriteStream(tempPath);
    const response = await axios.get(ttsJson.url, { responseType: 'stream' });
    response.data.pipe(writer);
    await new Promise((res, rej) => { writer.on('finish', res); writer.on('error', rej); });
    await client.sendMessage(message.jid, { audio: fs.readFileSync(tempPath), mimetype: 'audio/mp4', ptt: true }, { quoted: message.data });
    fs.unlinkSync(tempPath);
});

izumi({
    pattern: 'ttsalloy ?(.*)',
    fromMe: mode,
    desc: 'text to speech',
    type: 'tts',
}, async (message, match, client) => {
    const text = match || (message.reply_message && message.reply_message.text);
    if (!text) return await message.reply("_*Need a query*_\nexample: _*.tts-alloy Hello I'm alloy*_");
    const ttsJson = await getJson(`https://api.eypz.ct.ws/api/ai/tts?text=${encodeURIComponent(text)}&character=alloy&speed=1.00`);
    if (!ttsJson || !ttsJson.url) return await message.reply("TTS URL not found.");
    const tempPath = path.join(__dirname, 'temp-tts.mp4');
    const writer = fs.createWriteStream(tempPath);
    const response = await axios.get(ttsJson.url, { responseType: 'stream' });
    response.data.pipe(writer);
    await new Promise((res, rej) => { writer.on('finish', res); writer.on('error', rej); });
    await client.sendMessage(message.jid, { audio: fs.readFileSync(tempPath), mimetype: 'audio/mp4', ptt: true }, { quoted: message.data });
    fs.unlinkSync(tempPath);
});

izumi({
    pattern: 'ttsash ?(.*)',
    fromMe: mode,
    desc: 'text to speech',
    type: 'tts',
}, async (message, match, client) => {
    const text = match || (message.reply_message && message.reply_message.text);
    if (!text) return await message.reply("_*Need a query*_\nexample: _*.tts-ash Hello I'm ash*_");
    const ttsJson = await getJson(`https://api.eypz.ct.ws/api/ai/tts?text=${encodeURIComponent(text)}&character=ash&speed=1.00`);
    if (!ttsJson || !ttsJson.url) return await message.reply("TTS URL not found.");
    const tempPath = path.join(__dirname, 'temp-tts.mp4');
    const writer = fs.createWriteStream(tempPath);
    const response = await axios.get(ttsJson.url, { responseType: 'stream' });
    response.data.pipe(writer);
    await new Promise((res, rej) => { writer.on('finish', res); writer.on('error', rej); });
    await client.sendMessage(message.jid, { audio: fs.readFileSync(tempPath), mimetype: 'audio/mp4', ptt: true }, { quoted: message.data });
    fs.unlinkSync(tempPath);
});

izumi({
    pattern: 'ttscoral ?(.*)',
    fromMe: mode,
    desc: 'text to speech',
    type: 'tts',
}, async (message, match, client) => {
    const text = match || (message.reply_message && message.reply_message.text);
    if (!text) return await message.reply("_*Need a query*_\nexample: _*.tts-coral Hello I'm coral*_");
    const ttsJson = await getJson(`https://api.eypz.ct.ws/api/ai/tts?text=${encodeURIComponent(text)}&character=coral&speed=1.00`);
    if (!ttsJson || !ttsJson.url) return await message.reply("TTS URL not found.");
    const tempPath = path.join(__dirname, 'temp-tts.mp4');
    const writer = fs.createWriteStream(tempPath);
    const response = await axios.get(ttsJson.url, { responseType: 'stream' });
    response.data.pipe(writer);
    await new Promise((res, rej) => { writer.on('finish', res); writer.on('error', rej); });
    await client.sendMessage(message.jid, { audio: fs.readFileSync(tempPath), mimetype: 'audio/mp4', ptt: true }, { quoted: message.data });
    fs.unlinkSync(tempPath);
});

izumi({
    pattern: 'ttsecho ?(.*)',
    fromMe: mode,
    desc: 'text to speech',
    type: 'tts',
}, async (message, match, client) => {
    const text = match || (message.reply_message && message.reply_message.text);
    if (!text) return await message.reply("_*Need a query*_\nexample: _*.tts-echo Hello I'm echo*_");
    const ttsJson = await getJson(`https://api.eypz.ct.ws/api/ai/tts?text=${encodeURIComponent(text)}&character=echo&speed=1.00`);
    if (!ttsJson || !ttsJson.url) return await message.reply("TTS URL not found.");
    const tempPath = path.join(__dirname, 'temp-tts.mp4');
    const writer = fs.createWriteStream(tempPath);
    const response = await axios.get(ttsJson.url, { responseType: 'stream' });
    response.data.pipe(writer);
    await new Promise((res, rej) => { writer.on('finish', res); writer.on('error', rej); });
    await client.sendMessage(message.jid, { audio: fs.readFileSync(tempPath), mimetype: 'audio/mp4', ptt: true }, { quoted: message.data });
    fs.unlinkSync(tempPath);
});

izumi({
    pattern: 'ttsfable ?(.*)',
    fromMe: mode,
    desc: 'text to speech',
    type: 'tts',
}, async (message, match, client) => {
    const text = match || (message.reply_message && message.reply_message.text);
    if (!text) return await message.reply("_*Need a query*_\nexample: _*.tts-fable Hello I'm fable*_");
    const ttsJson = await getJson(`https://api.eypz.ct.ws/api/ai/tts?text=${encodeURIComponent(text)}&character=fable&speed=1.00`);
    if (!ttsJson || !ttsJson.url) return await message.reply("TTS URL not found.");
    const tempPath = path.join(__dirname, 'temp-tts.mp4');
    const writer = fs.createWriteStream(tempPath);
    const response = await axios.get(ttsJson.url, { responseType: 'stream' });
    response.data.pipe(writer);
    await new Promise((res, rej) => { writer.on('finish', res); writer.on('error', rej); });
    await client.sendMessage(message.jid, { audio: fs.readFileSync(tempPath), mimetype: 'audio/mp4', ptt: true }, { quoted: message.data });
    fs.unlinkSync(tempPath);
});

izumi({
    pattern: 'ttsonyx ?(.*)',
    fromMe: mode,
    desc: 'text to speech',
    type: 'tts',
}, async (message, match, client) => {
    const text = match || (message.reply_message && message.reply_message.text);
    if (!text) return await message.reply("_*Need a query*_\nexample: _*.tts-onyx Hello I'm onyx*_");
    const ttsJson = await getJson(`https://api.eypz.ct.ws/api/ai/tts?text=${encodeURIComponent(text)}&character=onyx&speed=1.00`);
    if (!ttsJson || !ttsJson.url) return await message.reply("TTS URL not found.");
    const tempPath = path.join(__dirname, 'temp-tts.mp4');
    const writer = fs.createWriteStream(tempPath);
    const response = await axios.get(ttsJson.url, { responseType: 'stream' });
    response.data.pipe(writer);
    await new Promise((res, rej) => { writer.on('finish', res); writer.on('error', rej); });
    await client.sendMessage(message.jid, { audio: fs.readFileSync(tempPath), mimetype: 'audio/mp4', ptt: true }, { quoted: message.data });
    fs.unlinkSync(tempPath);
});

izumi({
    pattern: 'ttssage ?(.*)',
    fromMe: mode,
    desc: 'text to speech',
    type: 'tts',
}, async (message, match, client) => {
    const text = match || (message.reply_message && message.reply_message.text);
    if (!text) return await message.reply("_*Need a query*_\nexample: _*.tts-onyx Hello I'm sage*_");
    const ttsJson = await getJson(`https://api.eypz.ct.ws/api/ai/tts?text=${encodeURIComponent(text)}&character=sage&speed=1.00`);
    if (!ttsJson || !ttsJson.url) return await message.reply("TTS URL not found.");
    const tempPath = path.join(__dirname, 'temp-tts.mp4');
    const writer = fs.createWriteStream(tempPath);
    const response = await axios.get(ttsJson.url, { responseType: 'stream' });
    response.data.pipe(writer);
    await new Promise((res, rej) => { writer.on('finish', res); writer.on('error', rej); });
    await client.sendMessage(message.jid, { audio: fs.readFileSync(tempPath), mimetype: 'audio/mp4', ptt: true }, { quoted: message.data });
    fs.unlinkSync(tempPath);
});

izumi({
    pattern: 'ttsshimmer ?(.*)',
    fromMe: mode,
    desc: 'text to speech',
    type: 'tts',
}, async (message, match, client) => {
    const text = match || (message.reply_message && message.reply_message.text);
    if (!text) return await message.reply("_*Need a query*_\nexample: _*.tts-onyx Hello I'm shimmer*_");
    const ttsJson = await getJson(`https://api.eypz.ct.ws/api/ai/tts?text=${encodeURIComponent(text)}&character=shimmer&speed=1.00`);
    if (!ttsJson || !ttsJson.url) return await message.reply("TTS URL not found.");
    const tempPath = path.join(__dirname, 'temp-tts.mp4');
    const writer = fs.createWriteStream(tempPath);
    const response = await axios.get(ttsJson.url, { responseType: 'stream' });
    response.data.pipe(writer);
    await new Promise((res, rej) => { writer.on('finish', res); writer.on('error', rej); });
    await client.sendMessage(message.jid, { audio: fs.readFileSync(tempPath), mimetype: 'audio/mp4', ptt: true }, { quoted: message.data });
    fs.unlinkSync(tempPath);
});
