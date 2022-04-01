import * as React from 'react'
import { Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import utilStyles from '../../styles/utils.module.scss'

interface props {
  linkText: string
  href: string
}

const NavLink: React.VFC<props> = ({ href, linkText }) => {
  const router = useRouter()

  // if we have a slug, then just count it as the index for link highlighting
  let pageName = ''
  if (router.pathname.slice(-6) == '[slug]') {
    pageName = router.pathname.slice(0, -7)
  } else {
    pageName = router.pathname
  }

  return (
    <NextLink href={href}>
      <Link
        textDecoration={pageName === `${href}` ? 'line-through' : 'none'}
        _hover={{
          textDecoration: 'none',
        }}
      >
        <span className={utilStyles.strikeThroughLink}>{linkText}</span>
      </Link>
    </NextLink>
  )
}

export default NavLink
