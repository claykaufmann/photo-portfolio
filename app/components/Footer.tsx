import { Instagram, Linkedin, Mail } from "lucide-react"

const socialLinks = [
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

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-8 sm:flex-row sm:justify-between">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Photo Portfolio
        </p>
        <ul className="flex items-center gap-6">
          {socialLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={link.label}
              >
                <link.icon className="h-5 w-5" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
