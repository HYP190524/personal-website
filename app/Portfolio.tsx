"use client";

import { useRef, useState } from "react";
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

const experienceEvidence = [
  { value: "0 → 1", label: "Shopping Tool", copy: "从用户问题、产品设计到评测与上线迭代" },
  { value: "10W+", label: "搜索质量语料", copy: "建立问题归因、样本构建与模型验证闭环" },
  { value: "100+", label: "产品问题", copy: "持续推进搜索结果、商品卡片与比价体验优化" },
  { value: "+60%", label: "快手实验结果", copy: "通过 A/B 实验验证直播切片的 GMV 提升" },
];

const projects = [
  {
    short: "30-MIN MEAL",
    name: "30分钟吃上饭",
    subtitle: "Coze Workflow 驱动的 AI 食谱推荐微信小程序",
    summary:
      "面向工作日下班后“不知道吃什么、做饭时间有限”的用户，以“总耗时不超过30分钟”为硬约束，生成结构化食谱与烹饪步骤。",
    work: [
      "完成用户痛点分析、需求定义、PRD 与 Figma 交互原型",
      "设计 Coze Workflow、Prompt Engineering 与 JSON Schema 双重约束",
      "使用 Cursor 辅助完成小程序前端、API 鉴权和数据解析",
      "以“食谱详情点击率”为首阶段核心指标，规划社区与积分机制",
    ],
    tags: ["AI Product", "Coze", "WeChat Mini Program", "Figma", "Cursor"],
    link: "https://www.notion.so/30-PRD-281332f9082c800489c0c90d2768af05?source=copy_link",
    linkLabel: "查看产品 PRD",
    metric: "MVP",
  },
  {
    short: "FEMIMATCH",
    name: "Femimatch",
    subtitle: "基于 BERT 的性别议题语义分类与知识推荐系统",
    summary:
      "针对性别议题内容碎片化、理论理解门槛较高的问题，训练文本分类模型，并把分类结果连接到代表人物与阅读材料推荐。",
    work: [
      "搜集并清洗 1200 条文本语料，建立可训练的分类数据集",
      "在 Google Colab 完成 BERT 模型训练和参数调整",
      "将文本分类准确率提升至 86%",
      "通过 Hugging Face 与 Gradio 实现可交互的端到端 AI 原型",
    ],
    tags: ["BERT", "NLP", "Python", "Hugging Face", "Gradio"],
    link: "https://huggingface.co/spaces/JulieH0524/FemiMatch",
    linkLabel: "体验在线 Demo",
    metric: "86%",
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
  const [activeProject, setActiveProject] = useState(0);
  const [evidenceIndex, setEvidenceIndex] = useState(0);

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
    <main ref={root} className="site-main">
      <header className="floating-nav" aria-label="主导航">
        <a className="nav-mark" href="#top" aria-label="返回首页">YP</a>
        <nav>
          <a href="#profile">个人简介</a>
          <a href="#experience">实习经历</a>
          <a href="#projects">项目经历</a>
          <a href="#certificates">课程证书</a>
        </nav>
        <details className="contact-menu">
          <summary>联系我</summary>
          <div className="contact-popover">
            <p>保持联系</p>
            <a href="mailto:hyp190524@163.com">
              <span>邮箱</span>
              <strong>hyp190524@163.com</strong>
            </a>
            <a href="tel:18357132117">
              <span>电话</span>
              <strong>18357132117</strong>
            </a>
          </div>
        </details>
      </header>

      <section className="hero section-shell" id="top">
        <div className="hero-main">
          <p className="hero-kicker">黄奕平 · AI PRODUCT MANAGER</p>
          <h1 className="hero-title">
            <span>把模糊的 AI 问题，</span>
            <span className="hero-accent">变成真正上线的产品。</span>
          </h1>
          <div className="hero-bottom">
            <p className="hero-copy">
              我关注 AI 搜索、智能工具与大模型产品体验，具备从用户研究、需求定义，到数据评测、代码协作和上线迭代的完整实践经验。
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#experience">查看实习经历</a>
              <a className="button button-secondary" href="/yiping-huang-resume-2025.pdf" download>下载个人简历</a>
            </div>
          </div>
        </div>
        <figure className="hero-portrait">
          <div className="portrait-frame">
            <img src="/profile.png" alt="黄奕平的肖像" />
          </div>
          <figcaption>上海 · AI 产品经理 / AI 产品运营</figcaption>
        </figure>
      </section>

      <section className="profile chapter section-shell" id="profile" aria-labelledby="profile-title">
        <div className="chapter-heading reveal-block">
          <p className="eyebrow">PROFILE</p>
          <h2 id="profile-title">个人简介</h2>
          <p>传播研究让我理解人和信息，数据与技术让我把判断变成可以验证的产品。</p>
        </div>

        <div className="profile-bento">
          <article className="profile-card edu-card edu-master reveal-block">
            <p className="card-kicker">2025.09 — 2028.07 · 上海</p>
            <div>
              <h3>华东师范大学</h3>
              <p className="card-lead">数字媒体艺术 · 硕士</p>
              <p>传播学院。关注数字媒体、智能产品、用户体验与内容传播，探索 AI 技术在信息获取和数字产品中的应用。</p>
            </div>
          </article>

          <article className="profile-card edu-card edu-bachelor reveal-block">
            <p className="card-kicker">2021.09 — 2025.07 · 西安</p>
            <div>
              <h3>西北大学</h3>
              <p className="card-lead">网络与新媒体 · 本科</p>
              <p>均分 89，专业前 5%，推免华东师范大学。建立新闻传播、内容研究、用户洞察与数字产品基础。</p>
            </div>
          </article>

          <article className="profile-card courses-card reveal-block">
            <p className="card-kicker">相关课程</p>
            <ul>
              <li>AI Ethics</li>
              <li>Java / Advanced Programming</li>
              <li>Operating Systems</li>
              <li>Data Analysis with Python</li>
            </ul>
          </article>

          <article className="profile-card ability-card reveal-block">
            <p className="card-kicker">相关技能</p>
            <div className="ability-columns">
              <div>
                <h3>产品与 AI</h3>
                <p>用户研究、竞品分析、PRD、Figma、Axure、Prompt Engineering、模型评测、Coze、BERT</p>
              </div>
              <div>
                <h3>数据与开发</h3>
                <p>Python、Java、SQL、NumPy、Pandas、Tableau、Git、API 与 JSON 数据处理</p>
              </div>
            </div>
          </article>

          <article className="profile-card language-card reveal-block">
            <p className="card-kicker">语言能力</p>
            <p className="language-score">TOEFL 104</p>
            <p>CET-6 600+ · GRE 324</p>
            <p>英语可作为工作语言</p>
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
            <h2 id="experience-title">实习经历</h2>
            <p>只保留两段最能说明产品能力与业务判断的经历。</p>
          </aside>

          <div className="experience-stack">
            <article className="experience-card moonshot-card">
              <header>
                <div>
                  <p className="card-kicker">2025.10 — 2026.01</p>
                  <h3>月之暗面 · Kimi</h3>
                </div>
                <p className="experience-role">搜索产品运营 / AI 搜索产品</p>
              </header>
              <p className="experience-label">工作简介</p>
              <p className="experience-intro">
                深度参与 Kimi 搜索产品和大模型配套工具建设，实际承担 Shopping Tool 从需求研究、方案设计、Demo 开发，到评测、上线和持续迭代的完整产品经理工作。
              </p>
              <div className="experience-metrics">
                <div><strong>0→1</strong><span>AI 购物搜索产品</span></div>
                <div><strong>10万+</strong><span>搜索质量原始语料</span></div>
                <div><strong>100+</strong><span>产品问题闭环</span></div>
              </div>
              <details className="experience-details">
                <summary>
                  <span>查看具体工作内容</span>
                  <span className="summary-toggle" aria-hidden="true" />
                </summary>
                <div className="details-body">
                  <section>
                  <h4>Shopping Tool 0→1</h4>
                  <ul>
                      <li>调研 Perplexity、豆包、秘塔等 AI 购物产品，从搜索入口、商品卡片、比价方式和商业链路等维度建立竞品分析框架。</li>
                      <li>从用户反馈和真实 Badcase 中总结检索不准、商品过少、比价失效、信息时效性不足等核心问题。</li>
                      <li>独立完成产品架构、交互方式、异常兜底和结果排序方案设计。</li>
                      <li>建立覆盖不同购物场景的产品评测体系，将主观体验转化为可量化、可回归的质量指标。</li>
                      <li>参与产品 Demo 和业务代码开发，将关键词清洗、查询泛化、商品聚合和比价策略落实为可运行功能。</li>
                      <li>汇总并管理 100+ 产品问题，持续推进搜索结果、商品卡片和比价体验优化。</li>
                  </ul>
                  </section>
                  <section>
                    <h4>搜索质量与评测体系</h4>
                  <ul>
                      <li>建立用户问题采集、问题归因、训练样本构建和模型验证的 Badcase 闭环。</li>
                      <li>从 10万+ 原始语料中筛选和整理高价值搜索样本。</li>
                      <li>设计 A/B 对照实验，评估 Prompt 和 Few-shot 对搜索效果的影响。</li>
                      <li>参与站点可信度分级、搜索来源质量和专业内容检索方案建设。</li>
                  </ul>
                  </section>
                  <div className="experience-capability">
                    <p>工作能力</p>
                    <strong>AI 产品设计、搜索产品、模型评测、产品工程化、跨团队协作。</strong>
                  </div>
                </div>
              </details>
              <div className="experience-tags">
                <span>AI 搜索</span><span>产品 0→1</span><span>模型评测</span><span>产品工程化</span>
              </div>
            </article>

            <article className="experience-card kuaishou-card">
              <header>
                <div>
                  <p className="card-kicker">2024.07 — 2024.11 · 杭州</p>
                  <h3>北京快手科技有限公司</h3>
                </div>
                <p className="experience-role">产品运营实习生</p>
              </header>
              <p className="experience-label">工作简介</p>
              <p className="experience-intro">
                负责美妆行业商家经营数据分析、选品策略、达人匹配与大促运营，通过数据看板和业务实验支持平台 GMV 增长。
              </p>
              <div className="experience-metrics experience-metrics-four">
                <div><strong>6万+</strong><span>商家经营数据</span></div>
                <div><strong>+60%</strong><span>A/B 实验 GMV</span></div>
                <div><strong>120%</strong><span>818 GMV 完成度</span></div>
                <div><strong>25%</strong><span>合作达成率提升</span></div>
              </div>
              <details className="experience-details">
                <summary>
                  <span>查看具体工作内容</span>
                  <span className="summary-toggle" aria-hidden="true" />
                </summary>
                <div className="details-body">
                  <section>
                    <h4>核心工作与成果</h4>
                    <ul>
                      <li>负责 6万+ 商家经营数据的监测与分析，使用 SQL 搭建数据看板并输出周报、日报。</li>
                      <li>主导直播切片 A/B 实验，验证短视频对直播转化的提升效果，相关 GMV 提升 60%。</li>
                      <li>大促期间通过 GMV、开播率等指标识别增长机会，818 GMV 完成度达到 120%。</li>
                      <li>基于达人粉丝画像和历史销售数据，完成 500+ SKU 与70+ 达人的匹配，合作达成率提升 25%。</li>
                      <li>协助落地“2024美妆选品会”，推动 200+ 品牌、MCN 与头部达人建立合作。</li>
                    </ul>
                  </section>
                  <div className="experience-capability">
                    <p>工作能力</p>
                    <strong>数据分析、增长实验、策略运营、供需匹配、跨团队协作。</strong>
                  </div>
                </div>
              </details>
              <div className="experience-tags">
                <span>数据分析</span><span>增长实验</span><span>策略运营</span><span>跨团队协作</span>
              </div>
            </article>
          </div>
        </div>

        <div className="evidence-carousel section-shell">
          <div className="evidence-controls">
            <p>用数字说话</p>
            <div>
              <button type="button" onClick={() => moveEvidence(-1)} aria-label="上一项">←</button>
              <button type="button" onClick={() => moveEvidence(1)} aria-label="下一项">→</button>
            </div>
          </div>
          <article className="evidence-slide" aria-live="polite">
            <p className="evidence-value">{experienceEvidence[evidenceIndex].value}</p>
            <div>
              <h3>{experienceEvidence[evidenceIndex].label}</h3>
              <p>{experienceEvidence[evidenceIndex].copy}</p>
            </div>
            <p className="evidence-count">{String(evidenceIndex + 1).padStart(2, "0")} / {String(experienceEvidence.length).padStart(2, "0")}</p>
          </article>
        </div>
      </section>

      <section className="projects chapter" id="projects" aria-labelledby="projects-title">
        <div className="projects-heading section-shell reveal-block">
          <p className="eyebrow">PROJECTS</p>
          <h2 id="projects-title">项目经历</h2>
          <p>两个从问题出发、最终形成可使用 AI 原型的个人项目。</p>
        </div>

        <div className="project-accordion section-shell" role="list">
          {projects.map((project, index) => {
            const isActive = activeProject === index;
            return (
              <article className={"project-panel " + (isActive ? "is-active" : "")} key={project.name} role="listitem">
                <button type="button" onClick={() => setActiveProject(index)} aria-expanded={isActive}>
                  <span className="project-short">{project.short}</span>
                  <span className="project-more">{isActive ? "正在查看" : "查看更多"}</span>
                  <span className="project-toggle" aria-hidden="true">{isActive ? "—" : "+"}</span>
                </button>
                <div className="project-content" aria-hidden={!isActive}>
                  <div className="project-topline">
                    <p>{project.subtitle}</p>
                    <p className="project-metric">{project.metric}</p>
                  </div>
                  <h3>{project.name}</h3>
                  <p className="project-summary">{project.summary}</p>
                  <div className="project-work">
                    <h4>我的工作</h4>
                    <ul>
                      {project.work.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                  <div className="project-tags">
                    {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                  <a className="project-link" href={project.link} target="_blank" rel="noreferrer">
                    {project.linkLabel} <span aria-hidden="true">↗</span>
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
          <h2 id="certificates-title">课程证书</h2>
          <p>持续补足计算机、数据分析与 AI 产品所需的技术基础。</p>
        </div>

        <div className="credential-row">
          <article className="credential-card reveal-block">
            <p className="card-kicker">DATACAMP</p>
            <h3>Data Analyst<br />in Python</h3>
            <p>数据处理、清洗、探索性分析与可视化。</p>
          </article>
          <article className="credential-card credential-blue reveal-block">
            <p className="card-kicker">DATACAMP</p>
            <h3>Associate Data<br />Analyst in SQL</h3>
            <p>SQL 查询、数据聚合、业务分析与数据驱动决策。</p>
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
              aria-label={"查看 " + certificate.title + " 证书"}
            >
              <div className="certificate-image">
                <img src={certificate.image} alt={certificate.title + " 课程证书"} loading="lazy" />
              </div>
              <div>
                <p>{certificate.type}</p>
                <h3>{certificate.title}</h3>
                <span>查看证书 ↗</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <footer className="footer" id="contact">
        <div className="section-shell">
          <p className="eyebrow">LET&apos;S BUILD SOMETHING USEFUL</p>
          <h2>有一个值得<br />认真解决的问题？</h2>
          <a className="footer-mail" href="mailto:hyp190524@163.com">hyp190524@163.com</a>
          <div className="footer-bottom">
            <p>黄奕平 · AI Product Manager</p>
            <nav aria-label="页脚链接">
              <a href="https://github.com/HYP190524" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://huggingface.co/JulieH0524" target="_blank" rel="noreferrer">Hugging Face</a>
              <a href="/yiping-huang-resume-2025.pdf" download>Resume</a>
            </nav>
            <a href="#top">返回顶部 ↑</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
