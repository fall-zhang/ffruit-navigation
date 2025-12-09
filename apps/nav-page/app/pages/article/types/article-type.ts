
import type { SectionType } from './section-type'

export type ArticleType = {
  type:'article'
  sections: SectionType[]
  state:'typing'
  startTime: number
  endTime: number
  errInputCount: number
  totalInputCount: 0,
  editSpanIndex: 0
  wordCount:number
  letterCount:number
}
