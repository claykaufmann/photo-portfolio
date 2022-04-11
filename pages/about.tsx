import type { NextPage } from 'next'
import Head from 'next/head'
import Base from '../components/layout/Base'
import { Heading, Text, Container, Box, Stack } from '@chakra-ui/react'
import Image from 'next/image'
import profile from '../public/images/me.jpg'

const About: NextPage = () => {
  return (
    <Base textColor="black">
      <Head>
        <title>About</title>
      </Head>
      <Heading size="lg" textAlign="center" paddingBottom="0.7em">
        ABOUT
      </Heading>
      <Container maxW="container.xl">
        <Stack direction={['column', 'row']} spacing={10}>
          <Box>
            <Image
              height={2000}
              width={2000}
              src={profile}
              alt="A picture of me in the tetons"
            />
          </Box>

          <Box>
            <Text>
              I am a 22 year old photographer from Marin County, California.
              Growing up in the suburbs of California, I spent my childhood
              exploring the outdoors bicycling, running, and hiking.
            </Text>

            <Text marginTop="1rem">
              My love for photography began at age 14, when I was gifted my
              first camera. Coming from a family of photographers (Graeme
              Outerbridge, Flip Schulke), the passion quickly developed. Very
              early on, I know that the realm of photography I wanted to shoot
              in was landscapes. It perfectly marries my love for exploring in
              the outdoors with my passion for photography. Since then, I have
              brought my camera with me wherever I go.
            </Text>

            <Text marginTop="1rem">
              Midway through 2020, my next big development in photography
              started when I learned about shooting film. I quickly picked up my
              first film camera, a Nikon FM2N. Film brings a certain love, and
              enjoyment out of photography that I personally don&apos;t think
              develops when shooting digital.
            </Text>
          </Box>
        </Stack>
      </Container>
    </Base>
  )
}

export default About
