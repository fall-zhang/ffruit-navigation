// 一句话

import type { WordTypeUnit } from './index'
export type SentenceType = {
  words: WordTypeUnit[]
  type:'sentence'
  state:'un-type' | 'typed' | 'typing'
  trans:[]
  letterCount:number
  totalLength:number
}
