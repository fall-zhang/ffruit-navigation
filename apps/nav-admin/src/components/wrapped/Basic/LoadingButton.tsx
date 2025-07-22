// 重新加载的 button
import { Button } from '@/components/ui/button'
import { BanIcon, CheckIcon, LoaderCircle, RefreshCcw } from 'lucide-react'
import type { FC } from 'react'


const LoadingButton:FC<{
  state?:'loading' | 'success' | 'error' | 'normal'
  onClick():void
}> = ({ state = 'normal', onClick }) => {
  const overState = ['loading'].includes(state)
  return (
    <Button
      onClick={onClick}
      disabled={overState}
      data-loading={['loading', 'success', 'error'].includes(state)}
      className="group relative h-10 cursor-pointer disabled:opacity-100"
    >
      <div className="flex items-center justify-center">
        {state === 'normal' && (
          <RefreshCcw size={16} strokeWidth={2}/>
        )}
        {state === 'loading' && (
          <LoaderCircle className="animate-spin" size={16} strokeWidth={2} />
        )}
        {state === 'success' && (
          <CheckIcon className="animate-in  text-green-600" size={16} strokeWidth={2} />
        )}
        {state === 'error' && (
          <BanIcon className="animate-out   text-red-600" size={16} strokeWidth={2} />
        )}
      </div>
    </Button>
  )
}

export { LoadingButton }
