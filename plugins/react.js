const { izumi, mode, parsedJid } = require("../lib/");
const gif = "https://eypz.koyeb.app/api/gif/";

// Surprise Reaction
izumi({
    pattern: "surprise ?(.*)",
    fromMe: mode,
    desc: "react with surprise gif",
    type: "react",
}, async (message, match, client) => {
    match = match || message.reply_message?.sender || message.sender;
    const cleanJid = match.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    const jid = parsedJid(cleanJid);
    const jidString = Array.isArray(jid) ? jid[0] : jid;
    await message.client.sendMessage(
        message.jid,
        { 
            video: { url: gif+"surprise" },
            mimeType: "video/mp4",
            gifPlayback: true,
            caption: `_@${jidString.split("@")[0]}_`,
            mentions: [jidString],
        },
        { quoted: message.quoted.data || message.data }
    );
});

// Wink Reaction
izumi({
    pattern: "wink ?(.*)",
    fromMe: mode,
    desc: "react with wink gif",
    type: "react",
}, async (message, match, client) => {
    match = match || message.reply_message?.sender || message.sender;
    const cleanJid = match.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    const jid = parsedJid(cleanJid);
    const jidString = Array.isArray(jid) ? jid[0] : jid;
    await message.client.sendMessage(
        message.jid,
        { 
            video: { url: gif+"wink" },
            mimeType: "video/mp4",
            gifPlayback: true,
            caption: `_@${jidString.split("@")[0]}_`,
            mentions: [jidString],
        },
        { quoted: message.quoted.data || message.data }
    );
});

// Yawn Reaction
izumi({
    pattern: "yawn ?(.*)",
    fromMe: mode,
    desc: "react with yawn gif",
    type: "react",
}, async (message, match, client) => {
    match = match || message.reply_message?.sender || message.sender;
    const cleanJid = match.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    const jid = parsedJid(cleanJid);
    const jidString = Array.isArray(jid) ? jid[0] : jid;
    await message.client.sendMessage(
        message.jid,
        { 
            video: { url: gif+"yawn" },
            mimeType: "video/mp4",
            gifPlayback: true,
            caption: `_@${jidString.split("@")[0]}_`,
            mentions: [jidString],
        },
        { quoted: message.quoted.data || message.data }
    );
});

// Angry Reaction
izumi({
    pattern: "angry ?(.*)",
    fromMe: mode,
    desc: "react with angry gif",
    type: "react",
}, async (message, match, client) => {
    match = match || message.reply_message?.sender || message.sender;
    const cleanJid = match.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    const jid = parsedJid(cleanJid);
    const jidString = Array.isArray(jid) ? jid[0] : jid;
    await message.client.sendMessage(
        message.jid,
        { 
            video: { url: gif+"angry" },
            mimeType: "video/mp4",
            gifPlayback: true,
            caption: `_@${jidString.split("@")[0]}_`,
            mentions: [jidString],
        },
        { quoted: message.quoted.data || message.data }
    );
});

// Blush Reaction
izumi({
    pattern: "blush ?(.*)",
    fromMe: mode,
    desc: "react with blush gif",
    type: "react",
}, async (message, match, client) => {
    match = match || message.reply_message?.sender || message.sender;
    const cleanJid = match.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    const jid = parsedJid(cleanJid);
    const jidString = Array.isArray(jid) ? jid[0] : jid;
    await message.client.sendMessage(
        message.jid,
        { 
            video: { url: gif+"blush" },
            mimeType: "video/mp4",
            gifPlayback: true,
            caption: `_@${jidString.split("@")[0]}_`,
            mentions: [jidString],
        },
        { quoted: message.quoted.data || message.data }
    );
});

// Cry Reaction
izumi({
    pattern: "cry ?(.*)",
    fromMe: mode,
    desc: "react with cry gif",
    type: "react",
}, async (message, match, client) => {
    match = match || message.reply_message?.sender || message.sender;
    const cleanJid = match.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    const jid = parsedJid(cleanJid);
    const jidString = Array.isArray(jid) ? jid[0] : jid;
    await message.client.sendMessage(
        message.jid,
        { 
            video: { url: gif+"cry" },
            mimeType: "video/mp4",
            gifPlayback: true,
            caption: `_@${jidString.split("@")[0]}_`,
            mentions: [jidString],
        },
        { quoted: message.quoted.data || message.data }
    );
});

// Dance Reaction
izumi({
    pattern: "dance ?(.*)",
    fromMe: mode,
    desc: "react with dance gif",
    type: "react",
}, async (message, match, client) => {
    match = match || message.reply_message?.sender || message.sender;
    const cleanJid = match.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    const jid = parsedJid(cleanJid);
    const jidString = Array.isArray(jid) ? jid[0] : jid;
    await message.client.sendMessage(
        message.jid,
        { 
            video: { url: gif+"dance" },
            mimeType: "video/mp4",
            gifPlayback: true,
            caption: `_@${jidString.split("@")[0]}_`,
            mentions: [jidString],
        },
        { quoted: message.quoted.data || message.data }
    );
});

// Hug Reaction
izumi({
    pattern: "hug ?(.*)",
    fromMe: mode,
    desc: "react with hug gif",
    type: "react",
}, async (message, match, client) => {
    match = match || message.reply_message?.sender || message.sender;
    const cleanJid = match.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    const jid = parsedJid(cleanJid);
    const jidString = Array.isArray(jid) ? jid[0] : jid;
    await message.client.sendMessage(
        message.jid,
        { 
            video: { url: gif+"hug" },
            mimeType: "video/mp4",
            gifPlayback: true,
            caption: `_@${jidString.split("@")[0]}_`,
            mentions: [jidString],
        },
        { quoted: message.quoted.data || message.data }
    );
});

// Kawaii Reaction
izumi({
    pattern: "kawaii ?(.*)",
    fromMe: mode,
    desc: "react with kawaii gif",
    type: "react",
}, async (message, match, client) => {
    match = match || message.reply_message?.sender || message.sender;
    const cleanJid = match.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    const jid = parsedJid(cleanJid);
    const jidString = Array.isArray(jid) ? jid[0] : jid;
    await message.client.sendMessage(
        message.jid,
        { 
            video: { url: gif+"kawaii" },
            mimeType: "video/mp4",
            gifPlayback: true,
            caption: `_@${jidString.split("@")[0]}_`,
            mentions: [jidString],
        },
        { quoted: message.quoted.data || message.data }
    );
});

// Kiss Reaction
izumi({
    pattern: "kiss ?(.*)",
    fromMe: mode,
    desc: "react with kiss gif",
    type: "react",
}, async (message, match, client) => {
    match = match || message.reply_message?.sender || message.sender;
    const cleanJid = match.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    const jid = parsedJid(cleanJid);
    const jidString = Array.isArray(jid) ? jid[0] : jid;
    await message.client.sendMessage(
        message.jid,
        { 
            video: { url: gif+"kiss" },
            mimeType: "video/mp4",
            gifPlayback: true,
            caption: `_@${jidString.split("@")[0]}_`,
            mentions: [jidString],
        },
        { quoted: message.quoted.data || message.data }
    );
});

// Laugh Reaction
izumi({
    pattern: "laugh ?(.*)",
    fromMe: mode,
    desc: "react with laugh gif",
    type: "react",
}, async (message, match, client) => {
    match = match || message.reply_message?.sender || message.sender;
    const cleanJid = match.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    const jid = parsedJid(cleanJid);
    const jidString = Array.isArray(jid) ? jid[0] : jid;
    await message.client.sendMessage(
        message.jid,
        { 
            video: { url: gif+"laugh" },
            mimeType: "video/mp4",
            gifPlayback: true,
            caption: `_@${jidString.split("@")[0]}_`,
            mentions: [jidString],
        },
        { quoted: message.quoted.data || message.data }
    );
});

// Sleep Reaction
izumi({
    pattern: "sleep ?(.*)",
    fromMe: mode,
    desc: "react with sleep gif",
    type: "react",
}, async (message, match, client) => {
    match = match || message.reply_message?.sender || message.sender;
    const cleanJid = match.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    const jid = parsedJid(cleanJid);
    const jidString = Array.isArray(jid) ? jid[0] : jid;
    await message.client.sendMessage(
        message.jid,
        { 
            video: { url: gif+"sleep" },
            mimeType: "video/mp4",
            gifPlayback: true,
            caption: `_@${jidString.split("@")[0]}_`,
            mentions: [jidString],
        },
        { quoted: message.quoted.data || message.data }
    );
});

// Smile Reaction
izumi({
    pattern: "smile ?(.*)",
    fromMe: mode,
    desc: "react with smile gif",
    type: "react",
}, async (message, match, client) => {
    match = match || message.reply_message?.sender || message.sender;
    const cleanJid = match.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    const jid = parsedJid(cleanJid);
    const jidString = Array.isArray(jid) ? jid[0] : jid;
    await message.client.sendMessage(
        message.jid,
        { 
            video: { url: gif+"smile" },
            mimeType: "video/mp4",
            gifPlayback: true,
            caption: `_@${jidString.split("@")[0]}_`,
            mentions: [jidString],
        },
        { quoted: message.quoted.data || message.data }
    );
});
