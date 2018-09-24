const assert = require('power-assert')
const sinon = require('sinon')
const path = require('path')
const extender = require('../')

function run(scripts, data) {
  return Promise.all(scripts.map(script => script(data))).then(() => data)
}

const params = {
  log: console.log,
  queue: [],
}
const key = 'params'

const scripts = {
  init: path.join(__dirname, 'scripts/init.js'),
  promise: path.join(__dirname, 'scripts/promise.js')
}

describe('extender', () => {
  it('run scripts', async () => {
    const spy = sinon.spy(params, 'log')

    extender(scripts.init, params, key)
    assert(spy.calledWith(1) === true)

    extender(scripts.promise, params, key)
    await run(params.queue, 'promise')
    assert(spy.calledWith('promise') === true)
  })
})
