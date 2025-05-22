const { izumi, mode } = require("../lib");
izumi({
    pattern: 'flux ?(.*)',
    fromMe: mode,
    desc: 'text to image',
    type: 'ai',
}, async (message, match, client) => {
await message.sendMessage(
await message.sendMessage(message.jid, `https://api.eypz.ct.ws/api/ai/flux?prompt=${match}`, {}, "image")
});
