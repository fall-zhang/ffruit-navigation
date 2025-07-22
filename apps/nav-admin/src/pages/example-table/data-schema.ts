import z from 'zod'

export const tableDataSchema = z.object({
  id: z.string().nullable(),
  versionName: z.string().min(2, '名称长度至少为 2'),
  status: z.string(),
  publishDateTime: z.string(),
  filePath: z.string(),
  lastMonthDownload: z.number(),
  totalDownload: z.number()
})

export type TableItemType = z.infer<typeof tableDataSchema>
