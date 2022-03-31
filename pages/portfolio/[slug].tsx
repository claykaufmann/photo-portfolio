import Base from '../../components/layout/Base'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { PortfolioInfo } from '../../types/types'
import {
  getPortfolioBySlug,
  getPortfolioSlugs,
} from '../../lib/handlePortfolio'
import { ParsedUrlQuery } from 'querystring'
import Image from 'next/image'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { Flex } from '@chakra-ui/react'

type Props = {
  portfolio: PortfolioInfo
}

const PortfolioPage: NextPage<Props> = ({ portfolio }) => {
  const images = portfolio.photos
  return (
    <Base>
      <h2>{portfolio.title}</h2>
      <p>{portfolio.description}</p>

      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 1200: 2, 1700: 3, 2545: 4 }}
      >
        <Masonry gutter="1em">
          {images.map((image) => (
            <Flex key={image.url} justify="center">
              <Image
                key={image.url}
                src={image.url}
                width={image.width}
                height={image.height}
                alt="test"
                className="portfolio-img"
              />
              <style jsx global>
                {`
                  .portfolio-img {
                    align-self: center;
                  }
                `}
              </style>
            </Flex>
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
