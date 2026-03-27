import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <section className="relative flex h-[calc(100vh-65px)] items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/fall-forest.jpg"
        alt="Fall forest landscape"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 text-center text-white px-6">
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          Photo Portfolio
        </h1>
        <nav className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
          <Link
            href="/portfolio"
            className="text-lg font-medium border-b-2 border-white/60 pb-1 hover:border-white transition-colors sm:text-xl"
          >
            Portfolio
          </Link>
          <Link
            href="/about"
            className="text-lg font-medium border-b-2 border-white/60 pb-1 hover:border-white transition-colors sm:text-xl"
          >
            About
          </Link>
        </nav>
      </div>
    </section>
  )
}
