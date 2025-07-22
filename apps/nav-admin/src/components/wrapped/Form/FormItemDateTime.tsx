'use client'

import { ChevronDownIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { useEffect, useId, useState, type FC } from 'react'

import dayjs from 'dayjs'
import { useController, type ControllerRenderProps, type UseControllerProps, type UseFormRegister } from 'react-hook-form'

type CalendarType = ControllerRenderProps


export const FormDateTimePicker:FC<CalendarType> = (props) => {
  const [open, setOpen] = useState(false)
  const [dateVal, setDateVal] = useState<Date | undefined>(() => {
    if (!props.value) {
      return new Date()
    }
  })
  const [timeVal, setTimeVal] = useState<string>(() => {
    if (!props.value) {
      return dayjs().format('HH:mm:ss')
    }
    return ''
  })
  const timePickerId = useId()
  const datePickerId = useId()
  function onUpdateDate (newVal?:Date) {
    setDateVal(newVal)
    const value = dayjs(newVal).format('YYYY-MM-DD')
    const fullDateTime = value + ' ' + timeVal
    props.onChange(fullDateTime)
    setOpen(false)
  }
  function onUpdateTime (newVal:string) {
    setTimeVal(newVal)
    const fullDateTime = dayjs(dateVal).format('YYYY-MM-DD') + ' ' + newVal
    props.onChange(fullDateTime)
  }
  useEffect(() => {
    const fullDateTime = dayjs(dateVal).format('YYYY-MM-DD') + ' ' + timeVal
    props.onChange(fullDateTime)
  }, [])
  return (
    <div className="flex gap-4">
      <div className="flex  gap-3 items-center">
        <Label htmlFor={datePickerId} className="px-1">
          日期
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id={datePickerId}
              className="w-32 justify-between font-normal"
            >
              {dateVal ? dateVal.toLocaleDateString() : 'Select date'}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={dateVal }
              captionLayout="dropdown"
              onSelect={(date) => {
                onUpdateDate(date)
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex  gap-3 items-center">
        <Label htmlFor={timePickerId} className="px-1 shrink-0">
          时间
        </Label>
        <Input
          type="time"
          id={timePickerId}
          step="1"
          value={timeVal}
          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          onChange={(e) => onUpdateTime(e.target.value)}
        />
      </div>
    </div>
  )
}
