import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconCircleCheckFilled,
  IconDotsVertical,
  IconLoader
} from '@tabler/icons-react'
import type {
  ColumnDef,
  ColumnFiltersState,
  Row,
  VisibilityState
} from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import { Checkbox } from '@/components/ui/checkbox'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import type { TableCreateType, TableItemType } from './data-schema'
import { useEffect, useMemo, useState } from 'react'
import { FormEditDrawer } from './form-edit-drawer'
import { XCircleIcon } from 'lucide-react'
import { TableHeaderOpt } from './table-header'
import * as api from '../api/api'
import { toast } from 'sonner'

function getTableColumn ({
  onClickRowCommand
}:{
  onClickRowCommand(command:string, rowInfo:TableItemType):void
}) {
  const tableColumns: ColumnDef<TableItemType>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: 'versionName',
      header: '版本名称',
      cell: ({ row }) => {
        return <div >{row.original.versionName}</div>
      },
      enableHiding: false
    },
    {
      accessorKey: 'publishDateTime',
      header: '发布时间',
      cell: ({ row }) => (
        <div className="w-32">
          <Badge variant="outline" className="text-muted-foreground px-1.5">
            {row.original.publishDateTime}
          </Badge>
        </div>
      )
    },
    {
      accessorKey: 'status',
      header: '版本状态',
      cell: ({ row }) => (
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          { row.original.status === '未发布' && (
            <IconLoader />
          )}
          { row.original.status === '已发布' && (
            <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
          )}
          { row.original.status === '已撤回' && (
            <XCircleIcon color='red' />
          )}
          {row.original.status}
        </Badge>
      )
    },
    {
      accessorKey: 'lastMonthDownload',
      header: () => <div className="w-full">上月下载量</div>,
      cell: ({ row }) => (
        <div>
          {row.original.lastMonthDownload}
        </div>
      )
    },
    {
      accessorKey: 'totalDownload',
      header: () => <div className="w-full ">总计下载量</div>,
      cell: ({ row }) => (
        <div>
          {row.original.totalDownload}
          {/* <Input
            className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-16 border-transparent bg-transparent text-right shadow-none focus-visible:border dark:bg-transparent"
            defaultValue={row.original.limit}
            id={`${row.original.id}-limit`}
          /> */}
        </div>
      )
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        return (<DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
              size="icon"
            >
              <IconDotsVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem onClick={() => onClickRowCommand('edit', row.original)}>编辑</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onClickRowCommand('upload', row.original)}>上传</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onClickRowCommand('download', row.original)}>下载</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onClickRowCommand('abandon', row.original)}>撤销发布</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onClickRowCommand('delete', row.original)} variant="destructive">删除</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        )
      }
    }
  ]

  return tableColumns
}

function TableRowCell ({ row }: { row: Row<TableItemType> }) {
  return (
    <TableRow
      data-state={row.getIsSelected() && 'selected'}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  )
}

type TableProps = {
  data: TableItemType[]
  reFetchTableData():void
}

export function RichContentTable ({
  data,
  reFetchTableData
}:TableProps) {
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false)
  const [drawerEditItem, setDrawerEditItem] = useState<TableItemType>({
    id: '',
    status: '',
    publishDateTime: '',
    filePath: '',
    totalDownload: 0,
    lastMonthDownload: 0,
    versionName: ''
  })
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  })
  useEffect(() => {
    // 获取 release 信息
  }, [pagination])

  function onSubmit (values: TableCreateType) {
    if (values.id) {
      api.patchReleaseTable({
        ...values
      }).then(res => {
        setDrawerVisible(false)
        reFetchTableData()
      }).catch(err => {
        console.warn(err)
      })
    } else {
      if (!values.file) {
        toast('没有上传文件，请上传文件')
        return
      }
      api.postReleaseTable({
        ...values
      }).then(res => {
        setDrawerVisible(false)
        reFetchTableData()
      }).catch(err => {
        console.warn(err)
      })
    }
  }
  const tableColumns = useMemo(() => {
    function onClickRowCommand (command:string, rowInfo:TableItemType):void {
      if (command === 'edit') {
        setDrawerEditItem({
          ...rowInfo
        })
        setDrawerVisible(true)
      }
      if (command === 'download') {
        // 下载文件
        api.downloadReleaseVersion(rowInfo.filePath)
      }

      if (command === 'delete') {
        // 删除表格项
        if (!rowInfo.id) {
          return
        }
        api.removeReleaseVersion(rowInfo.id || '').then((res) => {
          reFetchTableData()
        }).catch(err => {
          console.warn(err)
        })
      }
    }
    return getTableColumn({
      onClickRowCommand
    })
  }, [reFetchTableData])
  const tableInfo = useReactTable({
    data,
    columns: tableColumns,
    enableRowSelection: true,
    state: {
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination
    },
    // _features: [],
    getRowId: (row) => row.id!.toString(),
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues()
  })

  function onAddNewItem () {
    setDrawerEditItem(() => ({
      id: '',
      status: '',
      publishDateTime: '',
      filePath: '',
      totalDownload: 0,
      lastMonthDownload: 0,
      versionName: ''
    }))
    setDrawerVisible(true)
  }
  return (<>
    <div className="flex items-center justify-between px-4 lg:px-6">
      <TableHeaderOpt tableInfo={tableInfo} onAddNewItem={onAddNewItem}/>
    </div>
    <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6" >
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="bg-muted sticky top-0 z-10">
            {tableInfo.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="**:data-[slot=table-cell]:first:w-8">
            { tableInfo.getRowModel().rows?.length
              ? (<>
                {tableInfo.getRowModel().rows.map((row) => (
                  <TableRowCell key={row.id} row={row} />
                ))}
              </>
              )
              : (<TableRow>
                <TableCell
                  colSpan={tableColumns.length}
                  className="h-24 text-center"
                >
                  没有结果
                </TableCell>
              </TableRow>
              )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between px-4">
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
              <IconChevronsLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => tableInfo.previousPage()}
              disabled={!tableInfo.getCanPreviousPage()}
            >
              <span className="sr-only">上一页</span>
              <IconChevronLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => tableInfo.nextPage()}
              disabled={!tableInfo.getCanNextPage()}
            >
              <span className="sr-only">下一页</span>
              <IconChevronRight />
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 lg:flex"
              size="icon"
              onClick={() => tableInfo.setPageIndex(tableInfo.getPageCount() - 1)}
              disabled={!tableInfo.getCanNextPage()}
            >
              <span className="sr-only">尾页</span>
              <IconChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
    <FormEditDrawer visible={drawerVisible} itemInfo={drawerEditItem} onCancel={() => setDrawerVisible(false)} onSubmit={onSubmit}></FormEditDrawer>
  </>
  )
}
