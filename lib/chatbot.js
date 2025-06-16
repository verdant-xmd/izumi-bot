const { fromBuffer } = require("file-type");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { getGender } = require("./database/chatBot");
const config = require("../config");
const axios = require("axios");

async function chatbot(message, prompt) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return await message.reply(
      `No API key found.\n\nPlease get a Gemini API key from:\nhttps://aistudio.google.com/apikey\n\n.setvar GEMINI_API_KEY`
    );
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  let imageBuff = null;

  if (message.quoted && typeof message.quoted.download === "function") {
    try {
      imageBuff = await message.quoted.download("buffer");
    } catch {
      imageBuff = null;
    }
  }

  const gender = await getGender(message.jid);
  const jsonURL =
    gender === "male"
      ? "https://gist.githubusercontent.com/Akshay-Eypz/c0578488b9f5df476618e9d73a509fa3/raw/be4c309b89c7f83069fb14bda0c66a403b3af533/kuro.json"
      : "https://gist.githubusercontent.com/Akshay-Eypz/7c7221adedcce78858805259c2056772/raw/9a5f0ae92f87e2d17c5f4fe0ff006e279cbfc7e8/izumi.json";

  const { data } = await axios.get(jsonURL);
  const { promptText, promptImage } = data;

  const botMention = message.user.replace(/@s\.whatsapp\.net$/, "");
  const cleanedPrompt = prompt.replace(new RegExp(`@${botMention}`, "gi"), "").trim();
  const fullPrompt = (imageBuff ? promptImage : promptText) + cleanedPrompt;

  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  try {
    let result;
    if (imageBuff) {
      const mime = await fromBuffer(imageBuff);
      const base64Image = Buffer.from(imageBuff).toString("base64");

      result = await model.generateContent([
        fullPrompt,
        {
          inlineData: {
            data: base64Image,
            mimeType: mime.mime,
          },
        },
      ]);
    } else {
      result = await model.generateContent(fullPrompt);
    }

    await message.client.sendPresenceUpdate("composing", message.jid);
    await message.reply(result.response.text());

  } catch (e) {
    await message.reply(e.message.replace("[GoogleGenerativeAI Error]:", ""));
  }
}

module.exports = {
  chatbot
};
