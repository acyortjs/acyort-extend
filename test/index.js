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

class Acyort {
  constructor() {
    this.logger = new Logger()
    this.config = config
    this.extend = new Extend(this, ['logger', 'config'])
  }
}

describe('extend', () => {
  it('recall init', async () => {
    const acyort = new Acyort()
    await acyort.extend.init()
    await acyort.extend.init()
    assert(acyort.extend.scripts.after_init.length === 1)
  })

  it('runs', async () => {
    const acyort = new Acyort()
    const spy = sinon.spy(acyort.logger, 'info')
    await acyort.extend.init()

    await acyort.extend.run('after_init', null)
    assert(spy.calledWith('scripts') === true)

    const data = { path: 'change' }
    await acyort.extend.run('after_fetch', data)
    assert(data.path === 'module')
    assert(spy.calledWith('promise') === true)

    await acyort.extend.run('after_process', data)
    assert(spy.calledWith(path.join(process.cwd(), data.path)) === true)

    await acyort.extend.run('after_build', data)
    assert(spy.calledWith(2) === true)
  })

  it('error scripts', async () => {
    config.scripts = ['error.js']
    config.plugins = ['error']

    const acyort = new Acyort()
    await acyort.extend.init()
    assert(acyort.extend.scripts = [])
    assert(acyort.extend.plugins = [])
  })

  it('no exist script', async () => {
    config.scripts = ['noExist.js']
    const acyort = new Acyort()
    await acyort.extend.init()
    assert(acyort.extend.scripts = [])
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
