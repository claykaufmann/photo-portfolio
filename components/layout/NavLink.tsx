import * as React from 'react'
import { Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

interface props {
  linkText: string
  href: string
}

const NavLink: React.VFC<props> = ({ href, linkText }) => {
  const router = useRouter()
  return (
    <NextLink href={href}>
      <Link
        textDecoration={router.pathname === `${href}` ? 'line-through' : 'none'}
        _hover={{
          textDecoration: 'line-through',
          transition: 'width 0.5s ease-in',
        }}
      >
        {linkText}
      </Link>
    </NextLink>
  )
}

export default NavLink
