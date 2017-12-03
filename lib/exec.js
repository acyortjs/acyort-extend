const Module = require('module')
const vm = require('vm')
const fs = require('fs')
const pathFn = require('path')

// https://github.com/hexojs/hexo/blob/master/lib/hexo/index.js#L206
function exec(path, acyort) {
  const moduleFn = new Module(path)
  const requireFn = p => moduleFn.require(p)
  const file = fs.readFileSync(path)
  const script = `(function(exports,require,module,__filename,__dirname,acyort){${file}})`
  const fn = vm.runInThisContext(script, path)
  const {
    _nodeModulePaths,
    _resolveFilename,
    _extensions,
    _cache,
  } = Module

  moduleFn.filename = path
  moduleFn.paths = _nodeModulePaths(path)

  requireFn.resolve = request => _resolveFilename(request, moduleFn)
  requireFn.main = process.mainModule
  requireFn.extensions = _extensions
  requireFn.cache = _cache

  fn(moduleFn.exports, requireFn, moduleFn, path, pathFn.dirname(path), acyort)
}

module.exports = exec
