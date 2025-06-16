const { izumi, getJson, mode } = require("../lib");
const { chatbot } = require("../lib/chatbot");
const {
  getStatus,
  getGender,
  setBotStatus,
  setBotGender
} = require("../lib/database/chatBot");

izumi({
    pattern: 'gpt ?(.*)',
    fromMe: mode,
    desc: 'chat gpt',
    type: 'ai',
}, async (message, match, client) => {
    const text = match || (message.reply_message && message.reply_message.text);
if (!text) return await message.reply("_*Need a query*_");
const data = await getJson(`https://api.eypz.ct.ws/api/ai/gpt?text=${text}&model=gpt3`);

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
  { quoted: message.data }
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
  { quoted: message.data }
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
  fromMe: mode,
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
    return await message.reply("ChatBot has been *enabled* in this chat.");
  }

  if (input === "off") {
    await setBotStatus(jid, false);
    return await message.reply("ChatBot has been *disabled* in this chat.");
  }

  if (input === "male" || input === "female") {
    await setBotGender(jid, input);
    return await message.reply(`ChatBot gender set to *${input}*.`);
  }
});
