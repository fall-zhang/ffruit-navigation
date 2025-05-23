import { ProFormItemProps } from '@ant-design/pro-form'

export default function useProFormItem<T> (props: ProFormItemProps & T): ProFormItemProps & T {
  const result = {
    ...props
  }
  if (props.required) {
    result.rules = [{ required: true }]
  }
  return result
}
