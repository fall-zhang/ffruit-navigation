type SuccessRes<T> = {
  code:1
  msg:string
  data:T
}
type FailRes = {
  code:0
  msg:string
  err:unknown
}

type ResponseObj<T> = SuccessRes<T> | FailRes


// export type ResData extends Promise
export type ResData<T = unknown> = Promise<ResponseObj<T>>
