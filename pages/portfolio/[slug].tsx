import Base from '../../components/layout/Base'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { PortfolioInfo } from '../../types/types'
import {
  getPortfolioBySlug,
  getPortfolioSlugs,
} from '../../lib/handlePortfolio'
import { ParsedUrlQuery } from 'querystring'
import { XMasonry, XBlock } from 'react-xmasonry'
import Image from 'next/image'

type Props = {
  portfolio: PortfolioInfo
}

const PortfolioPage: NextPage<Props> = ({ portfolio }) => {
  const images = portfolio.photos
  return (
    <Base>
      <h2>{portfolio.title}</h2>
      <p>{portfolio.description}</p>

      <XMasonry>
        {images.map((image) => (
          <XBlock key={image.url}>
            <Image
              src={image.url}
              width={image.width}
              height={image.height}
              alt="test"
            />
          </XBlock>
        ))}
      </XMasonry>
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
