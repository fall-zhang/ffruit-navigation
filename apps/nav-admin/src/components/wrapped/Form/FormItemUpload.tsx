import { cn } from '@/utils/utils'
import { useRef } from 'react'
import type { DOMAttributes, FC, HTMLAttributes, MouseEvent, ReactNode } from 'react'

export const FormItemUpload:FC<{
  children:ReactNode
  disable?:boolean
  className?:string
  accept?:DOMAttributes<'accept'>
  onChange(newFileList:FileList):void
}> = ({ children, className, onChange, disable }) => {
  const uploadButtonRef = useRef<HTMLInputElement>(null)
  function onUploadFile (ev:MouseEvent) {
    ev.stopPropagation()
    if (disable) return
    if (!uploadButtonRef.current) {
      return
    }
    uploadButtonRef.current.click()
  }
  function onChangeFile () {
    const files = uploadButtonRef.current?.files
    if (!files || files?.length === 0) {
      return
    }
    onChange(files)
  }
  return <div className={cn('touch-none none', className)} onClick={onUploadFile} aria-disabled={disable} >
    {children}
    <input type="file" className='hidden' ref={uploadButtonRef} onChange={onChangeFile} disabled={disable}/>
  </div>
}
