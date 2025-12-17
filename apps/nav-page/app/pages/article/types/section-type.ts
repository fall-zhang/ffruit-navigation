// 一个段落

import type { SentenceType } from './sentence-type'
import type { TypeStateType } from './word-type'
export type SectionType = {
  type:'section'
  sentences: SentenceType[]
  state:TypeStateType
  letterCount:number // 字母数量
  wordCount:number // 单词数量
  sentenceCount:number // 句子数量
}
