import * as React from 'react'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { Link, HStack } from '@chakra-ui/react'
import NextLink from 'next/link'
import BurgerMenuMobile from '../BurgerMenu/BurgerMenuMobile'

interface props {
  textColor: string
}

const Nav: React.VFC<props> = ({ textColor }) => {
  // check the size of the browser window, if less than 800px, use the burger menu
  const isMobile = useMediaQuery('(max-width: 800px)')
  let nav: JSX.Element = <React.Fragment></React.Fragment>

  if (isMobile) {
    nav = <BurgerMenuMobile textColor={textColor} />
  } else {
    nav = (
      <HStack color={textColor}>
        <NextLink href="/portfolio">
          <Link>Portfolio</Link>
        </NextLink>

        <NextLink href="/film">
          <Link>Film</Link>
        </NextLink>

        <NextLink href="/#about">
          <Link>About</Link>
        </NextLink>

        <Link isExternal={true} href="https://claykaufmann.com">
          MAIN SITE
        </Link>
      </HStack>
    )
  }
  return <React.Fragment>{nav}</React.Fragment>
}
export default Nav
