const { izumi, mode ,sendMenu, sendSegMenu} = require("../lib/");
izumi({
    pattern: "menu ?(.*)",
    desc: "izumi-v3 user manual",
    fromMe: mode,
    type: "user",
}, async (message, match, client) => {
    await sendMenu(message, match, client);
});

const pluginTypes = ['downloader', 'group', 'media', 'react', 'user', 'converter', 'ai'];

pluginTypes.forEach((type) => {
    izumi({
        pattern: `${type}$`,
        fromMe: mode,
        dontAddCommandList: true,
    }, async (message, match, client ) => {
        await sendSegMenu(message, match, client, type);
    });
});
