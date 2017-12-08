# acyort-extend

[![Build Status](https://travis-ci.org/acyortjs/acyort-extend.svg?branch=master)](https://travis-ci.org/acyortjs/acyort-extend)
[![codecov](https://codecov.io/gh/acyortjs/acyort-extend/branch/master/graph/badge.svg)](https://codecov.io/gh/acyortjs/acyort-extend)

Extended support for [AcyOrt](https://github.com/acyortjs/acyort)

## Install

```bash
$ npm i acyort-extend -S
```

## Usage

### scripts

```js
// scripts/export.js
module.exports = { a: 1 }

// scripts/helper.js
acyort.extend.helper('js', function(s) {
  return s.split('').join('.')
})

// scripts/init.js
const data = require(require.resolve('./export'))

acyort.extend.register('after_init', () => {
  data.a = 2
  acyort.logger(acyort.config.scripts_dir)
})

acyort.extend.register('after_generate', () => {
  acyort.logger(data.a)
})

// scripts/promise.js
acyort.extend.register('after_fetch', data => {
  data.path = 'module'

  return new Promise(reslove => {
    setTimeout(() => {
      acyort.logger('promise')
      reslove()
    }, 1000)
  })
})
```

### plugins

```js
// package.json
{
  "name": "module",
  "version": "0.0.0",
  "main": "index.js"
}

// index.js
const path = require('path')

acyort.extend.register('after_process', (data) => {
  acyort.logger(path.join(process.cwd(), data.path))
})
```

### run

```js
const Extend = require('acyort-extend')

const config = {
  scripts_dir: 'scripts',
  basePath: process.cwd(),
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

const data = { path: 'change' }

const acyort = new Acyort()

acyort.extend.init()
  .then(() => acyort.extend.run('after_init', null))
  .then(() => acyort.extend.run('after_fetch', data))
  .then(() => acyort.extend.run('after_process', data))
  .then(() => acyort.extend.run('after_generate', null))
  .then(() => console.log(acyort.extend.helper.js('ab')))

/*
log result:

scripts
promise
.../acyort-extend/module
2
a.b
*/
```
