import z from 'zod'

export const navDataSchema = z.object({
  id: z.string(),
  name: z.string().min(2, '名称长度至少为 2'),
  href: z.string(),
  desc: z.string(),
  logo: z.string(),
  authorName: z.string(),
  authorUrl: z.string(),
  auditTime: z.string(),
  createTime: z.string(),
  tag: z.array(z.object({
    id: z.string(),
    name: z.string()
  })),
  view: z.number(),
  star: z.number(),
  // 审核状态 1 审核中 2 拒绝 3 通过
  status: z.enum(['CHECK', 'REJECT', 'PASS']), // 'CHECK" | "REJECT" | "PASS'
  // 访问状态 1 正常访问 2 需要代理 3 网站已停用
  accessState: z.enum(['NORMAL', 'PROXY', 'DEACTIVATE']) // "NORMAL" | "PROXY" | "DEACTIVATE"
})


export type NavDataType = z.infer<typeof navDataSchema>

export const navCreateSchema = navDataSchema.omit({ id: true })

export type NavCreateType = z.infer<typeof navCreateSchema>

export const navUpdateSchema = navDataSchema.partial().required({ id: true })

export type NavUpdateType = z.infer<typeof navUpdateSchema>
