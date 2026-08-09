"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const bentoItems = [
  {
    className: "bento-wide",
    kicker: "Product craft",
    value: "0 → 1",
    title: "AI 产品完整链路",
    copy: "从用户问题、竞品分析和 PRD，到评测体系、代码协作与上线迭代。",
  },
  {
    className: "bento-small bento-blue",
    kicker: "Evaluation",
    value: "10W+",
    title: "模型效果工作量",
    copy: "把模糊体验拆成可标注、可复现、可追踪的质量标准。",
  },
  {
    className: "bento-small bento-lime",
    kicker: "Iteration",
    value: "100+",
    title: "问题闭环",
    copy: "按频率、严重度与置信度管理问题，而不是凭感觉改产品。",
  },
  {
    className: "bento-third bento-dark",
    kicker: "Build",
    value: "MR → main",
    title: "Product × Code",
    copy: "能读代码，也能把产品判断落实为可合并、可验证的改动。",
  },
  {
    className: "bento-third",
    kicker: "Research",
    value: "5",
    title: "核心场景",
    copy: "围绕真实任务设计，而不是围绕功能清单堆叠。",
  },
  {
    className: "bento-third bento-blue",
    kicker: "Growth",
    value: "+120%",
    title: "内容系统效率",
    copy: "用标准化选题与复盘机制，让高潜内容产出可持续。",
  },
];

const shoppingStages = [
  {
    index: "01",
    title: "找到真问题",
    meta: "3 个竞品 · 5 个核心痛点",
    copy: "不从“做一个购物功能”出发，而是从用户搜索商品时的犹豫、比较与决策成本出发。",
  },
  {
    index: "02",
    title: "定义产品形态",
    meta: "需求拆解 · 交互框架 · PRD",
    copy: "把复杂信息压缩为可理解的候选、证据与行动，让模型能力真正进入决策流程。",
  },
  {
    index: "03",
    title: "让质量可衡量",
    meta: "C = 0.85A + 0.15B",
    copy: "建立覆盖答案质量与来源质量的评分体系，让讨论从主观偏好变成可验证的产品判断。",
  },
  {
    index: "04",
    title: "把规则写进产品",
    meta: "Prompt · 数据 · 代码协作",
    copy: "把策略沉淀为模型指令、数据规则和工程改动，并与研发共同完成验证。",
  },
  {
    index: "05",
    title: "上线、测量、再迭代",
    meta: "100+ issues · 高频回归",
    copy: "建立问题池和回归机制，持续追踪高频失败模式，让每次发布都带来可见的质量增量。",
  },
];

const accordions = [
  {
    label: "SEARCH QUALITY",
    title: "搜索质量系统",
    metric: "10W+",
    copy: "围绕相关性、可信度、时效性与表达质量构建评测框架，推动跨团队质量共识。",
  },
  {
    label: "SOURCE TRUST",
    title: "来源可信层",
    metric: "0→1",
    copy: "设计站点分级与证据使用规则，让答案不只“看起来正确”，也能说明为什么可信。",
  },
  {
    label: "ACADEMIC",
    title: "学术搜索探索",
    metric: "B2B",
    copy: "从内容价值、授权边界到商业路径，探索专业内容在 AI 搜索中的产品化机会。",
  },
  {
    label: "PROTOTYPES",
    title: "更早的 AI 原型",
    metric: "3+",
    copy: "覆盖智能体、工作流与内容工具，用快速原型验证需求，再决定什么值得继续做。",
  },
];

const signals = [
  { metric: "0 → 1", label: "Shopping Tool", detail: "从问题发现到上线闭环" },
  { metric: "10W+", label: "Search Quality", detail: "模型效果建设工作量" },
  { metric: "+60%", label: "Kuaishou Growth", detail: "账号阶段性增长" },
];

const journey = [
  {
    time: "MOST RECENT",
    place: "月之暗面 · Kimi",
    role: "搜索产品运营 / AI 产品",
    copy: "承担 Shopping Tool 产品经理全链路，并参与搜索质量、站点可信度与学术搜索商业化探索。",
  },
  {
    time: "2024",
    place: "快手",
    role: "增长与内容运营",
    copy: "搭建选题、生产与复盘机制，通过数据实验提升内容效率与账号增长。",
  },
  {
    time: "2025 — 2028",
    place: "华东师范大学",
    role: "硕士 · 新闻与传播",
    copy: "关注技术、内容和人之间的关系，并把传播视角带进产品判断。",
  },
  {
    time: "2021 — 2025",
    place: "西北大学",
    role: "本科 · 新闻传播",
    copy: "建立研究、表达与叙事的底层能力，开始用产品方法解决真实问题。",
  },
];

export default function Portfolio() {
  const root = useRef<HTMLElement>(null);
  const [activeCase, setActiveCase] = useState(0);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        gsap.set([".hero-kicker", ".hero-title span", ".hero-copy", ".hero-actions", ".hero-portrait"], {
          clearProps: "all",
        });
        return;
      }

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from(".floating-nav", { y: -24, opacity: 0, duration: 0.7 })
        .from(".hero-kicker", { y: 24, opacity: 0, duration: 0.55 }, "-=0.25")
        .from(".hero-title span", { yPercent: 110, rotate: 1.5, duration: 0.9, stagger: 0.09 }, "-=0.25")
        .from([".hero-copy", ".hero-actions"], { y: 28, opacity: 0, duration: 0.65, stagger: 0.08 }, "-=0.4")
        .from(".hero-portrait", { scale: 0.88, opacity: 0, rotate: 3, duration: 0.9 }, "-=0.8");

      gsap.fromTo(
        ".hero-portrait img",
        { scale: 1.08 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 0.7,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>(".case-stage").forEach((stage) => {
        gsap.from(stage, {
          opacity: 0.28,
          scale: 0.94,
          y: 70,
          ease: "none",
          scrollTrigger: {
            trigger: stage,
            start: "top 86%",
            end: "top 42%",
            scrub: true,
          },
        });
      });

      gsap.from(".reveal-word", {
        opacity: 0.12,
        y: 18,
        stagger: 0.035,
        ease: "none",
        scrollTrigger: {
          trigger: ".manifesto-copy",
          start: "top 80%",
          end: "bottom 55%",
          scrub: 0.8,
        },
      });

      const media = gsap.matchMedia();
      media.add("(min-width: 1081px)", () => {
        ScrollTrigger.create({
          trigger: ".case-grid",
          start: "top 96px",
          end: "bottom bottom",
          pin: ".case-sticky",
          pinSpacing: false,
        });
      });

      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <main ref={root}>
      <header className="floating-nav" aria-label="主导航">
        <a className="nav-mark" href="#top" aria-label="返回首页">
          YP
        </a>
        <nav>
          <a href="#work">Work</a>
          <a href="#journey">Journey</a>
          <a href="#about">About</a>
        </nav>
        <a className="nav-contact" href="mailto:18357132117@163.com">
          Let&apos;s talk
        </a>
      </header>

      <section className="hero section-shell" id="top">
        <div className="hero-main">
          <p className="hero-kicker">AI PRODUCT MANAGER · BASED IN CHINA</p>
          <h1 className="hero-title">
            <span>I turn ambiguous</span>
            <span>AI problems into</span>
            <span className="hero-accent">products that ship.</span>
          </h1>
          <div className="hero-bottom">
            <p className="hero-copy">
              我是黄奕平。用研究找到真正的问题，用评测建立质量共识，再和团队一起把判断变成上线结果。
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">
                看我的工作
              </a>
              <a className="button button-secondary" href="mailto:18357132117@163.com">
                和我聊聊
              </a>
            </div>
          </div>
        </div>
        <figure className="hero-portrait">
          <div className="portrait-frame">
            <img src="/profile.png" alt="黄奕平的肖像" />
          </div>
          <figcaption>
            <span>产品判断</span>
            <span>研究深度</span>
            <span>动手能力</span>
          </figcaption>
        </figure>
      </section>

      <section className="capabilities section-shell" aria-labelledby="capabilities-title">
        <div className="section-heading">
          <p className="eyebrow">HOW I WORK</p>
          <h2 id="capabilities-title">不只写 PRD，<br />也让结果发生。</h2>
        </div>
        <div className="bento-grid">
          {bentoItems.map((item) => (
            <article className={"bento-card " + item.className} key={item.title}>
              <div>
                <p className="card-kicker">{item.kicker}</p>
                <p className="card-value">{item.value}</p>
              </div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="featured-case" id="work" aria-labelledby="shopping-title">
        <div className="case-intro section-shell">
          <p className="eyebrow">FEATURED CASE · KIMI</p>
          <h2 id="shopping-title">Shopping<br />Tool</h2>
          <p>把一次开放式搜索，变成一条更可靠的消费决策路径。</p>
        </div>
        <div className="case-grid section-shell">
          <aside className="case-sticky">
            <p className="case-role">我的角色</p>
            <h3>从 0 到 1 的<br />完整产品链路</h3>
            <p>
              在月之暗面实习期间，我实际承担产品经理职责：研究用户问题、定义方案、建立评测、协同研发，并持续追踪上线后的失败模式。
            </p>
            <dl className="case-facts">
              <div><dt>Scope</dt><dd>Research → Ship</dd></div>
              <div><dt>Focus</dt><dd>AI Search / Shopping</dd></div>
              <div><dt>Method</dt><dd>Evidence-led iteration</dd></div>
            </dl>
          </aside>
          <div className="case-stages">
            {shoppingStages.map((stage) => (
              <article className="case-stage" key={stage.index}>
                <span className="stage-index">{stage.index}</span>
                <p className="stage-meta">{stage.meta}</p>
                <h3>{stage.title}</h3>
                <p>{stage.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="case-library" aria-labelledby="library-title">
        <div className="case-library-head section-shell">
          <p className="eyebrow">MORE SYSTEMS I BUILT</p>
          <h2 id="library-title">一个项目之外，<br />我还在搭系统。</h2>
        </div>
        <div className="accordion-row" role="list">
          {accordions.map((item, index) => {
            const isActive = activeCase === index;
            return (
              <article className={"accordion-panel " + (isActive ? "is-active" : "")} key={item.title} role="listitem">
                <button
                  type="button"
                  aria-expanded={isActive}
                  onClick={() => setActiveCase(index)}
                >
                  <span className="accordion-index">0{index + 1}</span>
                  <span className="accordion-label">{item.label}</span>
                  <span className="accordion-toggle" aria-hidden="true">{isActive ? "—" : "+"}</span>
                </button>
                <div className="accordion-content" aria-hidden={!isActive}>
                  <p className="accordion-metric">{item.metric}</p>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="proof section-shell" aria-labelledby="proof-title">
        <div className="proof-head">
          <p className="eyebrow">EVIDENCE OVER ADJECTIVES</p>
          <h2 id="proof-title">结果，比自我评价更诚实。</h2>
        </div>
        <div className="signal-track">
          {signals.map((signal) => (
            <article className="signal-card" key={signal.label}>
              <p className="signal-metric">{signal.metric}</p>
              <h3>{signal.label}</h3>
              <p>{signal.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="manifesto" id="about">
        <div className="section-shell">
          <p className="eyebrow">MY PRODUCT BELIEF</p>
          <p className="manifesto-copy" aria-label="AI 产品的价值，不是展示模型会什么，而是把不确定性变成用户可以信任的下一步。">
            {"AI 产品的价值，不是展示模型会什么，而是把不确定性变成用户可以信任的下一步。".split("").map((word, index) => (
              <span className="reveal-word" key={word + "-" + index}>{word}</span>
            ))}
          </p>
        </div>
      </section>

      <section className="journey section-shell" id="journey" aria-labelledby="journey-title">
        <div className="section-heading journey-heading">
          <p className="eyebrow">JOURNEY</p>
          <h2 id="journey-title">从内容与研究，<br />走向 AI 产品。</h2>
        </div>
        <div className="journey-list">
          {journey.map((item) => (
            <article className="journey-item" key={item.place}>
              <p className="journey-time">{item.time}</p>
              <div><h3>{item.place}</h3><p>{item.role}</p></div>
              <p className="journey-copy">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="footer" id="contact">
        <div className="section-shell">
          <p className="eyebrow">WHAT SHOULD WE BUILD NEXT?</p>
          <h2>有一个值得<br />认真解决的问题？</h2>
          <a className="footer-mail" href="mailto:18357132117@163.com">
            18357132117@163.com
          </a>
          <div className="footer-bottom">
            <p>黄奕平 · AI Product Manager</p>
            <nav aria-label="页脚链接">
              <a href="https://github.com/HYP190524" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://huggingface.co/HYP190524" target="_blank" rel="noreferrer">Hugging Face</a>
              <a href="/yiping-huang-resume-2025.pdf" download>Resume</a>
            </nav>
            <a href="#top">Back to top ↑</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
