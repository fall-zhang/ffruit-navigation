// 解析文本，转换为能让用户输入的内容

import type { WordTypeUnit } from '../types'
import type { SectionType } from '../types/section-type'
import type { SentenceType } from '../types/sentence-type'
import { splitToSentence } from './section-parse'


export const testString = `Technology has transformed the way we communicate and access information. With the internet, we can connect with people across the globe in an instant. This connectivity brings both opportunities and challenges as we navigate the digital age.
Reading is a fundamental skill that opens doors to knowledge and imagination. Through books, we can travel to distant lands, explore different cultures, and gain insights from great thinkers throughout history.
Regular exercise is essential for maintaining both physical and mental health. Physical activity strengthens the body, improves mood, and enhances cognitive function, contributing to overall well-being.`

export function articleParse (recStr:string):SectionType[] {
  const newStr = recStr.trim()
  const sectionList:SectionType[] = []
  newStr.split('\n').forEach(section => {
    if (section.length === 0) return
    const sentenceList:SentenceType[] = []
    let sectionWordCount = 0
    // 一个或多个句子结束标点，并且这些标点后面必须紧跟一个或多个空白字符，或者直接就是整个字符串的结尾。
    const sentenceStrList = splitToSentence(section)
    sentenceStrList.forEach(sentence => {
      const wordList:WordTypeUnit[] = []
      const wordStrList = sentence.split(' ')
      wordStrList.forEach(word => {
        wordList.push({
          type: 'word',
          tagName: 'span',
          state: 'un-type',
          text: word,
          input: ''
        })
      })
      sentenceList.push({
        words: wordList,
        trans: [],
        state: 'un-type',
        letterCount: sentence.length,
        wordCount: wordStrList.length,
        type: 'sentence'
      })
      sectionWordCount += wordStrList.length
    })
    sectionList.push({
      sentences: sentenceList,
      state: 'un-type',
      letterCount: section.length,
      wordCount: sectionWordCount,
      sentenceCount: sentenceList.length,
      type: 'section'
    })
  })

  return sectionList
}

// const result = articleParse(testString)
// console.log('⚡️ line:53 ~ result: ', result)
