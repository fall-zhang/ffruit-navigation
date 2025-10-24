type SuccessRes<T> = {
  code:1
  msg:string
  data:T
}
type FailRes<T> = {
  code:0
  msg:string
  data:T
}

export type ResponseData<T> = SuccessRes<T> | FailRes<T>
