import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import type { FC } from 'react'

export const FormItemInput:FC = () => {
  return <FormItem>
    <FormLabel>版本名称</FormLabel>
    <FormControl>
      <Input placeholder="shadcn" />
    </FormControl>
    <FormDescription>
      This is your public display name.
    </FormDescription>
    <FormMessage />
  </FormItem>
}
