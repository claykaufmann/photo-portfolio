/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import * as React from 'react'

import NextLink from 'next/link'
import styles from './MenuMobile.module.scss'
import { Link } from '@chakra-ui/react'

interface Props {
  open: boolean
  setOpen: (val: boolean) => void
}

// TODO: check to make sure that the #about relative link works

const Menu: React.VFC<Props> = ({ open, setOpen }) => {
  return (
    <nav className={open ? styles.openMenu : styles.closedMenu}>
      <NextLink href="/">
        <Link
          style={{ textDecoration: 'none' }}
          transition="color 0.3s linear"
          color="black"
          className={styles.menuLinkText}
          onClick={() => setOpen(!open)}
        >
          Home
        </Link>
      </NextLink>
      <NextLink href="/portfolio">
        <Link
          style={{ textDecoration: 'none' }}
          transition="color 0.3s linear"
          color="black"
          className={styles.menuLinkText}
          onClick={() => setOpen(!open)}
        >
          PORTFOLIO
        </Link>
      </NextLink>
      <NextLink href="/film">
        <Link
          style={{ textDecoration: 'none' }}
          transition="color 0.3s linear"
          color="black"
          className={styles.menuLinkText}
          onClick={() => setOpen(!open)}
        >
          FILM
        </Link>
      </NextLink>
      <NextLink href="/#about">
        <Link
          style={{ textDecoration: 'none' }}
          transition="color 0.3s linear"
          color="black"
          className={styles.menuLinkText}
          onClick={() => setOpen(!open)}
        >
          ABOUT
        </Link>
      </NextLink>
      <Link
        style={{ textDecoration: 'none' }}
        transition="color 0.3s linear"
        color="black"
        className={styles.menuLinkText}
        onClick={() => setOpen(!open)}
        isExternal={true}
        href="https://claykaufmann.com"
      >
        MAIN SITE
      </Link>
    </nav>
  )
}
export default Menu
