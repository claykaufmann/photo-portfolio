import * as React from 'react'
import { HStack, Heading } from '@chakra-ui/react'
import NextLink from 'next/link'
import Nav from './Nav'

interface props {
  textColor: string
}

const Header: React.VFC<props> = ({ textColor }) => {
  return (
    <HStack justifyContent="space-between" color={textColor}>
      <NextLink href="/">
        <Heading size="2xl" cursor="pointer" _hover={{ color: 'gray' }}>
          BYCLAYKAY.
        </Heading>
      </NextLink>
      <Nav textColor={textColor} />
    </HStack>
  )
}

export default Header
