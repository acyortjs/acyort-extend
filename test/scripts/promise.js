acyort.extend.register('after_fetch', data => {
  data.path = 'module'

  return new Promise(reslove => {
    setTimeout(() => {
      acyort.logger('promise')
      reslove()
    }, 50)
  })
})
