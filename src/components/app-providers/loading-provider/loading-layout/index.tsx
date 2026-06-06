'use client'
import React from 'react'

import { Router } from 'next/router'

import { useLayoutLoading } from '../useLayoutLoading'

type Props = {
  children: React.ReactNode
}

export const LoadingLayout: React.FC<Props> = ({ children }) => {
  const { done, start } = useLayoutLoading()

  const onRouteChangeStart = () => {
    start()
  }

  const onRouteChangeComplete = () => {
    const t = setTimeout(() => {
      done()
      clearTimeout(t)
    }, 1000)
  }

  React.useEffect(() => {
    Router.events.on('routeChangeStart', onRouteChangeStart)
    Router.events.on('routeChangeComplete', onRouteChangeComplete)
    Router.events.on('routeChangeError', onRouteChangeComplete)

    return () => {
      Router.events.off('routeChangeStart', onRouteChangeStart)
      Router.events.off('routeChangeComplete', onRouteChangeComplete)
      Router.events.off('routeChangeError', onRouteChangeComplete)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>{children}</>
}
