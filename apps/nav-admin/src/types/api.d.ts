export interface CategoryModel {
  _id: string
  name: string
  parentId: string
  children: CategoryModel[]
}

export interface TagModel {
  _id: string
  name: string
}

export type NavStatus = 'pass' | 'wait' | 'reject'
