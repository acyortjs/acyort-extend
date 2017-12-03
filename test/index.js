const assert = require('power-assert')
const path = require('path')
const Extend = require('../')

const config = {
  scripts_dir: 'scripts',
  basePath: __dirname,
  scripts: [
    'init.js',
    'helper.js',
    'promise.js'
  ],
  plugins: [
    'module'
  ]
}

class Acyort {
  constructor() {
    this.logger = console.log
    this.config = config
    this.extend = new Extend(this)
  }
}


const acyort = new Acyort()

describe('extend', () => {
  it('helper', async () => {
    await acyort.extend.init()
    assert(typeof acyort.extend.helpers.js === 'function')
  })
})


// acyort.extend.init()
//   .then(() => acyort.extend.run('after_init', null))
//   .then(() => acyort.extend.run('after_fetch', { path: 'change' }))
//   .then(data => acyort.extend.run('after_process', data))
//   .then(() => console.log(acyort.extend.helpers))
