import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '../../components/tooltip'
import type { ReactNode } from 'react'

export function NormalTooltip (props:{
  content?:ReactNode,
  asChild?:boolean
  tip?:ReactNode,
  children:ReactNode
}) {
  return (
    <TooltipProvider >
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild={props.asChild}>
          {props.children}
          {/* <Button variant="outline">Hover</Button> */}
        </TooltipTrigger>
        <TooltipContent>
          {
            props.tip || props.content
          }
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
