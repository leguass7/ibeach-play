import { useContextSelector } from 'use-context-selector'

import type { EmitFetchHandler, TableRecord } from './interface'
import { TableForNextContext } from './Provider'

export function useBody<R = TableRecord>(): [R[], EmitFetchHandler] {
  const records = useContextSelector(TableForNextContext, ctx => ctx?.records || []) as R[]
  const emitFetch = useContextSelector(TableForNextContext, ctx => ctx.emitFetch)
  return [records, emitFetch]
}

export function useColumns() {
  const columns = useContextSelector(TableForNextContext, ctx => ctx?.columns || [])

  return [columns]
}
