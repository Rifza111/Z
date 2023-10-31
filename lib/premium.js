const fs = require('fs');
const toMs = require('ms');

exports.addPremiumUser = (userId, expired, _premi) => {
	const obj = {
		id: userId,
		expired: Date.now() + toMs(expired)
	}
	_premi.push(obj)
	fs.writeFileSync('./lib/container/database/premium.json', JSON.stringify(_premi, null, 2))
}

exports.getPremiumPosition = (userId, _dir) => {
    let position = null
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id === userId) {
            position = i
        }
    })
    if (position !== null) {
        return position
    }
}

exports.checkPremiumUser = (userId, _dir) => {
	let status = false
	Object.keys(_dir).forEach((i) => {
		if (_dir[i].id === userId) {
		   if(Date.now() > _dir[i].expired){
		      _dir.splice(exports.getPremiumPosition(userId, _dir), 1)
              fs.writeFileSync('./lib/container/database/premium.json', JSON.stringify(_dir, null, 2))
              status = false 
            } 
			else { 
			status = true
		   }
		}
	})
	return status
}
