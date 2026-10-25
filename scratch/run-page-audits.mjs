import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const SCRATCH_DIR = "C:/Users/suroj/.gemini/antigravity/brain/0efb76c7-cd7f-4f8f-8167-5af9db1bbca6/scratch";

const pages = [
  { name: "services", path: "/services" },
  { name: "work", path: "/work" },
  { name: "about", path: "/about" },
  { name: "blog", path: "/blog" },
  { name: "contact", path: "/contact" }
];

console.log("Starting Lighthouse audits for remaining pages...\n");

for (const p of pages) {
  const url = `http://localhost:3005${p.path}`;
  const outPath = `${SCRATCH_DIR}/lh-${p.name}.json`;
  console.log(`Running Lighthouse mobile audit on ${p.path}...`);
  try {
    execSync(
      `npx lighthouse ${url} --chrome-flags="--headless=new --no-sandbox --disable-gpu" --output=json --output-path="${outPath}" --quiet`,
      { stdio: "inherit" }
    );
    const data = JSON.parse(fs.readFileSync(outPath, "utf8"));
    const cats = data.categories;
    console.log(`Results for ${p.path}:`);
    for (const k in cats) {
      console.log(`  ${cats[k].title}: ${Math.round(cats[k].score * 100)}`);
    }
    console.log("-----------------------------------------");
  } catch (err) {
    console.error(`Error auditing ${p.path}:`, err.message);
  }
}

console.log("All audits completed!");
