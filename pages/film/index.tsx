import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Base from '../../components/layout/Base'
import { PortfolioThumbnail } from '../../types/types'
import { getAllPortfolios } from '../../lib/handlePortfolio'
import { Flex } from '@chakra-ui/react'
import PortfolioThumb from '../../components/layout/portfolio/PortfolioThumb'

type Props = {
  portfolios: PortfolioThumbnail[]
}

const Portfolio: NextPage<Props> = ({ portfolios }) => {
  return (
    <Base textColor="black">
      <Head>
        <title>Film</title>
      </Head>

      <h2>Film</h2>

      <Flex>
        {portfolios.map((portfolio) => (
          <PortfolioThumb key={portfolio.title} portfolio={portfolio} />
        ))}
      </Flex>
    </Base>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  // getAllPortfolios

  const portfolios = await getAllPortfolios()

  return {
    props: {
      portfolios: portfolios,
    },
  }
}

export default Portfolio
