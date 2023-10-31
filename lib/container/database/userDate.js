  const fs = require('fs')
  
  const addInvDate = (sender, date) => {
        const obj = {id: sender, date: date}
        let _user = JSON.parse(fs.readFileSync('./lib/container/database/userchat.json'))
         _user.push(obj)
        fs.writeFileSync('./lib/container/database/userchat.json', JSON.stringify(_user, null, 2))
   }
  const checkUser = (sender) => {
            let status = false
            let _user = JSON.parse(fs.readFileSync('./lib/container/database/userchat.json'))
            Object.keys(_user).forEach((i) => {
                if (_user[i].id === sender) {
                    status = true
                }
            })
            return status
        }
  const updateDate = (sender, amount) => {
            let position = false
            let _user = JSON.parse(fs.readFileSync('./lib/container/database/userchat.json'))
            Object.keys(_user).forEach((i) => {
                if (_user[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _user[position].date = amount
                fs.writeFileSync('./lib/container/database/userchat.json', JSON.stringify(_user, null, 2))
            }
        }
   
   const getDate = (sender) => {
            let position = false
            let _user = JSON.parse(fs.readFileSync('./lib/container/database/userchat.json'))
            Object.keys(_user).forEach((i) => {
                if (_user[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                return _user[position].date
            }
        }     
        
   module.exports = { addInvDate, checkUser, updateDate, getDate }   