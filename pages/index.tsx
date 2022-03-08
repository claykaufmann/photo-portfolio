import type { NextPage } from 'next'
import Head from 'next/head'
import { Heading, Stack, Center } from '@chakra-ui/react'
import NextLink from 'next/link'
import Base from '../components/layout/Base'

const Home: NextPage = () => {
  return (
    <Base>
      <Head>
        <title>Clay Kaufmann Photography</title>
      </Head>

      <Center height="50vh">
        <Stack
          paddingTop={['7rem', '9rem', '5rem', '12rem']}
          direction={['column', 'column', 'row']}
          spacing={['5rem', '7rem', '10rem', '15rem']}
        >
          <NextLink href="/portfolio">
            <Heading
              size="xl"
              cursor="pointer"
              _hover={{ color: 'gray' }}
              _activeLink={{ textDecoration: 'line-through' }}
            >
              PORTFOLIO.
            </Heading>
          </NextLink>

          <NextLink href="/film">
            <Heading size="xl" cursor="pointer" _hover={{ color: 'gray' }}>
              FILM.
            </Heading>
          </NextLink>

          <NextLink href="/about">
            <Heading size="xl" cursor="pointer" _hover={{ color: 'gray' }}>
              ABOUT.
            </Heading>
          </NextLink>
        </Stack>
      </Center>
    </Base>
  )
}

export default Home
