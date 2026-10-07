"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const skillGroups = [
  "用户研究",
  "竞品分析",
  "PRD",
  "Figma / Axure",
  "Prompt Engineering",
  "模型评测",
  "Python",
  "SQL",
  "Pandas",
  "Tableau",
  "Git",
  "API",
];

type Language = "zh" | "en";

const englishText: Record<string, string> = {
  "用户研究": "User research",
  "竞品分析": "Competitive analysis",
  "Figma / Axure": "Figma / Axure",
  "模型评测": "Model evaluation",
  "数据与开发": "Data & development",
  "产品与 AI": "Product & AI",
  "语言能力": "Languages",
  "英语可作为工作语言": "English as a working language",
  "主导航": "Main navigation",
  "返回首页": "Back to home",
  "实习经历": "Experience",
  "项目经历": "Projects",
  "课程证书": "Certificates",
  "联系我": "Contact",
  "查看实习经历": "View experience",
  "下载个人简历": "Download resume",
  "个人简介": "About me",
  "相关课程": "Relevant coursework",
  "相关技能": "Skills",
  "数字媒体艺术 · 硕士": "Digital Media Arts · M.A.",
  "网络与新媒体 · 本科": "Internet & New Media · B.A.",
  "用户研究、竞品分析、PRD、Figma、Axure、Prompt Engineering、模型评测、Coze、BERT": "User research, competitive analysis, PRDs, Figma, Axure, prompt engineering, model evaluation, Coze, and BERT",
  "Python、Java、SQL、NumPy、Pandas、Tableau、Git、API 与 JSON 数据处理": "Python, Java, SQL, NumPy, Pandas, Tableau, Git, APIs, and JSON data handling",
  "均分 89，专业前 5%，推免华东师范大学。建立新闻传播、内容研究、用户洞察与数字产品基础。": "Average score 89/100, top 5% of the cohort, and admitted to East China Normal University. Built a foundation in communication, content research, user insight, and digital products.",
  "传播学院。关注数字媒体、智能产品、用户体验与内容传播，探索 AI 技术在信息获取和数字产品中的应用。": "School of Communication. Focused on digital media, intelligent products, user experience, and how AI can improve information discovery and digital products.",
  "传播研究让我理解人和信息，数据与技术让我把判断变成可以验证的产品。": "Communication research taught me how people and information connect; data and technology help me turn judgment into products we can validate.",
  "上海 · AI 产品经理 / AI 产品运营": "Shanghai · AI Product Manager / AI Product Operations",
  "我关注 AI 搜索、智能工具与大模型产品体验，具备从用户研究、需求定义，到数据评测、代码协作和上线迭代的完整实践经验。": "I focus on AI search, intelligent tools, and LLM product experiences, with end-to-end practice across user research, product definition, evaluation, engineering collaboration, and iteration.",
  "只保留两段最能说明产品能力与业务判断的经历。": "Two experiences that best show my product judgment and business sense.",
  "工作简介": "Overview",
  "查看具体工作内容": "View detailed work",
  "工作能力": "Capabilities",
  "AI 搜索": "AI search",
  "产品 0→1": "0→1 product",
  "模型评测": "Model evaluation",
  "产品工程化": "Product engineering",
  "数据分析": "Data analysis",
  "增长实验": "Growth experiments",
  "策略运营": "Operations strategy",
  "跨团队协作": "Cross-functional collaboration",
  "用数字说话": "By the numbers",
  "上一项": "Previous item",
  "下一项": "Next item",
  "一个从真实问题出发、最终形成可使用 AI 原型的个人项目。": "A personal project that turns a real problem into a usable AI prototype.",
  "正在查看": "Viewing",
  "查看更多": "View more",
  "我的工作": "My work",
  "产品界面": "Product interface",
  "选择项目截图": "Choose project screenshot",
  "上一张项目截图": "Previous project screenshot",
  "下一张项目截图": "Next project screenshot",
  "查看截图：": "View screenshot: ",
  "课程证书": "Certificates",
  "持续补足计算机、数据分析与 AI 产品所需的技术基础。": "Continuously building the technical foundation for computer science, data analysis, and AI products.",
  "数据处理、清洗、探索性分析与可视化。": "Data processing, cleaning, exploratory analysis, and visualization.",
  "SQL 查询、数据聚合、业务分析与数据驱动决策。": "SQL queries, data aggregation, business analysis, and data-driven decisions.",
  "查看证书 ↗": "View certificate ↗",
  "查看 ": "View ",
  "返回顶部 ↑": "Back to top ↑",
  "上海": "Shanghai",
  "西安": "Xi'an",
  "华东师范大学": "East China Normal University",
  "西北大学": "Northwestern Polytechnical University",
  "月之暗面 · Kimi": "Moonshot AI · Kimi",
  "北京快手科技有限公司": "Kuaishou Technology",
};

const translate = (language: Language, text: string) => language === "en" ? (englishText[text] ?? text) : text;

const experienceEvidence = [
  { value: "0 → 1", label: "Shopping Tool", copy: "从用户问题、产品设计到评测与上线迭代", enLabel: "Shopping Tool", enCopy: "From user problem to product design, evaluation, launch, and iteration" },
  { value: "10W+", label: "搜索质量语料", copy: "建立问题归因、样本构建与模型验证闭环", enLabel: "Search-quality corpus", enCopy: "Built a loop for root-cause analysis, sample construction, and model validation" },
  { value: "100+", label: "产品问题", copy: "持续推进搜索结果、商品卡片与比价体验优化", enLabel: "Product issues", enCopy: "Continuously improved search results, product cards, and comparison UX" },
  { value: "+60%", label: "快手实验结果", copy: "通过 A/B 实验验证直播切片的 GMV 提升", enLabel: "Kuaishou experiment", enCopy: "Validated a GMV lift from live-stream clips through A/B testing" },
];

type ProjectScreenshot = {
  src: string;
  alt: string;
  caption: string;
};

type Project = {
  short: string;
  name: string;
  subtitle: string;
  summary: string;
  work: string[];
  tags: string[];
  link: string;
  linkLabel: string;
  metric: string;
  screenshots?: ProjectScreenshot[];
};

const englishProjectCopy: Record<string, Partial<Project>> = {
  "港美股 AI 投资学习工作台": {
    name: "US & HK Stock AI Investment Learning Workstation",
    subtitle: "A local-first, read-only AI workstation for US and Hong Kong equities",
    summary:
      "For first-time investors learning while investing, the workstation connects read-only IBKR holdings, market intelligence, deterministic risk rules, an AI coach, and periodic reviews into one loop—from watching P&L to building independent judgment.",
    work: [
      "Defined the problem, PRD, feature priorities, and second-generation product direction on top of the MIT open-source IBKR Dashboard",
      "Designed market-separated pre-market and post-market reports, DeepSeek web search, source grading, and graceful degradation",
      "Used deterministic code for P&L and risk thresholds, while applying privacy layers to define the LLM's data and decision boundaries",
      "Added decision logs, weekly/monthly reviews, concept active recall, and scheduled reruns; passed 81 automated tests",
    ],
    linkLabel: "View GitHub project",
    screenshots: [
      { src: "/projects/ai-investment-learning-workstation/portfolio-overview.png", alt: "Portfolio holdings table and allocation view", caption: "Portfolio: holdings, thresholds, and allocation" },
      { src: "/projects/ai-investment-learning-workstation/daily-reports.png", alt: "Daily morning and closing reports", caption: "Daily morning and closing reports for US and HK equities" },
      { src: "/projects/ai-investment-learning-workstation/concept-library.png", alt: "Personal investment concept library", caption: "Concept library: explanations and learning frequency" },
      { src: "/projects/ai-investment-learning-workstation/holding-analysis.png", alt: "Single-holding analysis and plain-language explanation", caption: "Single-holding analysis: news summary and plain-language explanation" },
      { src: "/projects/ai-investment-learning-workstation/ai-coach.png", alt: "Price trend and AI investment coach", caption: "Price trends and preset questions for the AI coach" },
      { src: "/projects/ai-investment-learning-workstation/allocation-analysis.png", alt: "Sector and asset-type analysis", caption: "Sector and asset-type allocation" },
      { src: "/projects/ai-investment-learning-workstation/market-valuation.png", alt: "US market valuation indicators", caption: "US market valuation indicators and long-term trend" },
      { src: "/projects/ai-investment-learning-workstation/evaluation-results.png", alt: "Evaluation results across market intelligence quality metrics", caption: "Evaluation results: quality metrics, thresholds, and pass rates" },
    ],
  },
};

const projects: Project[] = [
  {
    short: "AI INVEST WORKSTATION",
    name: "港美股 AI 投资学习工作台",
    subtitle: "本地优先、只读型的港美股 AI 投资学习工作台",
    summary:
      "面向“边投资、边学习”的港美股新手，把 IBKR 只读持仓、相关市场情报、确定性风险规则、AI 教练和周期复盘串成一个闭环，帮助用户从看盈亏走向形成自己的判断。",
    work: [
      "基于 MIT 开源 IBKR Dashboard 完成问题定义、PRD、功能优先级和个人二次开发",
      "设计港美股隔离的盘前/盘后报告、DeepSeek 联网检索、来源分级与异常降级",
      "用确定性代码计算盈亏和风险阈值，并以隐私分层限制 LLM 的数据与决策边界",
      "新增决策日志、周报/月报、概念主动回忆和定时补跑，81 项自动化测试通过",
    ],
    tags: ["AI Product Strategy", "LLM + Search", "Human-in-the-loop", "Privacy by Design", "Python / Dash"],
    link: "https://github.com/HYP190524/ai-investment-learning-workstation",
    linkLabel: "查看 GitHub 项目",
    metric: "81",
    screenshots: [
      {
        src: "/projects/ai-investment-learning-workstation/portfolio-overview.png",
        alt: "港美股 AI 投资学习工作台的投资组合持仓表与仓位分布界面",
        caption: "投资组合：持仓、仓位阈值与分布",
      },
      {
        src: "/projects/ai-investment-learning-workstation/daily-reports.png",
        alt: "港美股 AI 投资学习工作台的每日晨报与收盘总结界面",
        caption: "每日晨报与收盘总结：港美股独立报告",
      },
      {
        src: "/projects/ai-investment-learning-workstation/concept-library.png",
        alt: "港美股 AI 投资学习工作台的个人投资概念库界面",
        caption: "我的概念库：记录概念、解释与学习频次",
      },
      {
        src: "/projects/ai-investment-learning-workstation/holding-analysis.png",
        alt: "港美股 AI 投资学习工作台的单只持仓分析与小白解释界面",
        caption: "单只持仓分析：新闻摘要与小白解释",
      },
      {
        src: "/projects/ai-investment-learning-workstation/ai-coach.png",
        alt: "港美股 AI 投资学习工作台的价格走势与投资教练界面",
        caption: "价格走势与投资教练的预设问答",
      },
      {
        src: "/projects/ai-investment-learning-workstation/allocation-analysis.png",
        alt: "港美股 AI 投资学习工作台的板块与资产类型分析界面",
        caption: "板块与资产类型分布",
      },
      {
        src: "/projects/ai-investment-learning-workstation/market-valuation.png",
        alt: "港美股 AI 投资学习工作台的美国市场估值指标界面",
        caption: "美国市场估值指标与长期趋势",
      },
      {
        src: "/projects/ai-investment-learning-workstation/evaluation-results.png",
        alt: "港美股 AI 投资学习工作台的评测结果指标面板",
        caption: "评测结果：质量指标、阈值与通过率",
      },
    ],
  },
];

const certificates = [
  { title: "Ethics of AI", image: "/certificates/cert-ethics-ai.png", type: "AI 与数字技术" },
  { title: "Programming in Java", image: "/certificates/cert-java-study.png", type: "计算机与数据" },
  { title: "Operating Systems", image: "/certificates/cert-os-study.png", type: "计算机与数据" },
  { title: "Advanced Programming", image: "/certificates/cert-advanced-programming.png", type: "计算机与数据" },
  { title: "Data Analysis with Python", image: "/certificates/cert-data-analysis.png", type: "数据分析" },
  { title: "Introduction to Programming", image: "/certificates/cert-intro-programming.png", type: "计算机基础" },
];

export default function Portfolio() {
  const root = useRef<HTMLElement>(null);
  const [language, setLanguage] = useState<Language>("zh");
  const [activeProject, setActiveProject] = useState(0);
  const [projectScreenshot, setProjectScreenshot] = useState(0);
  const [evidenceIndex, setEvidenceIndex] = useState(0);

  useEffect(() => {
    document.documentElement.lang = language === "en" ? "en" : "zh-CN";
  }, [language]);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        gsap.set([".floating-nav", ".hero-kicker", ".hero-title span", ".hero-copy", ".hero-actions", ".hero-portrait"], {
          clearProps: "all",
        });
        return;
      }

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from(".floating-nav", { y: -24, opacity: 0, duration: 0.65 })
        .from(".hero-kicker", { y: 20, opacity: 0, duration: 0.5 }, "-=0.2")
        .from(".hero-title span", { yPercent: 105, duration: 0.85, stagger: 0.08 }, "-=0.2")
        .from([".hero-copy", ".hero-actions"], { y: 24, opacity: 0, duration: 0.6, stagger: 0.08 }, "-=0.35")
        .from(".hero-portrait", { y: 36, scale: 0.9, rotate: 4, opacity: 0, duration: 0.8 }, "-=0.7");

      ScrollTrigger.batch(".reveal-block", {
        start: "top 86%",
        once: true,
        onEnter: (elements) => {
          gsap.from(elements, {
            y: 46,
            opacity: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
          });
        },
      });

      gsap.utils.toArray<HTMLElement>(".experience-card").forEach((card) => {
        gsap.from(card, {
          y: 90,
          scale: 0.94,
          opacity: 0.35,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            end: "top 46%",
            scrub: 0.7,
          },
        });
      });

      const media = gsap.matchMedia();
      media.add("(min-width: 1081px)", () => {
        ScrollTrigger.create({
          trigger: ".experience-layout",
          start: "top 108px",
          end: "bottom bottom",
          pin: ".experience-sticky",
          pinSpacing: false,
        });
      });

      return () => media.revert();
    },
    { scope: root },
  );

  const moveEvidence = (direction: number) => {
    setEvidenceIndex((current) => (current + direction + experienceEvidence.length) % experienceEvidence.length);
  };

  return (
    <main ref={root} className={"site-main " + (language === "en" ? "is-english" : "")}>
      <header className="floating-nav" aria-label={translate(language, "主导航")}>
        <a className="nav-mark" href="#top" aria-label={translate(language, "返回首页")}>YP</a>
        <nav>
          <a href="#profile">{translate(language, "个人简介")}</a>
          <a href="#experience">{translate(language, "实习经历")}</a>
          <a href="#projects">{translate(language, "项目经历")}</a>
          <a href="#certificates">{translate(language, "课程证书")}</a>
        </nav>
        <button
          className="language-toggle"
          type="button"
          onClick={() => setLanguage((current) => current === "zh" ? "en" : "zh")}
          aria-label={language === "zh" ? "Switch to English" : "切换为中文"}
        >
          {language === "zh" ? "EN" : "中文"}
        </button>
        <details className="contact-menu">
          <summary>{translate(language, "联系我")}</summary>
          <div className="contact-popover">
            <p>keep in touch</p>
            <a href="mailto:hyp190524@163.com">
              <span>{language === "en" ? "Email" : "邮箱"}</span>
              <strong>hyp190524@163.com</strong>
            </a>
            <a href="tel:18357132117">
              <span>{language === "en" ? "Phone" : "电话"}</span>
              <strong>18357132117</strong>
            </a>
          </div>
        </details>
      </header>

      <section className="hero section-shell" id="top">
        <div className="hero-main">
          <p className="hero-kicker">{language === "en" ? "YIPING HUANG · AI PRODUCT MANAGER" : "黄奕平 · AI PRODUCT MANAGER"}</p>
          <h1 className="hero-title">
            <span>{language === "en" ? "Turning ambiguous AI problems" : "把模糊的 AI 问题，"}</span>
            <span className="hero-accent">{language === "en" ? "into products that ship." : "变成真正上线的产品。"}</span>
          </h1>
          <div className="hero-bottom">
            <p className="hero-copy">
              {language === "en" ? "I focus on AI search, intelligent tools, and LLM product experiences, with end-to-end practice across user research, product definition, evaluation, engineering collaboration, and iteration." : "我关注 AI 搜索、智能工具与大模型产品体验，具备从用户研究、需求定义，到数据评测、代码协作和上线迭代的完整实践经验。"}
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#experience">{translate(language, "查看实习经历")}</a>
              <a className="button button-secondary" href="/yiping-huang-resume-2025.pdf" download>{translate(language, "下载个人简历")}</a>
            </div>
          </div>
        </div>
        <figure className="hero-portrait">
          <div className="portrait-frame">
            <img src="/profile.png" alt="黄奕平的肖像" />
          </div>
          <figcaption>{translate(language, "上海 · AI 产品经理 / AI 产品运营")}</figcaption>
        </figure>
      </section>

      <section className="profile chapter section-shell" id="profile" aria-labelledby="profile-title">
        <div className="chapter-heading reveal-block">
          <p className="eyebrow">PROFILE</p>
          <h2 id="profile-title">{translate(language, "个人简介")}</h2>
          <p>{translate(language, "传播研究让我理解人和信息，数据与技术让我把判断变成可以验证的产品。")}</p>
        </div>

        <div className="profile-bento">
          <article className="profile-card edu-card edu-master reveal-block">
            <p className="card-kicker">2025.09 — 2028.07 · {translate(language, "上海")}</p>
            <div>
              <h3>{translate(language, "华东师范大学")}</h3>
              <p className="card-lead">{translate(language, "数字媒体艺术 · 硕士")}</p>
              <p>{translate(language, "传播学院。关注数字媒体、智能产品、用户体验与内容传播，探索 AI 技术在信息获取和数字产品中的应用。")}</p>
            </div>
          </article>

          <article className="profile-card edu-card edu-bachelor reveal-block">
            <p className="card-kicker">2021.09 — 2025.07 · {translate(language, "西安")}</p>
            <div>
              <h3>{translate(language, "西北大学")}</h3>
              <p className="card-lead">{translate(language, "网络与新媒体 · 本科")}</p>
              <p>{translate(language, "均分 89，专业前 5%，推免华东师范大学。建立新闻传播、内容研究、用户洞察与数字产品基础。")}</p>
            </div>
          </article>

          <article className="profile-card courses-card reveal-block">
            <p className="card-kicker">{translate(language, "相关课程")}</p>
            <ul>
              <li>AI Ethics</li>
              <li>Java / Advanced Programming</li>
              <li>Operating Systems</li>
              <li>Data Analysis with Python</li>
            </ul>
          </article>

          <article className="profile-card ability-card reveal-block">
            <p className="card-kicker">{translate(language, "相关技能")}</p>
            <div className="ability-columns">
              <div>
                <h3>{translate(language, "产品与 AI")}</h3>
                <p>{translate(language, "用户研究、竞品分析、PRD、Figma、Axure、Prompt Engineering、模型评测、Coze、BERT")}</p>
              </div>
              <div>
                <h3>{translate(language, "数据与开发")}</h3>
                <p>{translate(language, "Python、Java、SQL、NumPy、Pandas、Tableau、Git、API 与 JSON 数据处理")}</p>
              </div>
            </div>
          </article>

          <article className="profile-card language-card reveal-block">
            <p className="card-kicker">{translate(language, "语言能力")}</p>
            <p className="language-score">TOEFL 104</p>
            <p>CET-6 600+ · GRE 324</p>
            <p>{translate(language, "英语可作为工作语言")}</p>
          </article>
        </div>

        <div className="skills-marquee" aria-label="能力关键词">
          <div className="marquee-track">
            {[...skillGroups, ...skillGroups].map((skill, index) => (
              <span key={skill + "-" + index}>{skill}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="experience chapter" id="experience" aria-labelledby="experience-title">
        <div className="experience-layout section-shell">
          <aside className="experience-sticky">
            <p className="eyebrow">EXPERIENCE</p>
            <h2 id="experience-title">{translate(language, "实习经历")}</h2>
            <p>{translate(language, "只保留两段最能说明产品能力与业务判断的经历。")}</p>
          </aside>

          <div className="experience-stack">
            <article className="experience-card moonshot-card">
              <header>
                <div>
                  <p className="card-kicker">2025.10 — 2026.01</p>
                  <h3>{translate(language, "月之暗面 · Kimi")}</h3>
                </div>
              <p className="experience-role">{language === "en" ? "Search Product Operations / AI Search Product" : "搜索产品运营 / AI 搜索产品"}</p>
              </header>
              <p className="experience-label">{translate(language, "工作简介")}</p>
              <p className="experience-intro">
                {language === "en" ? "Worked deeply on Kimi search and LLM companion tools, owning Shopping Tool end to end—from discovery and solution design to demo development, evaluation, launch, and iteration." : "深度参与 Kimi 搜索产品和大模型配套工具建设，实际承担 Shopping Tool 从需求研究、方案设计、Demo 开发，到评测、上线和持续迭代的完整产品经理工作。"}
              </p>
              <div className="experience-metrics">
                <div><strong>0→1</strong><span>{language === "en" ? "AI shopping search product" : "AI 购物搜索产品"}</span></div>
                <div><strong>10万+</strong><span>{language === "en" ? "Raw search-quality corpus" : "搜索质量原始语料"}</span></div>
                <div><strong>100+</strong><span>{language === "en" ? "Product issues closed" : "产品问题闭环"}</span></div>
              </div>
              <details className="experience-details">
                <summary>
                  <span>{translate(language, "查看具体工作内容")}</span>
                  <span className="summary-toggle" aria-hidden="true" />
                </summary>
                <div className="details-body">
                  <section>
                  <h4>Shopping Tool 0→1</h4>
                  <ul>
                      <li>{language === "en" ? "Researched Perplexity, Doubao, MetaSo and other AI shopping products, building a competitive framework across search entry points, product cards, comparison flows, and monetization." : "调研 Perplexity、豆包、秘塔等 AI 购物产品，从搜索入口、商品卡片、比价方式和商业链路等维度建立竞品分析框架。"}</li>
                      <li>{language === "en" ? "Synthesized core issues from user feedback and real bad cases, including inaccurate retrieval, sparse results, failed comparisons, and stale information." : "从用户反馈和真实 Badcase 中总结检索不准、商品过少、比价失效、信息时效性不足等核心问题。"}</li>
                      <li>{language === "en" ? "Owned product architecture, interaction patterns, fallback handling, and result-ranking design." : "独立完成产品架构、交互方式、异常兜底和结果排序方案设计。"}</li>
                      <li>{language === "en" ? "Built an evaluation system across shopping scenarios, turning subjective experience into measurable, regression-ready quality metrics." : "建立覆盖不同购物场景的产品评测体系，将主观体验转化为可量化、可回归的质量指标。"}</li>
                      <li>{language === "en" ? "Contributed to demo and business-code development, turning keyword cleaning, query expansion, product aggregation, and comparison strategies into working features." : "参与产品 Demo 和业务代码开发，将关键词清洗、查询泛化、商品聚合和比价策略落实为可运行功能。"}</li>
                      <li>{language === "en" ? "Managed 100+ product issues and continuously improved search results, product cards, and comparison UX." : "汇总并管理 100+ 产品问题，持续推进搜索结果、商品卡片和比价体验优化。"}</li>
                  </ul>
                  </section>
                  <section>
                    <h4>{language === "en" ? "Search quality and evaluation" : "搜索质量与评测体系"}</h4>
                  <ul>
                      <li>{language === "en" ? "Built a bad-case loop covering user-question collection, root-cause analysis, training-sample construction, and model validation." : "建立用户问题采集、问题归因、训练样本构建和模型验证的 Badcase 闭环。"}</li>
                      <li>{language === "en" ? "Filtered and organized high-value search samples from a 100K+ raw corpus." : "从 10万+ 原始语料中筛选和整理高价值搜索样本。"}</li>
                      <li>{language === "en" ? "Designed A/B experiments to measure the effect of prompts and few-shot examples on search quality." : "设计 A/B 对照实验，评估 Prompt 和 Few-shot 对搜索效果的影响。"}</li>
                      <li>{language === "en" ? "Contributed to site-trust grading, source-quality standards, and professional-content retrieval." : "参与站点可信度分级、搜索来源质量和专业内容检索方案建设。"}</li>
                  </ul>
                  </section>
                  <div className="experience-capability">
                    <p>{translate(language, "工作能力")}</p>
                    <strong>{language === "en" ? "AI product design, search products, model evaluation, product engineering, and cross-functional collaboration." : "AI 产品设计、搜索产品、模型评测、产品工程化、跨团队协作。"}</strong>
                  </div>
                </div>
              </details>
              <div className="experience-tags">
                <span>{translate(language, "AI 搜索")}</span><span>{translate(language, "产品 0→1")}</span><span>{translate(language, "模型评测")}</span><span>{translate(language, "产品工程化")}</span>
              </div>
            </article>

            <article className="experience-card kuaishou-card">
              <header>
                <div>
                  <p className="card-kicker">2024.07 — 2024.11 · 杭州</p>
                  <h3>{translate(language, "北京快手科技有限公司")}</h3>
                </div>
                <p className="experience-role">{language === "en" ? "Product Operations Intern" : "产品运营实习生"}</p>
              </header>
              <p className="experience-label">{translate(language, "工作简介")}</p>
              <p className="experience-intro">
                {language === "en" ? "Analyzed beauty-merchant operations data, assortment strategy, creator matching, and campaign operations, using dashboards and experiments to support platform GMV growth." : "负责美妆行业商家经营数据分析、选品策略、达人匹配与大促运营，通过数据看板和业务实验支持平台 GMV 增长。"}
              </p>
              <div className="experience-metrics experience-metrics-four">
                <div><strong>6万+</strong><span>{language === "en" ? "Merchant records" : "商家经营数据"}</span></div>
                <div><strong>+60%</strong><span>{language === "en" ? "A/B test GMV" : "A/B 实验 GMV"}</span></div>
                <div><strong>120%</strong><span>{language === "en" ? "818 GMV target" : "818 GMV 完成度"}</span></div>
                <div><strong>25%</strong><span>{language === "en" ? "Partner conversion lift" : "合作达成率提升"}</span></div>
              </div>
              <details className="experience-details">
                <summary>
                  <span>{translate(language, "查看具体工作内容")}</span>
                  <span className="summary-toggle" aria-hidden="true" />
                </summary>
                <div className="details-body">
                  <section>
                    <h4>{language === "en" ? "Core work and outcomes" : "核心工作与成果"}</h4>
                    <ul>
                      <li>{language === "en" ? "Monitored and analyzed 60K+ merchant records, built SQL dashboards, and delivered weekly and daily reports." : "负责 6万+ 商家经营数据的监测与分析，使用 SQL 搭建数据看板并输出周报、日报。"}</li>
                      <li>{language === "en" ? "Led a live-stream clip A/B experiment and validated a 60% GMV lift in short-video-assisted conversion." : "主导直播切片 A/B 实验，验证短视频对直播转化的提升效果，相关 GMV 提升 60%。"}</li>
                      <li>{language === "en" ? "Identified growth opportunities through GMV and live-start metrics; 818 GMV attainment reached 120%." : "大促期间通过 GMV、开播率等指标识别增长机会，818 GMV 完成度达到 120%。"}</li>
                      <li>{language === "en" ? "Matched 500+ SKUs with 70+ creators using audience profiles and historical sales data, lifting partner conversion by 25%." : "基于达人粉丝画像和历史销售数据，完成 500+ SKU 与70+ 达人的匹配，合作达成率提升 25%。"}</li>
                      <li>{language === "en" ? "Helped deliver the 2024 Beauty Assortment Fair, connecting 200+ brands, MCNs, and leading creators." : "协助落地“2024美妆选品会”，推动 200+ 品牌、MCN 与头部达人建立合作。"}</li>
                    </ul>
                  </section>
                  <div className="experience-capability">
                    <p>{translate(language, "工作能力")}</p>
                    <strong>{language === "en" ? "Data analysis, growth experiments, operations strategy, supply-demand matching, and cross-functional collaboration." : "数据分析、增长实验、策略运营、供需匹配、跨团队协作。"}</strong>
                  </div>
                </div>
              </details>
              <div className="experience-tags">
                <span>{translate(language, "数据分析")}</span><span>{translate(language, "增长实验")}</span><span>{translate(language, "策略运营")}</span><span>{translate(language, "跨团队协作")}</span>
              </div>
            </article>
          </div>
        </div>

        <div className="evidence-carousel section-shell">
          <div className="evidence-controls">
            <p>{translate(language, "用数字说话")}</p>
            <div>
              <button type="button" onClick={() => moveEvidence(-1)} aria-label={translate(language, "上一项")}>←</button>
              <button type="button" onClick={() => moveEvidence(1)} aria-label={translate(language, "下一项")}>→</button>
            </div>
          </div>
          <article className="evidence-slide" aria-live="polite">
            <p className="evidence-value">{experienceEvidence[evidenceIndex].value}</p>
            <div>
              <h3>{language === "en" ? experienceEvidence[evidenceIndex].enLabel : experienceEvidence[evidenceIndex].label}</h3>
              <p>{language === "en" ? experienceEvidence[evidenceIndex].enCopy : experienceEvidence[evidenceIndex].copy}</p>
            </div>
            <p className="evidence-count">{String(evidenceIndex + 1).padStart(2, "0")} / {String(experienceEvidence.length).padStart(2, "0")}</p>
          </article>
        </div>
      </section>

      <section className="projects chapter" id="projects" aria-labelledby="projects-title">
        <div className="projects-heading section-shell reveal-block">
          <p className="eyebrow">PROJECTS</p>
          <h2 id="projects-title">项目经历</h2>
          <p>{translate(language, "一个从真实问题出发、最终形成可使用 AI 原型的个人项目。")}</p>
        </div>

        <div className="project-accordion section-shell" role="list">
          {projects.map((project, index) => {
            const isActive = activeProject === index;
            const displayProject = language === "en" ? { ...project, ...englishProjectCopy[project.name] } : project;
            return (
              <article className={"project-panel " + (isActive ? "is-active" : "")} key={project.name} role="listitem">
                <button
                  type="button"
                  onClick={() => {
                    setActiveProject(index);
                    setProjectScreenshot(0);
                  }}
                  aria-expanded={isActive}
                >
                  <span className="project-short">{displayProject.short}</span>
                  <span className="project-more">{isActive ? translate(language, "正在查看") : translate(language, "查看更多")}</span>
                  <span className="project-toggle" aria-hidden="true">{isActive ? "—" : "+"}</span>
                </button>
                <div className="project-content" aria-hidden={!isActive}>
                  <div className="project-topline">
                    <p>{displayProject.subtitle}</p>
                    <p className="project-metric">{displayProject.metric}</p>
                  </div>
                  <h3>{displayProject.name}</h3>
                  <p className="project-summary">{displayProject.summary}</p>
                  <div className="project-work">
                    <h4>{translate(language, "我的工作")}</h4>
                    <ul>
                      {displayProject.work.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                  <div className="project-tags">
                    {displayProject.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                  {displayProject.screenshots && (
                    <section className="project-screenshots" aria-label={displayProject.name + (language === "en" ? " screenshots" : "界面截图")}>
                      <header>
                        <div>
                          <p>{translate(language, "产品界面")}</p>
                          <span>{String(projectScreenshot + 1).padStart(2, "0")} / {String(displayProject.screenshots.length).padStart(2, "0")}</span>
                        </div>
                        <div className="project-screenshot-arrows">
                          <button
                            type="button"
                            onClick={() => setProjectScreenshot((current) => (current - 1 + displayProject.screenshots!.length) % displayProject.screenshots!.length)}
                            aria-label={translate(language, "上一张项目截图")}
                            tabIndex={isActive ? 0 : -1}
                          >
                            ←
                          </button>
                          <button
                            type="button"
                            onClick={() => setProjectScreenshot((current) => (current + 1) % displayProject.screenshots!.length)}
                            aria-label={translate(language, "下一张项目截图")}
                            tabIndex={isActive ? 0 : -1}
                          >
                            →
                          </button>
                        </div>
                      </header>
                      <figure className="project-screenshot-frame" aria-live="polite">
                        <img
                          src={displayProject.screenshots[projectScreenshot].src}
                          alt={displayProject.screenshots[projectScreenshot].alt}
                          loading="lazy"
                        />
                        <figcaption>{displayProject.screenshots[projectScreenshot].caption}</figcaption>
                      </figure>
                      <div className="project-screenshot-pages" aria-label={translate(language, "选择项目截图")}>
                        {displayProject.screenshots.map((screenshot, screenshotIndex) => (
                          <button
                            type="button"
                            className={projectScreenshot === screenshotIndex ? "is-current" : ""}
                            onClick={() => setProjectScreenshot(screenshotIndex)}
                            aria-label={translate(language, "查看截图：") + screenshot.caption}
                            aria-pressed={projectScreenshot === screenshotIndex}
                            tabIndex={isActive ? 0 : -1}
                            key={screenshot.src}
                          >
                            {String(screenshotIndex + 1).padStart(2, "0")}
                          </button>
                        ))}
                      </div>
                    </section>
                  )}
                  <a
                    className="project-link"
                    href={displayProject.link}
                    target="_blank"
                    rel="noreferrer"
                    tabIndex={isActive ? 0 : -1}
                  >
                    {displayProject.linkLabel} <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="certificates chapter section-shell" id="certificates" aria-labelledby="certificates-title">
        <div className="chapter-heading reveal-block">
          <p className="eyebrow">CERTIFICATES</p>
          <h2 id="certificates-title">{translate(language, "课程证书")}</h2>
          <p>{translate(language, "持续补足计算机、数据分析与 AI 产品所需的技术基础。")}</p>
        </div>

        <div className="credential-row">
          <article className="credential-card reveal-block">
            <p className="card-kicker">DATACAMP</p>
            <h3>Data Analyst<br />in Python</h3>
            <p>{translate(language, "数据处理、清洗、探索性分析与可视化。")}</p>
          </article>
          <article className="credential-card credential-blue reveal-block">
            <p className="card-kicker">DATACAMP</p>
            <h3>Associate Data<br />Analyst in SQL</h3>
            <p>{translate(language, "SQL 查询、数据聚合、业务分析与数据驱动决策。")}</p>
          </article>
        </div>

        <div className="certificate-gallery">
          {certificates.map((certificate) => (
            <a
              className="certificate-card reveal-block"
              href={certificate.image}
              target="_blank"
              rel="noreferrer"
              key={certificate.title}
              aria-label={(language === "en" ? "View " : "查看 ") + certificate.title + (language === "en" ? " certificate" : " 证书")}
            >
              <div className="certificate-image">
                <img src={certificate.image} alt={certificate.title + " 课程证书"} loading="lazy" />
              </div>
              <div>
                <p>{language === "en" ? "Course certificate" : certificate.type}</p>
                <h3>{certificate.title}</h3>
                <span>{translate(language, "查看证书 ↗")}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <footer className="footer" id="contact">
        <div className="section-shell">
          <p className="eyebrow">COME SAY HI</p>
          <h2>
            <span>Let&apos;s talk AI—</span>
            <span>or anything, really.</span>
          </h2>
          <a className="footer-mail" href="mailto:hyp190524@163.com">hyp190524@163.com</a>
          <div className="footer-bottom">
          <p>{language === "en" ? "Yiping Huang · AI Product Manager" : "黄奕平 · AI Product Manager"}</p>
            <nav aria-label="页脚链接">
              <a href="https://github.com/HYP190524" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://huggingface.co/JulieH0524" target="_blank" rel="noreferrer">Hugging Face</a>
              <a href="/yiping-huang-resume-2025.pdf" download>Resume</a>
            </nav>
            <a href="#top">{translate(language, "返回顶部 ↑")}</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
