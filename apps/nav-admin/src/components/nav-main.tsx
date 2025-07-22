

import { Button } from '@/components/ui/button'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import { HomeIcon, KanbanIcon } from 'lucide-react'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

type MenuItem = {
  title: string
  url: string
  icon?: FC
}
export function NavMain ({
  items
}: {
  items:MenuItem[]
}) {
  const navigate = useNavigate()
  function onClickMenuItem(menu:MenuItem) {
    navigate(menu.url)
  }
  return (
    <SidebarGroup>
      <SidebarGroupLabel>导航 / 数据</SidebarGroupLabel>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2" onClick={() => onClickMenuItem({
            title: '首页看板',
            url: 'board'
          })}>
            <SidebarMenuButton
              tooltip="Quick Create"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
            >
              <HomeIcon />
              <span>首页看板</span>
            </SidebarMenuButton>
            <Button
              size="icon"
              className="size-8 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
            >
              <KanbanIcon />
              <span className="sr-only">Inbox</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title} onClick={() => onClickMenuItem(item)}>
              <SidebarMenuButton tooltip={item.title}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
