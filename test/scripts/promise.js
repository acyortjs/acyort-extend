acyort.extend.register('after_fetch', () => {
  return new Promise(reslove => {
    setTimeout(() => {
      acyort.logger('promise')
      reslove()
    }, 1000)
  })
})
