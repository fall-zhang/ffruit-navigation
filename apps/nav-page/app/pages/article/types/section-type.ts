// 一个段落

import type { SentenceType } from './sentence-type'
export type SectionType = {
  type:'section'
  sentence: SentenceType[]
  state:'un-type' | 'typed' | 'typing'
  trans:[] // 翻译内容
  letterCount:number // 字母数量
  wordCount:number // 单词数量
}
