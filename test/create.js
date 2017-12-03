const fs = require('fs')
const path = require('path')

const pkg = `{
  "name": "module",
  "version": "0.0.0",
  "main": "index.js"
}`
const index = `const path = require('path')

acyort.extend.register('after_process', (data) => {
  acyort.logger(path.join(process.cwd(), data.path))
})`

const dir0 = path.join(__dirname, 'node_modules')
if (!fs.existsSync(dir0)) {
  fs.mkdirSync(dir0)
}

const dir1 = path.join(dir0, 'module')
if (!fs.existsSync(dir1)) {
  fs.mkdirSync(dir1)
}

fs.writeFileSync(path.join(dir1, 'package.json'), pkg)
fs.writeFileSync(path.join(dir1, 'index.js'), index)
