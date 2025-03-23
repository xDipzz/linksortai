import { FeatureGrid } from "@/components/features";
import { Hero } from "@/components/hero";
import { stackServerApp } from "../../../auth";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Bookmark, Search, Settings, Users, Shield, Zap } from "lucide-react";

export default async function IndexPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <Hero
        capsuleText="AI-Powered Bookmark Management"
        capsuleLink={stackServerApp.urls.signIn}
        title={
          <>
            Organize Your Bookmarks <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">Effortlessly</span>
          </>
        }
        subtitle="LinkSortAI helps you save, categorize, and find bookmarks with ease—powered by AI that understands what matters to you."
        primaryCtaText="Get Started"
        primaryCtaLink={stackServerApp.urls.signUp}
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
              Deepak Mahajan
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
  </div>
  );
}