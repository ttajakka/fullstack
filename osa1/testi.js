const t = [2, 4, -5, 7, 0, 8]

console.log('(' + t.join(') -- (') + ')')

const fs = require('fs')
fs.readFile('MongoDB_password', 'utf8', (err, data) => {
  if (err) {
    console.log(err)
    return
  }
  console.log(data)
})
