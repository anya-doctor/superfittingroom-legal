import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { marked } from "marked";

marked.setOptions({ gfm: true, breaks: false });

const APP_NAME = "super fitting room";
const UPDATED = "2026-06-16";

const PAGES = [
  { slug: "privacy-policy", src: "src/privacy-policy.md", title: "Privacy Policy" },
  { slug: "terms-of-service", src: "src/terms-of-service.md", title: "Terms of Service" },
];

const css = `
:root { color-scheme: light dark; }
* { box-sizing: border-box; }
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  line-height: 1.7;
  color: #1a1a1a;
  background: #ffffff;
}
.wrap { max-width: 820px; margin: 0 auto; padding: 24px 20px 80px; }
header.site { border-bottom: 1px solid #eaeaea; padding: 18px 0; margin-bottom: 8px; }
header.site .brand { font-weight: 700; font-size: 18px; }
nav.toc { display: flex; gap: 16px; flex-wrap: wrap; margin: 10px 0 0; font-size: 14px; }
nav.toc a { color: #2563eb; text-decoration: none; }
nav.toc a:hover { text-decoration: underline; }
h1 { font-size: 28px; line-height: 1.3; margin: 24px 0 8px; }
h2 { font-size: 21px; margin: 32px 0 10px; padding-top: 8px; }
h3 { font-size: 17px; margin: 22px 0 8px; }
table { border-collapse: collapse; width: 100%; margin: 14px 0; font-size: 14px; display: block; overflow-x: auto; }
th, td { border: 1px solid #e2e2e2; padding: 8px 10px; text-align: left; vertical-align: top; }
th { background: #f7f7f8; }
code { background: #f2f2f2; padding: 1px 5px; border-radius: 4px; font-size: 0.9em; }
hr { border: none; border-top: 1px solid #ececec; margin: 28px 0; }
a { color: #2563eb; }
.footer { margin-top: 48px; padding-top: 16px; border-top: 1px solid #eaeaea; font-size: 13px; color: #666; }
em { color: #444; }
@media (prefers-color-scheme: dark) {
  body { color: #e6e6e6; background: #0f1115; }
  header.site, .footer { border-color: #232733; }
  th { background: #1a1d24; }
  th, td { border-color: #2a2e38; }
  code { background: #1a1d24; }
  hr { border-top-color: #232733; }
  nav.toc a, a { color: #6ea8fe; }
  em { color: #b9bcc4; }
}
`;

function layout(title, bodyHtml) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="index,follow" />
<title>${title} — ${APP_NAME}</title>
<style>${css}</style>
</head>
<body>
<header class="site">
  <div class="wrap" style="padding-top:0;padding-bottom:0;">
    <div class="brand">${APP_NAME}</div>
    <nav class="toc">
      <a href="/superfittingroom-legal/">Home</a>
      <a href="/superfittingroom-legal/privacy-policy/">Privacy Policy</a>
      <a href="/superfittingroom-legal/terms-of-service/">Terms of Service</a>
    </nav>
  </div>
</header>
<main class="wrap">
${bodyHtml}
<div class="footer">© ${new Date().getFullYear()} ${APP_NAME} (Hong Kong) Limited. Last updated ${UPDATED}.</div>
</main>
</body>
</html>`;
}

for (const page of PAGES) {
  const md = readFileSync(page.src, "utf8");
  const html = layout(page.title, marked.parse(md));
  mkdirSync(page.slug, { recursive: true });
  writeFileSync(`${page.slug}/index.html`, html, "utf8");
  console.log(`built ${page.slug}/index.html`);
}

const indexBody = `
<h1>Legal — ${APP_NAME}</h1>
<p>Official legal documents for the <strong>${APP_NAME}</strong> app and website.</p>
<ul>
  <li><a href="/superfittingroom-legal/privacy-policy/">Privacy Policy</a></li>
  <li><a href="/superfittingroom-legal/terms-of-service/">Terms of Service</a></li>
</ul>
<p><em>Effective ${UPDATED}. English is the governing language; translations are provided for convenience.</em></p>
`;
writeFileSync("index.html", layout("Legal", indexBody), "utf8");
console.log("built index.html");

writeFileSync(".nojekyll", "", "utf8");
console.log("wrote .nojekyll");
