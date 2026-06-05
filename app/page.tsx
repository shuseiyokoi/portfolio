"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";

const basePath =
  process.env.NODE_ENV === "production" ? "/portfolio" : "";

const ASK_ME_API_URL =
  "https://opv17qccr5.execute-api.us-east-1.amazonaws.com/dev/invoke-agent";


const projects = [
  {
    title: "Ask Me",
    description:
      "An agentic AI chatbot with RAG-based reasoning that answers my career related questions.",
    tags: ["RAG", "LLM", "AWS", "CHATBOT"],
    color: "slate" as const,
    href: "https://main.d1tdd63qxtj4xh.amplifyapp.com",
    image: `${basePath}/askme_head.png`,
    github: "https://github.com/shuseiyokoi/ask-me",
    medium:
      "https://medium.com/@shuseiyokoi/llm-rag-chatbot-ask-me-807386c647b2",
    app: "https://main.d1tdd63qxtj4xh.amplifyapp.com",
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
    app:
      "https://testflight.apple.com/join/xBj899wE",
    appLabel: "TESTFLIGHT(iOS)",
  },
  {
    title: "LLM Evaluation with Promptfoo",
    description:
      "Systematic comparison of language models like AWS Nova Pro vs. Micro using Promptfoo for RAG performance benchmarking.",
    tags: ["RAG", "AWS", "LLM Evaluation"],
    color: "slate" as const,
    href: "https://github.com/shuseiyokoi/LLM-evaluation",
    image: `${basePath}/promptfoo.png`,
    github: "https://github.com/shuseiyokoi/LLM-evaluation",
    notion: "https://shuseiyokoi.notion.site/Promptfoo-LLM-Evaluation-Techniques-23bf61fbe85c8089ab63e64295bca69c",
  },
  {
    title: "California Wildfire Economic Recovery",
    description:
      "Used weather signals and difference-in-differences analysis to measure wildfire-related employment disruption and recovery.",
    tags: ["DID", "Geospatial", "ECONOMICS"],
    color: "slate" as const,
    href: "https://github.com/shuseiyokoi/California-Wildfire-Economic-Recovery/tree/main",
    image: `${basePath}/cal_fire.png`,
    github: "https://github.com/shuseiyokoi/California-Wildfire-Economic-Recovery/tree/main",
    medium: "",
  },
  // {
  //   title: "Movie ROI Prediction",
  //   description:
  //     "A machine learning project predicting movie ROI using metadata and AI-enhanced storyline analysis.",
  //   tags: ["ML", "NLP", "PYTHON"],
  //   color: "slate" as const,
  //   href: "#",
  //   image: `${basePath}/project-five.png`,
  //   github: "",
  //   medium: "",
  // },
  // {
  //   title: "Wildfire Impact Analysis",
  //   description:
  //     "A data analysis project studying wildfire impact using economic and regional indicators.",
  //   tags: ["PYTHON", "DID", "ECONOMICS"],
  //   color: "slate" as const,
  //   href: "#",
  //   image: `${basePath}/project-four.png`,
  //   github: "",
  //   medium: "",
  // },
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
      const res = await fetch(ASK_ME_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userPrompt }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "API request failed");
      }

      setChatMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
            data?.response ||
            data?.error ||
            "Sorry, I could not find an answer.",
        },
      ]);
    } catch (error) {
      console.error(error);

      setChatMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
            error instanceof Error
              ? error.message
              : "Sorry, something went wrong. Please try again.",
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
            <Link
              href="#philosophy"
              className="hover:text-slate-900 transition-colors"
            >
              About
            </Link>

            <Link
              href="#career"
              className="hover:text-slate-900 transition-colors"
            >
              Career
            </Link>

            <Link
              href="#work"
              className="hover:text-slate-900 transition-colors"
            >
              Projects
            </Link>

            <a
              href="mailto:shuseiyokoi@gmail.com"
              className="hover:text-slate-900 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-24">
        {/* About */}
        <section
          id="philosophy"
          className="pt-12 pb-8 grid md:grid-cols-12 gap-8"
        >
          <div className="md:col-span-4 flex justify-center">
            <div className="relative w-72 aspect-[4.5/5] border border-slate-200 rounded-md overflow-hidden bg-slate-50 group">
              <Image
                src={`${basePath}/photo.png`}
                alt="Profile"
                fill
                className="object-cover z-0 opacity-100 transition-all duration-500"
              />
            </div>
          </div>

          <div className="md:col-span-8 space-y-6 text-slate-700 leading-relaxed font-light">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
                Shusei Yokoi
              </h2>

              <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-700">
                Data Scientist / Research Assistant
              </h3>
            </div>

            <p>
              Data Scientist with a focus on trustworthy and interpretable AI. Currently pursuing an M.S. in Applied Data Science at USC and conducting trustworthy AI research at ISI.

              <br />
              I build data-driven solutions with strong software engineering skills and a business-driven mindset. I work end-to-end across the data science lifecycle, from defining business problems and analyzing data to evaluating models and deploying solutions that solve real-world problems.

              <br />
              <br />
              <strong className="text-slate-900 font-semibold">
                — Turning Data into Smiles.
              </strong>
            </p>
          </div>
        </section>

        {/* Career */}
        <section id="career" className="pt-8 pb-12">
          <div className="flex items-end justify-between border-b border-slate-200 pb-4 mb-6">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              Experience & Education
            </h2>
            <a
              href={`${basePath}/resumes/Resume_ShuseiYokoi_20260605.pdf`}
              download
              className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900"
            >
              <span>Resume</span>
              <Download size={16} />

            </a>
            {/* <span className="hidden md:block text-xs text-slate-500">
              Professional background and education
            </span> */}
          </div>

          <div className="space-y-8">
            {/* Professional Experience */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">
                Research Experience
              </h3>

              <div className="divide-y divide-slate-100">
                {/* Research Experience */}
                <details className="group py-3">
                  <summary className="cursor-pointer list-none">
                    <div className="grid md:grid-cols-12 gap-4 items-start">
                      <div className="md:col-span-8 flex items-start gap-3">
                        <span className="mt-1 text-slate-400 text-xs transition-transform group-open:rotate-90">
                          ▶
                        </span>

                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            USC Information Sciences Institute (ISI)
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            Research Assistant
                          </p>
                        </div>
                      </div>

                      <p className="md:col-span-4 text-xs text-slate-500 md:text-right">
                        2026 – Present
                      </p>
                    </div>
                  </summary>

                  <div className="mt-4 ml-6 space-y-5 text-sm text-slate-700 leading-relaxed">
                    <div>
                      <p className="font-semibold text-slate-900">
                        Bias by Prompt LLM Fairness{" "}
                        <span className="font-normal text-slate-500">
                          | Python, ChatGPT, Claude, Gemini, Qwen
                        </span>
                      </p>

                      <ul className="mt-2 space-y-1 list-disc pl-5">
                        <li>
                          Conducting research on trustworthy AI, focusing on fairness, bias, and reliability in LLM-based decision-making
                        </li>
                        <li>
                          Designed controlled experiments to evaluate the effects of prompt framing on responses across LLMs,
                          including ChatGPT, Claude, Gemini, and Qwen
                        </li>
                        <li>
                          Identified early evidence that emotional prompt framing can alter LLM behavior, causing conclusion shifts in
                          some models and reduced confidence in others
                        </li>
                      </ul>
                    </div>
                  </div>
                </details>
              </div>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">
                Professional Experience
              </h3>

              <div className="divide-y divide-slate-100">
                <details className="group py-3">
                  <summary className="cursor-pointer list-none">
                    <div className="grid md:grid-cols-12 gap-4 items-start">
                      <div className="md:col-span-8 flex items-start gap-3">
                        <span className="mt-1 text-slate-400 text-xs transition-transform group-open:rotate-90">
                          ▶
                        </span>

                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            Datify
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            Founder / AI Product Developer
                          </p>
                        </div>
                      </div>

                      <p className="md:col-span-4 text-xs text-slate-500 md:text-right">
                        2025 – Present
                      </p>
                    </div>
                  </summary>

                  <div className="mt-4 ml-6 space-y-5 text-sm text-slate-700 leading-relaxed">
                    <div>
                      <p className="font-semibold text-slate-900">
                        Founded and Developed an AI-powered Solutions{" "}
                        <span className="font-normal text-slate-500">
                          | R, Python, Swift, Azure OpenAI
                        </span>
                      </p>

                      <ul className="mt-2 space-y-1 list-disc pl-5">
                        <li>
                          Founded Datify to build AI-powered products that help people improve their lives through personalization
                        </li>
                        <li>
                          Developed HealthSync, an iOS AI health advisor app integrating Apple HealthKit and Azure OpenAI GPT-4o to deliver personalized health insights from biometric and activity data
                        </li>
                        <li>
                          Built data pipelines to extract biometric data from Apple HealthKit and convert them into structured summaries for AI analysis to generate dynamic, contextual health advice, helping users track trends and
                          stay on target with personal goals
                        </li>
                      </ul>
                    </div>
                  </div>
                </details>

                <details className="group py-3">
                  <summary className="cursor-pointer list-none">
                    <div className="grid md:grid-cols-12 gap-4 items-start">
                      <div className="md:col-span-8 flex items-start gap-3">
                        <span className="mt-1 text-slate-400 text-xs transition-transform group-open:rotate-90">
                          ▶
                        </span>

                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            SoftBank
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            Data Scientist
                          </p>
                        </div>
                      </div>

                      <p className="md:col-span-4 text-xs text-slate-500 md:text-right">
                        2022 – 2024
                      </p>
                    </div>
                  </summary>

                  <div className="mt-4 ml-6 space-y-5 text-sm text-slate-700 leading-relaxed">
                    <div>
                      <p className="font-semibold text-slate-900">
                        Gym Chain Health Data Analysis{" "}
                        <span className="font-normal text-slate-500">
                          | R, SQL
                        </span>
                      </p>

                      <ul className="mt-2 space-y-1 list-disc pl-5">
                        <li>
                          Analyzed 200,000 member records for a gymnasium
                          company with 150+ branches across Japan.
                        </li>
                        <li>
                          Identified a 3-month weight regain trend in younger
                          members and developed tailored retention strategies.
                        </li>
                        <li>
                          Implemented a notification service to re-engage
                          inactive members, increasing re-engagement rate by
                          30%.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <p className="font-semibold text-slate-900">
                        Software Development Team Productivity Analysis{" "}
                        <span className="font-normal text-slate-500">
                          | SQL, Python, R
                        </span>
                      </p>

                      <ul className="mt-2 space-y-1 list-disc pl-5">
                        <li>
                          Performed Difference-in-Differences analysis on
                          ticketing system data to diagnose productivity
                          bottlenecks.
                        </li>
                        <li>
                          Found resource allocation inefficiencies and
                          recommended more frequent ticket creation and resource
                          optimization.
                        </li>
                      </ul>
                    </div>
                  </div>
                </details>


                <details className="group py-3">
                  <summary className="cursor-pointer list-none">
                    <div className="grid md:grid-cols-12 gap-4 items-start">
                      <div className="md:col-span-8 flex items-start gap-3">
                        <span className="mt-1 text-slate-400 text-xs transition-transform group-open:rotate-90">
                          ▶
                        </span>

                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            SoftBank
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            Technical Project Manager
                          </p>
                        </div>
                      </div>

                      <p className="md:col-span-4 text-xs text-slate-500 md:text-right">
                        2022 – 2024
                      </p>
                    </div>
                  </summary>

                  <div className="mt-4 ml-6 space-y-5 text-sm text-slate-700 leading-relaxed">
                    <div>
                      <p className="font-semibold text-slate-900">
                        Led Application Development{" "}
                        <span className="font-normal text-slate-500">
                          | AWS, Azure, JavaScript, GitLab, SQL, VoltMX
                        </span>
                      </p>

                      <ul className="mt-2 space-y-1 list-disc pl-5">
                        <li>
                          Directed end-to-end development of a multi-platform
                          office management system for teams in Vietnam, China,
                          and Japan.
                        </li>
                        <li>
                          Led UI/UX design, back-end architecture, testing, and
                          cross-platform deployment.
                        </li>
                      </ul>
                    </div>
                  </div>
                </details>
                <details className="group py-3">
                  <summary className="cursor-pointer list-none">
                    <div className="grid md:grid-cols-12 gap-4 items-start">
                      <div className="md:col-span-8 flex items-start gap-3">
                        <span className="mt-1 text-slate-400 text-xs transition-transform group-open:rotate-90">
                          ▶
                        </span>

                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            SoftBank
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            Data Scientist Contractor
                          </p>
                        </div>
                      </div>

                      <p className="md:col-span-4 text-xs text-slate-500 md:text-right">
                        2020 – 2022
                      </p>
                    </div>
                  </summary>

                  <div className="mt-4 ml-6 space-y-5 text-sm text-slate-700 leading-relaxed">
                    <div>
                      <p className="font-semibold text-slate-900">
                        Trade Area / Population Flow Analysis{" "}
                        <span className="font-normal text-slate-500">
                          | Tableau, SQL, Python, R
                        </span>
                      </p>

                      <ul className="mt-2 space-y-1 list-disc pl-5">
                        <li>
                          Led trade area analysis for Izumi Co. with 190+ malls
                          under SoftBank&apos;s Smart City project.
                        </li>
                        <li>
                          Built Tableau dashboards using GPS, demographic, and
                          search data to uncover customer trends.
                        </li>
                        <li>
                          Recommended targeted ads, in-store improvements, and
                          loyalty strategies based on retention and regional
                          growth insights.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <p className="font-semibold text-slate-900">
                        AI Engineer{" "}
                        <span className="font-normal text-slate-500">
                          | Python, SQL
                        </span>
                      </p>

                      <ul className="mt-2 space-y-1 list-disc pl-5">
                        <li>
                          Developed a population inflow prediction model to
                          optimize billboard advertising placement.
                        </li>
                        <li>
                          Improved model performance through data engineering
                          and feature design, achieving an AUC of 0.70.
                        </li>
                      </ul>
                    </div>
                  </div>
                </details>

                {/* ABC Cooking Studio */}
                <details className="group py-3">
                  <summary className="cursor-pointer list-none">
                    <div className="grid md:grid-cols-12 gap-4 items-start">
                      <div className="md:col-span-8 flex items-start gap-3">
                        <span className="mt-1 text-slate-400 text-xs transition-transform group-open:rotate-90">
                          ▶
                        </span>

                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            ABC Cooking Studio
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            Data Scientist Intern
                          </p>
                        </div>
                      </div>

                      <p className="md:col-span-4 text-xs text-slate-500 md:text-right">
                        2020
                      </p>
                    </div>
                  </summary>

                  <div className="mt-4 ml-6 space-y-5 text-sm text-slate-700 leading-relaxed">
                    <div>
                      <p className="font-semibold text-slate-900">
                        EC Site Analysis{" "}
                        <span className="font-normal text-slate-500">
                          | SQL, Python, R, Google Analytics
                        </span>
                      </p>

                      <ul className="mt-2 space-y-1 list-disc pl-5">
                        <li>
                          Analyzed EC site traffic using Google Analytics and
                          modeled sales patterns across product categories.
                        </li>
                        <li>
                          Predicted product sales using a multilevel model with
                          category-specific price elasticity.
                        </li>
                      </ul>
                    </div>
                  </div>
                </details>
              </div>
            </div>

            {/* Education */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">
                Education
              </h3>

              <div className="divide-y divide-slate-100">
                <details className="group py-3">
                  <summary className="cursor-pointer list-none">
                    <div className="grid md:grid-cols-12 gap-4 items-start">
                      <div className="md:col-span-8 flex items-start gap-3">
                        <span className="mt-1 text-slate-400 text-xs transition-transform group-open:rotate-90">
                          ▶
                        </span>

                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            University of Southern California
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            M.S. Applied Data Science
                          </p>
                        </div>
                      </div>

                      <p className="md:col-span-4 text-xs text-slate-500 md:text-right">
                        Expected 2027
                      </p>
                    </div>
                  </summary>

                  <div className="mt-4 ml-6 text-sm text-slate-700 leading-relaxed">
                    <p>
                      Focused on machine learning, trustworthy AI, LLM
                      evaluation, and real-world data science applications.
                    </p>
                  </div>
                </details>

                <details className="group py-3">
                  <summary className="cursor-pointer list-none">
                    <div className="grid md:grid-cols-12 gap-4 items-start">
                      <div className="md:col-span-8 flex items-start gap-3">
                        <span className="mt-1 text-slate-400 text-xs transition-transform group-open:rotate-90">
                          ▶
                        </span>

                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            California Polytechnic State University, San Luis
                            Obispo
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            B.S. Business Administration, Information Systems /
                            Minor in Statistics
                          </p>
                        </div>
                      </div>

                      <p className="md:col-span-4 text-xs text-slate-500 md:text-right">
                        2021
                      </p>
                    </div>
                  </summary>

                  <div className="mt-4 ml-6 space-y-4 text-sm text-slate-700 leading-relaxed">
                    <div>
                      <p className="font-semibold text-slate-900">
                        Data Science & Statistics
                      </p>
                      <p className="mt-1">
                        Statistical learning, regression analysis, multilevel
                        and mixed modeling, categorical data analysis,
                        statistical computing in R, time series, forecasting,
                        and model evaluation.
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">
                        Programming & Systems
                      </p>
                      <p className="mt-1">
                        Python application development, database systems,
                        ERD/UML, advanced SQL, systems analysis, SDLC, UI/UX
                        requirements, project management, and blockchain
                        development.
                      </p>
                    </div>

                  </div>
                </details>
              </div>
            </div>
          </div>
        </section >

        {/* Projects */}
        < section id="work" className="pt-8 pb-12" >
          <div className="flex items-end justify-between border-b border-slate-200 pb-4 mb-6">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              Projects
            </h2>
            <span className="text-xs text-slate-500">
              {/* Selected data science and AI projects */}
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
                app={project.app}
                appLabel={project.appLabel}
              />
            ))}
          </div>
          {showAllProjects && (
            <div className="flex justify-center pt-6">
              <a
                href="https://shuseiyokoi.notion.site/b431a86c98c4465f818de9af253b507e?v=04cea62a17da443786ea6c3f30a424a4"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium tracking-wide text-slate-500 hover:text-slate-900 underline underline-offset-4 transition-colors"
              >
                View more project notes on Notion
              </a>
            </div>
          )}

          {
            projects.length > 4 && (
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
            )
          }
        </section >
      </main >

      <footer className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <p className="text-xs text-slate-400">
            {/* Made by Shusei Yokoi */}
          </p>

          <div className="flex items-center gap-6 text-xs font-medium tracking-wide uppercase text-slate-500">
            <a
              href="mailto:shuseiyokoi@gmail.com"
              className="hover:text-slate-900 transition-colors"
            >
              Email
            </a>

            <SocialLink href="https://github.com/shuseiyokoi" label="GitHub" />

            <SocialLink
              href="https://www.linkedin.com/in/shuseiyokoi"
              label="LinkedIn"
            />

            <SocialLink href="https://medium.com/@shuseiyokoi" label="Medium" />

            <SocialLink
              href="https://x.com/shuseiyokoi"
              label="X"
            />
          </div>
        </div>
      </footer>

      {/* Ask Me Chat Popup */}
      <div className="fixed bottom-20 right-5 z-[100]">
        {isChatOpen && (
          <div className="mb-3 w-[360px] h-[540px] sm:w-[400px] sm:h-[600px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-8rem)] bg-white border border-slate-200 shadow-xl rounded-xl overflow-hidden flex flex-col">
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
                maxLength={1000}
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
    </div >
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
  app,
  appLabel = "APP",
}: {
  title: string;
  description: string;
  tags: string[];
  color?: "slate";
  href: string;
  image?: string;
  github?: string;
  medium?: string;
  app?: string;
  appLabel?: string;
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

      {(app || github || medium) && (
        <div className="flex items-center gap-4 pt-3 border-t border-slate-100">
          {app && (
            <a
              href={app}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-medium tracking-wide text-slate-500 hover:text-slate-900 transition-colors"
              aria-label={`${title} app`}
            >
              <GlobeIcon className="w-4 h-4" />
              {appLabel}
            </a>
          )}
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
      className="text-xs font-medium tracking-wide uppercase text-slate-500 hover:text-slate-900 transition-colors"
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

function GlobeIcon({ className }: { className?: string }) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 0 20" />
      <path d="M12 2a15.3 15.3 0 0 0 0 20" />
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