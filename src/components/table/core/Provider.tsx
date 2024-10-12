import React from 'react'

import { createContext } from 'use-context-selector'

import { extractPaginateProps, onlyDefined } from './helper'
import type {
  EmitFetchHandler,
  FilterDispatcher,
  ITableContext,
  OrderType,
  SetFilter,
  SetOrder,
  SetPage,
  SetSize,
  TableFetcher,
  TableRecord
} from './interface'
import { useInternalPagination } from './useInternal'

export const TableForNextContext = createContext<ITableContext>({} as ITableContext)

type TableProviderProps<Rec = TableRecord> = {
  children: React.ReactNode
  records: Rec[]
  readonly fetcher?: TableFetcher
  //
  size?: number
  page?: number
  order?: OrderType
  orderby?: string | keyof Rec
  total?: number
}
type ChakraTableProviderComponentType<C = TableRecord> = React.FC<TableProviderProps<C>>

export const TableProvider: ChakraTableProviderComponentType = ({ children, records, fetcher, size, page, order, orderby, total }) => {
  const refCount = React.useRef(0)

  const [pagination, updatePagination, setPagination] = useInternalPagination<TableRecord>(size, page, order, orderby)

  const setOrder = React.useCallback<SetOrder>(
    params => {
      updatePagination(params)
    },
    [updatePagination]
  )

  const setPage = React.useCallback<SetPage>(
    newPage => {
      updatePagination({ page: newPage })
    },
    [updatePagination]
  )

  const setSize = React.useCallback<SetSize>(
    newSize => {
      updatePagination({ size: newSize })
    },
    [updatePagination]
  )

  const setFilter = React.useCallback<SetFilter<TableRecord>>(
    (newFilter, ignoreOld) => {
      setPagination(old => {
        const pageProps = ignoreOld ? {} : extractPaginateProps(old)
        const data = (typeof newFilter === 'function' ? (newFilter as FilterDispatcher)?.(old) : newFilter) || {}
        return { ...pageProps, ...(ignoreOld ? onlyDefined(data) : data) }
      })
    },
    [setPagination]
  )

  const emitFetch = React.useCallback<EmitFetchHandler>(async () => {
    if (fetcher) {
      const fetchId = refCount.current
      const params = { fetchId, ...pagination }
      fetcher?.(params)
    }
  }, [fetcher, refCount, pagination])

  React.useEffect(() => {
    emitFetch()
    refCount.current += 1
  }, [emitFetch])

  return (
    <TableForNextContext.Provider value={{ emitFetch, records, setOrder, setPage, setSize, setFilter, total }}>
      {children}
    </TableForNextContext.Provider>
  )
}
