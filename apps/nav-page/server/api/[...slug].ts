export default defineEventHandler(async (event) => {
  console.log('event 0000', event.method)
  const query = getQuery(event)
  const slug = event.context.params?.slug || ''
  event.$fetch('http://localhost:4773/' + slug).then(res => {
    console.log(res)
  }).catch(err => {
    console.log('🚀 ~ err:', err)
  })
  return {
    hello: 'world'
  }
})
