const fs = require('fs')
const path = require('path')

const pkg = `{
  "name": "module",
  "version": "0.0.0",
  "main": "index.js"
}`
const index = `const path = require('path')

acyort.extend.register('after_process', (data) => {
  acyort.logger.info(path.join(process.cwd(), data.path))
})`

const errorPkg = `{
  "name": "error",
  "version": "0.0.0",
  "main": "index.js"
}`

const errorIndex = `acyort.extend.register('after_process', 'no a function')`

const dir0 = path.join(__dirname, 'node_modules')
if (!fs.existsSync(dir0)) {
  fs.mkdirSync(dir0)
}

const dir1 = path.join(dir0, 'module')
if (!fs.existsSync(dir1)) {
  fs.mkdirSync(dir1)
}

const dir2 = path.join(dir0, 'error')
if (!fs.existsSync(dir2)) {
  fs.mkdirSync(dir2)
}

fs.writeFileSync(path.join(dir1, 'package.json'), pkg)
fs.writeFileSync(path.join(dir1, 'index.js'), index)

fs.writeFileSync(path.join(dir2, 'package.json'), errorPkg)
fs.writeFileSync(path.join(dir2, 'index.js'), errorIndex)
