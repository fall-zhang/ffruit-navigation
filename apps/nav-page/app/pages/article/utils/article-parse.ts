// 解析文本，转换为能让用户输入的内容

import type { WordTypeUnit } from '../types'
import type { ArticleType } from '../types/article-type'
import type { SectionType } from '../types/section-type'
import type { SentenceType } from '../types/sentence-type'


const testString = `Technology has transformed the way we communicate and access information. With the internet, we can connect with people across the globe in an instant. This connectivity brings both opportunities and challenges as we navigate the digital age.
Reading is a fundamental skill that opens doors to knowledge and imagination. Through books, we can travel to distant lands, explore different cultures, and gain insights from great thinkers throughout history.
Regular exercise is essential for maintaining both physical and mental health. Physical activity strengthens the body, improves mood, and enhances cognitive function, contributing to overall well-being.`

export function articleParse(recStr:string):SectionType[] {
  const newStr = recStr.trim()
  const sectionList:SectionType[] = []
  newStr.split('\n').forEach(section => {
    if (section.length === 0) return
    const sentenceList:SentenceType[] = []
    // 一个或多个句子结束标点，并且这些标点后面必须紧跟一个或多个空白字符，或者直接就是整个字符串的结尾。
    section.split(/[.!?]+(?:\s+|$)/).forEach(sentence => {
      const wordList:WordTypeUnit[] = []
      sentence.split(' ').forEach(word => {
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
        letterCount: 0,
        totalLength: 0,
        type: 'sentence'
      })
    })
    sectionList.push({
      sentence: sentenceList,
      state: 'un-type',
      letterCount: 0,
      wordCount: 0,
      type: 'section'
    })
  })

  return sectionList
}

