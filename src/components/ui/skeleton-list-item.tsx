import React from 'react'

import { HStack, Skeleton, SkeletonCircle, Stack } from '@chakra-ui/react'

type SkeletonListItemProps = {
  height?: string
}

export const SkeletonListItem: React.FC<SkeletonListItemProps> = ({ height = '72px' }) => {
  return (
    <HStack gap="5" p={4} borderWidth={1} borderRadius="md" height={height}>
      <SkeletonCircle size="12" />
      <Stack flex={1}>
        <Skeleton height="18px" />
        <Skeleton height="14px" />
      </Stack>
    </HStack>
  )
}
