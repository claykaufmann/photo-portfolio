import * as React from 'react'
import { HStack, Heading } from '@chakra-ui/react'
import NextLink from 'next/link'
import Nav from './Nav'
import utilStyles from '../../styles/utils.module.scss'

interface props {
  textColor: string
}

const Header: React.VFC<props> = ({ textColor }) => {
  return (
    <React.Fragment>
      <HStack justifyContent="space-between" color={textColor}>
        <NextLink href="/">
          <Heading size="2xl" cursor="pointer">
            <span className={utilStyles.strikeThroughLink}>BYCLAYKAY.</span>
          </Heading>
        </NextLink>
        <Nav textColor={textColor} />
      </HStack>
    </React.Fragment>
  )
}

export default Header
