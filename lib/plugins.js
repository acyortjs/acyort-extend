const path = require('path')
const fs = require('fs')

function getPluginPath(plugin) {
  return path.join(process.cwd(), 'node_modules', plugin)
}

function getPkgPath(plugin) {
  return path.join(getPluginPath(plugin), 'package.json')
}

class Plugins {
  constructor(config) {
    this.config = config
  }

  get plugins() {
    const { plugins } = this.config

    if (!plugins.length) {
      return []
    }

    return plugins
      .filter(plugin => fs.existsSync(getPkgPath(plugin)))
      .map((plugin) => {
        /* eslint-disable */
        const pkg = require(getPkgPath(plugin))
        /* eslint-disable */
        return path.join(getPluginPath(plugin), pkg.main)
      })
  }
}

module.exports = Plugins
