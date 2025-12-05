// 解析文本，转换为能让用户输入的内容

// import type { VNode } from 'vue'

// const testString = `Technology has transformed the way we communicate and access information. With the internet, we can connect with people across the globe in an instant. This connectivity brings both opportunities and challenges as we navigate the digital age.
// Reading is a fundamental skill that opens doors to knowledge and imagination. Through books, we can travel to distant lands, explore different cultures, and gain insights from great thinkers throughout history.
// Regular exercise is essential for maintaining both physical and mental health. Physical activity strengthens the body, improves mood, and enhances cognitive function, contributing to overall well-being.`

// export function articleParse(recStr:string) {
//   const childList:VNode[] = []
//   recStr.split('\n').forEach(paragraph => {
//     const spanList:VNode[] = []
//     paragraph.split(' ').forEach(item => {
//       spanList.push(h('span', {
//         class: 'text-not-type'
//       }))
//     })
//     const pNode = h('p', {
//       class: 'type-paragraph'
//     }, spanList)
//   })

//   return h('article', {
//     class: 'bar', innerHTML: 'hello'
//   }, childList)
// }

