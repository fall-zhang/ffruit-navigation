/* eslint-disable no-param-reassign */
import type { ArticleType, WordTypeUnit } from '../types'
import { useImmer } from '../hooks/use-immer'
type EditIndexInfo = {
  section: number // article 中的段落
  sectionLength: number // article 中的总段落数
  sentence: number // 编写完该句后 +1，编写完该段后为 0
  sentenceLength: number // 当前 section 中的总句子数
  word: number // 当前拼写到的单词
  wordLength: number // 单词长度
}
// export const []
export const [editIndex, setEditIndex] = useImmer<EditIndexInfo>({
  section: 0,
  sectionLength: 0,
  sentence: 0,
  sentenceLength: 0,
  word: 0,
  wordLength: 0
})

export function addLetterToArticle (article:ArticleType, inputLetter:string) {
  const curSection = article.sections[editIndex.value.section]
  if (!curSection) {
    console.warn('找不到对应的 section')
    return
  }
  const curSentence = curSection.sentences[editIndex.value.sentence]
  if (!curSentence) {
    console.warn('找不到对应的 sentence')
    return
  }

  const curWord = curSentence.words[editIndex.value.word]
  if (!curWord) {
    console.warn('找不到对应的 word')
    return
  }
  let isFinish = false
  if (curWord.text.length === curWord.input.length + 1) {
    isFinish = true
    editIndex.value.word = 0
    if (editIndex.value.word === curSentence.words.length) {
      editIndex.value.sentence = editIndex.value.sentence + 1
    }
  }
  editIndex.value.word = editIndex.value.word + 1
  return {
    ...curWord,
    state: isFinish ? 'typed' : 'typing',
    input: curWord.input + inputLetter
  }
}
// draft
export function handleWithdraw (article:ArticleType) {
  const curSection = article.sections[editIndex.value.section]
  if (!curSection) {
    console.warn('找不到对应的 section')
    return
  }
  const curSentence = curSection.sentences[editIndex.value.sentence]
  if (!curSentence) {
    console.warn('找不到对应的 sentence')
    return
  }

  const curWord = curSentence.words[editIndex.value.word]
  if (!curWord) {
    console.warn('找不到对应的 word')
    return
  }
  if (curWord && curWord.input === '') {
    const beforeEditIndex = getLastInputWordIndex(article, editIndex.value)
    const word = article.sections.at(beforeEditIndex.section)?.sentences.at(beforeEditIndex.section)?.words.at(beforeEditIndex.word)
    if (word) {
      if (word.input === '') {
        console.warn('内容已经清空，无法继续删除')
      } else {
        article.sections.at(beforeEditIndex.section)!.sentences.at(beforeEditIndex.section)!.words[beforeEditIndex.word] = withdrawLetter(word)
      }
    }
  } else if (curWord) {
    curSentence.words[editIndex.value.word] = withdrawLetter(curWord)
  } else {
    console.warn('内容已经清空，无法继续删除')
  }
}

function withdrawLetter (wordInfo:WordTypeUnit):WordTypeUnit {
  const newInput = wordInfo.input.slice(0, -1)
  const isEmpty = newInput.length === 0
  return {
    ...wordInfo,
    state: isEmpty ? 'un-type' : 'typing',
    input: newInput
  }
}

/**
 * index 获取内容出错时获取正确的 index
 */
export function getRightIndex (article:ArticleType):EditIndexInfo {
  console.warn('index 错误，获取正确的index')
  const newEditIndex:EditIndexInfo = {
    section: 0,
    sentence: 0,
    word: 0,
    sectionLength: 0,
    sentenceLength: 0,
    wordLength: 0
  }
  const isFind = false
  article.sections.forEach((section, sectionIndex) => {
    section.sentences.forEach((sentence, sentenceIndex) => {
      sentence.words.forEach((word, wordIndex) => {
        if (isFind) return
        if (word.state === 'typing' || word.state === 'un-type') {
          newEditIndex.section = sectionIndex
          newEditIndex.sentence = sentenceIndex
          newEditIndex.word = wordIndex
          newEditIndex.sectionLength = article.sections.length
          newEditIndex.sentenceLength = section.sentences.length
          newEditIndex.wordLength = sentence.words.length
        }
      })
    })
  })
  return newEditIndex
}

function getLastInputWordIndex (article:Readonly<ArticleType>, editIndex:EditIndexInfo):EditIndexInfo {
  const newEditIndex:EditIndexInfo = {
    ...editIndex
  }
  if (newEditIndex.word > 0) {
    newEditIndex.word = newEditIndex.word - 1
  } else if (newEditIndex.sentence > 0) {
    newEditIndex.sentence -= 1
    const newWordCount = article.sections[newEditIndex.section]?.sentences[newEditIndex.sentence]?.wordCount
    if (newWordCount) {
      newEditIndex.word = newWordCount - 1
    } else {
      console.warn('index 获取异常')
    }
  } else if (newEditIndex.section > 0) {
    newEditIndex.section -= 1
    const newSentenceCount = article.sections[newEditIndex.section]?.sentenceCount
    if (newSentenceCount) {
      newEditIndex.sentence = newSentenceCount - 1
      const newWordCount = article.sections[newEditIndex.section]?.sentences[newEditIndex.sentence]?.wordCount
      if (newWordCount) {
        newEditIndex.word = newWordCount - 1
      }
    }
    newEditIndex.word = 0
    newEditIndex.sentence = 0
  } else {
    console.warn('所有数据都已经清空')
  }
  console.log('⚡️ line:118 ~ editIndex: ', editIndex)
  return newEditIndex
}
export function getNextInputWordIndex (article:Readonly<ArticleType>, editIndex:EditIndexInfo):EditIndexInfo {
  const newEditIndex:EditIndexInfo = {
    ...editIndex
  }
  const curWordCount = article.sections[newEditIndex.section]?.sentences[newEditIndex.sentence]?.wordCount
  const curSentenceCount = article.sections[newEditIndex.section]?.sentenceCount
  const curSectionCount = article.sections.length

  if (!curWordCount || !curSentenceCount || !curSectionCount) {
    console.warn('index 获取异常')
    return newEditIndex
  }
  if (newEditIndex.word < curWordCount) {
    newEditIndex.word = newEditIndex.word + 1
  } else if (newEditIndex.sentence < curSentenceCount) {
    newEditIndex.sentence += 1
    newEditIndex.word = 0
  } else if (newEditIndex.section < curSectionCount) {
    newEditIndex.section += 1
    newEditIndex.word = 0
    newEditIndex.sentence = 0
  } else {
    console.warn('所有数据都已经清空')
  }
  return newEditIndex
}
