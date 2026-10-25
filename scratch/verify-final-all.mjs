import { execSync } from "child_process";
import fs from "fs";

const SCRATCH_DIR = "C:/Users/suroj/.gemini/antigravity/brain/0efb76c7-cd7f-4f8f-8167-5af9db1bbca6/scratch";

const pages = [
  { name: "home", path: "/" },
  { name: "services", path: "/services" },
  { name: "work", path: "/work" },
  { name: "about", path: "/about" },
  { name: "blog", path: "/blog" },
  { name: "contact", path: "/contact" }
];

const results = {};

for (const p of pages) {
  const url = `http://localhost:3005${p.path}`;
  const outPath = `${SCRATCH_DIR}/lh-final-${p.name}.json`;
  console.log(`Auditing ${p.path}...`);
  try {
    execSync(
      `npx lighthouse ${url} --chrome-flags="--headless=new --no-sandbox --disable-gpu" --output=json --output-path="${outPath}" --quiet`,
      { stdio: "pipe" }
    );
    const data = JSON.parse(fs.readFileSync(outPath, "utf8"));
    const cats = data.categories;
    results[p.path] = {
      performance: Math.round(cats.performance.score * 100),
      accessibility: Math.round(cats.accessibility.score * 100),
      bestPractices: Math.round(cats["best-practices"].score * 100),
      seo: Math.round(cats.seo.score * 100),
      fcp: data.audits["first-contentful-paint"]?.displayValue,
      lcp: data.audits["largest-contentful-paint"]?.displayValue,
      cls: data.audits["cumulative-layout-shift"]?.displayValue,
      tbt: data.audits["total-blocking-time"]?.displayValue,
    };
    console.log(`✓ ${p.path}: Perf=${results[p.path].performance}, A11y=${results[p.path].accessibility}, BP=${results[p.path].bestPractices}, SEO=${results[p.path].seo}`);
  } catch (err) {
    console.error(`Error on ${p.path}:`, err.message);
  }
}

fs.writeFileSync(`${SCRATCH_DIR}/final-scores.json`, JSON.stringify(results, null, 2));
console.log("\n=== FINAL ALL-PAGES SCORECARD ===");
console.table(results);
