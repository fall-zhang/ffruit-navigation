export default defineEventHandler(async (event) => {
  console.log('event 0000', event.method)
  const query = getQuery(event)
  const slug = event.context.params?.slug || ''
  return await event.$fetch('http://localhost:4773/' + slug)
})
