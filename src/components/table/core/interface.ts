export type RecordId = string | number | undefined | null
export type TableRecord = Record<string, unknown> & { id?: RecordId }
export type EmitFetchHandler = () => Promise<void>

// Pagination
export type OrderType = 'asc' | 'desc'
export type OrderParams = { order: OrderType; orderby: string }
export type SetOrder = (order: OrderParams) => void
export type SetPage = (page: number) => void
export type SetSize = (newSize: number) => void

export type PaginationParams<F = Record<string, unknown>> = {
  fetchId?: number
  page?: number
  size?: number
  orderby?: string
  order?: OrderType
} & F

export type PaginationResult<T = Record<string, unknown>> = {
  success?: boolean
  total?: number
  totalValue?: number
  page?: number
  data?: T[]
}

// FILTER
export type FilterDispatcher<T = Record<string, unknown>> = (data?: T) => T
export type SetFilter<F = Record<string, unknown>> = {
  <T = F>(newFilter?: T, ignoreOld?: boolean): void
  <T = F>(newFilter?: (data?: T) => T, ignoreOld?: boolean): void
}

// export type SetFilter<F = Record<string, unknown>> = (newFilter?: F, ignoreOld?: boolean) => void | (newFilter?: FilterDispatcher, ignoreOld?: boolean) => void
// //   <T = F>
// //   <T = F>: void
// // }

export type TableFetcher<R = Record<string, unknown>, Q = Record<string, unknown>> = (params: PaginationParams<Q>) => Promise<PaginationResult<R>>

// COLUMNS
export interface ICellProps<Rec = Record<string, unknown>> {
  record: Rec
  columnName: keyof Rec
}
export interface ITableColumn<T = Record<string, unknown>> {
  name?: keyof T
  label?: string
  width?: string | number
  align?: 'center' | 'left' | 'right'
  unsortable?: boolean
  Cell?: React.FC<ICellProps<T>>
  CellProps?: Record<string, unknown>
  size?: 'small' | 'medium'
  className?: string
  isCurrency?: boolean
  sortName?: string
  vAlign?: 'baseline' | 'sub' | 'super' | 'text-top' | 'text-bottom' | 'middle' | 'top' | 'bottom' | 'inherit'
}

// PROPS
export type TableProps<Rec = TableRecord> = {
  isNotFirstFetcher?: boolean
  children?: React.ReactNode
  columns?: ITableColumn<Rec>[]
  records: Rec[]
  orderby?: string | keyof Rec
  order?: OrderType
  pageSize?: number
  // theme?: ITableForNextTheme
  stickyHeader?: boolean
  tableSize?: 'small' | 'medium'
  total?: number
  fetcher?: TableFetcher
  // onEvent?: TableEventHandler
  // setRecords?: ITableForNextContext['setRecords']
}

export interface ITableContext<Rec = unknown> {
  emitFetch: EmitFetchHandler
  // emitEvent: TableEventHandler
  // theme?: ITableForNextTheme
  records: Rec[]
  columns?: ITableColumn<Rec>[]
  setOrder: SetOrder
  setPage: SetPage
  setSize: SetSize
  setFilter: SetFilter
  // custom: GenericObject
  // setCustom: SetCustom
  total?: number
  // pagination: PaginationParams
  // setRecords?: React.Dispatch<React.SetStateAction<any[]>>
}
