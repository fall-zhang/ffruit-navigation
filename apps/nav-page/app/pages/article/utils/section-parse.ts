const abbreviations = new Set([
  'Mr', 'Mrs', 'Ms', 'Dr', 'Prof', 'Rev',
  'Jr', 'Sr', 'St', 'vs', 'etc', 'e.g', 'i.e',
  'a.m', 'p.m', 'U.S', 'U.K', 'A.D', 'B.C'
])
// 主分割函数 - 性能优化，可以只使用指针
// 主分割函数 - 不断的操作字符串
export function splitToSentence (text:string) {
  const result:string[] = []
  let buffer = ''
  let i = 0
  const len = text.length

  while (i < len) {
    const char = text[i]
    buffer += char

    // 遇到可能的句子结束符
    if (char === '.' || char === '?' || char === '!') {
      const endSeq = getEndSequence(text, i)

      if (endSeq.length > 0) {
        buffer += text.substring(i + 1, i + endSeq.length)
        if (isSentenceEnd(buffer, text, i + endSeq.length)) {
          result.push(buffer.trim())
          buffer = ''
          i += endSeq.length // 跳过已处理的结束符序列
          continue
        }
      }
    }

    i++
  }

  // 处理最后一句
  if (buffer.trim()) {
    result.push(buffer.trim())
  }

  return result
}

/**
 * 获取结束符号序列，处理连续的结束符（如 ...、!!!、?!）
 */
function getEndSequence (text:string, start:number) {
  let seq = ''
  let i = start

  while (i < text.length && ((text[i] === '.') || (text[i] === '!') || (text[i] === '?'))) {
    seq += text[i]
    i++
  }

  return seq
}

/**
 * 判断是否是真正的句子结束
 */
function isSentenceEnd (buffer:string, text:string, nextIndex:number) {
  const trimmed = buffer.trim()

  // 空字符串不是句子
  if (!trimmed) return false

  // 检查是否是缩写
  if (isLikelyAbbreviation(trimmed)) {
    return false
  }

  // 检查下一个字符（如果有）
  if (nextIndex < text.length) {
    const nextChar = text[nextIndex] || ''
    // 如果下一个字符是字母或数字，可能不是句子结束
    if (/[a-zA-Z0-9]/.test(nextChar)) {
      return false
    }
  }

  return true
}

/**
 * 检查是否是缩写
 */
function isLikelyAbbreviation (sentence:string) {
  const words = sentence.split(' ')
  if (words.length === 0) return false

  const lastWord = words[words.length - 1] || ''

  // 检查整个缩写列表
  for (const abbr of abbreviations) {
    // 完全匹配（如 "Mr."）
    if (lastWord === abbr + '.') {
      return true
    }
    // 部分匹配（如 "Mr. Smith" 中的 "Mr."）
    if (lastWord.startsWith(abbr + '.') && lastWord.length > abbr.length + 1) {
      return true
    }
  }

  // 检查单个字母缩写（如 "A.", "B."）
  if (lastWord.length === 2 && lastWord[1] === '.' &&
        /[A-Z]/.test(lastWord[0] || '')) {
    return true
  }

  return false
}


// 使用示例
// const text2 = "Dr. Smith is here. Mr. Johnson asked: How are you? I'm Day.js O.K.! Really?? Yes!";
// const text2 = 'In this tutorial, I’ll guide you through creating a dreamy, interactive particle effect using Three.js, shaders, and the powerful GPGPU technique. Together, we’ll explore how to use GPU computation to bring thousands of particles to life with seamless motion, glowing highlights, and dynamic interactivity.'

// const sentences2 = splitToSentence(text2)
// console.log('分割结果:', sentences2)
// // ["Dr. Smith is here.", "Mr. Johnson asked: How are you?", "I'm O.K.!", "Really??", "Yes!"]

// const reconstructed2 = sentences2.join(' ')
// console.log('重新组合:', reconstructed2)
// console.log('输入内容:', text2)
// console.log('is equal:', text2 === reconstructed2)
