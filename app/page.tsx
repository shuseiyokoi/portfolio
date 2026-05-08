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
    medium:
      "https://medium.com/@shuseiyokoi/llm-rag-chatbot-ask-me-807386c647b2",
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
    medium:
      "https://medium.com/@shuseiyokoi/same-data-different-conclusion-bias-by-prompt-in-llm-analysis-c175905fede1",
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
    medium:
      "https://medium.com/@shuseiyokoi/building-an-ai-health-agent-with-short-term-long-term-memory-4f6c28eab6f3",
  },
  {
    title: "Wildfire Impact Analysis",
    description:
      "A data analysis project studying wildfire impact using economic and regional indicators.",
    tags: ["PYTHON", "DID", "ECONOMICS"],
    color: "yellow" as const,
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
    color: "cyan" as const,
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
    color: "fuchsia" as const,
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
      const res = await fetch(
        "/api/ask-me",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: userPrompt }),
        }
      );

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
        {/* Projects */}
        <section id="work" className="py-20 space-y-12">
          <div className="flex items-end justify-between border-b border-cyan-200 pb-4">
            <h2 className="text-2xl font-bold tracking-widest text-fuchsia-600">
              PROJECTS
            </h2>
            <span className="text-xs font-mono text-slate-500">
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
              ABOUT ME
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
              Data Scientist focused on building trustworthy, interpretable AI
              solutions that deliver real impact through strong software
              engineering skills and a business-driven mindset.
              <br />
              I work end-to-end across the data science lifecycle, defining
              business problems, mining and analyzing data, selecting and
              evaluating appropriate models, and deploying solutions that solve
              real-world problems.
              <br />
              <strong className="text-fuchsia-600 font-bold">
                - Turning Data into Smiles.
              </strong>
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
                      <span className="text-fuchsia-500">›</span> Python /
                      TypeScript / JavaScript
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-fuchsia-500">›</span> React /
                      Next.js / FastAPI
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-fuchsia-500">›</span> AWS / Azure /
                      PostgreSQL
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-cyan-700 mb-4 tracking-widest uppercase text-xs border-b border-cyan-200 pb-2">
                    FOCUS
                  </h3>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-center gap-2">
                      <span className="text-fuchsia-500">›</span> Applied AI
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-fuchsia-500">›</span> MLOps
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-fuchsia-500">›</span> AI Fairness
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
              LET&apos;S{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">
                CONNECT
              </span>
            </h2>

            <p className="text-slate-600 text-lg">
              Want to know more about my projects, research, or background? Try
              the Ask Me chatbot or reach out directly.
            </p>

            <div className="flex flex-col items-center gap-6">
              <a
                href="mailto:your-email@example.com"
                className="px-10 py-4 bg-fuchsia-600 text-white font-bold tracking-widest uppercase text-sm hover:bg-fuchsia-500 transition-all rounded-sm"
              >
                CONTACT ME
              </a>

              <div className="flex items-center gap-8 pt-4">
                <SocialLink
                  href="https://github.com/shuseiyokoi"
                  label="GITHUB"
                />
                <SocialLink
                  href="https://linkedin.com"
                  label="LINKEDIN"
                />
                <SocialLink
                  href="https://medium.com/@shuseiyokoi"
                  label="MEDIUM"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 text-center text-xs font-mono text-slate-400 border-t border-cyan-100">
        <p>Made with ❤️ by Shusei Yokoi</p>
      </footer>

      {/* Ask Me Chat Popup */}
      <div className="fixed bottom-5 right-5 z-[100] font-mono">
        {isChatOpen && (
          <div className="mb-3 w-[360px] h-[540px] sm:w-[400px] sm:h-[600px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-6rem)] bg-white border border-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.25)] rounded-sm overflow-hidden flex flex-col">
            <div className="h-11 px-3 flex items-center justify-between bg-cyan-50 border-b border-cyan-200">
              <div>
                <p className="text-xs font-bold tracking-widest text-cyan-700">
                  ASK ME
                </p>
                <p className="text-[10px] text-slate-500">
                  Ask about Shusei
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsChatOpen(false)}
                className="text-slate-500 hover:text-fuchsia-600 text-lg leading-none"
                aria-label="Close Ask Me chat"
              >
                ×
              </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-slate-50 p-3 space-y-2">
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                    }`}
                >
                  <div
                    className={`max-w-[80%] rounded-sm px-3 py-2 text-xs leading-relaxed whitespace-pre-wrap ${message.sender === "user"
                      ? "bg-cyan-600 text-white"
                      : "bg-white border border-slate-200 text-slate-700"
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
                  <div className="bg-white border border-slate-200 text-slate-500 rounded-sm px-3 py-2 text-xs">
                    Thinking...
                  </div>
                </div>
              )}
            </div>

            <div className="p-2 border-t border-cyan-100 bg-white flex gap-2">
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
                className="flex-1 h-9 resize-none border border-slate-300 rounded-sm px-2 py-2 text-xs outline-none focus:border-cyan-400"
              />

              <button
                type="button"
                onClick={handleAskMeSend}
                disabled={chatLoading}
                className="h-9 px-3 bg-cyan-600 text-white text-xs font-bold tracking-widest rounded-sm hover:bg-cyan-500 disabled:opacity-60"
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