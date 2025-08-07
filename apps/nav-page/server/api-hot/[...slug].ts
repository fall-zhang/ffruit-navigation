export default defineEventHandler((event) => {
  $fetch('https://api-hot.imsyy.top/bilibili').then(res => {
    console.log(res)
  }).catch(err => {
    console.error(err)
  })
  console.log('event 0000')
  return {
    hello: 'world'
  }
})
