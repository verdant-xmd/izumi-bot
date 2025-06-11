const { izumi,mode } = require('../lib/');
const simpleGit = require('simple-git');
const axios = require('axios');
const { exec } = require('child_process');
const pm2 = require('pm2');
const git = simpleGit();
const Config = require("../config");
const dir = __dirname;
const isRenderProject = dir.includes('/rndr/') || dir.includes('/opt/render/project/src');
const isLocalBotProject = !isRenderProject;
async function deployLatestCommit(serviceId, apiKey) {
  if (!serviceId || !apiKey) {
    console.error("RENDER_SERVICE_ID or RENDER_API_KEY missing");
    return;
  }

  const autoScalingUrl = `https://api.render.com/v1/services/${serviceId}/autoscaling`;

  try {
    await axios.delete(autoScalingUrl, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    });
    console.log("Autoscaling disabled.");
  } catch (err) {
    console.error("Error disabling autoscaling:", err.response?.data || err.message);
    return;
  }

  const deployUrl = `https://api.render.com/v1/services/${serviceId}/deploys`;

  try {
    const response = await axios.post(deployUrl, {
      clearCache: "clear"
    }, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      }
    });

    const deployInfo = response.data;

    console.log("Render deployment initiated.");
    console.log(`Deploy ID: ${deployInfo.id}`);
    console.log(`Status: ${deployInfo.status}`);
    console.log(`Commit: ${deployInfo.commit?.message || "N/A"}`);
    console.log(`Dashboard: https://dashboard.render.com/web/${serviceId}/deploys/${deployInfo.id}`);
  } catch (err) {
    console.error("Error deploying to Render:", err.response?.data || err.message);
  }
}

izumi({
  pattern: "update$",
  fromMe: true,
  dontAddCommandList: true,
  desc: "Checks for updates.",
}, async (message) => {
  await git.fetch();
  const branch = Config.BRANCH || 'main';
  const commits = await git.log([`${branch}..origin/${branch}`]);

  if (commits.total === 0) {
    return await message.reply("Already on the latest version.");
  }

  let changelog = "*Update Available*\n\n*Changelog:*\n";
  changelog += "--------------------------------------\n";
  changelog += commits.all.map(c => `[${c.date.slice(0, 10)}] ${c.message}`).join("\n");
  changelog += "\n--------------------------------------";

  return await message.reply(changelog);
});

izumi({
  pattern: "update now$",
  fromMe: true,
  dontAddCommandList: true,
  desc: "Updates the bot",
}, async (message) => {
  await git.fetch();
  const branch = Config.BRANCH || 'main';
  const commits = await git.log([`${branch}..origin/${branch}`]);

  if (commits.total === 0) {
    return await message.reply("Already on the latest version.");
  }

  if (isRenderProject) {
    await message.reply("Deploying via Render...");
    const serviceId = process.env.RENDER_SERVICE_ID;
    const apiKey = process.env.RENDER_API_KEY;

    if (!serviceId || !apiKey) {
      return await message.reply("Missing RENDER_SERVICE_ID or RENDER_API_KEY.");
    }

    await deployLatestCommit(serviceId, apiKey);
    return await message.reply("Render deployment initiated!\nThis may take 2 to 5 minutes to complete...");
  }
  if (isLocalBotProject) {
    await message.reply("Updating local PM2 project...");

    try {
      const pull = await git.pull();
      if (pull?.summary?.changes > 0) {
        await message.reply("*_UPDATED_*");
        await message.reply("_Bot restarting, please wait..._");
        exec("npm install").stderr.pipe(process.stderr);
        return pm2.restart('index.js');
      } else {
        return await message.reply("No changes found during pull.");
      }
    } catch (err) {
      return await message.reply(`Update failed:\n\`\`\`${err.message}\`\`\``);
    }
  }

  await message.reply("Updating (default fallback mode)...");

  try {
    const pull = await git.pull();
    if (pull?.summary?.changes > 0) {
      await message.reply("*_UPDATED_*");
      await message.reply("_Restarting bot..._");
      exec("npm install").stderr.pipe(process.stderr);
      return pm2.restart('index.js');
    } else {
      return await message.reply("No changes detected.");
    }
  } catch (err) {
    return await message.reply(`Update failed:\n\`\`\`${err.message}\`\`\``);
  }
});
