import { useFloating } from '@floating-ui/react-dom'
import EmojiPicker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import type { FC, ReactNode } from 'react'
type IconInfo = {
  id: string // "chipmunk"
  keywords:string[] // ['animal', 'nature', 'rodent', 'squirrel']
  name: string // Chipmunk
  native: string // 🐿️
  shortcodes:string // ':chipmunk:'
  unified: string // '1f43f-fe0f'
}

export const EmojiPopover:FC<{
  onSelect?(icon:string):void,
  children:ReactNode
}> = ({ onSelect, children }) => {
  const { refs, floatingStyles } = useFloating()
  function onSelectEmoji (icon:IconInfo) {
    if (!onSelect) return
    onSelect(icon.native)
  }
  return (
    <>
      <div ref={refs.setReference} >
        {children}
      </div>
      <div ref={refs.setFloating} style={floatingStyles} >
        <EmojiPicker data={data} onEmojiSelect={onSelectEmoji} locale={'zh'} previewPosition={'none'}/>
      </div>
    </>
  )
}
