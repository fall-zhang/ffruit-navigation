import GeekProTable from '@/components/GeekProTable/GeekProTable'
import { API_NAV_AUDIT, API_NAV_LIST } from '@/apis/api'
import { ProColumns } from '@ant-design/pro-table'
import { Popconfirm, Tag, Space } from 'antd'
import { request } from '@/utils/request'
import type { NavStatus } from '@/types/api'
import { FC, ReactNode } from 'react'

const RandomColorTag:FC<{
  children:ReactNode
}> = ({ children }) => {
  const colors = [
    'magenta',
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
    'purple'
  ]
  return <Tag color={colors[Math.floor(Math.random() * colors.length)]}>{children}</Tag>
}

export default function NavAuditListPage () {
  const columns: ProColumns[] = [
    {
      title: '审核状态',
      dataIndex: 'status',
      valueType: 'select',
      initialValue: ['1'],
      valueEnum: {
        1: { text: '审核中', status: 'Default' },
        2: { text: '已拒绝', status: 'Error' }
      },
      width: 100
    },
    {
      title: '网站名称',
      dataIndex: 'name',
      search: false,
      width: 180
    },
    {
      title: '网站标签',
      dataIndex: 'tags',
      search: false,
      width: 250,
      renderText: (text, record) => (<Space>
        {record.tags.map((item:string, index:number) => <RandomColorTag key={index}>{item}</RandomColorTag>)}
      </Space>)
    },

    {
      title: '网站描述',
      dataIndex: 'desc',
      search: false,
      width: 300
    },
    {
      title: '网站链接',
      dataIndex: 'href',
      search: false
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      search: false,
      valueType: 'dateTime'
    }
  ]

  async function onActionClick (id: string, action: any, status: NavStatus) {
    await request({
      url: API_NAV_AUDIT,
      method: 'PUT',
      data: {
        id,
        status
      }
    })
    action?.reload()
  }

  return (
    <GeekProTable
      columns={columns}
      requestParams={{ url: API_NAV_LIST, method: 'GET' }}
      renderOptions={(text, record, _, action) => (record.status !== 'reject'
        ? [
          <Popconfirm key={record._id} title={'确定通过吗？'} onConfirm={() => onActionClick(record._id, action, 'pass')}>
            <a>通过</a>
          </Popconfirm>,
          <Popconfirm key={record._id} title={'确定拒绝吗？'} onConfirm={() => onActionClick(record._id, action, 'reject')}>
            <a>拒绝</a>
          </Popconfirm>
        ]
        : [])}/>
  )
}
