"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const basePath =
  process.env.NODE_ENV === "production" ? "/gfbs3-portfolio-demo" : "";

const projects = [
  {
    title: "Ask Me",
    description:
      "An agentic AI chatbot with RAG-based reasoning that answers my career related questions.",
    tags: ["RAG", "LLM", "AWS", "CHATBOT"],
    color: "cyan" as const,
    href: "https://main.d1tdd63qxtj4xh.amplifyapp.com",
    image: `${basePath}/askme_head.webp`,
    github: "https://github.com/shuseiyokoi/ask-me",
    medium: "https://medium.com/@shuseiyokoi/llm-rag-chatbot-ask-me-807386c647b2",
  },
  {
    title: "Bias by Prompt in LLM",
    description:
      "Shows that basic LLMs can change conclusions from the same loan data depending on prompt framing.",
    tags: ["LLM", "Fairness of AI"],
    color: "fuchsia" as const,
    href: "https://medium.com/@shuseiyokoi/same-data-different-conclusion-bias-by-prompt-in-llm-analysis-c175905fede1",
    image: `${basePath}/biasbyprompt.png`,
    github: "https://github.com/shuseiyokoi/Bias-by-Prompt-LLM-Fairness",
    medium: "https://medium.com/@shuseiyokoi/same-data-different-conclusion-bias-by-prompt-in-llm-analysis-c175905fede1",
  },
  {
    title: "HealthSync",
    description:
      "An iOS app that syncs HealthKit data and delivers personalized health advice using Azure OpenAI.",
    tags: ["TYPESCRIPT", "LLM", "SWIFT", "IOS"],
    color: "purple" as const,
    href: "https://testflight.apple.com/join/xBj899wE",
    image: `${basePath}/healthsync.png`,
    github: "https://github.com/shuseiyokoi/App-HealthSync",
    medium: "https://medium.com/@shuseiyokoi/building-an-ai-health-agent-with-short-term-long-term-memory-4f6c28eab6f3",
  },
  {
    title: "wild fire or movie?",
    description:
      "Keep building and adding to your portfolio. Each project tells part of your developer story.",
    tags: ["PYTHON", "DJANGO", "POSTGRESQL"],
    color: "yellow" as const,
    href: "#",
    image: `${basePath}/project-four.png`,
    github: "",
    medium: "",
  },
  {
    title: "PROJECT_FIVE",
    description:
      "An extra project that stays hidden until the user expands the portfolio list.",
    tags: ["AWS", "DOCKER", "FASTAPI"],
    color: "cyan" as const,
    href: "#",
    image: `${basePath}/project-five.png`,
    github: "",
    medium: "",
  },
  {
    title: "PROJECT_SIX",
    description:
      "Another hidden project for users to explore after clicking show more.",
    tags: ["ML", "PANDAS", "SCIKIT-LEARN"],
    color: "fuchsia" as const,
    href: "#",
    image: `${basePath}/project-six.png`,
    github: "",
    medium: "",
  },
];

export default function Home() {
  const [showAllProjects, setShowAllProjects] = useState(false);

  const visibleProjects = showAllProjects ? projects : projects.slice(0, 4);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-mono selection:bg-fuchsia-200 selection:text-fuchsia-900 overflow-x-hidden">
      {/* Grid Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#dbeafe_1px,transparent_1px),linear-gradient(to_bottom,#dbeafe_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60" />
        <div className="absolute bottom-0 left-0 right-0 h-[50vh] bg-gradient-to-t from-fuchsia-100 to-transparent opacity-70" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-cyan-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-fuchsia-600 hover:to-cyan-500 transition-all duration-300"
          >
            Shusei Yokoi
          </Link>

          <div className="flex gap-8 text-xs font-bold tracking-widest uppercase text-slate-500">
            <Link href="#work" className="hover:text-cyan-600 transition-all">
              PROJECTS
            </Link>
            <Link
              href="#philosophy"
              className="hover:text-fuchsia-600 transition-all"
            >
              ABOUT
            </Link>
            <Link
              href="#contact"
              className="hover:text-yellow-600 transition-all"
            >
              CONTACT
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-20">
        {/* Selected Work */}
        <section id="work" className="py-20 space-y-12">
          <div className="flex items-end justify-between border-b border-cyan-200 pb-4">
            <h2 className="text-2xl font-bold tracking-widest text-fuchsia-600">
              PROJECTS
            </h2>
            <span className="text-xs font-mono text-slate-500">
              Showcase what you&apos;ve built with style
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {visibleProjects.map((project) => (
              <ProjectCard
                key={project.title}
                title={project.title}
                description={project.description}
                tags={project.tags}
                color={project.color}
                href={project.href}
                image={project.image}
                github={project.github}
                medium={project.medium}
              />
            ))}
          </div>

          {projects.length > 4 && (
            <div className="flex justify-center pt-4">
              <button
                type="button"
                onClick={() => setShowAllProjects((prev) => !prev)}
                className="px-6 py-3 border border-cyan-300 bg-cyan-50 text-cyan-700 font-bold tracking-widest uppercase text-sm hover:bg-cyan-100 transition-all rounded-sm"
              >
                {showAllProjects
                  ? "SHOW LESS"
                  : `SHOW MORE (${projects.length - 4})`}
              </button>
            </div>
          )}
        </section>

        {/* About */}
        <section
          id="philosophy"
          className="py-20 grid md:grid-cols-12 gap-12 border-t border-cyan-200"
        >
          <div className="md:col-span-4 space-y-8">
            <h2 className="text-2xl font-bold tracking-widest text-cyan-600">
              {"// ABOUT_ME"}
            </h2>

            <div className="relative w-full aspect-[4/5] border border-cyan-200 rounded-sm overflow-hidden bg-cyan-50 group">
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.22)_100%)] z-10" />
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_1px)] bg-[size:100%_4px] z-20 pointer-events-none" />

              <Image
                src={`${basePath}/photo.png`}
                alt="Profile"
                fill
                className="object-cover z-0 opacity-100 group-hover:opacity-100 transition-all duration-500"
              />
            </div>
          </div>

          <div className="md:col-span-8 space-y-8 text-slate-700 leading-relaxed font-light">
            <p>
              Every developer has a unique journey. Share yours here—whether
              you&apos;re self-taught, a bootcamp grad, or transitioning
              careers.{" "}
              <strong className="text-fuchsia-600 font-bold">
                Your story matters.
              </strong>{" "}
              Talk about what drives you to code and the impact you want to
              make.
            </p>

            <div className="p-6 bg-cyan-50 border border-cyan-200 rounded-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-cyan-500" />

              <div className="grid grid-cols-2 gap-8 font-mono text-sm">
                <div>
                  <h3 className="text-cyan-700 mb-4 tracking-widest uppercase text-xs border-b border-cyan-200 pb-2">
                    STACK_TRACE
                  </h3>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-center gap-2">
                      <span className="text-fuchsia-500">›</span> JavaScript /
                      Python / TypeScript
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-fuchsia-500">›</span> React /
                      Next.js / Node.js
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-fuchsia-500">›</span> Git / GitHub
                      / VS Code
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-cyan-700 mb-4 tracking-widest uppercase text-xs border-b border-cyan-200 pb-2">
                    PROTOCOLS
                  </h3>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-center gap-2">
                      <span className="text-fuchsia-500">›</span> Always
                      learning
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-fuchsia-500">›</span> Ship &gt;
                      Perfect
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-fuchsia-500">›</span> Open source
                      contributor
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-20 border-t border-cyan-200">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
              READY TO{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">
                LAUNCH?
              </span>
            </h2>

            <p className="text-slate-600 text-lg">
              Fork this template on GitHub and make it yours. Update the
              content, add your projects, and deploy to GitHub Pages in under 30
              minutes.
            </p>

            <div className="flex flex-col items-center gap-6">
              <a
                href="https://github.com/ladykerr/gfbs3-portfolio-demo"
                className="px-10 py-4 bg-fuchsia-600 text-white font-bold tracking-widest uppercase text-sm hover:bg-fuchsia-500 transition-all rounded-sm"
              >
                FORK ON GITHUB
              </a>

              <div className="flex items-center gap-8 pt-4">
                <SocialLink href="https://github.com" label="GITHUB" />
                <SocialLink href="https://linkedin.com" label="LINKEDIN" />
                <SocialLink href="https://twitter.com" label="TWITTER" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 text-center text-xs font-mono text-slate-400 border-t border-cyan-100">
        <p>
          Made with ❤️ by{" "}
          <a
            href="https://gh.io/gfb"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-600 hover:text-cyan-500 transition-all"
          >
            GitHub for Beginners
          </a>{" "}
          and{" "}
          <a
            href="https://gh.io/gfb-copilot"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-600 hover:text-cyan-500 transition-all"
          >
            GitHub Copilot
          </a>
        </p>
      </footer>
    </div>
  );
}

function ProjectCard({
  title,
  description,
  tags,
  color,
  href,
  image,
  github,
  medium,
}: {
  title: string;
  description: string;
  tags: string[];
  color: "cyan" | "fuchsia" | "purple" | "yellow";
  href: string;
  image?: string;
  github?: string;
  medium?: string;
}) {
  const validColors = ["cyan", "fuchsia", "purple", "yellow"] as const;
  const safeColor = validColors.includes(color) ? color : "cyan";

  const colorClasses = {
    cyan: "group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]",
    fuchsia:
      "group-hover:border-fuchsia-400 group-hover:shadow-[0_0_20px_rgba(232,121,249,0.15)]",
    purple:
      "group-hover:border-purple-400 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]",
    yellow:
      "group-hover:border-yellow-400 group-hover:shadow-[0_0_20px_rgba(234,179,8,0.15)]",
  };

  const textColors = {
    cyan: "group-hover:text-cyan-600",
    fuchsia: "group-hover:text-fuchsia-600",
    purple: "group-hover:text-purple-600",
    yellow: "group-hover:text-yellow-600",
  };

  return (
    <div
      className={`group block space-y-4 p-6 bg-white border border-slate-200 transition-all duration-300 rounded-sm ${colorClasses[safeColor]}`}
    >
      {image && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block w-full h-40 border border-slate-200 bg-slate-50 rounded-sm overflow-hidden"
          aria-label={`Open ${title}`}
        >
          <Image
            src={image}
            alt={`${title} project image`}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-105"
          />
        </a>
      )}

      <div className="flex justify-between items-start gap-4">
        <h3
          className={`text-xl font-bold text-slate-900 tracking-wider transition-colors ${textColors[safeColor]}`}
        >
          {title}
        </h3>

        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0"
          aria-label={`Open ${title}`}
        >
          <ArrowUpRightIcon
            className={`w-5 h-5 text-slate-400 transition-all hover:translate-x-1 hover:-translate-y-1 ${textColors[safeColor]}`}
          />
        </a>
      </div>

      <p className="text-sm text-slate-600 leading-relaxed font-light border-l border-slate-200 pl-4">
        {description}
      </p>

      <div className="flex gap-2 pt-2 flex-wrap">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] uppercase tracking-widest font-bold text-cyan-700 bg-cyan-50 px-2 py-1 border border-cyan-200 group-hover:border-cyan-300 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>

      {(github || medium) && (
        <div className="flex items-center gap-4 pt-3 border-t border-slate-100">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-bold tracking-widest text-slate-500 hover:text-slate-900 transition-all"
              aria-label={`${title} GitHub repository`}
            >
              <GitHubIcon className="w-4 h-4" />
              GITHUB
            </a>
          )}

          {medium && (
            <a
              href={medium}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-bold tracking-widest text-slate-500 hover:text-green-700 transition-all"
              aria-label={`${title} Medium blog`}
            >
              <MediumIcon className="w-4 h-4" />
              BLOG
            </a>
          )}
        </div>
      )}
    </div>
  );
}

function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-xs font-bold tracking-widest text-slate-500 hover:text-cyan-600 transition-all"
    >
      {label}
    </a>
  );
}

function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49v-1.73c-2.78.62-3.37-1.38-3.37-1.38-.45-1.19-1.11-1.51-1.11-1.51-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.95c.85 0 1.71.12 2.51.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.95.68 1.92v2.8c0 .27.18.59.69.49A10.07 10.07 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

function MediumIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1043.63 592.71"
      fill="currentColor"
      className={className}
    >
      <path d="M588.67 296.35c0 163.66-131.79 296.35-294.33 296.35S0 460.01 0 296.35 131.79 0 294.34 0s294.33 132.69 294.33 296.35" />
      <path d="M911.56 296.35c0 154.06-65.9 278.98-147.19 278.98s-147.19-124.92-147.19-278.98S683.08 17.37 764.37 17.37s147.19 124.92 147.19 278.98" />
      <path d="M1043.63 296.35c0 137.98-23.17 249.85-51.75 249.85s-51.75-111.87-51.75-249.85S963.3 46.5 991.88 46.5s51.75 111.87 51.75 249.85" />
    </svg>
  );
}