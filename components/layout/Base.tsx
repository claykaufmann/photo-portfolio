import * as React from 'react'
import Header from './Header'
import Head from 'next/head'
import { Box } from '@chakra-ui/react'

interface props {
  textColor: string
  children: JSX.Element[] | JSX.Element
}

const Base: React.VFC<props> = ({ textColor, children }) => {
  console.log(textColor)
  return (
    <React.Fragment>
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
        <Header textColor={textColor} />
        <React.Fragment>{children}</React.Fragment>
      </Box>
    </React.Fragment>
  )
}

export default Base
