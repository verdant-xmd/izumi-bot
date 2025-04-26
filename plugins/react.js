const { izumi, mode, parsedJid } = require("../lib/");
const gif = "https://eypz.koyeb.app/api/gif/";
const reactions = ["kiss", "angry", "blush", "dance", "hug", "laugh", "sleep", "cry", "kawai", "smile", "surprise", "wink", "yawn"];

reactions.forEach((action) => {
    izumi({
        pattern: `${action} ?(.*)`,
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
                video: { url: gif + action },
                mimeType: "video/mp4",
                gifPlayback: true,
                caption: `_@${jidString.split("@")[0]}_`,
                mentions: [jidString],
            },
            { quoted: message.quoted.data || message.data }
        );
    });
});
