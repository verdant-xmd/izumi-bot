const { izumi, mode, getJson } = require("../lib");

// DeepSeek
izumi({
  pattern: "deepseek ?(.*)",
  fromMe: mode,
  desc: "DeepSeek AI",
  type: "ai",
}, async (message, match) => {
  const content = match;
  const url = `https://xploader-apis-5f424ea8f0da.herokuapp.com/deepseek-r1?prompt=${encodeURIComponent(content)}&userId=${message.sender}`;
  const res = await getJson(url);
  await message.client.sendMessage(message.jid, { text: res.result }, { quoted: message.data });
});

// Blackbox
izumi({
  pattern: "blackbox ?(.*)",
  fromMe: mode,
  desc: "Blackbox AI",
  type: "ai",
}, async (message, match) => {
  const content = match;
  const url = `https://xploader-apis-5f424ea8f0da.herokuapp.com/blackbox/ai?prompt=${encodeURIComponent(content)}`;
  const res = await getJson(url);
  await message.client.sendMessage(message.jid, { text: res.result }, { quoted: message.data });
});

// Gemini
izumi({
  pattern: "gemini ?(.*)",
  fromMe: mode,
  desc: "Gemini AI",
  type: "ai",
}, async (message, match) => {
  const content = match;
  const url = `https://xploader-apis-5f424ea8f0da.herokuapp.com/gemini?prompt=${encodeURIComponent(content)}&userId=${message.sender}`;
  const res = await getJson(url);
  await message.client.sendMessage(message.jid, { text: res.result }, { quoted: message.data });
});

// Mistral
izumi({
  pattern: "mistral ?(.*)",
  fromMe: mode,
  desc: "Mistral AI",
  type: "ai",
}, async (message, match) => {
  const content = match;
  const url = `https://xploader-apis-5f424ea8f0da.herokuapp.com/mistral?prompt=${encodeURIComponent(content)}&userId=${message.sender}`;
  const res = await getJson(url);
  await message.client.sendMessage(message.jid, { text: res.result }, { quoted: message.data });
});

// Qwen
izumi({
  pattern: "qwen ?(.*)",
  fromMe: mode,
  desc: "Qwen AI",
  type: "ai",
}, async (message, match) => {
  const content = match;
  const url = `https://xploader-apis-5f424ea8f0da.herokuapp.com/qwen?prompt=${encodeURIComponent(content)}&userId=${message.sender}`;
  const res = await getJson(url);
  await message.client.sendMessage(message.jid, { text: res.result }, { quoted: message.data });
});

// LLaMA
izumi({
  pattern: "llama ?(.*)",
  fromMe: mode,
  desc: "LLaMA AI",
  type: "ai",
}, async (message, match) => {
  const content = match;
  const url = `https://xploader-apis-5f424ea8f0da.herokuapp.com/llama?prompt=${encodeURIComponent(content)}&userId=${message.sender}`;
  const res = await getJson(url);
  await message.client.sendMessage(message.jid, { text: res.result }, { quoted: message.data });
});

// Gemini Flash
izumi({
  pattern: "gemflash ?(.*)",
  fromMe: mode,
  desc: "Gemini Flash AI",
  type: "ai",
}, async (message, match) => {
  const content = match;
  const url = `https://xploader-apis-5f424ea8f0da.herokuapp.com/geminiflash?prompt=${encodeURIComponent(content)}&userId=${message.sender}`;
  const res = await getJson(url);
  await message.client.sendMessage(message.jid, { text: res.result }, { quoted: message.data });
});

// Sleepy AI
izumi({
  pattern: "sleepy ?(.*)",
  fromMe: mode,
  desc: "Sleepy AI",
  type: "ai",
}, async (message, match) => {
  const content = match;
  const url = `https://xploader-apis-5f424ea8f0da.herokuapp.com/sleepyai?prompt=${encodeURIComponent(content)}&userId=${message.sender}`;
  const res = await getJson(url);
  await message.client.sendMessage(message.jid, { text: res.result }, { quoted: message.data });
});

// Herta AI
izumi({
  pattern: "herta ?(.*)",
  fromMe: mode,
  desc: "Herta AI",
  type: "ai",
}, async (message, match) => {
  const content = match;
  const url = `https://xploader-apis-5f424ea8f0da.herokuapp.com/herta?prompt=${encodeURIComponent(content)}&userId=${message.sender}`;
  const res = await getJson(url);
  await message.client.sendMessage(message.jid, { text: res.result }, { quoted: message.data });
});

// GIA AI
izumi({
  pattern: "gia ?(.*)",
  fromMe: mode,
  desc: "GIA AI",
  type: "ai",
}, async (message, match) => {
  const content = match;
  const url = `https://xploader-apis-5f424ea8f0da.herokuapp.com/gia?prompt=${encodeURIComponent(content)}&userId=${message.sender}`;
  const res = await getJson(url);
  await message.client.sendMessage(message.jid, { text: res.result }, { quoted: message.data });
});

// Dopple AI
izumi({
  pattern: "dopple ?(.*)",
  fromMe: mode,
  desc: "Dopple AI",
  type: "ai",
}, async (message, match) => {
  const content = match;
  const url = `https://xploader-apis-5f424ea8f0da.herokuapp.com/doppleai?prompt=${encodeURIComponent(content)}`;
  const res = await getJson(url);
  await message.client.sendMessage(message.jid, { text: res.result }, { quoted: message.data });
});
