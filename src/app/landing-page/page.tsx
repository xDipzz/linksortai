import { FeatureGrid } from "@/components/features";
import { Hero } from "@/components/hero";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Bookmark, Search, Settings, Users, Shield, Zap } from "lucide-react";

export default async function IndexPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <Hero
        capsuleText="AI-Powered Bookmark Management"
        capsuleLink="/auth/signin" // pending to add here too !!
        title={
          <>
            Organize Your Bookmarks <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">Effortlessly</span>
          </>
        }
        subtitle="LinkSortAI helps you save, categorize, and find bookmarks with ease—powered by AI that understands what matters to you."
        primaryCtaText="Get Started"
        primaryCtaLink="/auth/signup" // Update to new signup //a
        secondaryCtaText="GitHub"
        secondaryCtaLink="https://github.com/xDipzz/linksortai"
        credits={
          <>
            Crafted with <span className="animate-pulse">❤️</span> by{" "}
            <a
              href="https://linksorai.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors underline"
            >
              Dipz
            </a>
          </>
        }
      />

      <div id="features" className="scroll-mt-20" />

      <FeatureGrid
        title="Why LinkSortAI?"
        subtitle="Smart bookmarking reimagined for the modern web."
        items={[
          {
            icon: <Bookmark className="h-12 w-12 text-blue-600" />,
            title: "AI Categorization",
            description: "Automatically sort your bookmarks into relevant categories using advanced machine learning algorithms.",
          },
          {
            icon: <Search className="h-12 w-12 text-indigo-600" />,
            title: "Advanced Search & Filters",
            description: "Find bookmarks instantly with semantic search that understands context, not just keywords.",
          },
          {
            icon: <Settings className="h-12 w-12 text-violet-600" />,
            title: "Drag & Drop Organization",
            description: "Easily rearrange your bookmarks with a seamless drag-and-drop interface and customizable folders.",
          },
          {
            icon: <Users className="h-12 w-12 text-purple-600" />,
            title: "Secure Authentication",
            description: "Sign up with OAuth and enjoy secure access to your personalized bookmarks across all devices.",
          },
          {
            icon: <Shield className="h-12 w-12 text-fuchsia-600" />,
            title: "Privacy Focused",
            description: "Your bookmarks remain yours—strong encryption and optional self-hosting keep your data secure.",
          },
          {
            icon: <GitHubLogoIcon className="h-12 w-12 text-rose-600" />,
            title: "100% Open-source",
            description: "Built with transparency—self-host or contribute to the project on GitHub.",
          },
          {
            icon: <Zap className="h-12 w-12 text-amber-600" />,
            title: "Lightning Fast",
            description: "Optimized for performance with instant syncing across all your devices and browsers.",
          },
        ]}
      />

      <div className="w-full max-w-6xl mx-auto py-24 px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Ready to transform your bookmarking experience?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Join thousands of users who have simplified their digital life with LinkSortAI.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/auth/signup" // !!!
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Get Started Now
          </a>
          <a
            href="https://github.com/xDipzz/linksortai"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            <GitHubLogoIcon className="mr-2 h-5 w-5" />
            Star on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}