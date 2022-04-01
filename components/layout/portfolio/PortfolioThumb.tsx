import * as React from 'react'
import { PortfolioThumbnail } from '../../../types/types'
import Image from 'next/image'
import { Container, Heading, Text } from '@chakra-ui/react'

type Props = {
  portfolio: PortfolioThumbnail
}

const PortfolioThumb: React.VFC<Props> = ({ portfolio }) => {
  return (
    <Container>
      <Image
        src={portfolio.headerImage.url}
        height={portfolio.headerImage.height}
        width={portfolio.headerImage.width}
        alt={portfolio.headerImage.alt}
        objectFit="cover"
      />
      <Heading size="md" textAlign="center">
        {portfolio.title}
      </Heading>

      <Text visibility="hidden">{portfolio.description}</Text>
    </Container>
  )
}

export default PortfolioThumb
