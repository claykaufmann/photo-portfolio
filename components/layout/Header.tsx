import * as React from 'react'
import { HStack, Heading } from '@chakra-ui/react'
import NextLink from 'next/link'
import Nav from './Nav'

const Header: React.VFC = () => {
  return (
    <HStack justifyContent="space-between">
      <NextLink href="/">
        <Heading size="2xl" cursor="pointer" _hover={{ color: 'gray' }}>
          BYCLAYKAY.
        </Heading>
      </NextLink>
      <Nav textColor="black" />
    </HStack>
  )
}

export default Header
