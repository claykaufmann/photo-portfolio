import * as React from 'react'
import { PortfolioThumbnail } from '../../../types/types'
import { Heading, Box } from '@chakra-ui/react'

type Props = {
  portfolio: PortfolioThumbnail
}

const PortfolioThumb: React.VFC<Props> = ({ portfolio }) => {
  const basicBoxStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    boxSize: ['250px', '250px', '300px', '400px', '500px'],
    color: 'white',
    textShadow: '0 0 20px black',
    fontWeight: 'bold',
    fontSize: '20px',
    px: 4,
    background: `url(${portfolio.headerImage.url}) center/cover no-repeat`,
  }
  return (
    <Box
      _hover={{
        transitionDuration: '0.2s',
        opacity: '0.8',
        textDecor: 'none',
      }}
      sx={basicBoxStyles}
    >
      <Heading size="md">{portfolio.title}</Heading>
    </Box>
  )
}

export default PortfolioThumb
