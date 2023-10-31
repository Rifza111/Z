const fs = require('fs')
if (!fs.existsSync('./lib/container/database/sticker.json')){ fs.writeFileSync('./lib/container/database/sticker.json', JSON.stringify([], null, 2))}

const addCmds = (id, command) => {
    const obj = { id: id, chats: command }
    let setiker = JSON.parse(fs.readFileSync('./lib/container/database/sticker.json'))
    setiker.push(obj)
    fs.writeFileSync('./lib/container/database/sticker.json', JSON.stringify(setiker, null, 2))
}

const getCommandPosition = (id) => {
    let position = null
    let setiker = JSON.parse(fs.readFileSync('./lib/container/database/sticker.json'))
    Object.keys(setiker, null, 2).forEach((i) => {
        if (setiker[i].id === id) {
            position = i
        }
    })
    if (position !== null) {
        return position
    }
}

const getCmd = (id) => {
    let position = null
    let setiker = JSON.parse(fs.readFileSync('./lib/container/database/sticker.json'))
    Object.keys(setiker, null, 2).forEach((i) => {
        if (setiker[i].id === id) {
            position = i
        }
    })
    if (position !== null) {
        return setiker[position].chats
    }
}


const checkSCommand = (id) => {
    let status = false
    let setiker = JSON.parse(fs.readFileSync('./lib/container/database/sticker.json'))
    Object.keys(setiker, null, 2).forEach((i) => {
        if (setiker[i].id === id) {
            status = true
        }
    })
    return status
}

module.exports = { checkSCommand, getCmd, addCmds, getCommandPosition }