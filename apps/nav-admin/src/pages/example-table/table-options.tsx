import type { FC } from 'react'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { Button } from '@/components/ui/button'
import { IconLayoutColumns, IconChevronDown } from '@tabler/icons-react'
import { PlusIcon } from 'lucide-react'
import type { Table } from '@tanstack/react-table'
import type { TableItemType } from './data-schema'

export const TableHeaderOpt:FC<{
  tableInfo:Table<TableItemType>
  onAddNewItem():void
}> = ({ tableInfo, onAddNewItem }) => {
  return <div className="flex items-center gap-2 my-4">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <IconLayoutColumns />
          <span className=" lg:inline">自定义列</span>
          <IconChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {tableInfo
          .getAllColumns()
          .filter((column) =>
            typeof column.accessorFn !== 'undefined' && column.getCanHide()
          )
          .map((column) => {
            return (<DropdownMenuCheckboxItem
              key={column.id}
              className="capitalize"
              checked={column.getIsVisible()}
              onCheckedChange={(value) =>
                column.toggleVisibility(value)
              }
            >
              {column.id}
            </DropdownMenuCheckboxItem>)
          })}
      </DropdownMenuContent>
    </DropdownMenu>
    <Button variant="outline" size="sm" onClick={onAddNewItem}>
      <PlusIcon />
      <span className="hidden lg:inline">新增项</span>
    </Button>
  </div>
}
