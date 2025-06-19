import { FeatureGrid } from "@/components/features"
import { Hero } from "@/components/hero"
import { ContactForm } from "@/components/contact-form"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { Bookmark, Search, Settings, Users, Shield, Zap } from "lucide-react"

export default function IndexPage() {
  return (
    <div className="relative min-h-screen">
      {/* Enhanced Video Background */}
      <div className="video-background">
        <video className="blur-video" src="/bgvedio.mp4" autoPlay loop muted playsInline />
      </div>

      {/* Floating Geometric Shapes */}
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Hero Section */}
        <div className="w-full">
          <Hero
            capsuleText="AI-Powered Bookmark Management"
            capsuleLink="#features"
            title={
              <>
                Organize Your Bookmarks{" "}
                <span className="gradient-text">
                  Effortlessly
                </span>
              </>
            }
            subtitle="LinkSortAI helps you save, categorize, and find bookmarks with ease—powered by AI that understands what matters to you."
            primaryCtaText="Get Started"
            primaryCtaLink="#signup"
            secondaryCtaText="GitHub"
            secondaryCtaLink="https://github.com/xDipzz/linksortai"
            credits={
              <>
                Crafted with <span className="animate-pulse">❤️</span> by {" "}
                <span className="font-medium text-blue-400">LinkSortAI Team</span>
              </>
            }
          />
        </div>

        {/* Features Section with Glass Card */}
        <div id="features" className="w-full max-w-6xl mx-auto px-4 py-12">
          <div className="glass-card p-6 md:p-8">
            <FeatureGrid
              title="Why LinkSortAI?"
              subtitle="Smart bookmarking reimagined for the modern web."
              items={[
                {
                  icon: <Bookmark className="h-10 w-10 text-blue-400" />,
                  title: "AI Categorization",
                  description:
                    "Automatically sort your bookmarks into relevant categories using advanced machine learning algorithms.",
                },
                {
                  icon: <Search className="h-10 w-10 text-indigo-400" />,
                  title: "Advanced Search & Filters",
                  description: "Find bookmarks instantly with semantic search that understands context, not just keywords.",
                },
                {
                  icon: <Settings className="h-10 w-10 text-violet-400" />,
                  title: "Drag & Drop Organization",
                  description:
                    "Easily rearrange your bookmarks with a seamless drag-and-drop interface and customizable folders.",
                },
                {
                  icon: <Users className="h-10 w-10 text-purple-400" />,
                  title: "Secure Authentication",
                  description:
                    "Sign up with OAuth and enjoy secure access to your personalized bookmarks across all devices.",
                },
                {
                  icon: <Shield className="h-10 w-10 text-fuchsia-400" />,
                  title: "Privacy Focused",
                  description:
                    "Your bookmarks remain yours—strong encryption and optional self-hosting keep your data secure.",
                },
                {
                  icon: <GitHubLogoIcon className="h-10 w-10 text-rose-400" />,
                  title: "100% Open-source",
                  description: "Built with transparency—self-host or contribute to the project on GitHub.",
                },
                {
                  icon: <Zap className="h-10 w-10 text-amber-400" />,
                  title: "Lightning Fast",
                  description: "Optimized for performance with instant syncing across all your devices and browsers.",
                },
              ]}
            />
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="w-full max-w-5xl mx-auto px-4 py-12">
          <div className="glass-card p-6 md:p-8 text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 gradient-text fade-in-up">
              Ready to transform your bookmarking experience?
            </h2>
            <p className="text-base text-gray-300 max-w-2xl mx-auto mb-6 fade-in-up">
              Join thousands of users who have simplified their digital life with LinkSortAI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-up">
              <a
                href="#signup"
                className="btn-primary inline-flex items-center justify-center rounded-xl px-6 py-3 text-base font-semibold text-white shadow-lg border-0"
              >
                Get Started Now
              </a>
              <a
                href="https://github.com/xDipzz/linksortai"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary inline-flex items-center justify-center rounded-xl px-6 py-3 text-base font-semibold text-white shadow-lg"
              >
                <GitHubLogoIcon className="mr-2 h-5 w-5" />
                Star on GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div id="signup" className="w-full max-w-4xl mx-auto px-4 py-12">
          <div className="glass-card p-6 md:p-8 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 gradient-text">
              Ready to Get Started?
            </h3>
            <p className="text-base text-gray-300 mb-6 max-w-xl mx-auto">
              LinkSortAI is coming soon! Join our waitlist to be the first to know when we launch.
            </p>
            <ContactForm />
          </div>
        </div>

        {/* Bottom Spacing */}
        <div className="h-16"></div>
      </div>
    </div>
  )
}

