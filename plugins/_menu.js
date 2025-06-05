const { PREFIX, izumi, mode, commands } = require("../lib/");
const version = require("../package.json").version;
const config = require("../config");

izumi({
    pattern: 'menu ?(.*)',
    fromMe: mode,
    desc: 'Displays the bot menu with commands categorized by type.',
    type: 'info'
}, async (message, match, client) => {

const readMore = String.fromCharCode(8206).repeat(4001);
const quotedMessage = {
    key: {
        fromMe: false,
        participant: "0@s.whatsapp.net",
        remoteJid: "120363413452172651@g.us",
    },
    message: {
        orderMessage: {
            orderId: "2009",
            itemCount: 3000,
            status: "INQUIRY",
            surface: "",
            message: `ϟ ${config.BOT_NAME}`,
            token: Buffer.from("izumi").toString("base64"),
        },
    },
    contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
    },
};

let menu = `
┏━━━〔 ${config.BOT_NAME} 〕━━━╮
┃
┃
┃ ⤑ Owner   : ${config.OWNER_NAME}
┃ ⤑ Commands: ${commands.filter((command) => command.pattern).length}
┃ ⤑ Mode    : ${mode ? 'PRIVATE' : 'PUBLIC'}
┃ ⤑ Prefix  : ${PREFIX}
┃ ⤑ Version : ${version}
┗━━━━━━━━━━━━${readMore}`;

let cmnd = [];
let category = [];

commands.forEach((command) => {
    let cmd;
    if (command.pattern instanceof RegExp) {
        cmd = String(command.pattern).split(/\W+/)[1];
    }

    if (!command.dontAddCommandList && command.pattern) {
        let type = (command.type || "misc").toString();
        cmnd.push({ cmd, type });

        if (!category.includes(type)) category.push(type);
    }
});

cmnd.sort();
category.sort().forEach((cmmd) => {
    menu += `\n\n┃  ╭─────────────•`;
    menu += `\n┃  │  *ᯓ${cmmd.toString().toUpperCase()}*`;
    menu += `\n┃  ╰─────────────•`;

    let comad = cmnd.filter(({ type }) => type === cmmd);
    comad.forEach(({ cmd }) => {
        menu += `\n┃  ⤑ ${cmd ? cmd.trim() : ''}`;
    });
});

menu += `\n |
 |
ׂ╰────────────┈➤`;

let mediaUrl = config.MENU_URL;

let mimetype, type;
if (mediaUrl.endsWith(".mp4")) {
    mimetype = "video/mp4";
    type = "video";
} else if (mediaUrl.endsWith(".png") || mediaUrl.endsWith(".jpg") || mediaUrl.endsWith(".jpeg")) {
    mimetype = mediaUrl.endsWith(".png") ? "image/png" : "image/jpeg";
    type = "image";
}

await message.client.sendMessage(
    message.jid,
    {
        [type]: { url: mediaUrl },
        mimetype,
        caption: menu,
        gifPlayback: true,
        contextInfo: {
            isForwarded: true,
            forwardingScore: 999
        }
    },
    {
        quoted: quotedMessage
    }
 )
});
