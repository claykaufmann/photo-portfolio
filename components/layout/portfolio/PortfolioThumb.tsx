import * as React from 'react'
import { PortfolioThumbnail } from '../../../types/types'
import Image from 'next/image'
import { Container } from '@chakra-ui/react'

type Props = {
  portfolio: PortfolioThumbnail
}

const PortfolioThumb: React.VFC<Props> = ({ portfolio }) => {
  return (
    <Container height="20vh">
      <h2>{portfolio.title}</h2>
      <Image
        src={portfolio.headerImage.url}
        height={portfolio.headerImage.height}
        width={portfolio.headerImage.width}
        alt={portfolio.headerImage.alt}
        priority={true}
      />
      <p>{portfolio.description}</p>
    </Container>
  )
}

export default PortfolioThumb
