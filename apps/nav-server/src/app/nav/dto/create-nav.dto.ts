import { IsISO8601, IsNumber, IsString } from 'class-validator'

export class CreateNavDto {
  @IsString()
  categoryId: string

  @IsString()
  name: string

  // 网站 url
  href: string

  desc: string

  logo: string
  authorName: string
  authorUrl: string
  @IsISO8601()
  auditTime: string

  createTime: string
  tag:any
  // 页面浏览次数
  @IsNumber()
  view: number

  star: number
  // 审核状态 1 审核中 2 拒绝 3 通过
  status: number
  // 访问状态 1 正常访问 2 需要代理 3 网站已停用
  accessState: number
}


