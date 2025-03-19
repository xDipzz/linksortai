import { StackProvider } from "@stackframe/stack";
import { stackServerApp } from "./../../../auth";
import { Footer } from "@/components/footer";
import { LandingPageHeader } from "@/components/landing-page-header";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <StackProvider app={stackServerApp}>
      <div className="flex min-h-screen flex-col">
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
        <main className="flex-1">{props.children}</main>
        <Footer
          builtBy="LinkSortAI :- dipz"
          builtByLink="https://linksorai.com/"
          githubLink="https://github.com/xDipzz/linksortai"
          twitterLink="https://www.linkedin.com/in/deepak-mahajan-b1181a214/"
          linkedinLink=""
        />
      </div>
    </StackProvider>
  );
}
