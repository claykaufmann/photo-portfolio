import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Base from '../../components/layout/Base'
import { PortfolioThumbnail } from '../../types/types'
import { getAllPortfolios } from '../../lib/handlePortfolio'
import { Flex, Link, Heading, Box } from '@chakra-ui/react'
import PortfolioThumb from '../../components/layout/portfolio/PortfolioThumb'
import NextLink from 'next/link'

type Props = {
  portfolios: PortfolioThumbnail[]
}

const Portfolio: NextPage<Props> = ({ portfolios }) => {
  return (
    <Base textColor="black">
      <Head>
        <title>Portfolio</title>
      </Head>

      <Heading size="lg" textAlign="center" paddingBottom="0.5em">
        Portfolios
      </Heading>

      <Flex justifyContent="space-evenly" flexWrap="wrap">
        {portfolios.map((portfolio) => (
          <Box paddingBottom="1em" key={portfolio.slug}>
            <NextLink href={`portfolio/${portfolio.slug}`}>
              <Link>
                <PortfolioThumb portfolio={portfolio} />
              </Link>
            </NextLink>
          </Box>
        ))}
      </Flex>
    </Base>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  // get all portfolios for display on page
  const portfolios = await getAllPortfolios()

  return {
    props: {
      portfolios,
    },
  }
}

export default Portfolio
