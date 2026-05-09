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
    color: "slate" as const,
    href: "https://main.d1tdd63qxtj4xh.amplifyapp.com",
    image: `${basePath}/askme_head.webp`,
    github: "https://github.com/shuseiyokoi/ask-me",
    medium:
      "https://medium.com/@shuseiyokoi/llm-rag-chatbot-ask-me-807386c647b2",
  },
  {
    title: "Bias by Prompt in LLM",
    description:
      "Shows that basic LLMs can change conclusions from the same loan data depending on prompt framing.",
    tags: ["LLM", "Fairness of AI"],
    color: "slate" as const,
    href: "https://medium.com/@shuseiyokoi/same-data-different-conclusion-bias-by-prompt-in-llm-analysis-c175905fede1",
    image: `${basePath}/biasbyprompt.png`,
    github: "https://github.com/shuseiyokoi/Bias-by-Prompt-LLM-Fairness",
    medium:
      "https://medium.com/@shuseiyokoi/same-data-different-conclusion-bias-by-prompt-in-llm-analysis-c175905fede1",
  },
  {
    title: "HealthSync",
    description:
      "An iOS app that syncs HealthKit data and delivers personalized health advice using Azure OpenAI.",
    tags: ["TYPESCRIPT", "LLM", "SWIFT", "IOS"],
    color: "slate" as const,
    href: "https://testflight.apple.com/join/xBj899wE",
    image: `${basePath}/healthsync.png`,
    github: "https://github.com/shuseiyokoi/App-HealthSync",
    medium:
      "https://medium.com/@shuseiyokoi/building-an-ai-health-agent-with-short-term-long-term-memory-4f6c28eab6f3",
  },
  {
    title: "Wildfire Impact Analysis",
    description:
      "A data analysis project studying wildfire impact using economic and regional indicators.",
    tags: ["PYTHON", "DID", "ECONOMICS"],
    color: "slate" as const,
    href: "#",
    image: `${basePath}/project-four.png`,
    github: "",
    medium: "",
  },
  {
    title: "Movie ROI Prediction",
    description:
      "A machine learning project predicting movie ROI using metadata and AI-enhanced storyline analysis.",
    tags: ["ML", "NLP", "PYTHON"],
    color: "slate" as const,
    href: "#",
    image: `${basePath}/project-five.png`,
    github: "",
    medium: "",
  },
  {
    title: "HowHot",
    description:
      "A food spiciness prediction app that estimates spice level from food images.",
    tags: ["CV", "PYTORCH", "AWS"],
    color: "slate" as const,
    href: "#",
    image: `${basePath}/project-six.png`,
    github: "",
    medium: "",
  },
];

export default function Home() {
  const [showAllProjects, setShowAllProjects] = useState(false);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "bot",
      text: "Hi! I'm Ask Me Bot. Ask about Shusei's projects, skills, background, or data science experience.",
    },
  ]);

  const visibleProjects = showAllProjects ? projects : projects.slice(0, 4);

  const handleAskMeSend = async () => {
    if (!chatInput.trim() || chatLoading) return;

    const userPrompt = chatInput;

    setChatMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userPrompt,
      },
    ]);

    setChatInput("");
    setChatLoading(true);

    try {
      const res = await fetch("/api/ask-me", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userPrompt }),
      });

      const data = await res.json();

      setChatMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data?.response || "Sorry, I could not find an answer.",
        },
      ]);
    } catch (error) {
      console.error(error);

      setChatMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, something went wrong. Please try again.",
        },
      ]);
    }

    setChatLoading(false);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-slate-900 selection:text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-semibold tracking-wide text-slate-900 hover:text-slate-500 transition-colors"
          >
            Shusei Yokoi
          </Link>

          <div className="flex gap-8 text-xs font-medium tracking-wide uppercase text-slate-500">
            <Link href="#work" className="hover:text-slate-900 transition-colors">
              Projects
            </Link>
            <Link
              href="#philosophy"
              className="hover:text-slate-900 transition-colors"
            >
              About
            </Link>
            <Link
              href="#contact"
              className="hover:text-slate-900 transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-20">
        {/* Projects */}
        <section id="work" className="py-20 space-y-12">
          <div className="flex items-end justify-between border-b border-slate-200 pb-4">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              Projects
            </h2>
            <span className="text-xs text-slate-500">
              Selected data science and AI projects
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
                className="px-6 py-3 border border-slate-300 bg-white text-slate-800 font-medium tracking-wide uppercase text-sm hover:bg-slate-100 transition-colors rounded-md"
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
          className="py-20 grid md:grid-cols-12 gap-12 border-t border-slate-200"
        >
          <div className="md:col-span-4 space-y-8">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              About Me
            </h2>

            <div className="relative w-full aspect-[4/5] border border-slate-200 rounded-md overflow-hidden bg-slate-50 group">
              <Image
                src={`${basePath}/photo.png`}
                alt="Profile"
                fill
                className="object-cover z-0 opacity-100 transition-all duration-500"
              />
            </div>
          </div>

          <div className="md:col-span-8 space-y-8 text-slate-700 leading-relaxed font-light">
            <p>
              Data Scientist focused on building trustworthy, interpretable AI
              solutions that deliver real impact through strong software
              engineering skills and a business-driven mindset.
              <br />
              I work end-to-end across the data science lifecycle, defining
              business problems, mining and analyzing data, selecting and
              evaluating appropriate models, and deploying solutions that solve
              real-world problems.
              <br />
              <strong className="text-slate-900 font-semibold">
                — Turning Data into Smiles.
              </strong>
            </p>

            <div className="p-6 bg-slate-50 border border-slate-200 rounded-md relative overflow-hidden">
              <div className="grid grid-cols-2 gap-8 text-sm">
                <div>
                  <h3 className="text-slate-900 mb-4 tracking-wide uppercase text-xs border-b border-slate-200 pb-2 font-semibold">
                    Stack
                  </h3>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-center gap-2">
                      <span className="text-slate-400">›</span> Python /
                      TypeScript / JavaScript
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-slate-400">›</span> React /
                      Next.js / FastAPI
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-slate-400">›</span> AWS / Azure /
                      PostgreSQL
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-slate-900 mb-4 tracking-wide uppercase text-xs border-b border-slate-200 pb-2 font-semibold">
                    Focus
                  </h3>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-center gap-2">
                      <span className="text-slate-400">›</span> Applied AI
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-slate-400">›</span> MLOps
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-slate-400">›</span> AI Fairness
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-20 border-t border-slate-200">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900">
              Let&apos;s Connect
            </h2>

            <p className="text-slate-600 text-lg">
              Want to know more about my projects, research, or background? Try
              the Ask Me chatbot or reach out directly.
            </p>

            <div className="flex flex-col items-center gap-6">
              <a
                href="mailto:your-email@example.com"
                className="px-10 py-4 bg-slate-900 text-white font-medium tracking-wide uppercase text-sm hover:bg-slate-700 transition-colors rounded-md"
              >
                Contact Me
              </a>

              <div className="flex items-center gap-8 pt-4">
                <SocialLink
                  href="https://github.com/shuseiyokoi"
                  label="GITHUB"
                />
                <SocialLink href="https://linkedin.com" label="LINKEDIN" />
                <SocialLink
                  href="https://medium.com/@shuseiyokoi"
                  label="MEDIUM"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 text-center text-xs text-slate-400 border-t border-slate-100">
        <p>Made with ❤️ by Shusei Yokoi</p>
      </footer>

      {/* Ask Me Chat Popup */}
      <div className="fixed bottom-5 right-5 z-[100]">
        {isChatOpen && (
          <div className="mb-3 w-[360px] h-[540px] sm:w-[400px] sm:h-[600px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-6rem)] bg-white border border-slate-200 shadow-xl rounded-xl overflow-hidden flex flex-col">
            <div className="h-12 px-4 flex items-center justify-between bg-white border-b border-slate-200">
              <div>
                <p className="text-sm font-semibold text-slate-900">Ask Me</p>
                <p className="text-xs text-slate-500">Ask about Shusei</p>
              </div>

              <button
                type="button"
                onClick={() => setIsChatOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                aria-label="Close Ask Me chat"
              >
                ×
              </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-slate-50 p-4 space-y-3">
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                    }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm leading-relaxed whitespace-pre-wrap ${message.sender === "user"
                      ? "bg-slate-900 text-white rounded-br-sm"
                      : "bg-white border border-slate-200 text-slate-700 rounded-bl-sm"
                      }`}
                    style={{
                      overflowWrap: "anywhere",
                      wordBreak: "break-word",
                    }}
                  >
                    {message.text}
                  </div>
                </div>
              ))}

              {chatLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 text-slate-500 rounded-2xl rounded-bl-sm px-4 py-2 text-sm">
                    Thinking...
                  </div>
                </div>
              )}
            </div>

            <div className="p-3 border-t border-slate-200 bg-white flex gap-2">
              <textarea
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleAskMeSend();
                  }
                }}
                placeholder="Ask about Shusei..."
                className="flex-1 h-10 resize-none border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-slate-900"
              />

              <button

                type="button"

                onClick={handleAskMeSend}

                disabled={chatLoading}

                className="h-10 px-4 bg-cyan-600 text-white text-xs font-semibold tracking-wide rounded-lg hover:bg-cyan-500 disabled:opacity-60 transition-colors"

              >

                {chatLoading ? "..." : "SEND"}

              </button>
            </div>
          </div>
        )}

        {!isChatOpen && (
          <button

            type="button"

            onClick={() => setIsChatOpen(true)}

            className="px-4 py-3 bg-cyan-600 text-white font-bold tracking-widest uppercase text-xs hover:bg-cyan-500 transition-all rounded-full shadow-lg border border-cyan-400"

            aria-label="Open Ask Me chat"

          >

            ASK ME

          </button>
        )}
      </div>
    </div>
  );
}

function ProjectCard({
  title,
  description,
  tags,
  href,
  image,
  github,
  medium,
}: {
  title: string;
  description: string;
  tags: string[];
  color?: "slate";
  href: string;
  image?: string;
  github?: string;
  medium?: string;
}) {
  return (
    <div className="group block space-y-4 p-6 bg-white border border-slate-200 hover:border-slate-400 hover:shadow-md transition-all duration-300 rounded-xl">
      {image && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block w-full h-40 border border-slate-200 bg-slate-50 rounded-lg overflow-hidden"
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
        <h3 className="text-xl font-semibold text-slate-900 tracking-tight transition-colors group-hover:text-slate-600">
          {title}
        </h3>

        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0"
          aria-label={`Open ${title}`}
        >
          <ArrowUpRightIcon className="w-5 h-5 text-slate-400 transition-all hover:translate-x-1 hover:-translate-y-1 group-hover:text-slate-900" />
        </a>
      </div>

      <p className="text-sm text-slate-600 leading-relaxed font-light border-l border-slate-200 pl-4">
        {description}
      </p>

      <div className="flex gap-2 pt-2 flex-wrap">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] uppercase tracking-wide font-medium text-slate-600 bg-slate-100 px-2 py-1 border border-slate-200 transition-colors rounded-md"
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
              className="flex items-center gap-2 text-xs font-medium tracking-wide text-slate-500 hover:text-slate-900 transition-colors"
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
              className="flex items-center gap-2 text-xs font-medium tracking-wide text-slate-500 hover:text-slate-900 transition-colors"
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
      className="text-xs font-medium tracking-wide text-slate-500 hover:text-slate-900 transition-colors"
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