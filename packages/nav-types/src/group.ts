import z from 'zod'

export const navGroupSchema = z.object({
  id: z.string(),
  name: z.string().min(2, '名称长度至少为 2').max(8, '名称长度不能超过 8'),
  parent: z.string(),
  groupSort: z.number()
})


export type NavGroupType = z.infer<typeof navGroupSchema>

export const navGroupCreateSchema = navGroupSchema.omit({ id: true })

export type NavGroupCreateType = z.infer<typeof navGroupCreateSchema>

export const navGroupUpdateSchema = navGroupSchema.partial().required({ id: true })

export type NavGroupUpdateType = z.infer<typeof navGroupUpdateSchema>
