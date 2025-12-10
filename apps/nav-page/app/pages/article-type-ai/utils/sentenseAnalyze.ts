/**
 * 英文句子句法拆分与组合工具
 * 支持基于规则的简单分析和基于自然语言处理的复杂分析
 */
class EnglishSentenceParser {
  constructor() {
    this.initRegexPatterns()
    this.initWordLists()
  }

  /**
   * 初始化正则表达式模式
   */
  initRegexPatterns() {
    this.patterns = {
      // 句子结束标点
      sentenceEnd: /[.!?]+(?:\s+|$)/,

      // 子句分隔符（连词、关系代词等）
      clauseDelimiters: /\b(?:and|but|or|nor|for|yet|so|although|because|since|unless|while|when|where|if|that|which|who|whom|whose)\b/i,

      // 标点符号分隔
      punctuation: /[,.!?;:]+/,

      // 短语分隔符（介词等）
      phraseDelimiters: /\b(?:in|on|at|by|with|about|against|between|through|during|before|after|above|below|from|to|of|for)\b/i,

      // 专有名词（首字母大写的单词）
      properNoun: /\b[A-Z][a-z]*\b/,

      // 缩写检测
      abbreviation: /\b(?:[A-Za-z]\.){2,}|\b(?:e\.g|i\.e|etc\.|vs\.|et al\.)\b/i,

      // 所有格
      possessive: /'s\b|\b\w+'/,

      // 数字
      numbers: /\b\d+(?:\.\d+)?\b/,

      // 括号内容
      parentheses: /\([^)]+\)/g,

      // 引号内容
      quotes: /"[^"]+"|'[^']+'/g,

      // 电子邮件和URL
      email: /\b[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/,
      url: /\bhttps?:\/\/[^\s]+\b/
    }
  }

  /**
   * 初始化单词列表
   */
  initWordLists() {
    // 常用连词
    this.conjunctions = new Set([
      'and', 'but', 'or', 'nor', 'for', 'yet', 'so',
      'although', 'because', 'since', 'unless', 'while',
      'when', 'where', 'if', 'that', 'which', 'who',
      'whom', 'whose', 'after', 'before', 'once',
      'though', 'till', 'until', 'whenever', 'wherever'
    ])

    // 常用介词
    this.prepositions = new Set([
      'in', 'on', 'at', 'by', 'with', 'about', 'against',
      'between', 'into', 'through', 'during', 'before',
      'after', 'above', 'below', 'from', 'to', 'of', 'for'
    ])

    // 常用限定词
    this.determiners = new Set([
      'the', 'a', 'an', 'this', 'that', 'these', 'those',
      'my', 'your', 'his', 'her', 'its', 'our', 'their',
      'some', 'any', 'no', 'every', 'each', 'all'
    ])

    // 常用助动词
    this.auxiliaryVerbs = new Set([
      'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
      'have', 'has', 'had', 'do', 'does', 'did',
      'will', 'would', 'shall', 'should',
      'can', 'could', 'may', 'might', 'must'
    ])

    // 常用关系代词
    this.relativePronouns = new Set([
      'who', 'whom', 'whose', 'which', 'that'
    ])
  }

  /**
   * ============================
   * 句子拆分方法
   * ============================
   */

  /**
   * 按句子拆分（基于标点）
   * @param {string} text - 输入的文本
   * @returns {string[]} 句子数组
   */
  splitIntoSentences(text) {
    if (!text || typeof text !== 'string') return []

    // 处理缩写，避免误拆
    const processedText = this.protectAbbreviations(text)

    // 按句子结束标点拆分
    const sentences = processedText.split(this.patterns.sentenceEnd)

    // 清理空字符串并重新添加标点
    return sentences
      .filter(s => s.trim().length > 0)
      .map((sentence, index) => {
        // 恢复标点
        const match = text.match(new RegExp(this.escapeRegex(sentence) + '[.!?]+'))
        if (match && match[0]) {
          return match[0]
        }
        return sentence + (index < sentences.length - 1 ? '.' : '')
      })
  }

  /**
   * 按子句拆分（基于连词和关系词）
   * @param {string} sentence - 输入的句子
   * @returns {Array} 子句数组，每个元素包含文本和类型
   */
  splitIntoClauses(sentence) {
    if (!sentence) return []

    const clauses = []
    let remaining = sentence.trim()

    while (remaining.length > 0) {
      // 查找下一个子句分隔符
      const match = remaining.match(this.patterns.clauseDelimiters)

      if (!match) {
        // 没有更多分隔符，添加剩余部分
        clauses.push({
          text: remaining.trim(),
          type: this.identifyClauseType(remaining),
          connector: null
        })
        break
      }

      const delimiter = match[0]
      const delimiterIndex = match.index

      // 获取子句（从开始到分隔符之前）
      const clauseText = remaining.substring(0, delimiterIndex).trim()

      if (clauseText) {
        clauses.push({
          text: clauseText,
          type: this.identifyClauseType(clauseText),
          connector: null
        })
      }

      // 添加连接词
      clauses.push({
        text: delimiter,
        type: 'connector',
        connector: delimiter.toLowerCase()
      })

      // 更新剩余文本
      remaining = remaining.substring(delimiterIndex + delimiter.length).trim()
    }

    return clauses
  }

  /**
   * 按短语拆分（基于语法结构）
   * @param {string} clause - 子句或句子
   * @returns {Array} 短语数组，每个元素包含文本和类型
   */
  splitIntoPhrases(clause) {
    if (!clause) return []

    const words = clause.split(/\s+/)
    const phrases = []
    let currentPhrase = []
    let currentType = null

    for (let i = 0; i < words.length; i++) {
      const word = words[i].replace(/[,.!?;:]$/, '')
      const wordType = this.identifyWordType(word, i === 0)

      if (currentType === null) {
        currentType = wordType
        currentPhrase.push(words[i])
      } else if (wordType === currentType || wordType === 'preposition') {
        currentPhrase.push(words[i])
      } else {
        // 新短语开始
        phrases.push({
          text: currentPhrase.join(' '),
          type: currentType
        })

        currentPhrase = [words[i]]
        currentType = wordType
      }
    }

    // 添加最后一个短语
    if (currentPhrase.length > 0) {
      phrases.push({
        text: currentPhrase.join(' '),
        type: currentType
      })
    }

    return phrases
  }

  /**
   * 按词性标注拆分
   * @param {string} text - 输入的文本
   * @returns {Array} 单词数组，每个元素包含单词和词性
   */
  splitWithPOS(text) {
    if (!text) return []

    const words = text.split(/\s+/)
    return words.map((word, index) => {
      const cleanWord = word.replace(/[,.!?;:]$/, '')
      return {
        word,
        clean: cleanWord,
        pos: this.identifyWordType(cleanWord, index === 0),
        isCapitalized: /^[A-Z]/.test(word),
        hasPunctuation: /[,.!?;:]$/.test(word)
      }
    })
  }

  /**
   * 识别子句类型
   * @param {string} clause - 子句文本
   * @returns {string} 子句类型
   */
  identifyClauseType(clause) {
    const lowerClause = clause.toLowerCase()
    const words = lowerClause.split(/\s+/)

    // 检查是否包含动词
    const hasVerb = this.detectVerb(clause)

    // 检查是否独立
    if (this.conjunctions.has(words[0]) || this.relativePronouns.has(words[0])) {
      return hasVerb ? 'dependent' : 'fragment'
    }

    if (hasVerb && /^[A-Z]/.test(clause)) {
      return 'independent'
    }

    return hasVerb ? 'dependent' : 'fragment'
  }

  /**
   * 识别单词类型（简化版词性标注）
   * @param {string} word - 单词
   * @param {boolean} isFirst - 是否是句子开头
   * @returns {string} 词性标签
   */
  identifyWordType(word, isFirst = false) {
    const lowerWord = word.toLowerCase()

    // 检查是否为专有名词（首字母大写且不是句子开头）
    if (/^[A-Z]/.test(word) && !isFirst && word.length > 1) {
      return 'proper_noun'
    }

    // 检查常见词性
    if (this.determiners.has(lowerWord)) return 'determiner'
    if (this.prepositions.has(lowerWord)) return 'preposition'
    if (this.auxiliaryVerbs.has(lowerWord)) return 'auxiliary'
    if (this.conjunctions.has(lowerWord)) return 'conjunction'
    if (this.relativePronouns.has(lowerWord)) return 'relative_pronoun'

    // 检查是否为数字
    if (/^\d+(\.\d+)?$/.test(word)) return 'number'

    // 检查是否为动词（简化检测）
    if (this.detectVerb(word)) return 'verb'

    // 默认名词
    return 'noun'
  }

  /**
   * 检测单词是否为动词（简化版）
   * @param {string} word - 单词
   * @returns {boolean}
   */
  detectVerb(word) {
    const lowerWord = word.toLowerCase()

    // 常见动词后缀
    const verbSuffixes = [
      'ate', 'ify', 'ize', 'ise', 'en', 'ed', 'ing',
      's', 'es' // 第三人称单数
    ]

    // 常见不规则动词
    const commonVerbs = new Set([
      'be', 'have', 'do', 'say', 'get', 'make', 'go', 'know',
      'take', 'see', 'come', 'think', 'look', 'want', 'give',
      'use', 'find', 'tell', 'ask', 'work', 'seem', 'feel',
      'try', 'leave', 'call', 'is', 'are', 'was', 'were',
      'has', 'had', 'does', 'did', 'will', 'would', 'can',
      'could', 'may', 'might', 'must', 'should'
    ])

    if (commonVerbs.has(lowerWord)) return true

    // 检查动词后缀
    for (const suffix of verbSuffixes) {
      if (lowerWord.endsWith(suffix) && lowerWord.length > suffix.length) {
        return true
      }
    }

    return false
  }

  /**
   * ============================
   * 句子组合方法
   * ============================
   */

  /**
   * 从单词数组组合句子
   * @param {Array} words - 单词数组（带词性信息）
   * @param {Object} options - 组合选项
   * @returns {string} 组合后的句子
   */
  combineFromWords(words, options = {}) {
    if (!Array.isArray(words) || words.length === 0) return ''

    const {
      capitalizeFirst = true,
      addPeriod = true,
      preservePunctuation = true
    } = options

    // 构建句子
    let sentence = ''

    for (let i = 0; i < words.length; i++) {
      const wordObj = words[i]
      let wordText = ''

      // 处理不同类型的输入
      if (typeof wordObj === 'string') {
        wordText = wordObj
      } else if (wordObj.word) {
        wordText = wordObj.word
      } else if (wordObj.text) {
        wordText = wordObj.text
      } else {
        continue
      }

      // 添加空格（不是第一个单词）
      if (i > 0) {
        // 检查是否需要添加空格（某些标点前不需要空格）
        const prevChar = sentence.charAt(sentence.length - 1)
        const currentFirstChar = wordText.charAt(0)

        if (!(prevChar === '(' || currentFirstChar === ')' ||
              currentFirstChar === ',' || currentFirstChar === '.' ||
              currentFirstChar === '!' || currentFirstChar === '?' ||
              currentFirstChar === ';' || currentFirstChar === ':')) {
          sentence += ' '
        }
      }

      sentence += wordText
    }

    // 首字母大写
    if (capitalizeFirst && sentence.length > 0) {
      sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1)
    }

    // 添加句号
    if (addPeriod && !/[.!?]$/.test(sentence)) {
      sentence += '.'
    }

    return sentence
  }

  /**
   * 从短语数组组合句子
   * @param {Array} phrases - 短语数组
   * @param {Object} options - 组合选项
   * @returns {string} 组合后的句子
   */
  combineFromPhrases(phrases, options = {}) {
    if (!Array.isArray(phrases) || phrases.length === 0) return ''

    const {
      capitalizeFirst = true,
      addPeriod = true,
      connector = 'and' // 默认连接词
    } = options

    let sentence = ''

    for (let i = 0; i < phrases.length; i++) {
      const phrase = phrases[i]
      let phraseText = ''

      if (typeof phrase === 'string') {
        phraseText = phrase
      } else if (phrase.text) {
        phraseText = phrase.text
      } else {
        continue
      }

      // 添加短语
      if (i > 0) {
        // 根据短语类型添加连接词
        const isLast = i === phrases.length - 1

        if (!isLast) {
          sentence += ` ${connector} `
        } else {
          sentence += ' '
        }
      }

      sentence += phraseText
    }

    // 首字母大写
    if (capitalizeFirst && sentence.length > 0) {
      sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1)
    }

    // 添加句号
    if (addPeriod && !/[.!?]$/.test(sentence)) {
      sentence += '.'
    }

    return sentence
  }

  /**
   * 从子句数组组合句子
   * @param {Array} clauses - 子句数组
   * @param {Object} options - 组合选项
   * @returns {string} 组合后的句子
   */
  combineFromClauses(clauses, options = {}) {
    if (!Array.isArray(clauses) || clauses.length === 0) return ''

    const {
      capitalizeFirst = true,
      addPeriod = true,
      connectorType = 'comma' // comma, conjunction, 或 semicolon
    } = options

    let sentence = ''

    for (let i = 0; i < clauses.length; i++) {
      const clause = clauses[i]
      let clauseText = ''

      if (typeof clause === 'string') {
        clauseText = clause
      } else if (clause.text) {
        clauseText = clause.text
      } else {
        continue
      }

      // 添加子句
      if (i > 0) {
        // 根据连接类型添加标点或连接词
        switch (connectorType) {
          case 'comma':
            sentence += ', '
            break
          case 'semicolon':
            sentence += '; '
            break
          case 'conjunction':{
            const conj = clause.connector || 'and'
            sentence += ` ${conj} `
          }
            break
          default:
            sentence += ' '
        }
      }

      sentence += clauseText
    }

    // 首字母大写
    if (capitalizeFirst && sentence.length > 0) {
      sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1)
    }

    // 添加句号
    if (addPeriod && !/[.!?]$/.test(sentence)) {
      sentence += '.'
    }

    return sentence
  }

  /**
   * 重组句子（改变语序或结构）
   * @param {string} sentence - 原句子
   * @param {string} style - 重组风格
   * @returns {string} 重组后的句子
   */
  reorderSentence(sentence, style = 'standard') {
    const clauses = this.splitIntoClauses(sentence)
    const phrases = this.splitIntoPhrases(sentence)

    switch (style) {
      case 'passive':
        return this.convertToPassive(sentence)

      case 'question':
        return this.convertToQuestion(sentence)

      case 'emphatic':
        return this.addEmphasis(sentence)

      case 'simple':
        return this.simplifySentence(sentence)

      case 'complex':
        return this.makeComplex(sentence)

      default:
        return sentence
    }
  }

  /**
   * 转换为被动语态
   * @param {string} sentence - 原句子
   * @returns {string} 被动语态句子
   */
  convertToPassive(sentence) {
    // 简化的被动转换
    const words = this.splitWithPOS(sentence)

    // 查找动词
    const verbIndex = words.findIndex(w => w.pos === 'verb' || w.pos === 'auxiliary')

    if (verbIndex === -1) return sentence

    // 简化的被动转换逻辑
    const beforeVerb = words.slice(0, verbIndex)
    const verb = words[verbIndex]
    const afterVerb = words.slice(verbIndex + 1)

    // 构建被动句
    const passiveWords = [
      ...afterVerb.filter(w => w.pos !== 'preposition'),
      'by',
      ...beforeVerb.filter(w => w.pos !== 'determiner'),
      'is',
      verb.clean + 'ed' // 简化处理
    ]

    return this.combineFromWords(passiveWords)
  }

  /**
   * ============================
   * 辅助方法
   * ============================
   */

  /**
   * 保护缩写，避免在拆分句子时误判
   * @param {string} text - 输入的文本
   * @returns {string} 处理后的文本
   */
  protectAbbreviations(text) {
    // 临时替换常见缩写
    const abbreviations = {
      'Dr.': 'Dr@',
      'Mr.': 'Mr@',
      'Mrs.': 'Mrs@',
      'Ms.': 'Ms@',
      'Prof.': 'Prof@',
      'e.g.': 'eg@',
      'i.e.': 'ie@',
      'etc.': 'etc@',
      'vs.': 'vs@',
      'U.S.': 'US@',
      'U.K.': 'UK@'
    }

    let processed = text
    for (const [abbr, placeholder] of Object.entries(abbreviations)) {
      const regex = new RegExp(this.escapeRegex(abbr), 'g')
      processed = processed.replace(regex, placeholder)
    }

    return processed
  }

  /**
   * 恢复缩写
   * @param {string} text - 处理后的文本
   * @returns {string} 恢复后的文本
   */
  restoreAbbreviations(text) {
    const abbreviations = {
      'Dr@': 'Dr.',
      'Mr@': 'Mr.',
      'Mrs@': 'Mrs.',
      'Ms@': 'Ms.',
      'Prof@': 'Prof.',
      'eg@': 'e.g.',
      'ie@': 'i.e.',
      'etc@': 'etc.',
      'vs@': 'vs.',
      'US@': 'U.S.',
      'UK@': 'U.K.'
    }

    let restored = text
    for (const [placeholder, abbr] of Object.entries(abbreviations)) {
      const regex = new RegExp(this.escapeRegex(placeholder), 'g')
      restored = restored.replace(regex, abbr)
    }

    return restored
  }

  /**
   * 转义正则表达式特殊字符
   * @param {string} string - 输入的字符串
   * @returns {string} 转义后的字符串
   */
  escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }

  /**
   * 转换为疑问句
   * @param {string} sentence - 原句子
   * @returns {string} 疑问句
   */
  convertToQuestion(sentence) {
    const words = this.splitWithPOS(sentence)

    // 查找助动词
    const auxiliaryIndex = words.findIndex(w => this.auxiliaryVerbs.has(w.clean.toLowerCase()))

    if (auxiliaryIndex !== -1) {
      // 有助动词，将其移到句首
      const auxiliary = words[auxiliaryIndex]
      const beforeAux = words.slice(0, auxiliaryIndex)
      const afterAux = words.slice(auxiliaryIndex + 1)

      const questionWords = [
        auxiliary,
        ...beforeAux,
        ...afterAux
      ]

      return this.combineFromWords(questionWords, { addPeriod: false }) + '?'
    }
    // 没有助动词，添加"Do"
    return 'Do ' + sentence.toLowerCase().replace(/\.$/, '') + '?'
  }

  /**
   * 添加强调
   * @param {string} sentence - 原句子
   * @returns {string} 强调句
   */
  addEmphasis(sentence) {
    const phrases = this.splitIntoPhrases(sentence)

    if (phrases.length < 2) return sentence

    // 找到主要的名词短语
    const nounPhraseIndex = phrases.findIndex(p =>
      p.type === 'noun' || p.type === 'proper_noun' ||
      p.type === 'determiner'
    )

    if (nounPhraseIndex === -1) return sentence

    // 构建强调结构
    const nounPhrase = phrases[nounPhraseIndex]
    const otherPhrases = phrases.filter((_, i) => i !== nounPhraseIndex)

    return `It is ${nounPhrase.text} that ${this.combineFromPhrases(otherPhrases, { capitalizeFirst: false })}`
  }

  /**
   * 简化句子
   * @param {string} sentence - 原句子
   * @returns {string} 简化后的句子
   */
  simplifySentence(sentence) {
    const clauses = this.splitIntoClauses(sentence)

    // 只保留独立子句
    const independentClauses = clauses.filter(c =>
      c.type === 'independent' || (typeof c === 'string')
    )

    if (independentClauses.length === 0) return sentence

    return this.combineFromClauses(independentClauses.map(c =>
      (typeof c === 'string' ? c : c.text)
    ))
  }

  /**
   * 使句子更复杂
   * @param {string} sentence - 原句子
   * @returns {string} 复杂化的句子
   */
  makeComplex(sentence) {
    const clauses = this.splitIntoClauses(sentence)

    if (clauses.length === 0) return sentence

    // 添加一个从属子句
    const dependentClauses = [
      'although it may seem difficult',
      'because of these reasons',
      'when considering all factors',
      'which is an important point'
    ]

    const randomClause = dependentClauses[Math.floor(Math.random() * dependentClauses.length)]

    return `${randomClause.charAt(0).toUpperCase() + randomClause.slice(1)}, ${sentence}`
  }
}

/**
 * ============================
 * 使用示例和演示
 * ============================
 */

// 创建解析器实例
const parser = new EnglishSentenceParser()

// 示例文本
const sampleText = "The quick brown fox jumps over the lazy dog, but the dog doesn't seem to care. However, this is just a simple example."

// 1. 拆分句子
console.log('=== 拆分句子 ===')
const sentences = parser.splitIntoSentences(sampleText)
console.log('句子:', sentences)

// 2. 拆分子句
console.log('\n=== 拆分子句 ===')
sentences.forEach((sentence, index) => {
  console.log(`句子 ${index + 1}: ${sentence}`)
  const clauses = parser.splitIntoClauses(sentence)
  console.log('子句:', clauses.map(c => `${c.text} (${c.type})`))
})

// 3. 拆分短语
console.log('\n=== 拆分短语 ===')
const firstSentence = sentences[0]
const phrases = parser.splitIntoPhrases(firstSentence)
console.log('短语:', phrases.map(p => `${p.text} (${p.type})`))

// 4. 词性标注
console.log('\n=== 词性标注 ===')
const posTags = parser.splitWithPOS(firstSentence)
console.log('词性:', posTags.map(w => `${w.word} (${w.pos})`))

// 5. 组合句子
console.log('\n=== 组合句子 ===')

// 从单词组合
const combinedFromWords = parser.combineFromWords(posTags)
console.log('从单词组合:', combinedFromWords)

// 从短语组合
const combinedFromPhrases = parser.combineFromPhrases(phrases)
console.log('从短语组合:', combinedFromPhrases)

// 6. 句子重组
console.log('\n=== 句子重组 ===')
console.log('原句:', firstSentence)
console.log('被动语态:', parser.reorderSentence(firstSentence, 'passive'))
console.log('疑问句:', parser.reorderSentence(firstSentence, 'question'))
console.log('强调句:', parser.reorderSentence(firstSentence, 'emphatic'))

// 7. 复杂示例
const complexText = 'Although the weather was terrible, we decided to go for a walk in the park, which turned out to be a wonderful experience.'
console.log('\n=== 复杂句子分析 ===')
console.log('原句:', complexText)

const complexClauses = parser.splitIntoClauses(complexText)
console.log('子句分析:')
complexClauses.forEach((clause, i) => {
  console.log(`  ${i + 1}. ${clause.text} [${clause.type}]`)
})

// 8. 简化和复杂化
console.log('\n=== 句子转换 ===')
console.log('简化:', parser.reorderSentence(complexText, 'simple'))
console.log('更复杂:', parser.reorderSentence(firstSentence, 'complex'))

/**
 * ============================
 * 高级功能：基于规则的句子生成
 * ============================
 */

class SentenceGenerator {
  constructor() {
    this.templates = {
      simple: [
        '{subject} {verb} {object}.',
        '{subject} {verb} {adverb}.',
        '{subject} is {adjective}.'
      ],
      compound: [
        '{subject} {verb} {object}, and {subject2} {verb2} {object2}.',
        '{subject} {verb} {object}, but {subject2} {verb2} {object2}.',
        '{subject} {verb} {object}; however, {subject2} {verb2} {object2}.'
      ],
      complex: [
        'Although {subject} {verb} {object}, {subject2} {verb2} {object2}.',
        'Because {subject} {verb} {object}, {subject2} {verb2} {object2}.',
        'When {subject} {verb} {object}, {subject2} {verb2} {object2}.'
      ]
    }

    this.vocabulary = {
      subjects: ['The cat', 'A dog', 'The man', 'A woman', 'The student', 'The teacher'],
      verbs: ['runs', 'jumps', 'reads', 'writes', 'speaks', 'listens'],
      objects: ['a book', 'the ball', 'a letter', 'the lesson', 'a song'],
      adjectives: ['happy', 'sad', 'quick', 'slow', 'intelligent', 'curious'],
      adverbs: ['quickly', 'slowly', 'happily', 'carefully', 'loudly']
    }
  }

  /**
   * 生成随机句子
   * @param {string} type - 句子类型
   * @returns {string} 生成的句子
   */
  generateSentence(type = 'simple') {
    const template = this.templates[type] || this.templates.simple
    const randomTemplate = template[Math.floor(Math.random() * template.length)]

    // 替换占位符
    return randomTemplate
      .replace(/{subject}/g, this.getRandomItem('subjects'))
      .replace(/{subject2}/g, this.getRandomItem('subjects'))
      .replace(/{verb}/g, this.getRandomItem('verbs'))
      .replace(/{verb2}/g, this.getRandomItem('verbs'))
      .replace(/{object}/g, this.getRandomItem('objects'))
      .replace(/{object2}/g, this.getRandomItem('objects'))
      .replace(/{adjective}/g, this.getRandomItem('adjectives'))
      .replace(/{adverb}/g, this.getRandomItem('adverbs'))
  }

  getRandomItem(category) {
    const items = this.vocabulary[category]
    return items[Math.floor(Math.random() * items.length)]
  }
}

// 使用句子生成器
console.log('\n=== 句子生成器 ===')
const generator = new SentenceGenerator()
console.log('简单句:', generator.generateSentence('simple'))
console.log('复合句:', generator.generateSentence('compound'))
console.log('复杂句:', generator.generateSentence('complex'))

/**
 * ============================
 * 浏览器中使用示例
 * ============================
 */

// HTML页面中使用的示例函数
function demoInBrowser() {
  const parser = new EnglishSentenceParser()

  // 获取用户输入
  const userInput = document.getElementById('sentenceInput').value

  if (!userInput.trim()) {
    alert('请输入一个英文句子')
    return
  }

  // 分析句子
  const sentences = parser.splitIntoSentences(userInput)
  const clauses = parser.splitIntoClauses(userInput)
  const phrases = parser.splitIntoPhrases(userInput)
  const posTags = parser.splitWithPOS(userInput)

  // 显示结果
  document.getElementById('sentencesResult').innerHTML =
    sentences.map((s, i) => `<div>${i + 1}. ${s}</div>`).join('')

  document.getElementById('clausesResult').innerHTML =
    clauses.map(c => `<div>${c.text} <span class="tag">${c.type}</span></div>`).join('')

  document.getElementById('phrasesResult').innerHTML =
    phrases.map(p => `<div>${p.text} <span class="tag">${p.type}</span></div>`).join('')

  document.getElementById('posResult').innerHTML =
    posTags.map(w => `<span class="word-tag">${w.word}<sub>${w.pos}</sub></span>`).join(' ')

  // 生成重组句子
  document.getElementById('passiveResult').textContent =
    parser.reorderSentence(userInput, 'passive')
  document.getElementById('questionResult').textContent =
    parser.reorderSentence(userInput, 'question')
}

// HTML结构示例
const htmlExample = `
<!DOCTYPE html>
<html>
<head>
  <title>英文句子分析器</title>
  <style>
    .container { max-width: 800px; margin: 0 auto; padding: 20px; }
    textarea { width: 100%; height: 100px; margin-bottom: 10px; }
    button { padding: 10px 20px; background: #4CAF50; color: white; border: none; cursor: pointer; }
    .results { margin-top: 20px; }
    .section { margin-bottom: 20px; padding: 15px; background: #f5f5f5; border-radius: 5px; }
    .tag { background: #2196F3; color: white; padding: 2px 6px; border-radius: 3px; font-size: 0.8em; }
    .word-tag { margin-right: 8px; }
    .word-tag sub { color: #666; font-size: 0.7em; }
  </style>
</head>
<body>
  <div class="container">
    <h1>英文句子句法分析器</h1>
    
    <div>
      <textarea id="sentenceInput" placeholder="输入英文句子...">
The quick brown fox jumps over the lazy dog, but the dog doesn't seem to care.
      </textarea>
      <button onclick="demoInBrowser()">分析句子</button>
    </div>
    
    <div class="results">
      <div class="section">
        <h3>句子拆分</h3>
        <div id="sentencesResult"></div>
      </div>
      
      <div class="section">
        <h3>子句分析</h3>
        <div id="clausesResult"></div>
      </div>
      
      <div class="section">
        <h3>短语分析</h3>
        <div id="phrasesResult"></div>
      </div>
      
      <div class="section">
        <h3>词性标注</h3>
        <div id="posResult"></div>
      </div>
      
      <div class="section">
        <h3>句子重组</h3>
        <div>
          <strong>被动语态:</strong> <span id="passiveResult"></span>
        </div>
        <div>
          <strong>疑问句:</strong> <span id="questionResult"></span>
        </div>
      </div>
    </div>
  </div>
  
  <script>
    // 这里放置 EnglishSentenceParser 类的代码
    // 以及 demoInBrowser 函数
  </script>
</body>
</html>
`

console.log('\n=== HTML 示例代码已生成 ===')
console.log('将以上HTML代码保存为文件并在浏览器中打开即可使用交互式分析器')
