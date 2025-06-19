const { izumi, getJson, mode, deepImage, deepChat, chatbot } = require("../lib");
const {
  getStatus,
  getGender,
  setBotStatus,
  setBotGender
} = require("../lib/database/chatBot");
const contextInfo = {
    externalAdReply: {
        title: "AI Generated Image",
        body: "Powered by Eypz AI",
        mediaType: 2,
        thumbnailUrl: "https://files.catbox.moe/1z6pjq.png",
        renderLargerThumbnail: false,
        showAdAttribution: false,
        sourceUrl: "https://api.eypz.ct.ws",
        mediUrl: "https://api.eypz.ct.ws"
    }
};

izumi({
    pattern: '^qwen3 ?(.*)',
    fromMe: mode,
    desc: 'AI Chat (qwen-3-235b)',
    type: 'ai',
}, async (message, match) => {
    const prompt = match || (message.reply_message && message.reply_message.text);
    if (!prompt) return await message.reply("_*Need a query!*_\nExample: .qwen3 Who are you?");

    try {
        const text = await deepChat(prompt, 'qwen-3-235b');
        await message.client.sendMessage(message.jid, { text, contextInfo }, { quoted: message.data });
    } catch (err) {
        await message.reply(`❌ Error: ${err.message}`);
    }
});

// gpt41
izumi({
    pattern: '41gpt ?(.*)',
    fromMe: mode,
    desc: 'AI Chat (gpt-4.1)',
    type: 'ai',
}, async (message, match) => {
    const prompt = match || (message.reply_message && message.reply_message.text);
    if (!prompt) return await message.reply("_*Need a query!*_\nExample: .gpt41 What is JavaScript?");

    try {
        const text = await deepChat(prompt, 'gpt-4.1');
        await message.client.sendMessage(message.jid, { text, contextInfo }, { quoted: message.data });
    } catch (err) {
        await message.reply(`❌ Error: ${err.message}`);
    }
});

// gpt4o
izumi({
    pattern: '4ogpt ?(.*)',
    fromMe: mode,
    desc: 'AI Chat (gpt-4o)',
    type: 'ai',
}, async (message, match) => {
    const prompt = match || (message.reply_message && message.reply_message.text);
    if (!prompt) return await message.reply("_*Need a query!*_\nExample: .gpt4o Tell me a story");

    try {
        const text = await deepChat(prompt, 'gpt-4o');
        await message.client.sendMessage(message.jid, { text, contextInfo }, { quoted: message.data });
    } catch (err) {
        await message.reply(`❌ Error: ${err.message}`);
    }
});

// minigpt4o
izumi({
    pattern: 'minigpt4o ?(.*)',
    fromMe: mode,
    desc: 'AI Chat (minigpt4o)',
    type: 'ai',
}, async (message, match) => {
    const prompt = match || (message.reply_message && message.reply_message.text);
    if (!prompt) return await message.reply("_*Need a query!*_\nExample: .minigpt4o How are you?");

    try {
        const text = await deepChat(prompt, 'minigpt4o');
        await message.client.sendMessage(message.jid, { text, contextInfo }, { quoted: message.data });
    } catch (err) {
        await message.reply(`❌ Error: ${err.message}`);
    }
});

// llama4scout
izumi({
    pattern: 'llama4scout ?(.*)',
    fromMe: mode,
    desc: 'AI Chat (llama4scout)',
    type: 'ai',
}, async (message, match) => {
    const prompt = match || (message.reply_message && message.reply_message.text);
    if (!prompt) return await message.reply("_*Need a query!*_\nExample: .llama4scout Give me advice");

    try {
        const text = await deepChat(prompt, 'llama4scout');
        await message.client.sendMessage(message.jid, { text, contextInfo }, { quoted: message.data });
    } catch (err) {
        await message.reply(`❌ Error: ${err.message}`);
    }
});

// llama4maverick
izumi({
    pattern: 'llama4maverick ?(.*)',
    fromMe: mode,
    desc: 'AI Chat (llama4maverick)',
    type: 'ai',
}, async (message, match) => {
    const prompt = match || (message.reply_message && message.reply_message.text);
    if (!prompt) return await message.reply("_*Need a query!*_\nExample: .llama4maverick Tell me a joke");

    try {
        const text = await deepChat(prompt, 'llama4maverick');
        await message.client.sendMessage(message.jid, { text, contextInfo }, { quoted: message.data });
    } catch (err) {
        await message.reply(`❌ Error: ${err.message}`);
    }
});

// deepseek
izumi({
    pattern: 'deepseek ?(.*)',
    fromMe: mode,
    desc: 'AI Chat (deepseek)',
    type: 'ai',
}, async (message, match) => {
    const prompt = match || (message.reply_message && message.reply_message.text);
    if (!prompt) return await message.reply("_*Need a query!*_\nExample: .deepseek Translate this sentence");

    try {
        const text = await deepChat(prompt, 'deepseek');
        await message.client.sendMessage(message.jid, { text, contextInfo }, { quoted: message.data });
    } catch (err) {
        await message.reply(`❌ Error: ${err.message}`);
    }
});

// qwq
izumi({
    pattern: 'qwq ?(.*)',
    fromMe: mode,
    desc: 'AI Chat (qwq)',
    type: 'ai',
}, async (message, match) => {
    const prompt = match || (message.reply_message && message.reply_message.text);
    if (!prompt) return await message.reply("_*Need a query!*_\nExample: .qwq Hi there!");

    try {
        const text = await deepChat(prompt, 'qwq');
        await message.client.sendMessage(message.jid, { text, contextInfo }, { quoted: message.data });
    } catch (err) {
        await message.reply(`❌ Error: ${err.message}`);
    }
});
// Ghibli
izumi({
    pattern: 'ghibli ?(.*)',
    fromMe: mode,
    desc: 'AI Image Generator (Ghibli)',
    type: 'ai',
}, async (message, match) => {
    const input = match || (message.reply_message && message.reply_message.text);
    if (!input) return await message.reply("_*Need a query!*_\nExample: .ghibli A castle in the sky,1:1");

    let [prompt, size] = input.split(',');
    prompt = prompt.trim();
    size = size ? size.trim() : '1:1';

    try {
        const url = await deepImage(prompt, 'ghibli', size);
        await message.client.sendMessage(message.jid, { image: { url }, caption: `${prompt}\n\nStyle: Ghibli\nSize: ${size}`, contextInfo }, { quoted: message.data });
    } catch (err) {
        await message.reply(`❌ Error: ${err.message}`);
    }
});

// Cyberpunk
izumi({
    pattern: 'cyberpunk ?(.*)',
    fromMe: mode,
    desc: 'AI Image Generator (Cyberpunk)',
    type: 'ai',
}, async (message, match) => {
    const input = match || (message.reply_message && message.reply_message.text);
    if (!input) return await message.reply("_*Need a query!*_\nExample: .cyberpunk Futuristic city,1:1");

    let [prompt, size] = input.split(',');
    prompt = prompt.trim();
    size = size ? size.trim() : '1:1';

    try {
        const url = await deepImage(prompt, 'cyberpunk', size);
        await message.client.sendMessage(message.jid, { image: { url }, caption: `${prompt}\n\nStyle: Cyberpunk\nSize: ${size}`, contextInfo }, { quoted: message.data });
    } catch (err) {
        await message.reply(`❌ Error: ${err.message}`);
    }
});

// Anime
izumi({
    pattern: 'anime ?(.*)',
    fromMe: mode,
    desc: 'AI Image Generator (Anime)',
    type: 'ai',
}, async (message, match) => {
    const input = match || (message.reply_message && message.reply_message.text);
    if (!input) return await message.reply("_*Need a query!*_\nExample: .anime Cute anime girl,1:1");

    let [prompt, size] = input.split(',');
    prompt = prompt.trim();
    size = size ? size.trim() : '1:1';

    try {
        const url = await deepImage(prompt, 'anime', size);
        await message.client.sendMessage(message.jid, { image: { url }, caption: `${prompt}\n\nStyle: Anime\nSize: ${size}`, contextInfo }, { quoted: message.data });
    } catch (err) {
        await message.reply(`❌ Error: ${err.message}`);
    }
});

// Chibi
izumi({
    pattern: 'chibi ?(.*)',
    fromMe: mode,
    desc: 'AI Image Generator (Chibi)',
    type: 'ai',
}, async (message, match) => {
    const input = match || (message.reply_message && message.reply_message.text);
    if (!input) return await message.reply("_*Need a query!*_\nExample: .chibi Little chibi girl,1:1");

    let [prompt, size] = input.split(',');
    prompt = prompt.trim();
    size = size ? size.trim() : '1:1';

    try {
        const url = await deepImage(prompt, 'chibi', size);
        await message.client.sendMessage(message.jid, { image: { url }, caption: `${prompt}\n\nStyle: Chibi\nSize: ${size}`, contextInfo }, { quoted: message.data });
    } catch (err) {
        await message.reply(`❌ Error: ${err.message}`);
    }
});

// Pixel Art
izumi({
    pattern: 'pixelart ?(.*)',
    fromMe: mode,
    desc: 'AI Image Generator (Pixel Art)',
    type: 'ai',
}, async (message, match) => {
    const input = match || (message.reply_message && message.reply_message.text);
    if (!input) return await message.reply("_*Need a query!*_\nExample: .pixelart Retro car,1:1");

    let [prompt, size] = input.split(',');
    prompt = prompt.trim();
    size = size ? size.trim() : '1:1';

    try {
        const url = await deepImage(prompt, 'pixel art', size);
        await message.client.sendMessage(message.jid, { image: { url }, caption: `${prompt}\n\nStyle: Pixel Art\nSize: ${size}`, contextInfo }, { quoted: message.data });
    } catch (err) {
        await message.reply(`❌ Error: ${err.message}`);
    }
});

// Oil Painting
izumi({
    pattern: 'oilpainting ?(.*)',
    fromMe: mode,
    desc: 'AI Image Generator (Oil Painting)',
    type: 'ai',
}, async (message, match) => {
    const input = match || (message.reply_message && message.reply_message.text);
    if (!input) return await message.reply("_*Need a query!*_\nExample: .oilpainting Beautiful woman,1:1");

    let [prompt, size] = input.split(',');
    prompt = prompt.trim();
    size = size ? size.trim() : '1:1';

    try {
        const url = await deepImage(prompt, 'oil painting', size);
        await message.client.sendMessage(message.jid, { image: { url }, caption: `${prompt}\n\nStyle: Oil Painting\nSize: ${size}`, contextInfo }, { quoted: message.data });
    } catch (err) {
        await message.reply(`❌ Error: ${err.message}`);
    }
});

// 3D
izumi({
    pattern: '3d ?(.*)',
    fromMe: mode,
    desc: 'AI Image Generator (3D)',
    type: 'ai',
}, async (message, match) => {
    const input = match || (message.reply_message && message.reply_message.text);
    if (!input) return await message.reply("_*Need a query!*_\nExample: .3d Robot,1:1");

    let [prompt, size] = input.split(',');
    prompt = prompt.trim();
    size = size ? size.trim() : '1:1';

    try {
        const url = await deepImage(prompt, '3d', size);
        await message.client.sendMessage(message.jid, { image: { url }, caption: `${prompt}\n\nStyle: 3D\nSize: ${size}`, contextInfo }, { quoted: message.data });
    } catch (err) {
        await message.reply(`❌ Error: ${err.message}`);
    }
});

// Realism (default)
izumi({
    pattern: 'deepimg ?(.*)',
    fromMe: mode,
    desc: 'AI Image Generator',
    type: 'ai',
}, async (message, match) => {
    const input = match || (message.reply_message && message.reply_message.text);
    if (!input) return await message.reply("_*Need a query!*_\nExample: .realism Street at night,1:1");

    let [prompt, size] = input.split(',');
    prompt = prompt.trim();
    size = size ? size.trim() : '1:1';

    try {
        const url = await deepImage(prompt, 'default', size);
        await message.client.sendMessage(message.jid, { image: { url }, caption: `${prompt}\n\nStyle: Realism\nSize: ${size}`, contextInfo }, { quoted: message.data });
    } catch (err) {
        await message.reply(`❌ Error: ${err.message}`);
    }
});

izumi({
    pattern: 'gpt3 ?(.*)',
    fromMe: mode,
    desc: 'chat gpt',
    type: 'ai',
}, async (message, match, client) => {
    const text = match || (message.reply_message && message.reply_message.text);
if (!text) return await message.reply("_*Need a query*_");
const data = await getJson(`https://api.eypz.ct.ws/api/ai/gpt?text=${text}&model=gpt3`);
const quotedMessage = {
  key: {
    fromMe: false,
    remoteJid: "18002428478@s.whatsapp.net",
    id: "FAKE_MESSAGE_ID",
    participant: "18002428478@s.whatsapp.net"
  },
  message: {
    extendedTextMessage: {
      text: "GPT-3"
    }
  }
};

await client.sendMessage(
  message.jid,
  {
    text: data.response,
    contextInfo: {
      mentionedJid: [message.sender],
      forwardingScore: 1,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363298577467093@newsletter",
        newsletterName: "GPT",
        serverMessageId: -1
      },
      externalAdReply: {
        title: "Chat Gpt 3",
        body: "Powered by Eypz API",
        mediaType: 2,
        thumbnailUrl: "https://files.catbox.moe/saleb0.png",
        showAdAttribution: true,
        mediaUrl: "https://eypz.rf.gd",
        sourceUrl: "https://eypz.rf.gd"
      }
    }
  },
  { quoted: quotedMessage }
)
});
izumi({
    pattern: 'gpt4 ?(.*)',
    fromMe: mode,
    desc: 'chat gpt',
    type: 'ai',
}, async (message, match, client) => {
    const text = match || (message.reply_message && message.reply_message.text);
if (!text) return await message.reply("_*Need a query*_");
const data = await getJson(`https://api.eypz.ct.ws/api/ai/gpt?text=${text}&model=gpt4`);
const quotedMessage = {
  key: {
    fromMe: false,
    remoteJid: "18002428478@s.whatsapp.net",
    id: "FAKE_MESSAGE_ID",
    participant: "18002428478@s.whatsapp.net"
  },
  message: {
    extendedTextMessage: {
      text: "GPT-4"
    }
  }
};

await client.sendMessage(
  message.jid,
  {
    text: data.response,
    contextInfo: {
      mentionedJid: [message.sender],
      forwardingScore: 1,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363298577467093@newsletter",
        newsletterName: "GPT",
        serverMessageId: -1
      },
      externalAdReply: {
        title: "Chat Gpt 4",
        body: "Powered by Eypz API",
        mediaType: 2,
        thumbnailUrl: "https://files.catbox.moe/saleb0.png",
        showAdAttribution: true,
        mediaUrl: "https://eypz.rf.gd",
        sourceUrl: "https://eypz.rf.gd"
      }
    }
  },
  { quoted: quotedMessage }
)
});
izumi({
    pattern: 'flux ?(.*)',
    fromMe: mode,
    desc: 'text to image',
    type: 'ai',
}, async (message, match, client) => {
const text = match || (message.reply_message && message.reply_message.text);
if (!text) return await message.reply("_*Need a query*_\nexample: _*.flux A realistic portrait of a Japanese teenage girl with white hair, sitting in front of a high-end gaming PC, playing GTA V. She is focused on the screen, wearing casual modern clothes, in a cozy gaming room with RGB lighting and gaming accessories around her_");
await message.client.sendMessage(
  message.jid,
  {
    image: { url: `https://api.eypz.ct.ws/api/ai/flux?prompt=${text}`},
    caption: text,
    contextInfo: {
      externalAdReply: {
        title: "AI Generated Image",
        body: "Powered by Eypz API",
        mediaType: 2,
        thumbnailUrl: "https://files.catbox.moe/1z6pjq.png",
        renderLargerThumbnail: false,
        showAdAttribution: true,
        sourceUrl: "https://api.eypz.ct.ws"
      }
    }
  },
  { quoted: message.data }
)
});


const GEMINI_HELP = `No API key found.

Please get a Gemini API key from:
https://aistudio.google.com/apikey

Then set it using:
.setvar GEMINI_API_KEY`;

izumi({
  pattern: "izumi ?(.*)",
  fromMe: mode, // or use mode if dynamic
  desc: "Ask AI",
  type: "ai"
}, async (message, match) => {
  const prompt = match.trim();
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return await message.reply(GEMINI_HELP);
  }

  if (!prompt && !message.quoted) {
    return await message.reply("Need a prompt to start chat.");
  }

  await chatbot(message, prompt, apiKey);
});

// Auto-response to messages
izumi({
  on: "text",
  fromMe: false,
  dontAddCommandList: true
}, async (message) => {
  if (message.sender === message.user) return;

  const jid = message.jid;
  const isOn = await getStatus(jid);
  if (!isOn) return;

  const isPrivate = !jid.endsWith("@g.us");
  const isMentioned = Array.isArray(message.mention) && message.mention.includes(message.user);
  const isReplied = message.msg?.contextInfo?.participant === message.user;

  if (!(isPrivate || isMentioned || isReplied)) return;

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return;

  const prompt = message.text || "";
  if (!prompt.trim()) return;

  await chatbot(message, prompt, apiKey);
});

// Chatbot control and gender setting
izumi({
  pattern: "chatbot ?(.*)",
  fromMe: true,
  desc: "Enable/Disable chatbot and switch gender",
  type: "ai"
}, async (message, match) => {
  const input = match.trim().toLowerCase();
  const jid = message.jid;

  if (!["on", "off", "male", "female"].includes(input)) {
    const status = (await getStatus(jid)) ? "on" : "off";
    const gender = await getGender(jid);
    return await message.reply(
      `ChatBot Settings:\n\nStatus: *${status}*\nGender: *${gender}*\n\nUsage:\n.chatbot on | off | male | female`
    );
  }

  if (input === "on") {
    await setBotStatus(jid, true);
    return await message.reply("✅ ChatBot has been *enabled* in this chat.");
  }

  if (input === "off") {
    await setBotStatus(jid, false);
    return await message.reply("❌ ChatBot has been *disabled* in this chat.");
  }

  if (input === "male" || input === "female") {
    await setBotGender(jid, input);
    return await message.reply(`👤 ChatBot gender set to *${input}*.`);
  }
});
