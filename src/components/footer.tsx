"use client";

import { buttonVariants } from "../components/ui/button"; // Adjusted path
import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

export function Footer(props: {
  builtBy: string;
  builtByLink: string;
  githubLink: string;
  twitterLink: string;
  linkedinLink: string;
}) {
  return (
    <footer className="border-t text-center">
      <div className="container flex flex-col items-center justify-start md:justify-center gap-4 py-15 md:h-24 md:flex-row md:py-0 pl-6">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-sm leading-loose text-muted-foreground">
            Built with ❤️ for bookmark lovers by{" "}
            <a
              href={props.builtByLink}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              {props.builtBy}
            </a>
            . Explore the project on{" "}
            <a
              href={props.githubLink}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>

        <div className="flex items-center justify-center space-x-3 ml-9">
          {[
            { href: props.twitterLink, icon: TwitterLogoIcon },
            { href: props.linkedinLink, icon: LinkedInLogoIcon },
            { href: props.githubLink, icon: GitHubLogoIcon },
          ].map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={buttonVariants({ variant: "ghost", size: "icon" })}
              target="_blank"
              rel="noreferrer"
            >
              <link.icon className="h-6 w-6" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
