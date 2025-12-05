import type { TypeUnit } from '../types'

export const structuredList:TypeUnit[] = [
  {
    type: 'word',
    tagName: 'span',
    state: 'typed',
    text: 'who',
    input: ''
  },
  {
    type: 'word',
    state: 'typing',
    tagName: 'span',
    text: ' ',
    input: ' '
  },
  {
    type: 'word',
    state: 'un-type',
    tagName: 'span',
    text: 'are'
  }
]

