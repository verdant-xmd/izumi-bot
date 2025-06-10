const { izumi, PREFIX, setBotMode, showModeUI} = require("../lib");
izumi({
  pattern: 'setprivate',
  fromMe: true,
  desc: 'Set bot mode to private',
  dontAddCommandList: true,
  type: 'tools'
}, async (message, _, client) => {
  await setBotMode('private', client, message);
});
izumi({
  pattern: 'setpublic',
  fromMe: true,
  desc: 'Set bot mode to public',
  dontAddCommandList: true,
  type: 'tools'
}, async (message, _, client) => {
  await setBotMode('public', client, message);
});
izumi({
  pattern: 'mode',
  fromMe: true,
  desc: 'Show current mode with UI',
  type: 'tools'
}, async (message, match, client) => {
  await showModeUI(client, message, PREFIX);
});
