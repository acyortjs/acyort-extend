const path = require('path')
const fs = require('fs')

class Plugins {
  constructor(config) {
    this.config = config
  }

  getPluginPath(plugin) {
    return path.join(this.config.basePath || process.cwd(), 'node_modules', plugin)
  }

  getPkgPath(plugin) {
    return path.join(this.getPluginPath(plugin), 'package.json')
  }

  get plugins() {
    const { plugins } = this.config

    if (!plugins.length) {
      return []
    }

    return plugins
      .filter(plugin => fs.existsSync(this.getPkgPath(plugin)))
      .map((plugin) => {
        /* eslint-disable */
        const pkg = require(this.getPkgPath(plugin))
        /* eslint-disable */
        return path.join(this.getPluginPath(plugin), pkg.main)
      })
  }
}

module.exports = Plugins
