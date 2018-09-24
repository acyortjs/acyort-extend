params.queue.push(
  data => {
    return new Promise(reslove => {
      setTimeout(() => {
        params.log(data)
        reslove()
      }, 200)
    })
  }
)
