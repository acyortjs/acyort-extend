const path = require('path')
const fs = require('fs')

class Plugins {
  constructor({ config, logger }) {
    this.config = config
    this.logger = logger
  }

  pluginPath(plugin) {
    return path.join(this.config.base, 'node_modules', plugin)
  }

  pkgPath(plugin) {
    return path.join(this.pluginPath(plugin), 'package.json')
  }

  get plugins() {
    const { plugins } = this.config

    if (!plugins.length) {
      return []
    }

    return plugins
      .filter(plugin => fs.existsSync(this.pkgPath(plugin)))
      .map((plugin) => {
        /* eslint-disable */
        const pkg = require(this.pkgPath(plugin))
        /* eslint-disable */
        this.logger.info(`Use plugin: ${plugin}`, 'script')
        return path.join(this.pluginPath(plugin), pkg.main)
      })
  }
}

module.exports = Plugins
