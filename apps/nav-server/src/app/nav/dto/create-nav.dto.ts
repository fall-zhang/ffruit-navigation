import { LinkAccessState, LinkState } from '@/generated/prisma/enums'
import { IsIn, IsISO8601, IsNumber, IsString } from 'class-validator'

export class CreateNavDto {
  @IsString()
  name: string

  // 网站 url
  href: string

  desc: string

  logo: string
  authorName: string
  authorUrl: string
  // @IsISO8601()
  // auditTime: string
  // createNavDto: string
  categoryId: string

  // createTime: string

  tag?:string[]
  // 页面浏览次数
  // @IsNumber()
  // view?: number

  // star?: number
  // 审核状态 审核中   拒绝     通过
  // @IsIn(['CHECK', 'REJECT', 'PASS'])
  // status?: LinkState

  // 访问状态 1 正常访问 2 需要代理 3 网站已停用
  @IsIn(['NORMAL', 'PROXY', 'DEACTIVATE'])
  accessState: LinkAccessState
}


