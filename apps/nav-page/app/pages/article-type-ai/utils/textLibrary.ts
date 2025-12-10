// 练习文本库，按难度分类
export const textLibrary = {
  easy: [
    'The quick brown fox jumps over the lazy dog. This sentence contains all letters.',
    'Practice typing every day to improve your speed and accuracy over time.',
    'Learning new skills takes patience and consistent effort. Never give up.',
    'The sun rises in the east and sets in the west. Nature follows its own rules.',
    'Reading books opens your mind to new ideas and different perspectives.'
  ],

  medium: [
    'Modern technology has fundamentally changed how we communicate and access information. The internet connects billions of people worldwide, creating a global community that transcends geographical boundaries.',
    'Regular physical exercise is essential for maintaining both physical and mental health. Studies show that consistent activity reduces stress, improves mood, and enhances cognitive function.',
    'The development of renewable energy sources represents a critical step toward addressing climate change. Solar and wind power technologies have advanced significantly in recent years.'
  ],

  hard: [
    'Quantum computing leverages the principles of quantum mechanics to perform calculations exponentially faster than classical computers for specific problems. This emerging technology has the potential to revolutionize fields such as cryptography, drug discovery, and optimization.',
    "Neuroplasticity refers to the brain's remarkable ability to reorganize itself by forming new neural connections throughout life. This adaptive capacity enables learning, memory formation, and recovery from brain injuries.",
    'The philosophical concept of existentialism emphasizes individual freedom, choice, and personal responsibility in a universe without inherent meaning. Existentialist thinkers argue that humans must create their own values and purpose through authentic actions.'
  ]
}

// 获取随机文本
export function getRandomText(difficulty = 'easy') {
  const texts = textLibrary[difficulty]
  return texts[Math.floor(Math.random() * texts.length)]
}

// 计算准确率
export function calculateAccuracy(original, input) {
  if (!input.length) return 100

  let correct = 0
  const minLength = Math.min(original.length, input.length)

  for (let i = 0; i < minLength; i++) {
    if (original[i] === input[i]) correct++
  }

  return Math.round((correct / input.length) * 100)
}

// 比较文本并生成高亮数据
export function compareTexts(original, input) {
  const result = []
  const maxLength = Math.max(original.length, input.length)

  for (let i = 0; i < maxLength; i++) {
    const originalChar = original[i] || ''
    const inputChar = input[i] || ''

    if (i < input.length) {
      if (originalChar === inputChar) {
        result.push({ char: originalChar, type: 'correct', index: i })
      } else {
        result.push({
          char: inputChar,
          type: 'incorrect',
          index: i,
          expected: originalChar
        })
      }
    } else {
      result.push({ char: originalChar, type: 'pending', index: i })
    }
  }

  return result
}
