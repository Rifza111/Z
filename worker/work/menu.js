const SETTING = require('../../validator/config');
const fs = require('fs');
const { runtime } = require('../../lib/function');
const { getCoin } = require('../../lib/inventory');

const modul = SETTING['modul'];
const moment = modul['time'];
const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss');

module.exports = {
	order: ['menu', 'help'],
	owner: false,
	co_owner: false,
	group: false,
	groupAdmins: false,
	botGroupAdmins: false,
	exec: async (msg, client, from, { q, args, order, prefix }) => {
		const commands = Object.values(global.plugins).map(plugin => plugin);

	
const tagNames = {
  ai: '*<🧠Artificial Intelegen>*',
  downloader: '*<📥Media Downloader>*',
  group: '*<🏢Only Group!>*',
  maker: '*<🖨Maker>*',
  owner: '*<👤Only owner!>*',
  tools: '*<🛠Tools>*',
  stablediffusion: '*<🫧Stable Diffusion (AI)>*',
  texttospeech: '*<🗣Text To Speech (AI)>*',
  other: '*<Others>*',
  bluearchive: '*<Blue Archive TTS (AI)*',
};

function getCommandsByTag(tag) {
  const matchingCommands = commands.filter(cmd => cmd.tags === tag);
  const commandTexts = matchingCommands.flatMap(cmd => cmd.command);
  return commandTexts;
}

function generateOutputByTags(tags) {
  const frame = {
    head: '┌',
    body: '│',
    foot: '└',
  };
  let output = `
  Your 🪙Coin: ${getCoin(msg.sender)}
  TotalCmd: ${global.USE_CMD.total}
  Run time : ${runtime(process.uptime())}

`;
  for (const tag of tags) {
    const tagName = tagNames[tag] || tag;
    output += frame['head'] + ' ' + tagName + '\n';
    const matchingCommands = getCommandsByTag(tag);
    const taggedCommands = matchingCommands.map(cmd => `${frame['body'] + prefix + cmd}`);
    output += taggedCommands.join('\n') + '\n' + frame['foot'];
    output += '\n\n';
  }
  return output.trim();
}

const tags = [...new Set(commands.flatMap(cmd => cmd.tags || []))];

const output = generateOutputByTags(tags) + '\n\n' + SETTING['ownerName'];

const menu = {
  text: "[ ```" + SETTING['botName'] + "``` ]" + '\n\n' + output,
  contextInfo: {
    externalAdReply: {
      title: `${msg.sayingtime + msg.timoji + ' ' + msg.pushName}`,
      body: `TopCMD ⇨ '${prefix + client.cmdS()[0][1]['name']}', use: '${client.cmdS()[0][1]['use']}', times: '${client.cmdS()[0][1]['times']}'`,
      thumbnail: fs.readFileSync('./lib/container/image/thumb.jpg'),
      sourceUrl: SETTING['ig'],
      mediaUrl: "http://ẉa.me/6283110928302/"+Math.floor(Math.random() * 100000000000000000),
      renderLargerThumbnail: true,
      showAdAttribution: true,
      mediaType: 1,
    },
  },
};

client.sendMessage(from, menu, {
  quoted: msg,
});

	},
};
