// 一个单词
export type ContentType = 'word' | 'punctuation'

export type UnTypeItem = {
  type: ContentType, // 内容类型
  tagName: 'span',
  state: 'un-type', // 该字符的输入状态
  text: string // 正确内容
  input: string // 用户输入的内容
}

export type TypingItem = {
  type: ContentType,
  tagName: 'span',
  state: 'typing',
  text: string
  input: string
}

export type TypedItem = {
  type: ContentType,
  tagName: 'span',
  state: 'typed',
  text: string
  input: string
}
export type WordTypeUnit = UnTypeItem | TypingItem | TypedItem
