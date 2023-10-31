Potionawal: 100,
  Potionawal: 15,
  goldawal: 10,
  Potionawal: 5,
  Potionawal: 5,
  potionawal: 1,
  
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