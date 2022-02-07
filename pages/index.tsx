import type { NextPage } from 'next'
import Head from 'next/head'
import { Heading, Stack, HStack, Box, Center, Link } from '@chakra-ui/react'
import NextLink from 'next/link'

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
        <HStack justifyContent="space-between">
          <NextLink href="/">
            <Heading size="2xl" cursor="pointer" _hover={{ color: 'gray' }}>
              BYCLAYKAY.
            </Heading>
          </NextLink>

          <Link href="https://claykaufmann.com">Back to main site</Link>
        </HStack>

        <Center height="50vh">
          <Stack
            align="flex-start"
            paddingTop="1em"
            direction={['column', 'row']}
            spacing={['2rem', '5rem', '15rem']}
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
