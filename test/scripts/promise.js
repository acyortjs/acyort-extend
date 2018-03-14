acyort.scripts.push(
  data => {
    return new Promise(reslove => {
      setTimeout(() => {
        acyort.logger.info(data)
        reslove()
      }, 50)
    })
  }
)
