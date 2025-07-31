import { FC } from 'react'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'

import type { Table } from '@tanstack/react-table'
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react'
export const CommonTableFooter:FC<{
  tableInfo:Table<any>
}> = ({ tableInfo }) => {
  return <div className="flex items-center justify-between px-4">
    <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
      当前共 {tableInfo.getFilteredRowModel().rows.length} 行，选中 {tableInfo.getFilteredSelectedRowModel().rows.length} 行
    </div>
    <div className="flex w-full items-center gap-8 lg:w-fit">
      <div className="hidden items-center gap-2 lg:flex">
        <Label htmlFor="rows-per-page" className="text-sm font-medium">
          分页
        </Label>
        <Select
          value={`${tableInfo.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            tableInfo.setPageSize(Number(value))
          }}
        >
          <SelectTrigger size="sm" className="w-20" id="rows-per-page">
            <SelectValue
              placeholder={tableInfo.getState().pagination.pageSize}
            />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex w-fit items-center justify-center text-sm font-medium">
        当前页面 {tableInfo.getState().pagination.pageIndex + 1} of{' '}
        {tableInfo.getPageCount()}
      </div>
      <div className="ml-auto flex items-center gap-2 lg:ml-0">
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => tableInfo.setPageIndex(0)}
          disabled={!tableInfo.getCanPreviousPage()}
        >
          <span className="sr-only">首页</span>
          <ChevronsLeftIcon />
        </Button>
        <Button
          variant="outline"
          className="size-8"
          size="icon"
          onClick={() => tableInfo.previousPage()}
          disabled={!tableInfo.getCanPreviousPage()}
        >
          <span className="sr-only">上一页</span>
          <ChevronLeftIcon />
        </Button>
        <Button
          variant="outline"
          className="size-8"
          size="icon"
          onClick={() => tableInfo.nextPage()}
          disabled={!tableInfo.getCanNextPage()}
        >
          <span className="sr-only">下一页</span>
          <ChevronRightIcon />
        </Button>
        <Button
          variant="outline"
          className="hidden size-8 lg:flex"
          size="icon"
          onClick={() => tableInfo.setPageIndex(tableInfo.getPageCount() - 1)}
          disabled={!tableInfo.getCanNextPage()}
        >
          <span className="sr-only">尾页</span>
          <ChevronsRightIcon />
        </Button>
      </div>
    </div>
  </div>
}
