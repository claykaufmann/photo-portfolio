import { getPortfolioBySlug, getPortfolioSlugs } from "@/lib/handlePortfolio"
import Lightbox from "@/app/components/Lightbox"

export async function generateStaticParams() {
  const slugs = await getPortfolioSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const portfolio = await getPortfolioBySlug(slug)
  return {
    title: `${portfolio.title} | Photo Portfolio`,
    description: portfolio.description ?? `${portfolio.title} photography collection`,
  }
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const portfolio = await getPortfolioBySlug(slug)

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tight mb-2">{portfolio.title}</h1>
      {portfolio.description && (
        <p className="text-muted-foreground mb-8 max-w-2xl">{portfolio.description}</p>
      )}

      <Lightbox photos={portfolio.photos} />
    </section>
  )
}
