import { Label } from '@/components/ui/label'

import { createContext, useId, type FC, type ReactNode } from 'react'

type FormItemProps = {
  label?:string
  rules:[],
  children:ReactNode
}
export const FormContext = createContext<string>('')

export const FormItem:FC<FormItemProps> = (props) => {
  const formItemId = useId()
  return (
    <FormContext.Provider value={formItemId}>
      <div className="flex flex-col gap-3">
        <Label htmlFor={formItemId}>{props.label}</Label>
        {props.children}
      </div>
    </FormContext.Provider>
  )
}
