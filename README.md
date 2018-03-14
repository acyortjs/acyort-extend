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
acyort.logger.info(acyort.config.scripts_dir)

// scripts/promise.js
acyort.scripts.push(
  data => {
    return new Promise(reslove => {
      setTimeout(() => {
        acyort.logger.info(data)
        reslove()
      }, 1000)
    })
  }
)
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
 acyort.logger.info(path.join(process.cwd(), 'change'))
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
    this.scripts = []
    this.extend = new Extend(this, ['logger', 'config', 'scripts'])
  }
}

function run(scripts, data) {
  return Promise.all(scripts.map(script => script(data))).then(() => data)
}

const acyort = new Acyort()

acyort.extend.init()
  .then(() => run(acyort.scripts, 'promise'))

/*
log result:

scripts
.../acyort-extend/change
promise
*/
```
