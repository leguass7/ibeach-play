import React, { type Dispatch, type SetStateAction } from 'react'

import { useRouter } from 'next/router'

import type { PaginationParams } from './interface'

export type PaginateDispatcher<T = Record<string, unknown>> = (data?: PaginationParams<T>) => PaginationParams<T>

export type UpdatePagination<T = Record<string, unknown>> = {
  (data?: PaginationParams<T>): void
  (data?: PaginateDispatcher<T>): void
}

export function useInternalPagination<T = Record<string, unknown>>(
  size?: number,
  page?: number,
  order?: string,
  orderby?: string
): [PaginationParams<T>, UpdatePagination<T>, Dispatch<SetStateAction<PaginationParams<T>>>] {
  const { pathname, query, replace } = useRouter()

  const pagination = React.useMemo<PaginationParams<T>>(() => {
    const d = ((query as unknown) || {}) as PaginationParams<T>
    return { order, orderby, page: page || 1, size: size || 10, ...d }
  }, [query, size, page, order, orderby])

  const updatePagination = React.useCallback<UpdatePagination<T>>(
    data => {
      const payload = typeof data === 'function' ? data(pagination) : data
      replace({ pathname, query: { page: page || 1, size: size || 10, ...query, ...payload } })
    },
    [pathname, replace, query, page, size, pagination]
  )

  const setPagination = React.useCallback<Dispatch<SetStateAction<PaginationParams<T>>>>(
    data => {
      const payload = typeof data === 'function' ? data(pagination) : data
      replace({ pathname, query: { page: page || 1, size: size || 10, ...query, ...payload } })
    },
    [page, pathname, query, replace, size, pagination]
  )

  return [pagination, updatePagination, setPagination]
}
