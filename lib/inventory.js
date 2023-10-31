  const fs = require('fs')
  let _inventory = JSON.parse(fs.readFileSync('./lib/container/database/inventory.json'))
  const SET = require('../validator/config')
    
  //inventory
  exports.addInventory = (sender) => {
        const obj = {
          id: sender, 
          coin: SET['coinawal'],
          darah: SET['darahawal'],
          besi: SET['besiawal'],
          emas: SET['emasawal'],
          emerald: SET['emeraldawal'],
          umpan: SET['umpanawal'],
          potion: SET['potionawal']
        }
         _inventory.push(obj)
        fs.writeFileSync('./lib/container/database/inventory.json', JSON.stringify(_inventory, null, 2))
   }
  exports.checkInventory = (sender) => {
            let status = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    status = true
                }
            })
            return status
        }
        
  exports.getInventory = (sender) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            return _inventory[position]
        }
            
  exports.addCoin = (sender, amount) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _inventory[position].coin += amount
                fs.writeFileSync('./lib/container/database/inventory.json', JSON.stringify(_inventory, null, 2))
            }
            return
        }
   exports.kurangCoin = (sender, amount) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _inventory[position].coin -= amount
                fs.writeFileSync('./lib/container/database/inventory.json', JSON.stringify(_inventory, null, 2))
            }
            return
        }
   exports.getCoin = (sender) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                return _inventory[position].coin
            }
        }     
   exports.addDarah = (sender, amount) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _inventory[position].darah += amount
                fs.writeFileSync('./lib/container/database/inventory.json', JSON.stringify(_inventory, null, 2))
            }
            return
        }
   exports.kurangDarah = (sender, amount) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _inventory[position].darah -= amount
                fs.writeFileSync('./lib/container/database/inventory.json', JSON.stringify(_inventory, null, 2))
            }
            return
        }
   exports.getDarah = (sender) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                return _inventory[position].darah
            }
        }     
  exports.addBesi = (sender, amount) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _inventory[position].besi += amount
                fs.writeFileSync('./lib/container/database/inventory.json', JSON.stringify(_inventory, null, 2))
            }
            return
        }
   exports.kurangBesi = (sender, amount) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _inventory[position].besi -= amount
                fs.writeFileSync('./lib/container/database/inventory.json', JSON.stringify(_inventory, null, 2))
            }
            return
        }
   exports.getBesi = (sender) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                return _inventory[position].besi
            }
        } 
  exports.addEmas = (sender, amount) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _inventory[position].emas += amount
                fs.writeFileSync('./lib/container/database/inventory.json', JSON.stringify(_inventory, null, 2))
            }
            return
        }
   exports.kurangEmas = (sender, amount) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _inventory[position].emas -= amount
                fs.writeFileSync('./lib/container/database/inventory.json', JSON.stringify(_inventory, null, 2))
            }
            return
        }
   exports.getEmas = (sender) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                return _inventory[position].emas
            }
        }     
   exports.addEmerald = (sender, amount) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _inventory[position].emerald += amount
                fs.writeFileSync('./lib/container/database/inventory.json', JSON.stringify(_inventory, null, 2))
            }
            return
        }
   exports.kurangEmerald = (sender, amount) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _inventory[position].emerald -= amount
                fs.writeFileSync('./lib/container/database/inventory.json', JSON.stringify(_inventory, null, 2))
            }
            return
        }
   exports.getEmerald = (sender) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                return _inventory[position].emerald
            }
        }     
   exports.addUmpan = (sender, amount) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _inventory[position].umpan += amount
                fs.writeFileSync('./lib/container/database/inventory.json', JSON.stringify(_inventory, null, 2))
            }
            return
        }
   exports.kurangUmpan = (sender, amount) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _inventory[position].umpan -= amount
                fs.writeFileSync('./lib/container/database/inventory.json', JSON.stringify(_inventory, null, 2))
            }
            return
        }
   exports.getUmpan = (sender) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                return _inventory[position].umpan
            }
        }     
   exports.addPotion = (sender, amount) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _inventory[position].potion += amount
                fs.writeFileSync('./lib/container/database/inventory.json', JSON.stringify(_inventory, null, 2))
            }
            return
        }
   exports.kurangPotion = (sender, amount) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _inventory[position].potion -= amount
                fs.writeFileSync('./lib/container/database/inventory.json', JSON.stringify(_inventory, null, 2))
            }
            return
        }
   exports.getPotion = (sender) => {
            let position = false
            Object.keys(_inventory).forEach((i) => {
                if (_inventory[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                return _inventory[position].potion
            }
        }     