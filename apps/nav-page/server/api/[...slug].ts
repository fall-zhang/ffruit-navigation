export default defineEventHandler(async (event) => {
  console.log('event 0000', event.method)

  $fetch('http://localhost:6224/nav', {
    method: 'get'
  }).then(res => {
    console.log(res)
  }).catch(err => {
    console.log('🚀 ~ err:', err)
  })
  return {
    hello: 'world'
  }
})
