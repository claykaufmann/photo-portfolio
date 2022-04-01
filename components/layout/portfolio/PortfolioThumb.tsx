import * as React from 'react'
import { PortfolioThumbnail } from '../../../types/types'
import Image from 'next/image'
import { Heading } from '@chakra-ui/react'

type Props = {
  portfolio: PortfolioThumbnail
}

const PortfolioThumb: React.VFC<Props> = ({ portfolio }) => {
  return (
    <div>
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
    </div>
  )
}

export default PortfolioThumb
