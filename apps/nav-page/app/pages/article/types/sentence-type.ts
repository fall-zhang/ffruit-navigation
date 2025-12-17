// 一句话

import type { TypeStateType, WordTypeUnit } from './index'
export type SentenceType = {
  words: WordTypeUnit[]
  type:'sentence'
  state:TypeStateType
  trans: []
  letterCount:number
  wordCount:number
}
