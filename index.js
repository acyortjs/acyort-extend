const Module = require('module')
const vm = require('vm')
const fs = require('fs')
const path = require('path')

// https://github.com/hexojs/hexo/blob/master/lib/hexo/index.js#L206
module.exports = (scriptPath, params, key) => {
  const module = new Module(scriptPath)
  const requirer = p => module.require(p)
  const executes = fs.readFileSync(scriptPath)
  const script = `(function(exports,require,module,__filename,__dirname,${key}){${executes}})`
  const executor = vm.runInThisContext(script, scriptPath)
  const {
    _nodeModulePaths,
    _resolveFilename,
    _extensions,
    _cache,
  } = Module

  module.filename = scriptPath
  module.paths = _nodeModulePaths(scriptPath)

  requirer.resolve = request => _resolveFilename(request, module)
  requirer.main = process.mainModule
  requirer.extensions = _extensions
  requirer.cache = _cache

  executor(module.exports, requirer, module, scriptPath, path.dirname(scriptPath), params)
}
