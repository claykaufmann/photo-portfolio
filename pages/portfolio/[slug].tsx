import Base from '../../components/layout/Base'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { PortfolioInfo } from '../../types/types'
import {
  getPortfolioBySlug,
  getPortfolioSlugs,
} from '../../lib/handlePortfolio'
import { ParsedUrlQuery } from 'querystring'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { Stack, Heading, Link, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import Photo from '../../components/Images/image'

type Props = {
  portfolio: PortfolioInfo
}

const PortfolioPage: NextPage<Props> = ({ portfolio }) => {
  const images = portfolio.photos

  return (
    <Base textColor="black">
      <Heading size="lg" textAlign="center">
        {portfolio.title}
      </Heading>

      <Stack
        justify="space-between"
        paddingBottom="1em"
        direction={['column', 'row']}
        textAlign={['center', 'left']}
      >
        <Text>{portfolio.description}</Text>
        <NextLink href="/portfolio">
          <Link>Back to portfolios</Link>
        </NextLink>
      </Stack>

      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 800: 2, 1400: 3, 2545: 4 }}
      >
        <Masonry gutter="1em">
          {images.map((image) => (
            <Photo key={image.url} image={image} />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </Base>
  )
}

export default PortfolioPage

interface IParams extends ParsedUrlQuery {
  slug: string
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams
  const portfolio = await getPortfolioBySlug(slug)

  // return portfolio
  return {
    props: {
      portfolio,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getPortfolioSlugs()

  return {
    paths: slugs.map((slug) => {
      return {
        params: {
          slug: slug,
        },
      }
    }),
    fallback: false,
  }
}
