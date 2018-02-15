const data = require(require.resolve('./export'))

acyort.extend.register('after_init', () => {
  data.a = 2
  acyort.logger.info(acyort.config.scripts_dir)
})

acyort.extend.register('after_build', () => {
  acyort.logger.info(data.a)
})
