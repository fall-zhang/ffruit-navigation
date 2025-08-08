import type { HotApiResType } from 'nav-types'


export default defineEventHandler(async (event):Promise<HotApiResType> => {
  const slug = event.context.params?.slug || 'bilibili'
  const res = await $fetch('https://api-hot.imsyy.top/' + slug, {
    query: {
      cache: true
    }
  }) as HotApiResType

  return res
})
