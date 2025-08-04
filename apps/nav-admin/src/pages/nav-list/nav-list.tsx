import {
  IconCircleCheckFilled,
  IconDotsVertical,
  IconLoader
} from '@tabler/icons-react'
import type {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  Row,
  VisibilityState
} from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import type { TableItemType } from './data-schema'
import { useEffect, useMemo, useState } from 'react'
import { FormEditDrawer } from './table-edit-drawer'
import { CommonTableHeader } from '@/components/table-common/table-header'
import { CommonTableFooter } from '@/components/table-common/table-footer'
import * as api from './api/api'
const initData:TableItemType[] = [{
  id: '1321',
  name: '百度',
  href: 'https://www.baidu.com',
  desc: '百度一下，你就不知道',
  logo: 'https://www.baidu.com/favicon.ico',
  authorName: '',
  authorUrl: '',
  auditTime: '',
  createTime: '',
  tag: [],
  status: '',
  view: 0,
  star: 0,
  accessState: 0
}]

function getTableColumn ({
  onClickRowCommand
}:{
  onClickRowCommand(command:string, rowInfo:TableItemType):void
}):ColumnDef<TableItemType>[] {
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
      accessorKey: 'name',
      header: '网址名称',
      cell: ({ row }) => {
        return <div >{row.original.name}</div>
      },
      enableHiding: false
    },
    {
      accessorKey: 'href',
      header: '网址链接',
      cell: ({ row }) => (
        <div className="w-32">
          <a href={row.original.href} className="text-muted-foreground px-1.5">
            {row.original.href}
          </a>
        </div>
      )
    },
    {
      accessorKey: 'status',
      header: '版本状态',
      cell: ({ row }) => (
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.status}
        </Badge>
      )
    },
    {
      accessorKey: 'accessState',
      header: () => <div className="w-full">上月下载量</div>,
      cell: ({ row }) => (
        <div>
          {row.original.accessState}
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

export default function RichContentTable () {
  const [tableData, setTableData] = useState(initData)
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false)
  const [drawerEditItem, setDrawerEditItem] = useState<TableItemType>({
    id: null,
    name: '',
    href: '',
    desc: '',
    logo: '',
    authorName: '',
    status: 1,
    authorUrl: '',
    auditTime: '',
    createTime: '',
    tag: [],
    view: 0,
    star: 0,
    accessState: 0
  })
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })
  useEffect(() => {
    // 获取 release 信息
    api.getNavTable({
      pagination: 1
    }).then(res => {

    }).catch(err => {
      setTableData([
        {
          id: '999999999',
          name: '',
          href: '',
          desc: '',
          logo: '',
          authorName: '',
          status: 1,
          authorUrl: '',
          auditTime: '',
          createTime: '',
          tag: [],
          view: 0,
          star: 0,
          accessState: 0
        }
      ])
    })
  }, [])

  function onSubmit (values: TableItemType) {
    if (values.id) {
      api.patchNavTable({
        ...values
      }).then(res => {
        setDrawerVisible(false)
        // reFetchTableData()
      }).catch(err => {
        console.warn(err)
      })
    } else {
      api.postNavTable({
        ...values
      }).then(res => {
        setDrawerVisible(false)
        // reFetchTableData()
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

      if (command === 'delete') {
        // 删除表格项
        if (!rowInfo.id) {
          return
        }
        api.removeReleaseVersion(rowInfo.id || '').then((res) => {
          // reFetchTableData()
        }).catch(err => {
          console.warn(err)
        })
      }
    }
    return getTableColumn({
      onClickRowCommand
    })
  }, [])
  const tableInfo = useReactTable({
    data: tableData,
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
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues()
  })

  function onAddNewItem () {
    setDrawerEditItem(() => ({
      id: null,
      name: '',
      href: '',
      desc: '',
      logo: '',
      authorName: '',
      status: 'CHECK',
      authorUrl: '',
      auditTime: '',
      createTime: '',
      tag: [],
      view: 0,
      star: 0,
      accessState: 0
    }))
    setDrawerVisible(true)
  }
  return (<>
    <div className="flex items-center justify-between px-4 lg:px-6">
      <CommonTableHeader tableInfo={tableInfo} onAddNewItem={onAddNewItem}/>
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
                  当前数据为空
                </TableCell>
              </TableRow>
              )}
          </TableBody>
        </Table>
      </div>
      <CommonTableFooter tableInfo={tableInfo} />
    </div>
    <FormEditDrawer visible={drawerVisible} itemInfo={drawerEditItem} onCancel={() => setDrawerVisible(false)} onSubmit={onSubmit}></FormEditDrawer>
  </>
  )
}
