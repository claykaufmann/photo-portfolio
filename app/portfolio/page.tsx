import Image from "next/image"
import Link from "next/link"
import { getAllPortfolios } from "@/lib/handlePortfolio"
import { PortfolioThumbnail } from "@/types/types"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Portfolio | Photo Portfolio",
  description: "Browse photography portfolios",
}

export default async function PortfolioIndexPage() {
  const portfolios: PortfolioThumbnail[] = await getAllPortfolios()

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tight mb-8">Portfolio</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {portfolios.map((portfolio) => (
          <Link
            key={portfolio.slug}
            href={`/portfolio/${portfolio.slug}`}
            className="group relative block overflow-hidden rounded-lg aspect-[4/3]"
          >
            <Image
              src={portfolio.headerImage.url}
              alt={portfolio.title}
              width={portfolio.headerImage.width}
              height={portfolio.headerImage.height}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h2 className="text-xl font-semibold text-white">{portfolio.title}</h2>
              <p className="text-sm text-white/80 mt-1 line-clamp-2">
                {portfolio.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
