import type { ComponentProps, FC } from 'react'
import { twMerge } from 'tailwind-merge'
import { LoaderIcon } from 'lucide-react'


interface CustomToastProps extends ComponentProps<'div'> {
  progressValue?: number
}

export const CustomToast = ({
  className,
  children,
  progressValue,
  ...props
}: CustomToastProps): React.ReactElement => {
  return (<div
    className={twMerge(
      'flex flex-col justify-evenly relative w-full gap-2 space-y-4 text-background dark:text-foreground rounded-lg',
      className
    )}
    {...props}
  >
    <div className="flex items-start gap-2 ">
      <LoaderIcon className="my-auto animate-spin text-lg" />
      <div className="flex-1">{children}</div>
    </div>
    {(typeof progressValue === 'number') && <Progress value={progressValue} />}
  </div>
  )
}


export const Progress:FC<{
  value: number
}> = ({ value = 0 }): React.ReactElement => {
  return <div style={{ width: `${value}%` }} className='bg-background dark:bg-foreground h-1 rounded-md transition-all' />
}
