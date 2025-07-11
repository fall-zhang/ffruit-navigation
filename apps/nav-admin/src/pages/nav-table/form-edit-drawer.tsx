import { useIsMobile } from '@/hooks/use-mobile'
import { Button } from '@/components/ui/button'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle
} from '@/components/ui/drawer'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { tableEditSchema } from './data-schema'
import type { TableItemType, TableCreateType } from './data-schema'
import { useEffect, useId, useRef, useState } from 'react'
import { FormDateTimePicker } from '@/components/wrapped/Form/FormItemDateTimeISO'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormItemUpload } from '@/components/wrapped/Form/FormItemUpload'


type TableDrawer = {
  visible:boolean
  itemInfo:TableItemType
  onCancel():void
  onSubmit(form:TableCreateType):void
}

export function FormEditDrawer ({ visible, itemInfo, onCancel, onSubmit }:TableDrawer) {
  const isMobile = useIsMobile()
  const versionNameId = useId()
  const statusId = useId()
  const [isFileUpload, setIsFileUpload] = useState(false)
  const [fileName, setFileName] = useState('')
  const form = useForm<TableCreateType>({
    resolver: zodResolver(tableEditSchema),
    defaultValues: {
      id: null,
      status: '',
      publishDateTime: '',
      versionName: ''
    }
  })
  const formErrors = form.formState.errors

  useEffect(() => {
    Object.keys(itemInfo).forEach((key) => {
      const itemValue = itemInfo[key as keyof TableItemType]

      let itemKey:keyof TableCreateType | undefined
      if (key in form.getValues()) {
        itemKey = key as keyof TableCreateType
      }
      if (!itemKey) {
        return
      }
      if (itemValue === undefined) {
        return
      }
      form.setValue(itemKey, itemValue)
      console.log('itemKey, itemValue', itemKey, itemValue)
    })
    setIsFileUpload(false)
    form.setValue('file', [])
  }, [form, itemInfo])

  function onSubmitForm (form:TableCreateType) {
    onSubmit(form)
  }
  function onChangeFile (files:FileList) {
    const appFile = files[0]
    if (appFile) {
      setIsFileUpload(true)
      setFileName(appFile.name)
      form.setValue('file', appFile)
    }
  }
  const fileUpload = itemInfo.filePath || isFileUpload

  const renderFileName = isFileUpload ? fileName : itemInfo.filePath

  return (
    <Drawer open={visible} direction={isMobile ? 'bottom' : 'right'} handleOnly modal>
      <DrawerOverlay asChild={true}/>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{itemInfo.id ? '编辑内容' : '新增版本'}</DrawerTitle>
        </DrawerHeader>
        <form className="flex flex-col gap-4 grow" onSubmit={form.handleSubmit(onSubmitForm)}>
          <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm grow">
            <div className="flex flex-col gap-3">
              <Label htmlFor={versionNameId}>版本名称</Label>
              <Input autoComplete='off' {...form.register('versionName')} id={versionNameId} defaultValue={'itemInfo.versionName'}/>
              <span className='text-red-600 text-sm'>{formErrors.versionName && formErrors.versionName.message}</span>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="type">发布时间</Label>
              <Controller
                control={form.control}
                name={'publishDateTime'}
                render={({ field }) => <FormDateTimePicker {...field} />}
              ></Controller>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor={statusId}>状态</Label>
              <Controller
                control={form.control}
                name={'status'}
                render={({ field }) => <Select value={field.value} onValueChange={field.onChange} >
                  <SelectTrigger id={statusId} className="w-full" onBlur={field.onBlur}>
                    <SelectValue placeholder="选择状态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="未发布">未发布</SelectItem>
                    <SelectItem value="已发布">已发布</SelectItem>
                    <SelectItem value="已撤回">已撤回</SelectItem>
                  </SelectContent>
                </Select>}
              />
            </div>
            {/* <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="target">上月下载量</Label>
                {itemInfo.lastMonthDownload}
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="target">累计月下载量</Label>
                {itemInfo.totalDownload}
              </div>
            </div> */}
            <div className="">
              <FormItemUpload onChange={onChangeFile} disable={Boolean(itemInfo.id) }>
                <Button type='button'>上传文件</Button>
              </FormItemUpload>
              <div className='ml-2'>{renderFileName}</div>
              <div>
                { fileUpload
                  ? (<span className='text-green-500 ml-2 '>文件已上传</span>)
                  : (<span className='text-red-500 ml-2 '>文件未上传</span>)
                }
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 px-2 py-3">
            <Button type='submit'>提交</Button>
            <DrawerClose asChild>
              <Button variant="outline" onClick={onCancel}>取消</Button>
            </DrawerClose>
          </div>
        </form>
      </DrawerContent>
    </Drawer>
  )
}
