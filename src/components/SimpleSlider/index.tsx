import React, { ReactNode } from 'react'
import Slider from 'react-slick'

import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Box, IconButton, Stack } from '@chakra-ui/react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

interface Props {
  children: ReactNode
  dots?: boolean
  infinite?: boolean
  speed?: number
  slidesToShow?: number
  slidesToScroll?: number
}

export const SimpleSlider: React.FC<Props> = ({ children, dots = true, infinite = true, speed = 500, slidesToShow = 3, slidesToScroll = 1 }) => {
  const settings = {
    dots,
    infinite,
    speed,
    slidesToShow,
    slidesToScroll,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  const sliderRef = React.useRef<Slider>(null)

  const handleNext = () => {
    sliderRef.current?.slickNext()
  }

  const handlePrev = () => {
    sliderRef.current?.slickPrev()
  }

  return (
    <Stack position="relative" width="full" maxWidth="1200px" mx="auto" my={8}>
      <Slider {...settings} ref={sliderRef}>
        {children}
      </Slider>

      <IconButton
        aria-label="Previous slide"
        icon={<ChevronLeftIcon />}
        position="absolute"
        top="50%"
        left="10px"
        transform="translateY(-50%)"
        zIndex="1"
        rounded={'full'}
        onClick={handlePrev}
        colorScheme="teal"
        size="sm"
      />

      <IconButton
        aria-label="Next slide"
        icon={<ChevronRightIcon />}
        position="absolute"
        top="50%"
        right="10px"
        transform="translateY(-50%)"
        zIndex="1"
        rounded={'full'}
        onClick={handleNext}
        colorScheme="teal"
        size="sm"
      />
    </Stack>
  )
}
