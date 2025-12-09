import type { WordTypeUnit } from '../types'

export const structuredList:WordTypeUnit[] = [
  {
    type: 'word',
    tagName: 'span',
    state: 'typed',
    text: 'Who ',
    input: 'Who '
  },
  {
    type: 'word',
    state: 'un-type',
    tagName: 'span',
    text: 'is ',
    input: ''
  },
  {
    type: 'word',
    state: 'un-type',
    tagName: 'span',
    text: 'your ',
    input: ''
  },
  {
    type: 'word',
    state: 'un-type',
    tagName: 'span',
    text: 'lover. ',
    input: ''
  }
]
