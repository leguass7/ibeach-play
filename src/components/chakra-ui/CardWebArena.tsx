import { Box, Image, Badge, Card, CardBody, CardFooter, CardHeader, Heading, Stack, Text } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import React from 'react'
import { ButtonChakra } from './ButtonChakra'

interface Props {
  imageUrl: string
  imageAlt: string
  available: number
  busy: number
  title: string
  formattedPrice: string
  reviewCount: number
  rating: number
}

const property: Props = {
  imageUrl: 'http://res.cloudinary.com/lptennis/image/upload/c_fit,h_420,q_auto,w_1260/v1705602828/iwhlfsvb4q0bmb3ads0d.jpg',
  imageAlt: 'Rear view of modern home with pool',
  available: 3,
  busy: 0,
  title: 'Summer',
  formattedPrice: '$1,900.00',
  reviewCount: 34,
  rating: 4
}

const CardWebArena: React.FC<Props> = ({ imageUrl, imageAlt, title }) => {
  return (
    <Card maxW={380} minW={380} maxHeight="md" overflow="hidden">
      <Box height="200px" overflow="hidden">
        <Image src={property.imageUrl} alt={imageAlt} width="100%" height="100%" objectFit="cover" />
      </Box>

      <CardHeader p={'15px 20px'}>
        <Heading size="md">{property.title}</Heading>
      </CardHeader>

      <CardBody p={'10px 20px'}>
        <Heading fontSize="sm" color="black.900" fontWeight="bold" mb={2} textTransform="uppercase">
          {'Quadras Status: '}
        </Heading>
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            Quadras Livre:
          </Badge>
          <Box color="gray.500" fontWeight="semibold" letterSpacing="wide" fontSize="xs" textTransform="uppercase" ml="2">
            {property.available > 0 ? property.available : 'Nenhuma'}
          </Box>
        </Box>

        <Box display="flex" alignItems="baseline" mt="2">
          <Badge borderRadius="full" px="2" colorScheme="red">
            Quadras Ocupadas:
          </Badge>
          <Box color="gray.500" fontWeight="semibold" letterSpacing="wide" fontSize="xs" textTransform="uppercase" ml="2">
            {property.busy > 0 ? property.busy : 'Nenhuma'}
          </Box>
        </Box>
      </CardBody>

      <CardFooter justify="space-between" alignItems="center" p={'10px 20px'}>
        <Box display="flex" mb="2" alignItems="center">
          {Array(5)
            .fill('')
            .map((_, i) => (
              <StarIcon key={i} color={i < property.rating ? 'teal.500' : 'gray.300'} />
            ))}
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {property.reviewCount} reviews
          </Box>
        </Box>
        <Stack spacing={4} direction="row" align="center" justify="flex-end">
          <ButtonChakra colorScheme="teal" size="md" variant="solid" textButton="Reservar" />
        </Stack>
      </CardFooter>
    </Card>
  )
}

export default CardWebArena
