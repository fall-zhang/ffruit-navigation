import { useContext, type FC } from 'react'
import { cn } from '@/utils/utils'
import { Input } from '@/components/ui/input'
import { FormContext } from './FormItem'


export const FormItemInput:FC<{
  className?:string,
  placeholder?:string,
  value:string,
  onChange(value:string):void
}> = ({ value, onChange, className, placeholder }) => {
  const formId = useContext(FormContext)
  return <Input id={formId} value={value} placeholder={placeholder} onChange={(ev) => onChange(ev.target.value)} className={cn('', className)}>

  </Input>
}
