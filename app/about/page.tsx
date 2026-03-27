import Image from "next/image"
import { Instagram, Linkedin, Mail } from "lucide-react"

export const metadata = {
  title: "About | Photo Portfolio",
  description: "Learn more about the photographer behind the portfolio",
}

const contactLinks = [
  {
    href: "https://www.instagram.com/clay.kaufmann/",
    label: "Instagram",
    icon: Instagram,
  },
  {
    href: "https://www.linkedin.com/in/claykaufmann/",
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    href: "mailto:clay@claykaufmann.com",
    label: "Email",
    icon: Mail,
  },
]

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <div className="flex flex-col items-center gap-12 md:flex-row md:items-start">
        {/* Profile photo */}
        <div className="shrink-0">
          <Image
            src="/images/me.jpg"
            alt="Clay Kaufmann, photographer"
            width={320}
            height={320}
            className="rounded-full object-cover aspect-square"
            priority
          />
        </div>

        {/* Bio */}
        <div className="flex flex-col gap-6 text-center md:text-left">
          <h1 className="text-4xl font-bold tracking-tight">About</h1>

          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Hi, I&apos;m Clay Kaufmann — a photographer based in the Northeast
              United States. I specialize in landscape and nature photography,
              with a particular love for capturing national and state parks.
            </p>
            <p>
              Photography has been my way of slowing down and appreciating the
              world around me. Whether it&apos;s the quiet light of an early
              morning hike or the dramatic colors of autumn foliage, I aim to
              share those moments through my images.
            </p>
            <p>
              Feel free to reach out if you&apos;d like to connect or
              collaborate.
            </p>
          </div>

          {/* Contact links */}
          <ul className="flex items-center gap-6 justify-center md:justify-start">
            {contactLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={link.label}
                >
                  <link.icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
