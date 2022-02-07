import type { NextPage } from 'next'
import Head from 'next/head'
import { Heading, Link } from '@chakra-ui/react'
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
      <main>
        <Heading>BYCLAYKAY.</Heading>

        <NextLink href="/film">
          <Heading
            size="md"
            cursor="pointer"
            _hover={{
              color: 'blue',
            }}
            display="inline"
          >
            FILM
          </Heading>
        </NextLink>
      </main>
    </div>
  )
}

export default Home
