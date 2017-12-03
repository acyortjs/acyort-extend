const Extend = require('../')

const config = {
  scripts_dir: 'scripts',
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
    this.extend = new Extend(this)
  }

  exec(type, data) {
    const scripts = this.extend.scripts[type].map(script => script(data))
    return Promise.all(scripts).then(() => data)
  }

  init() {
    this.extend.init()
      .then(() => this.exec('after_init', null))
      .then(() => this.exec('after_fetch', null))
      .then(() => this.exec('after_process', { path: 'module' }))
      .then(() => console.log(this.extend.helpers))
  }
}

const acyort = new Acyort()

acyort.init()
