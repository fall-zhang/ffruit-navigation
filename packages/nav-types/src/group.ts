import z from 'zod'

export const navCategorySchema = z.object({
  id: z.string(),
  name: z.string().min(2, '名称长度至少为 2').max(8, '名称长度不能超过 8'),
  parent: z.string(),
  groupSort: z.number()
})


export type NavCategoryType = z.infer<typeof navCategorySchema>

export const navCategoryCreateSchema = navCategorySchema.omit({ id: true })

export type NavCategoryCreateType = z.infer<typeof navCategoryCreateSchema>

export const navCategoryUpdateSchema = navCategorySchema.partial().required({ id: true })

export type NavCategoryUpdateType = z.infer<typeof navCategoryUpdateSchema>
