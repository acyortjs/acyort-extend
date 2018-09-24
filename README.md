# acyort-extend

[![Build Status](https://travis-ci.org/acyortjs/extender.svg?branch=master)](https://travis-ci.org/acyortjs/extender)
[![codecov](https://codecov.io/gh/acyortjs/extender/branch/master/graph/badge.svg)](https://codecov.io/gh/acyortjs/extender)

Node script extender

## Install

```bash
$ npm i @acyort/extender -S
```

## Usage

```js
// export.js
module.exports = 'Extends Function'
```

```js
// init.js
const data = require(require.resolve('./export'))
params.log(data)
```

```js
const extender = require('@acyort/extender')
const path = require('path')

const params = { log: console.log }
const key = 'params'
const script = path.join(__dirname, 'init.js')

extender(script, params, key)
// Extende Function

// Promise use example see the test cases
```
