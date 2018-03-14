const fs = require('fs')
const path = require('path')
const Plugins = require('./lib/plugins')
const exec = require('./lib/exec')

class Extend extends Plugins {
  constructor(acyort, methods) {
    super(acyort)
    this.logger = acyort.logger
    this.methods = methods
    this.acyort = acyort
  }

  init() {
    const { acyort, plugins } = this
    const { scripts_dir, scripts, base } = acyort.config
    const context = {}

    this.methods.forEach((method) => {
      context[method] = acyort[method]
    })

    scripts
      .map(script => path.join(base, scripts_dir, script))
      .filter((script) => {
        if (fs.existsSync(script)) {
          this.logger.info(`Use script: ${script.split('/').slice(-1)}`, 'script')
          return true
        }
        return false
      })
      .concat(plugins)
      .forEach(script => exec(script, context))

    return Promise.resolve()
  }
}

module.exports = Extend
