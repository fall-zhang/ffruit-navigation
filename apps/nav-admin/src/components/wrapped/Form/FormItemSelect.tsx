import type { FC } from 'react'
import { cn } from '@/utils/utils'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

type FormItemProps = {
  id?:string // html 原生 id 属性
  className?:string,
  placeholder?:string,
  value:string,
  onChange(value:string):void
  options:Array<{ label:string, value:string }>
}

export const FormItemSelect:FC<FormItemProps> = ({ value, onChange, options, className, placeholder, id }) => {
  return <Select value={value} onValueChange={onChange} >
    <SelectTrigger id={id} className={cn('w-[180px] border-zinc-700 bg-transparent', className)}>
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        {
          options.map(item => {
            return <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
          })
        }
      </SelectGroup>
    </SelectContent>
  </Select>
}
