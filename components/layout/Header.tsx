import * as React from 'react'
import { HStack, Heading } from '@chakra-ui/react'
import NextLink from 'next/link'
import Nav from './Nav'
import utilStyles from '../../styles/utils.module.scss'

interface props {
  textColor: string
  isHomePage?: boolean
}

const Header: React.VFC<props> = ({ textColor, isHomePage }) => {
  let spacing = ''
  let background = ''
  let stack = <React.Fragment></React.Fragment>

  const innerHeader = (
    <React.Fragment>
      <NextLink href="/">
        <Heading size="2xl" cursor="pointer">
          <span className={utilStyles.strikeThroughLink}>BYCLAYKAY.</span>
        </Heading>
      </NextLink>
      <Nav textColor={textColor} />
    </React.Fragment>
  )

  if (isHomePage) {
    spacing = '0.5em 2em'
    background = 'rgba(255,255,255,0.8)'
    stack = (
      <HStack
        justifyContent="space-between"
        color={textColor}
        background={background}
        padding={spacing}
      >
        {innerHeader}
      </HStack>
    )
  } else {
    stack = (
      <HStack justifyContent="space-between" color={textColor}>
        {innerHeader}
      </HStack>
    )
  }

  return <React.Fragment>{stack}</React.Fragment>
}

export default Header
