const fs = require('fs')
const path = require('path')
const Plugins = require('./lib/plugins')
const exec = require('./lib/exec')

class Extend extends Plugins {
  constructor(acyort) {
    super(acyort.config)

    this.acyort = acyort
    this.types = [
      'after_fetch',
      'after_process',
      'after_generate',
    ]
    this.scripts = {
      after_fetch: [],
      after_process: [],
      after_generate: [],
    }
  }

  register(type, fn) {
    if (this.types.indexOf(type) > -1 && typeof fn === 'function') {
      this.scripts[type].push(fn)
    }
  }

  init() {
    const {
      acyort,
      plugins,
      register,
      types,
      scripts,
    } = this
    const { config } = acyort
    const { scripts_dir } = config
    const context = {
      ...acyort,
      extend: {
        types,
        scripts,
        register,
      },
    }

    config.scripts
      .map(script => path.join(process.cwd(), scripts_dir, script))
      .filter(script => fs.existsSync(script))
      .concat(plugins)
      .forEach(script => exec(script, context))

    return Promise.resolve()
  }

  getScripts(type) {
    return this.scripts[type]
  }
}

module.exports = Extend
