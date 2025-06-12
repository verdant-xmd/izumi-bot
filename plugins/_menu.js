const { izumi, mode ,sendMenu, sendSegMenu} = require("../lib/");
const { handleAlive } = require("../lib/alive");
izumi({
  pattern: "alive ?(.*)",
  fromMe: mode,
  desc: "Handle .alive command",
  type: "misc",
}, async (message, match, client) => {
  await handleAlive(message, match, client);
});

izumi({
    pattern: "menu ?(.*)",
    desc: "izumi-v3 user manual",
    fromMe: mode,
    type: "misc",
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
