const path = require('path')
const yaml = require('js-yaml')
const fs = require('fs')

function loadData(filename) {
  return yaml.load(
    fs.readFileSync(path.resolve(__dirname, 'src/data/' + filename), 'utf8')
  )
}

module.exports = {
  loadData,
}
