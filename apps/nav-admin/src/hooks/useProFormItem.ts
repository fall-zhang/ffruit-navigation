export default function useProFormItem<T> () {
  if (props.required) {
    props.rules = [{ required: true }]
  }
  return {
    ...props
  }
}
