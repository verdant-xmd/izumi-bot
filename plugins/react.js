const { izumi, mode, parsedJid } = require("../lib/");
const gif = "https://eypz.koyeb.app/api/gif/";
izumi({
    pattern: "kiss ?(.*)",
    fromMe: mode,
    desc: "react with gif",
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
izumi({
    pattern: "angry ?(.*)",
    fromMe: mode,
    desc: "react with gif",
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
izumi({
    pattern: "blush ?(.*)",
    fromMe: mode,
    desc: "react with gif",
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
izumi({
    pattern: "dance ?(.*)",
    fromMe: mode,
    desc: "react with gif",
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
izumi({
    pattern: "hug ?(.*)",
    fromMe: mode,
    desc: "react with gif",
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
izumi({
    pattern: "laugh ?(.*)",
    fromMe: mode,
    desc: "react with gif",
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
izumi({
    pattern: "sleep ?(.*)",
    fromMe: mode,
    desc: "react with gif",
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
