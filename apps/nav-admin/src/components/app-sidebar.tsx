import * as React from 'react'
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers
} from '@tabler/icons-react'

import { NavDocuments } from '@/components/nav-documents'
import { NavMain } from '@/components/nav-main'
import { NavSecondary } from '@/components/nav-secondary'
import { NavUser } from '@/components/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'

const userData = {
  name: 'Admin',
  email: 'zhangbofei@163.com',
  avatar: '/avatars/shadcn.jpg'
}
// navClouds: [
//   {
//     title: 'Capture',
//     icon: IconCamera,
//     isActive: true,
//     url: '#',
//     items: [
//       {
//         title: 'Active Proposals',
//         url: '#'
//       },
//       {
//         title: 'Archived',
//         url: '#'
//       }
//     ]
//   },
//   {
//     title: 'Proposal',
//     icon: IconFileDescription,
//     url: '#',
//     items: [
//       {
//         title: 'Active Proposals',
//         url: '#'
//       },
//       {
//         title: 'Archived',
//         url: '#'
//       }
//     ]
//   },
//   {
//     title: 'Prompts',
//     icon: IconFileAi,
//     url: '#',
//     items: [
//       {
//         title: 'Active Proposals',
//         url: '#'
//       },
//       {
//         title: 'Archived',
//         url: '#'
//       }
//     ]
//   }
// ],

const mainNavList = [
  {
    title: '导航管理',
    url: '/navigator',
    icon: IconListDetails
  },
  {
    title: '分组管理',
    url: '/group',
    icon: IconChartBar
  },
  {
    title: '标签管理',
    url: '/tags',
    icon: IconDashboard
  },
  {
    title: '示例表格',
    url: '/example-table',
    icon: IconDashboard
  }
]

const helpNavList = [
  {
    // title: 'Settings',
    title: '设置',
    url: '#',
    icon: IconSettings
  },
  {
    // title: 'Get Help',
    title: '帮助',
    url: '#',
    icon: IconHelp
  },
  {
    // title: 'Search',
    title: '查找',
    url: '#',
    icon: IconSearch
  }
]
export function AppSidebar ({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Nav Admin</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={mainNavList} />
        {/* <NavDocuments items={data.documents} /> */}
        <NavSecondary items={helpNavList} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  )
}
