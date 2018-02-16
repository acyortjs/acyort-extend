# acyort-extend

[![Build Status](https://travis-ci.org/acyortjs/acyort-extend.svg?branch=master)](https://travis-ci.org/acyortjs/acyort-extend)
[![codecov](https://codecov.io/gh/acyortjs/acyort-extend/branch/master/graph/badge.svg)](https://codecov.io/gh/acyortjs/acyort-extend)

Extends for [AcyOrt](https://github.com/acyortjs/acyort)

## Install

```bash
$ npm i acyort-extend -S
```

## Usage

### scripts

```js
// scripts/export.js
module.exports = { a: 1 }

// scripts/init.js
const data = require(require.resolve('./export'))

acyort.extend.register('after_init', () => {
  data.a = 2
  acyort.logger.info(acyort.config.scripts_dir)
})

acyort.extend.register('after_build', () => {
  acyort.logger.info(data.a)
})

// scripts/promise.js
acyort.extend.register('after_fetch', data => {
  data.path = 'module'

  return new Promise(reslove => {
    setTimeout(() => {
      acyort.logger.info('promise')
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
  acyort.logger.info(path.join(process.cwd(), data.path))
})
```

### run

```js
const Extend = require('acyort-extend')
const Logger = require('acyort-logger')

const config = {
  scripts_dir: 'scripts',
  base: process.cwd(),
  scripts: [
    'init.js',
    'promise.js'
  ],
  plugins: [
    'module'
  ]
}

class Acyort {
  constructor() {
    this.logger = new Logger()
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
  .then(() => acyort.extend.run('after_build', null))

/*
log result:

scripts
promise
.../acyort-extend/module
2
*/
```
