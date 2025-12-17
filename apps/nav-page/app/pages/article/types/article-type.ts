
import type { SectionType } from './section-type'
import type { TypeStateType } from './word-type'

export type ArticleType = {
  type:'article'
  title:string
  sections: SectionType[]
  state: TypeStateType
  startTime: number
  endTime: number
  errInputCount: number
  totalInputCount: 0,
  editSpanIndex: 0
  wordCount:number
  letterCount:number
}
