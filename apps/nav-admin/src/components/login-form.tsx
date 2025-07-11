import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { ComponentProps } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

export function LoginForm ({
  className,
  onSubmitForm,
  ...props
}: ComponentProps<'div'> & {
  onSubmitForm(form:FieldValues):void
}) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  // const formRef = useRef(null)
  const onSubmit = (form:FieldValues) => {
    onSubmitForm(form)
  }
  return (<div className={cn('flex flex-col gap-6', className)} {...props}>
    <Card>
      <CardHeader>
        {/* <CardTitle>Login to your account</CardTitle> */}
        <CardTitle className='text-center'>登录</CardTitle>
        <CardDescription>
          {/* Enter your email below to login to your account */}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="username">账号</Label>
              <Input
                placeholder="m@example.com"
                {...register('username', { required: true })}
              />
            </div>
            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="password">密码</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  忘记密码
                </a>
              </div>
              <Input type="password" {...register('password', { required: true })}/>
              {errors.exampleRequired && <span className='text-red-600'>请输入密码</span>}
            </div>
            <div className="flex flex-col gap-3">
              <Button type="submit" className="w-full cursor-pointer">
                登录
              </Button>
              {/* <Button variant="outline" className="w-full">
                  Login with Google
                </Button> */}
            </div>
            <input type="submit" />
          </div>
          <div className="mt-4 text-center text-sm">
            没有账户？{' '}
            <a href="#" className="underline underline-offset-4">
              立即注册
            </a>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
  )
}
