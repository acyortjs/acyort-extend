const fs = require('fs')
const path = require('path')
const Plugins = require('./lib/plugins')
const exec = require('./lib/exec')

class Extend extends Plugins {
  constructor(acyort) {
    super(acyort.config)

    this.acyort = acyort
    this.types = [
      'after_init',
      'after_fetch',
      'after_process',
      'after_generate',
    ]
    this.scripts = {
      after_init: [],
      after_fetch: [],
      after_process: [],
      after_generate: [],
    }
    this.helpers = {}
  }

  register(type, fn) {
    if (this.types.indexOf(type) > -1 && typeof fn === 'function') {
      this.scripts[type].push(fn)
    }
  }

  helper(name, fn) {
    if (typeof fn === 'function') {
      this.helpers[name] = fn
    }
  }

  run(type, data) {
    const scripts = this.scripts[type].map(script => script(data))
    return Promise.all(scripts).then(() => data)
  }

  init() {
    const {
      acyort,
      plugins,
      register,
      helper,
      types,
      scripts,
      helpers,
    } = this
    const { config, logger } = acyort
    const { scripts_dir } = config
    const context = {
      logger,
      config,
      extend: {
        types,
        scripts,
        register,
        helper,
        helpers,
      },
    }

    config.scripts
      .map(script => path.join(config.basePath, scripts_dir, script))
      .filter(script => fs.existsSync(script))
      .concat(plugins)
      .forEach(script => exec(script, context))

    return Promise.resolve()
  }
}

module.exports = Extend
