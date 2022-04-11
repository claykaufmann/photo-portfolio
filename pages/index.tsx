import type { NextPage } from 'next'
import Head from 'next/head'
import { Heading, Stack, Center, Box } from '@chakra-ui/react'
import NextLink from 'next/link'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <div className={styles.splash}>
      <Head>
        <title>Clay Kaufmann Photography</title>
      </Head>

      <Box margin="0.5em 2em">
        <NextLink href="/">
          <Heading
            size="2xl"
            color="white"
            textShadow="1px 1px 1px #3c5c5e"
            cursor="pointer"
          >
            BYCLAYKAY.
          </Heading>
        </NextLink>

        <Center height="50vh" color="white" textShadow="1px 1px 1px #3c5c5e">
          <Stack
            paddingTop={['7rem', '9rem', '5rem', '12rem']}
            direction={['column', 'column', 'row']}
            spacing={['5rem', '5rem', '7rem', '15rem']}
          >
            <NextLink href="/portfolio">
              <Heading size="xl" cursor="pointer" _hover={{ color: 'gray' }}>
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
      </Box>
    </div>
  )
}

export default Home
