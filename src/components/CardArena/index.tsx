import React from 'react'
import { FaCarAlt } from 'react-icons/fa'
import { GiTennisCourt } from 'react-icons/gi' // Importe o ícone de quadra de tênis
import { IoTennisball } from 'react-icons/io5'
import { MdArrowOutward, MdEventBusy } from 'react-icons/md'

import thumbArena from '@/assets/speed-img.png'
import { CommonButton } from '@/components/Form/CommonButton'
import { Badge, Box, Card, CardFooter, CardHeader, Flex, Heading, HStack, IconButton, Image, Link, Stack, Text } from '@chakra-ui/react'

interface Props {
  imageUrl?: string
  imageAlt?: string
  available?: number
  busy?: boolean
  title?: string
  formattedPrice?: string
  address?: string
  reviewCount?: number
  rating?: number
}

const property: Props = {
  imageUrl: '',
  imageAlt: 'Rear view of modern home with pool',
  available: 3,
  busy: false,
  title: 'Summer Beach',
  formattedPrice: '$1,900.00',
  address: 'R. Tremembés, 03 - Praia de Iracema, Fortaleza - CE, 60060-250',
  reviewCount: 34,
  rating: 4
}

export const CardArena: React.FC<Props> = ({ imageAlt, rating = 4, available = 3, busy = property.busy }) => {
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(property.address!)}`

  return (
    <Card cursor="pointer" maxHeight="lg" maxW={{ base: '100%', md: 320 }} overflow="hidden" rounded="2xl" _hover={{ shadow: 'lg' }}>
      <Box height="200px" overflow="hidden">
        <Image src={property?.imageUrl || thumbArena.src} alt={imageAlt} width="100%" height="100%" objectFit="cover" />
      </Box>

      {busy ? (
        <Box position="absolute" top={4} right={4}>
          <Badge borderWidth={2} borderColor="#de4646" color="gray.50" borderRadius="full" px="3" py="1" backgroundColor={'#de4646'}>
            Quadras Ocupadas
          </Badge>
        </Box>
      ) : (
        <Box position="absolute" top={4} right={4}>
          <Badge backgroundColor="#51b028" color="gray.50" borderWidth={2} borderColor="#6baa6beb" borderRadius="full" px="3" py="1">
            Quadras Livres
          </Badge>
        </Box>
      )}

      <CardHeader paddingY={2} paddingX={{ base: 6, md: 4 }}>
        <Stack direction="row" justify="space-between" align="center">
          <Heading size="md">{property?.title?.toLocaleUpperCase?.()}</Heading>
          <Link bgColor={'gray.100'} rounded={'full'} href={googleMapsUrl} isExternal _hover={{ textDecoration: 'none' }}>
            <IconButton
              aria-label="Como Chegar"
              icon={<FaCarAlt />}
              variant="ghost"
              size="md"
              _hover={{ transform: 'scale(1.1)', transition: 'transform 0.2s' }}
            />
          </Link>
        </Stack>

        <Stack display="flex" direction={'row'} alignItems="center">
          {Array(5)
            .fill('')
            .map((_, i) => (
              <IoTennisball key={i} color={!!(i < rating) ? 'orange' : '#2222225b'} />
            ))}
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {property.reviewCount} reviews
          </Box>
        </Stack>

        <Link href={googleMapsUrl} isExternal>
          <Text mt={4} fontSize="md" color="gray.600">
            {property.address}
          </Text>
        </Link>
      </CardHeader>

      <CardFooter alignItems="center" py={6} paddingX={{ base: 6, md: 4 }}>
        <HStack flexDirection={{ base: 'column', md: 'row' }} width={'100%'} justify="space-between" align="center">
          <Flex justifyContent="flex-start" alignItems="center" width={'50%'}>
            {busy ? (
              <>
                <MdEventBusy size={24} color="#888585" />
                <Text textColor="gray.200" fontSize={12}>
                  {' '}
                  Todas Ocupadas
                </Text>
              </>
            ) : (
              <>
                <GiTennisCourt size={24} color="teal" />
                <Text fontWeight="bold" fontSize="lg" ml={2}>
                  {available} Quadras
                </Text>
              </>
            )}
          </Flex>
          <CommonButton
            _hover={{ bgColor: 'primary.50' }}
            color={'#05344a'}
            isDisabled={busy}
            icon={<MdArrowOutward />}
            width={{ base: 'full', md: 130 }}
            bgColor={'primary.100'}
            variant="solid"
            height={{ base: 12, md: 9 }}
            textButton="Reservar"
            rounded="full"
          />
        </HStack>
      </CardFooter>
    </Card>
  )
}
