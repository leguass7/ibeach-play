import React from 'react'

import type { NextPage } from 'next'

type Props = {
  [x: string]: unknown
}

const PageUser: NextPage<Props> = () => {
  return (
    <div>
      <h1> User</h1>
    </div>
  )
}

export default PageUser
