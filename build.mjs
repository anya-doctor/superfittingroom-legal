import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { marked } from "marked";

/**
 * Static legal site builder with optional multi-language output.
 *
 * - English is the governing source (src/*.md) and is ALWAYS built at stable URLs
 *   (/privacy-policy/, /terms-of-service/) — these are the URLs used in App Store
 *   Connect, so they must never move.
 * - Translations are generated at build time from the English source via DeepL
 *   (preferred) or Google Cloud Translation. They are written under /<lang>/...
 *   and are clearly marked "machine translation; English prevails".
 * - Translations are cached in cache/<lang>/<slug>.html keyed by a hash of the
 *   English source, so re-runs do NOT re-call (and re-pay) the API unless the
 *   English text changed.
 *
 * Run:
 *   node build.mjs                       # English only
 *   DEEPL_API_KEY=xxx node build.mjs     # English + translations (DeepL)
 *   GOOGLE_TRANSLATE_API_KEY=xxx node build.mjs   # via Google
 */

marked.setOptions({ gfm: true, breaks: false });

const APP_NAME = "super fitting room";
const UPDATED = "2026-06-16";
const BASE = "/superfittingroom-legal";

const PAGES = [
  { slug: "privacy-policy", src: "src/privacy-policy.md", title: "Privacy Policy" },
  { slug: "terms-of-service", src: "src/terms-of-service.md", title: "Terms of Service" },
];

// locale -> { label (native), deepl, google, htmlLang }
const LOCALES = {
  en: { label: "English", deepl: null, google: null, htmlLang: "en" },
  de: { label: "Deutsch", deepl: "DE", google: "de", htmlLang: "de" },
  fr: { label: "Français", deepl: "FR", google: "fr", htmlLang: "fr" },
  it: { label: "Italiano", deepl: "IT", google: "it", htmlLang: "it" },
  es: { label: "Español", deepl: "ES", google: "es", htmlLang: "es" },
  pt: { label: "Português", deepl: "PT-PT", google: "pt", htmlLang: "pt" },
  ru: { label: "Русский", deepl: "RU", google: "ru", htmlLang: "ru" },
  ja: { label: "日本語", deepl: "JA", google: "ja", htmlLang: "ja" },
  ko: { label: "한국어", deepl: "KO", google: "ko", htmlLang: "ko" },
  zh: { label: "中文", deepl: "ZH", google: "zh-CN", htmlLang: "zh" },
};

const DEEPL_KEY = process.env.DEEPL_API_KEY || "";
const GOOGLE_KEY = process.env.GOOGLE_TRANSLATE_API_KEY || "";

const MT_NOTICE = {
  en: "",
  de: "Maschinelle Übersetzung. Maßgeblich ist die englische Fassung.",
  fr: "Traduction automatique. La version anglaise fait foi.",
  it: "Traduzione automatica. Fa fede la versione inglese.",
  es: "Traducción automática. Prevalece la versión en inglés.",
  pt: "Tradução automática. Prevalece a versão em inglês.",
  ru: "Машинный перевод. Преимущественную силу имеет английская версия.",
  ja: "機械翻訳です。英語版が優先されます。",
  ko: "기계 번역입니다. 영어 버전이 우선합니다.",
  zh: "机器翻译，以英文版本为准。",
};

const css = `
:root { color-scheme: light dark; }
* { box-sizing: border-box; }
body { margin:0; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif; line-height:1.7; color:#1a1a1a; background:#fff; }
.wrap { max-width:820px; margin:0 auto; padding:24px 20px 80px; }
header.site { border-bottom:1px solid #eaeaea; padding:16px 0; }
header.site .brand { font-weight:700; font-size:18px; }
nav.toc { display:flex; gap:16px; flex-wrap:wrap; margin:10px 0 0; font-size:14px; }
nav.lang { display:flex; gap:10px; flex-wrap:wrap; margin:10px 0 0; font-size:13px; }
nav a { color:#2563eb; text-decoration:none; }
nav a.active { font-weight:700; text-decoration:underline; }
nav a:hover { text-decoration:underline; }
h1 { font-size:28px; line-height:1.3; margin:24px 0 8px; }
h2 { font-size:21px; margin:32px 0 10px; }
h3 { font-size:17px; margin:22px 0 8px; }
table { border-collapse:collapse; width:100%; margin:14px 0; font-size:14px; display:block; overflow-x:auto; }
th,td { border:1px solid #e2e2e2; padding:8px 10px; text-align:left; vertical-align:top; }
th { background:#f7f7f8; }
code { background:#f2f2f2; padding:1px 5px; border-radius:4px; font-size:.9em; }
hr { border:none; border-top:1px solid #ececec; margin:28px 0; }
a { color:#2563eb; }
.mt { background:#fff7ed; border:1px solid #fed7aa; color:#7c2d12; padding:10px 14px; border-radius:8px; font-size:14px; margin:14px 0; }
.footer { margin-top:48px; padding-top:16px; border-top:1px solid #eaeaea; font-size:13px; color:#666; }
@media (prefers-color-scheme: dark) {
  body { color:#e6e6e6; background:#0f1115; }
  header.site,.footer { border-color:#232733; }
  th { background:#1a1d24; } th,td { border-color:#2a2e38; }
  code { background:#1a1d24; } hr { border-top-color:#232733; }
  nav a,a { color:#6ea8fe; }
  .mt { background:#2a1c0f; border-color:#7c4a16; color:#fcd9b6; }
}
`;

function localeUrl(loc, slug) {
  const tail = slug ? `${slug}/` : "";
  return loc === "en" ? `${BASE}/${tail}` : `${BASE}/${loc}/${tail}`;
}

const BUILT = ["en"];

function langSwitcher(loc, slug) {
  return BUILT
    .map((code) => {
      const cfg = LOCALES[code];
      const cls = code === loc ? ' class="active"' : "";
      return `<a${cls} href="${localeUrl(code, slug)}">${cfg.label}</a>`;
    })
    .join("\n      ");
}

function layout({ loc, slug, title, bodyHtml }) {
  const lang = LOCALES[loc].htmlLang;
  const mt = loc !== "en" ? `<div class="mt">${MT_NOTICE[loc]}</div>` : "";
  return `<!DOCTYPE html>
<html lang="${lang}">
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
      <a href="${localeUrl(loc, "")}">Home</a>
      <a href="${localeUrl(loc, "privacy-policy")}">Privacy Policy</a>
      <a href="${localeUrl(loc, "terms-of-service")}">Terms of Service</a>
    </nav>
    <nav class="lang">
      ${langSwitcher(loc, slug)}
    </nav>
  </div>
</header>
<main class="wrap">
${mt}
${bodyHtml}
<div class="footer">© ${new Date().getFullYear()} ${APP_NAME} (Hong Kong) Limited. Last updated ${UPDATED}.</div>
</main>
</body>
</html>`;
}

function sha(s) {
  return createHash("sha256").update(s, "utf8").digest("hex").slice(0, 16);
}

async function translateHtml(html, loc) {
  const cfg = LOCALES[loc];
  if (DEEPL_KEY) {
    const endpoint = DEEPL_KEY.endsWith(":fx")
      ? "https://api-free.deepl.com/v2/translate"
      : "https://api.deepl.com/v2/translate";
    const body = new URLSearchParams();
    body.append("text", html);
    body.append("source_lang", "EN");
    body.append("target_lang", cfg.deepl);
    body.append("tag_handling", "html");
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `DeepL-Auth-Key ${DEEPL_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });
    if (!res.ok) throw new Error(`DeepL ${loc} failed: ${res.status} ${await res.text()}`);
    const json = await res.json();
    return json.translations[0].text;
  }
  if (GOOGLE_KEY) {
    const res = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q: html, source: "en", target: cfg.google, format: "html" }),
      },
    );
    if (!res.ok) throw new Error(`Google ${loc} failed: ${res.status} ${await res.text()}`);
    const json = await res.json();
    return json.data.translations[0].translatedText;
  }
  return null; // no key
}

async function getTranslatedBody(enBody, loc, slug) {
  const hash = sha(enBody);
  const cacheFile = `cache/${loc}/${slug}.html`;
  const hashFile = `cache/${loc}/${slug}.hash`;
  if (existsSync(cacheFile) && existsSync(hashFile) && readFileSync(hashFile, "utf8") === hash) {
    return readFileSync(cacheFile, "utf8");
  }
  const translated = await translateHtml(enBody, loc);
  if (translated == null) return null;
  mkdirSync(`cache/${loc}`, { recursive: true });
  writeFileSync(cacheFile, translated, "utf8");
  writeFileSync(hashFile, hash, "utf8");
  return translated;
}

function writePage(loc, slug, title, bodyHtml) {
  let dir;
  if (slug === "") dir = loc === "en" ? "." : loc;
  else dir = loc === "en" ? slug : `${loc}/${slug}`;
  mkdirSync(dir, { recursive: true });
  writeFileSync(`${dir}/index.html`, layout({ loc, slug, title, bodyHtml }), "utf8");
  console.log(`built ${dir}/index.html`);
}

function homeBody(loc) {
  const note =
    loc === "en"
      ? `<p><em>Effective ${UPDATED}. English is the governing language; translations are provided for convenience.</em></p>`
      : `<p><em>${MT_NOTICE[loc]}</em></p>`;
  return `
<h1>Legal — ${APP_NAME}</h1>
<p>Official legal documents for the <strong>${APP_NAME}</strong> app and website.</p>
<ul>
  <li><a href="${localeUrl(loc, "privacy-policy")}">Privacy Policy</a></li>
  <li><a href="${localeUrl(loc, "terms-of-service")}">Terms of Service</a></li>
</ul>
${note}`;
}

// ---- render English bodies (governing source) ----
const enBodies = {};
for (const page of PAGES) {
  enBodies[page.slug] = marked.parse(readFileSync(page.src, "utf8"));
}

// ---- translate (if a key is present); populate BUILT before writing ----
const haveKey = Boolean(DEEPL_KEY || GOOGLE_KEY);
const translated = {};
if (haveKey) {
  for (const loc of Object.keys(LOCALES)) {
    if (loc === "en") continue;
    const bodies = {};
    let ok = true;
    for (const page of PAGES) {
      const body = await getTranslatedBody(enBodies[page.slug], loc, page.slug);
      if (body == null) { ok = false; break; }
      bodies[page.slug] = body;
    }
    if (ok) { translated[loc] = bodies; BUILT.push(loc); }
  }
} else {
  console.log("No DEEPL_API_KEY / GOOGLE_TRANSLATE_API_KEY set — built English only.");
}

// ---- write all pages (switcher now knows the full BUILT set) ----
for (const loc of BUILT) {
  for (const page of PAGES) {
    const body = loc === "en" ? enBodies[page.slug] : translated[loc][page.slug];
    writePage(loc, page.slug, page.title, body);
  }
  writePage(loc, "", "Legal", homeBody(loc));
}

// ---- root index with auto-redirect by browser language ----
const supported = JSON.stringify(BUILT);
const rootIndex = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${APP_NAME} — Legal</title>
<script>
(function () {
  var supported = ${supported};
  var base = "${BASE}";
  var pref = (navigator.languages || [navigator.language || "en"]);
  for (var i = 0; i < pref.length; i++) {
    var code = String(pref[i] || "").toLowerCase().split("-")[0];
    if (supported.indexOf(code) !== -1) {
      location.replace(code === "en" ? base + "/privacy-policy/" : base + "/" + code + "/privacy-policy/");
      return;
    }
  }
  location.replace(base + "/privacy-policy/");
})();
</script>
<meta http-equiv="refresh" content="0; url=${BASE}/privacy-policy/" />
</head>
<body>
<p>Redirecting… <a href="${BASE}/privacy-policy/">Privacy Policy</a> · <a href="${BASE}/terms-of-service/">Terms of Service</a></p>
</body>
</html>`;
writeFileSync("index.html", rootIndex, "utf8");
console.log("built index.html (root redirect)");

writeFileSync(".nojekyll", "", "utf8");
console.log("wrote .nojekyll");
console.log("locales built:", BUILT.join(", "));
