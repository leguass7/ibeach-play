export type IPaginatedTableProps<T> = {
  columns: IColumn<T>[]
  data: T[]
  size: number
  total: number
  page: number
}

export type IColumn<T> = {
  label: string
  name: keyof T
  Cell?: (value: T[keyof T]) => React.ReactNode
}
