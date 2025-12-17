import type { SectionType, SentenceType } from '../types'

/**
 * 获取当前已经拼写好的句子
 * @param sentence
 * @returns
 */
export const getSentenceTypedWords = (sentence:SentenceType) => {
  let resStr = ''
  sentence.words.forEach((left) => {
    resStr += left.input
  })
  return resStr
}
/**
 * 获取当前已经拼写好的句子
 * @param sentence
 * @returns
 */
export const getSectionTypedWords = (section:SectionType) => {
  let resStr = ''
  section.sentences.forEach((sentence) => {
    resStr += getSentenceTypedWords(sentence)
  })
  return resStr
}
