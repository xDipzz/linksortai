import type React from "react"
import { Footer } from "../../components/footer"
import { LandingPageHeader } from "../../components/landing-page-header"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <LandingPageHeader
        items={[
          { title: "Home", href: "/" },
          { title: "Features", href: "/#features" },
          {
            title: "GitHub",
            href: "https://github.com/xDipzz/linksortai",
            external: true,
          },
        ]}
      />
      <main className="flex-1">{children}</main>
      <Footer
        builtBy="LinkSortAI by Deepak Mahajan"
        builtByLink="https://linksorai.com/"
        githubLink="https://github.com/xDipzz/linksortai"
        twitterLink="https://twitter.com/linksortai"
        linkedinLink="https://www.linkedin.com/in/deepak-mahajan-b1181a214/"
      />
    </div>
  )
}

