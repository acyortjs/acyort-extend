/* global params */

const fn = data => new Promise((reslove) => {
  setTimeout(() => {
    params.log(data)
    reslove()
  }, 200)
})

params.queue.push(fn)
