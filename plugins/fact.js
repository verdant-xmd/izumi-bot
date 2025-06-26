const { izumi, mode, getJson } = require("../lib/");
const config = require("../config");
const axios = require("axios");
const sharp = require("sharp");

izumi(
    {
        pattern: "fact",
        fromMe: mode,
        desc: "fact commands",
        type: "info",
    },
    async (message) => {
        try {
            let factCommands = "*HERE ARE THE AVAILABLE COMMANDS:*\n\n";
            factCommands += "╭─────────────┈⚆\n";
            factCommands += "│  *1. サ Animal Fact: `.animalfact`*\n";
            factCommands += "│─╖\n";
            factCommands += "│ Fetches a random animal fact.\n";
            factCommands += "╰─────────────┈⚆\n";
            factCommands += "│  *2. サ Tech Fact: `.techfact`*\n";
            factCommands += "│─╖\n";
            factCommands += "│ Fetches a random technology fact.\n";
            factCommands += "╰─────────────┈⚆\n";
            factCommands += "│  *3. サ Space Fact: `.spacefact`*\n";
            factCommands += "│─╖\n";
            factCommands += "│ Fetches a random space fact.\n";
            factCommands += "╰─────────────┈⚆\n";
            factCommands += "│  *4. サ History Fact: `.historyfact`*\n";
            factCommands += "│─╖\n";
            factCommands += "│ Fetches a random history fact.\n";
            factCommands += "╰─────────────┈⚆\n";
            factCommands += "│  *5. サ Cat Fact: `.catfact`*\n";
            factCommands += "│─╖\n";
            factCommands += "│ Fetches a random cat fact.\n";
            factCommands += "╰─────────────┈⚆";

            const contextInfoMessage = {
                text: factCommands,
                contextInfo: {
                    mentionedJid: [message.sender],
                    forwardingScore: 1,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363298577467093@newsletter',
                        newsletterName: config.BOT_NAME,
                        serverMessageId: -1
                    }
                }
            };

            await message.client.sendMessage(message.jid, contextInfoMessage);
        } catch (error) {
            console.error("Error fetching fact commands:", error);
        }
    }
);

const fetchFact = async (url, formattedMessage, message) => {
    try {
        let response = await getJson(url);
        let fact = response.fact;
        formattedMessage = `🐾 **Here is your Fact** 🐾\n\n${fact}`;

        const contextInfoMessage = {
            text: formattedMessage,
            contextInfo: {
                mentionedJid: [message.sender],
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363298577467093@newsletter',
                    newsletterName: config.BOT_NAME,
                    serverMessageId: -1
                }
            }
        };

        await message.client.sendMessage(message.jid, contextInfoMessage);
    } catch (error) {
        console.error(`Error fetching ${formattedMessage.toLowerCase()}:`, error);
    }
};

izumi(
    {
        pattern: "animalfact",
        fromMe: mode,
        desc: "Fact about animals",
        type: "info",
    },
    async (message) => {
        await fetchFact(
            eypzApi + "details/animals",
            "🐾 **Here is your Animal Fact** 🐾",
            message
        );
    }
);

izumi(
    {
        pattern: "techfact",
        fromMe: mode,
        desc: "Fact about technology",
        type: "info",
    },
    async (message) => {
        await fetchFact(
            eypzApi + "details/technology",
            "💻 **Here is your Technology Fact** 💻",
            message
        );
    }
);

izumi(
    {
        pattern: "spacefact",
        fromMe: mode,
        desc: "Fact about space",
        type: "info",
    },
    async (message) => {
        await fetchFact(
            eypzApi + "details/space",
            "🛰️ **Here is your Space Fact** ☄️",
            message
        );
    }
);

izumi(
    {
        pattern: "historyfact",
        fromMe: mode,
        desc: "Fact about history",
        type: "info",
    },
    async (message) => {
        await fetchFact(
            eypzApi + "details/history",
            "📖 **Here is your History Fact** 📖",
            message
        );
    }
);

izumi(
    {
        pattern: "catfact",
        fromMe: mode,
        desc: "Fact about cats",
        type: "info",
    },
    async (message) => {
        await fetchFact(
            eypzApi + "cat-fact",
            "🐱 **Here is your Cat Fact** 🐱",
            message
        );
    }
);

izumi(
    {
        pattern: "explugins",
        fromMe: true,
        desc: "get external plugins",
        type: "user",
    },
    async (message, client) => {
        const res = await axios.get('https://raw.githubusercontent.com/Akshay-Eypz/IZUMI-EXPLUGINS/refs/heads/main/plugin.json');
    const data = res.data;
   let replyMsg = '';
    for (const plugin of data.plugins) {
      replyMsg += `*Command:* ${plugin.pattern}\n`;
      replyMsg += `*Url:* ${plugin.url}\n`;
      replyMsg += `*Usage:* ${plugin.usage}\n\n`;
    }   
const imageBuffer = await axios.get("https://files.catbox.moe/b98vh9.png", {
  responseType: "arraybuffer"
}).then(res => res.data);

const jpegThumbnail = await sharp(imageBuffer)
  .resize(300, 300)
  .jpeg()
  .toBuffer();

await message.client.sendMessage(message.jid, {
  document: { url: "https://files.catbox.moe/b98vh9.png" },
  fileName: "izumi.jpeg",
  mimetype: "image/jpeg",
  caption: replyMsg.trim(),
  jpegThumbnail: jpegThumbnail
}, { quoted: message.data })
    });
