const assert = require('power-assert')
const sinon = require('sinon')
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
    this.extend = new Extend(this, ['logger', 'config'])
  }
}

describe('extend', () => {
  it('helper', async () => {
    const acyort = new Acyort()
    await acyort.extend.init()
    assert(acyort.extend.helpers.js('ab') === 'a.b')
  })

  it('runs', async () => {
    const acyort = new Acyort()
    const spy = sinon.spy(acyort, 'logger')

    await acyort.extend.init()

    await acyort.extend.run('after_init', null)
    assert(spy.calledWith('scripts') === true)

    const data = { path: 'change' }
    await acyort.extend.run('after_fetch', data)
    assert(data.path === 'module')
    assert(spy.calledWith('promise') === true)

    await acyort.extend.run('after_process', data)
    assert(spy.calledWith(path.join(process.cwd(), data.path)) === true)

    await acyort.extend.run('after_generate', data)
    assert(spy.calledWith(2) === true)

    spy.restore()
  })

  it('error scripts', async () => {
    config.scripts = ['error.js', 'errorHelper.js']
    config.plugins = ['error']

    const acyort = new Acyort()
    await acyort.extend.init()
    assert(acyort.extend.scripts = [])
    assert(acyort.extend.plugins = [])
    assert(acyort.extend.helpers = [])
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
