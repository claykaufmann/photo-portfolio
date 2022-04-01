import * as React from 'react'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { Link, HStack } from '@chakra-ui/react'
import BurgerMenuMobile from '../BurgerMobile/BurgerMenuMobile'
import NavLink from './NavLink'

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
      <HStack color={textColor} fontSize="120%" spacing="1.5em">
        <NavLink href="/portfolio" linkText="Portfolio" />

        <NavLink href="/film" linkText="Film" />

        <NavLink href="/about" linkText="About" />

        <Link
          href="https://claykaufmann.com"
          _hover={{
            textDecoration: 'line-through',
            transition: 'width 0.5s ease-in',
          }}
        >
          Main Site
        </Link>
      </HStack>
    )
  }
  return <React.Fragment>{nav}</React.Fragment>
}
export default Nav
