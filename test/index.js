const assert = require('power-assert')
const sinon = require('sinon')
const path = require('path')
const Extend = require('../')
const Logger = require('acyort-logger')

const config = {
  scripts_dir: 'scripts',
  base: __dirname,
  scripts: [
    'init.js',
    'promise.js'
  ],
  plugins: [
    'module'
  ]
}

function run(scripts, data) {
  return Promise.all(scripts.map(script => script(data))).then(() => data)
}

class Acyort {
  constructor() {
    this.logger = new Logger()
    this.config = config
    this.scripts = []
    this.extend = new Extend(this, ['logger', 'config', 'scripts'])
  }
}

describe('extend', () => {
  it('runs', async () => {
    const acyort = new Acyort()
    const spy = sinon.spy(acyort.logger, 'info')
    await acyort.extend.init()
    assert(spy.calledWith(path.join(process.cwd(), 'change')) === true)

    await run(acyort.scripts, 'promise')
    assert(spy.calledWith('promise') === true)
  })

  it('error scripts', async () => {
    config.scripts = ['error.js']
    config.plugins = ['error']

    const acyort = new Acyort()
    await acyort.extend.init()
    assert(acyort.extend.scripts = [])
    assert(acyort.extend.plugins = [])
  })

  it('no scripts', async () => {
    config.scripts = []
    config.plugins = []

    const acyort = new Acyort()
    await acyort.extend.init()
    assert(acyort.extend.scripts = [])
    assert(acyort.extend.plugins = [])
  })
})
