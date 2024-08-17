import React from 'react'
import { FaCarAlt } from 'react-icons/fa'
import { IoTennisball } from 'react-icons/io5'
import { MdArrowOutward } from 'react-icons/md'

import { CommonButton } from '@/components/Form/CommonButton'
import { Badge, Box, Card, CardFooter, CardHeader, Heading, IconButton, Image, Link, Stack, Text } from '@chakra-ui/react'

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
  imageUrl: 'http://res.cloudinary.com/lptennis/image/upload/c_fit,h_420,q_auto,w_1260/v1705602828/iwhlfsvb4q0bmb3ads0d.jpg',
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
    <Card cursor="pointer" maxHeight="lg" maxW={{ base: 'full', md: 320 }} overflow="hidden" rounded="2xl" _hover={{ shadow: 'lg' }}>
      <Box height="200px" overflow="hidden">
        <Image src={property?.imageUrl} alt={imageAlt} width="100%" height="100%" objectFit="cover" />
      </Box>

      {busy ? (
        <Box position="absolute" top={2} right={2}>
          <Badge borderWidth={2} borderColor="#db7878cf" borderRadius="full" px="3" py="1" colorScheme="red">
            Quadras Ocupadas
          </Badge>
        </Box>
      ) : (
        <Box position="absolute" top={2} right={2}>
          <Badge colorScheme="green" borderWidth={2} borderColor="#8ac389c7" borderRadius="full" px="3" py="1">
            Quadras Livres: {available > 0 ? property?.available : 'Nenhuma'}
          </Badge>
        </Box>
      )}

      <CardHeader padding={4}>
        <Stack direction="row" justify="space-between" align="center">
          <Heading size="md">{property?.title?.toLocaleUpperCase?.()}</Heading>
          <Link bgColor={'gray.100'} rounded={'full'} href={googleMapsUrl} isExternal _hover={{ textDecoration: 'none' }}>
            <IconButton aria-label="Como Chegar" icon={<FaCarAlt />} variant="ghost" size="md" _hover={{ bgColor: 'teal.50' }} />
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

      <CardFooter justify="flex-end" alignItems="center" pt={2} px={4}>
        <CommonButton
          icon={<MdArrowOutward />}
          colorScheme="teal"
          width={{ base: 'full', md: 130 }}
          bgColor={'#05ACB4'}
          variant="solid"
          height={10}
          textButton="Reservar"
          rounded="full"
        />
      </CardFooter>
    </Card>
  )
}
