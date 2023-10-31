  /**     
      * Coding by @rifza.p.p *     
      
      🩵 Follow ️me on :
      ▪︎ https://youtube.com/@rifza  
      ▪︎ https://github.com/Rifza123
      ▪︎ https://instagram.com/rifza.p.p?igshid=ZGUzMzM3NWJiOQ==
      ▪︎ https://www.threads.net/@rifza.p.p
  */

  const SETTING = require('./validator/config')

  //modules
  const chalk = SETTING['modul']['chalk']
  const fs = SETTING['modul']['fs']
  const pino = SETTING['modul']['pino']
  const path = SETTING['modul']['path']
  const chokidar = SETTING['modul']['chokidar']

  if (!fs.existsSync('./lib/container/database/tebakkata.json')) {
  	fs.writeFileSync('./lib/container/database/tebakkata.json', JSON.stringify([]))
  }
  if (!fs.existsSync('./lib/container/database/cmd.json')) {
  	fs.writeFileSync('./lib/container/database/cmd.json', JSON.stringify({
  		"total": 0,
  		"cmd": []
  	}, null, 2))
  }
  if (!fs.existsSync('./lib/container/database/userchat.json')) {
  	fs.writeFileSync('./lib/container/database/userchat.json', JSON.stringify([]))
  }
  if (!fs.existsSync('./lib/container/database/mute.json')) {
  	fs.writeFileSync('./lib/container/database/mute.json', JSON.stringify([]))
  }
  if (!fs.existsSync('./lib/container/database/co_owner.json')) {
  	fs.writeFileSync('./lib/container/database/co_owner.json', JSON.stringify([]))
  }
  if (!fs.existsSync('./lib/container/database/premium.json')) {
  	fs.writeFileSync('./lib/container/database/premium.json', JSON.stringify([]))
  }
  if (!fs.existsSync('./lib/container/database/inventory.json')) {
  	fs.writeFileSync('./lib/container/database/inventory.json', JSON.stringify([]))
  }

  //Import Function
  let {
  	sleep
  } = require('./lib/function')
  let {
  	default: makeWASocket,
  	useMultiFileAuthState,
  	jidDecode,
  	DisconnectReason,
  	getContentType,
  	fetchLatestBaileysVersion,
  	makeInMemoryStore
  } = SETTING['modul']['baileys']
  let {
  	Boom
  } = SETTING['modul']['boom']
  let store = makeInMemoryStore({
  	logger: pino().child({
  		level: 'silent',
  		stream: 'store'
  	})
  })


  try {
  	async function operate() {
  		let {
  			state,
  			saveCreds
  		} = await useMultiFileAuthState('./lib/connection/' + SETTING['sesionName'])
  		let {
  			version
  		} = fetchLatestBaileysVersion()

  		store.readFromFile('./lib/connection/baileys_store.json')
  		setInterval(() => {
  			store.writeToFile('./lib/connection/baileys_store.json')
  		}, 20000)

  		const client = makeWASocket({
  			logger: pino({
  				level: 'silent'
  			}),
  			printQRInTerminal: true,
  			browser: [SETTING['botName'], 'Safari', '1.0.0'],
  			auth: state
  		})
  		client.decodeJid = (jid) => {
  			if (!jid) return jid
  			if (/:\d+@/gi.test(jid)) {
  				let decode = jidDecode(jid) || {}
  				return decode.user && decode.server && decode.user + '@' + decode.server || jid
  			} else return jid
  		}
  		let pluginFolder = path.join(__dirname, './worker/work')
  		let pluginFilter = filename => /\.js$/.test(filename)
  		global.plugins = {}
  		for (let filename of fs.readdirSync(pluginFolder).filter(pluginFilter)) {
  			try {
  				global.plugins[filename] = require(path.join(pluginFolder, filename))
  			} catch (e) {
  				console.log(e)
  				delete global.plugins[filename]
  			}
  		}
  		//Auto update plugins
  		const watcher = chokidar.watch(pluginFolder, {
  			persistent: true,
  		});

  		let throttleTimer = null; // Variabel penundaan throttle
  		const THROTTLE_DELAY = 1000; // Waktu penundaan throttle dalam milidetik (misalnya 1000ms atau 1 detik)

  		watcher.on('change', (filePath) => {
  			if (throttleTimer) {
  				return;
  			}

  			let fileName = filePath.replace(path.join(__dirname, './worker/work/'), '');
  			let File = require.resolve(path.join(pluginFolder, fileName));

  			if (!fileName.includes('.bak')) {
  				throttleTimer = setTimeout(() => {
  					delete require.cache[File];
  					require(File);
  					console.log(fileName);
  					console.log(chalk.yellow(`File "${File}" telah diperbarui`));
  					global.plugins[fileName] = require(path.join(pluginFolder, fileName));
  					throttleTimer = null;
  				}, THROTTLE_DELAY);
  			}
  		});


  		console.log(Object.keys(global.plugins))
  		client.ev.on('connection.update', async (update) => {
  			let {
  				Connecting
  			} = require("./lib/connection/systemConnext.js")
  			Connecting({
  				update,
  				client,
  				Boom,
  				DisconnectReason,
  				sleep,
  				operate
  			})
  		})
  		//save session 
  		client.ev.on('creds.update', saveCreds);
  		store.bind(client.ev)
  		//messages.upsert
  		
  		client.ev.on('messages.upsert', async ({
  			messages
  		}) => {
  		
  			const msg = messages[0];
  			if (!msg.message) return
  			if (msg.key.remoteJid === 'status@broadcast' && SETTING['autoreadsw'] == true) {
  				client.readMessages([msg.key])
  				let typ = getContentType(msg.message)
  				console.log((/protocolMessage/i.test(typ)) ? `${msg.key.participant.split('@')[0]} Deleted story❗` : 'View user stories : ' + msg.key.participant.split('@')[0]);
  			}
  			const from = msg.key.remoteJid
  			require('./lib/simple')(client, msg, store)
  			require('./worker/client/msgsupsert')(msg, client, from, store)
  		      		    
  		})
  		  		
  		client.ev.on('group-participants.update', async (update) => {
  			console.log(update)
  		})
  	}
  	operate()
  } catch (e) {
  	console.log(chalk.red(e))
  }

  //Auto update File
  let file = require.resolve(__filename)
  fs.watchFile(file, () => {
  	fs.unwatchFile(file)
  	console.log(chalk.yellow(`New ${__filename}`))
  	delete require.cache[file]
  	require(file)
  })
  process.on('uncaughtException', console.error)