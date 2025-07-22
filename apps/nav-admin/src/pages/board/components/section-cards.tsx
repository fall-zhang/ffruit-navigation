import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react'

import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { FC } from 'react'

export function SectionCards () {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>上月浏览量</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            1,250 次
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {/* Trending up this month */} 总浏览量 <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            {/* Visitors for the last 6 months */}
            用户浏览量
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>用户数量</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            1,234
          </CardTitle>
          <CardAction>
            {/* 昨日浏览量，前天浏览量 */}
            <Badge variant="outline">
              <IconTrendingUp />
              20%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Up 20% this period <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            {/* Acquisition needs attention */}
            当前用户数量
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>活跃用户数量</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            45,678
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            用户保留率 <IconTrendingUp className="size-4" />
            {/* Strong user retention <IconTrendingUp className="size-4" /> */}
          </div>
          <div className="text-muted-foreground">每周使用过一次该应用</div>
          {/* <div className="text-muted-foreground">Engagement exceed</div> */}
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>网站收藏数量</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            55 个
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingState />
              +4.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            所收藏的网址数量 <IconTrendingUp className="size-4" />
            {/* Steady performance increase <IconTrendingUp className="size-4" /> */}
          </div>
          <div className="text-muted-foreground">近一月添加 { 20} 个</div>
          {/* <div className="text-muted-foreground">Meets growth projections</div> */}
        </CardFooter>
      </Card>
    </div>
  )
}


const TrendingState:FC<{
  greater?:boolean
}> = ({ greater }) => {
  return greater ? <IconTrendingUp /> : <IconTrendingDown />
}
