import { FeatureGrid } from "@/components/features";
import { Hero } from "@/components/hero";
import { stackServerApp } from "../../../auth";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Bookmark, Search, Settings, Users } from "lucide-react";

export default async function IndexPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <Hero
        capsuleText="AI-Powered Bookmark Management"
        capsuleLink="https://linksorai.com"
        title="Organize Your Bookmarks Effortlessly"
        subtitle="LinkSortAI helps you save, categorize, and find bookmarks with ease—powered by AI."
        primaryCtaText="Get Started"
        primaryCtaLink={stackServerApp.urls.signUp}
        secondaryCtaText="GitHub"
        secondaryCtaLink="https://github.com/xDipzz/linksortai"
        credits={
          <>
            Crafted with ❤️  here can add more some animation,,,,
            <a
              href="https://linksorai.com"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
            </a>
          </>
        }
      />

      <div id="features" />

      <FeatureGrid
        title="Why LinkSortAI?"
        subtitle="Smart bookmarking made easy."
        items={[
          {
            icon: <Bookmark className="h-12 w-12" />,
            title: "AI Categorization",
            description: "Automatically sort your bookmarks into relevant categories using AI.",
          },
          {
            icon: <Search className="h-12 w-12" />,
            title: "Advanced Search & Filters",
            description: "Find bookmarks instantly with keyword search and filtering by categories.",
          },
          {
            icon: <Settings className="h-12 w-12" />,
            title: "Drag & Drop Organization",
            description: "Easily rearrange your bookmarks with a seamless drag-and-drop interface.",
          },
          {
            icon: <Users className="h-12 w-12" />,
            title: "Secure Authentication",
            description: "Sign up with OAuth and enjoy secure access to your personalized bookmarks.",
          },
          {
            icon: <GitHubLogoIcon className="h-12 w-12" />,
            title: "100% Open-source",
            description: "Built with transparency—self-host or contribute to the project.",
          },
        ]}
      />
    </div>
  );
}
