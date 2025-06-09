const { izumi,mode } = require('../lib/');
const fs = require('fs');
const got = require("got");
const Db = require('../lib/database/plugin');
const Config = require("../config");
const simpleGit = require("simple-git");
const git = simpleGit();
const exec = require("child_process").exec;
const deployLatestCommit = require('../lib/render');
izumi({
  pattern: "upn$",
  fromMe: true,
  dontAddCommandList: true,
  desc: "Updates Izumi",
}, async (message) => {
  await git.fetch();
  const commits = await git.log([Config.BRANCH + "..origin/" + Config.BRANCH]);

  if (commits.total === 0) {
    return await message.reply("Already on the latest version.");
  }

  await message.reply("*Updating...*");

  // 🔍 Detect if hosted on Render by checking __dirname prefix
  if (__dirname.startsWith("/rndr")) {
    if (!Config.RENDER_SERVICE_ID || !Config.RENDER_API_KEY) {
      return await message.reply("Render environment detected but `RENDER_SERVICE_ID` or `RENDER_API_KEY` is missing.");
    }

    await message.reply("🚀 *Render deploy initiated...*");
    await deployLatestCommit(Config.RENDER_SERVICE_ID, Config.RENDER_API_KEY);
    return await message.reply("*Render deployment triggered. Monitor status in the dashboard.*");
  }

  // 🖥️ Self-hosted flow
  git.pull(async (err, update) => {
    if (update && update.summary.changes) {
      await message.reply("*Updated successfully.*\n📦 Installing dependencies...");

      exec("npm install", (err, stdout, stderr) => {
        if (err) {
          return message.reply(`❌ NPM Install Error:\n\`\`\`${stderr}\`\`\``);
        }

        message.reply("Restarting bot...");

        pm2.connect(function (err) {
          if (err) {
            return message.reply("PM2 Error: " + err.message);
          }

          pm2.restart("index.js", function (err) {
            if (err) {
              return message.reply(" PM2 Restart Failed: " + err.message);
            }
            pm2.disconnect();
          });
        });
      });
    } else if (err) {
      await message.reply(`*Update failed!*\n\`\`\`${err}\`\`\``);
    } else {
      await message.reply("No changes were applied.");
    }
  });
});
