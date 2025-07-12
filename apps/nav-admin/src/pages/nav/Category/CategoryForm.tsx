import {
  ModalForm, ProFormDependency, ProFormSelect, ProFormSwitch, ProFormText
} from '@ant-design/pro-form'
import useProFormItem from '@/hooks/useProFormItem'
import useGeekProForm from '@/components/GeekProForm/useGeekProForm'
import { API_CATEGORY } from '@/apis/api'
import { request } from '@/utils/request'

type CategoryProps = {
  categoryList:any[]
  isEdit:boolean
  selectedData:any
  hide():void
}
export default function CategoryForm (props: CategoryProps) {
  const formProps = useGeekProForm({
    ...props,
    onInitialValues (values: any): object {
      return values
    }
  })
  const nameProps = useProFormItem({
    name: 'name',
    label: '分类名',
    width: 'sm',
    required: true
  })
  const categoryProps = useProFormItem({
    name: 'categoryId',
    label: '父级分类',
    width: 'sm'
  })
  const categoryIconProps = useProFormItem({
    name: 'icon',
    label: '分类图标',
    width: 'sm'
  })
  const showMenuProps = useProFormItem({
    name: 'showInMenu',
    label: '显示到菜单',
    width: 'sm'
  })

  async function onFinish (values: any) {
    const data = {
      id: props.isEdit ? props.selectedData?._id : undefined,
      ...values
    }
    // msg: props.isEdit ? '修改成功' : '添加成功',
    await request(API_CATEGORY, {
      method: props.isEdit ? 'PUT' : 'POST',
      data
    })
    props.hide()
    props.tableRef.reload()
  }

  return (
    <ModalForm {...props} {...formProps} onFinish={onFinish} width={350}>
      <ProFormText {...nameProps} />
      <ProFormSelect {...categoryProps} options={props.categoryList.reduce((pre, cur) => [...pre, { label: cur.name, value: cur._id }], [])}/>
      <ProFormDependency name={['icon']}>
        {({ icon }) => <ProFormText {...categoryIconProps} formItemProps={{ extra: <i className={icon}></i> }} />}
      </ProFormDependency>
      <ProFormSwitch {...showMenuProps} />
    </ModalForm>
  )
}
