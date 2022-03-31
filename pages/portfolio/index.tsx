import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Base from '../../components/layout/Base'
import { PortfolioThumbnail } from '../../types/types'
import { getAllPortfolios } from '../../lib/handlePortfolio'
import { Flex, Link } from '@chakra-ui/react'
import PortfolioThumb from '../../components/layout/portfolio/PortfolioThumb'
import NextLink from 'next/link'

type Props = {
  portfolios: PortfolioThumbnail[]
}

const Portfolio: NextPage<Props> = ({ portfolios }) => {
  return (
    <Base>
      <Head>
        <title>Portfolio</title>
      </Head>

      <h2>Portfolios</h2>

      <Flex>
        {portfolios.map((portfolio) => (
          <NextLink href={`portfolio/${portfolio.slug}`} key={portfolio.slug}>
            <Link>
              <PortfolioThumb portfolio={portfolio} />
            </Link>
          </NextLink>
        ))}
      </Flex>
    </Base>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  // getAllPortfolios
  const portfolios = await getAllPortfolios()

  // testS3('main')

  return {
    props: {
      portfolios,
    },
  }
}

export default Portfolio
