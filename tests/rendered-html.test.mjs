import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the portfolio with the AI investment project", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /黄奕平 — AI Product Manager/);
  assert.match(html, /港美股 AI 投资学习工作台/);
  assert.match(html, /81 项自动化测试通过/);
  assert.match(html, /HYP190524\/ai-investment-learning-workstation/);
  assert.doesNotMatch(html, /30分钟吃上饭|30-MIN MEAL/);
  assert.doesNotMatch(html, /Femimatch|FEMIMATCH/);
});

test("keeps all seven supplied project screenshots available", async () => {
  const screenshotNames = [
    "portfolio-overview.png",
    "daily-reports.png",
    "concept-library.png",
    "holding-analysis.png",
    "ai-coach.png",
    "allocation-analysis.png",
    "market-valuation.png",
  ];

  await Promise.all(
    screenshotNames.map((name) =>
      access(new URL(`../public/projects/ai-investment-learning-workstation/${name}`, import.meta.url)),
    ),
  );

  const source = await readFile(new URL("../app/Portfolio.tsx", import.meta.url), "utf8");
  for (const name of screenshotNames) {
    assert.match(source, new RegExp(name.replace(".", "\\.")));
  }
  assert.match(source, /translate\(language, "上一张项目截图"\)/);
  assert.match(source, /translate\(language, "下一张项目截图"\)/);
  assert.match(source, /aria-pressed=/);
});

test("keeps project titles on one responsive line", async () => {
  const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(styles, /\.project-content h3\s*\{[^}]*white-space:\s*nowrap;/s);
  assert.match(styles, /font-size:\s*clamp\(2\.75rem,\s*4vw,\s*5rem\)/);
  assert.match(styles, /font-size:\s*clamp\(1\.45rem,\s*7vw,\s*3rem\)/);
});

test("includes the bilingual switch in the top navigation", async () => {
  const source = await readFile(new URL("../app/Portfolio.tsx", import.meta.url), "utf8");
  const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(source, /className="language-toggle"/);
  assert.match(source, /Switch to English/);
  assert.match(source, /切换为中文/);
  assert.match(styles, /grid-template-columns:\s*auto 1fr auto auto/);
});

test("loosens English display-title letter spacing", async () => {
  const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(styles, /\.is-english \.hero-title,[\s\S]*letter-spacing:\s*0\.01em/);
  assert.match(styles, /\.is-english \.kuaishou-card h3[\s\S]*letter-spacing:\s*0\.02em/);
});
