const { izumi, mode } = require("../lib/");
const config = require("../config");

izumi(
    {
        pattern: "fullss ?(.*)",
        fromMe: mode,
        desc: "capture website screenshot",
        type: "downloader",
    },
    async (message, match, m) => {
        try {
            match = match || message.reply_message.text;
            if (!match) return await message.reply(`*_Need a link_*\n*eg:- .fullss https://api.eypz.ct.ws*`);
            await message.sendFromUrl(`https://api.eypz.ct.ws/api/screenshot?url=${match}`);
        } catch (error) {
            await message.reply('Failed to capture screenshot.');
        }
    }
);

izumi(
    {
        pattern: "ss ?(.*)",
        fromMe: mode,
        desc: "capture website screenshot",
        type: "downloader",
    },
    async (message, match, m) => {
        try {
            match = match || message.reply_message.text;
            if (!match) return await message.reply(`*_Need a link_*\n*eg:- .ss https://api.eypz.ct.ws*`);
            await message.sendFromUrl(`https://api.eypz.ct.ws/api/screenshot?url=${match}&size=mobile`);
        } catch (error) {
            await message.reply('Failed to capture screenshot.');
        }
    }
);
