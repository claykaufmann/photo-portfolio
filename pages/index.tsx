import type { NextPage } from 'next'
import Head from 'next/head'
import { Heading, Stack, Box, Center } from '@chakra-ui/react'
import NextLink from 'next/link'
import Header from '../components/layout/Header'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Clay Kaufmann Photography</title>
        <meta
          name="description"
          content="Photography portfolio of Clay Kaufmann"
        />
        <meta name="author" content="Clay Kaufmann" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box margin="0.5em 2em">
        <Header />

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
                textAlign="center"
              >
                PORTFOLIO.
              </Heading>
            </NextLink>

            <NextLink href="/film">
              <Heading
                size="xl"
                cursor="pointer"
                _hover={{ color: 'gray' }}
                textAlign="center"
              >
                FILM.
              </Heading>
            </NextLink>

            <NextLink href="/about">
              <Heading
                size="xl"
                cursor="pointer"
                _hover={{ color: 'gray' }}
                textAlign="center"
              >
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
