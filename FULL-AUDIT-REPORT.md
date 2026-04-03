# My-Signage.com — Full SEO Audit Report

**Audit Date:** 2026-04-03  
**Site:** https://my-signage.com  
**Pages Audited:** 96 static pages (79 products, 10 categories, homepage, categories index, 404, robots.txt, sitemap.xml)  
**Overall Score: 74/100 (Good)**

---

## Score Breakdown

| Category | Score | Weight | Weighted |
|----------|-------|--------|----------|
| Technical SEO | 82/100 | 25% | 20.5 |
| Content Quality | 68/100 | 20% | 13.6 |
| On-Page SEO | 75/100 | 15% | 11.25 |
| Schema / Structured Data | 80/100 | 15% | 12.0 |
| Performance (CWV) | 85/100 | 10% | 8.5 |
| Image Optimization | 55/100 | 10% | 5.5 |
| AI Search Readiness (GEO) | 50/100 | 5% | 2.5 |
| **Total** | | | **73.85 ≈ 74** |

---

## Detailed Findings

### 1. Technical SEO (82/100)

| Element | Value | Severity |
|---------|-------|----------|
| robots.txt | Present, allows all | ✅ Pass |
| sitemap.xml | 91 URLs, valid XML | ✅ Pass |
| Canonical URLs | Present on all pages | ✅ Pass |
| meta robots | `index, follow` on all pages | ✅ Pass |
| HTML lang attribute | `lang="en"` | ✅ Pass |
| metadataBase | Set to `https://my-signage.com` | ✅ Pass |
| Static export | All pages pre-rendered as static HTML | ✅ Pass |
| AI crawler management | No GPTBot/ClaudeBot/PerplexityBot rules | ⚠️ Warning |
| HTTPS enforcement | Handled by Vercel | ✅ Pass |
| 404 page | Custom not-found page present | ✅ Pass |

**Finding: No AI crawler management in robots.txt**
- **Evidence:** `robots.txt` only contains `User-Agent: *` / `Allow: /`
- **Impact:** AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Bytespider, CCBot) will scrape all content without restriction. Decide if this is desired.
- **Fix:** Add explicit rules for AI bots if you want to control AI training usage. If you WANT AI visibility (recommended for e-commerce), leave as-is.

---

### 2. Content Quality (68/100)

| Element | Value | Severity |
|---------|-------|----------|
| Homepage content | Stats, features, product grid — good | ✅ Pass |
| Product descriptions | 50-200 chars, mostly sourced from manufacturers | ⚠️ Warning |
| Category page descriptions | Templated, mention "Allsee Technologies" only | 🔴 Critical |
| CTA section text | Says "over 44 products" (should be 79) | 🔴 Critical |
| Unique content per product | Low — descriptions are scraped verbatim | ⚠️ Warning |

**Finding: Category page titles have duplicate words**
- **Evidence:** `<title>Digital Signage Digital Signage Displays | My-Signage.com</title>`
- **Impact:** Looks spammy to Google; reduces click-through from SERPs
- **Fix:** Update `generateMetadata` in `app/category/[slug]/page.tsx` to avoid repeating category name

**Finding: Category descriptions reference only "Allsee Technologies"**
- **Evidence:** `"Browse 44 digital signage digital signage products from Allsee Technologies"`
- **Impact:** Incorrect brand attribution; ignores ScreenMoove products
- **Fix:** Change description to reference "My-Signage.com" or "leading manufacturers"

**Finding: Homepage CTA says "over 44 products"**
- **Evidence:** CTA section text: `"With over 44 products across multiple categories..."`
- **Impact:** Inconsistent with hero ("79+" products); looks outdated
- **Fix:** Update to "79" in `app/page.tsx`

---

### 3. On-Page SEO (75/100)

| Element | Value | Severity |
|---------|-------|----------|
| Title tags | Present on all pages | ✅ Pass |
| Title length (homepage) | 65 chars (≤60 recommended) | ⚠️ Warning |
| Title length (products) | Some 90+ chars — too long | ⚠️ Warning |
| Meta descriptions | Present, 100-180 chars | ✅ Pass |
| H1 tags | Single H1 per page | ✅ Pass |
| Heading hierarchy | H1→H2→H3 properly structured | ✅ Pass |
| Breadcrumbs | Present with schema markup | ✅ Pass |
| Internal linking | Category filters + product cards | ✅ Pass |
| Keyword usage | Good density in titles/descriptions | ✅ Pass |

**Finding: Some product title tags exceed 60 characters**
- **Evidence:** `"iiyama ProLite LH9852UHS-B1 98" Professional Digital Signage Display | My-Signage.com"` (90 chars)
- **Impact:** Google truncates titles >60 chars in SERPs; message gets cut off
- **Fix:** Consider shortening the `| My-Signage.com` suffix to `| My-Signage` or using shorter product names in the template

---

### 4. Schema / Structured Data (80/100)

| Element | Value | Severity |
|---------|-------|----------|
| Product schema | Present on all product pages (JSON-LD) | ✅ Pass |
| Offers/price in schema | Present on priced products with GBP currency | ✅ Pass |
| Brand in schema | Correctly set per source (Allsee/ScreenMoove) | ✅ Pass |
| BreadcrumbList schema | Present on product pages (Microdata) | ✅ Pass |
| WebSite schema on homepage | **Missing** | ⚠️ Warning |
| Organization schema | **Missing** | ⚠️ Warning |
| Product images in schema | Single image per product | ✅ Pass |

**Finding: No WebSite or Organization schema on homepage**
- **Evidence:** Homepage has no `<script type="application/ld+json">` block
- **Impact:** Missing sitelinks search box opportunity; no brand entity signal
- **Fix:** Add WebSite schema with SearchAction and Organization schema to layout or homepage

**Finding: BreadcrumbList uses Microdata instead of JSON-LD**
- **Evidence:** `itemScope itemType="https://schema.org/BreadcrumbList"` on product pages
- **Impact:** Works but JSON-LD is the Google-recommended format. Mixed approaches are acceptable but not ideal.
- **Fix:** Low priority — keep as-is or migrate to JSON-LD for consistency

---

### 5. Performance (85/100)

| Element | Value | Severity |
|---------|-------|----------|
| Static HTML export | All pages pre-rendered | ✅ Pass |
| JavaScript bundle | Minimal client-side JS (Next.js RSC) | ✅ Pass |
| Image loading | `loading="lazy"` on product images | ✅ Pass |
| Font optimization | Google Fonts with `next/font` (self-hosted) | ✅ Pass |
| CSS delivery | Single stylesheet, inlined critical path | ✅ Pass |

*Note: CWV scores cannot be measured until the site is deployed. Static export should yield excellent LCP/CLS/INP.*

---

### 6. Image Optimization (55/100)

| Element | Value | Severity |
|---------|-------|----------|
| Alt text | Present on all product images | ✅ Pass |
| Image format | External URLs (jpg/webp/png from source sites) | ⚠️ Warning |
| Image optimization | `unoptimized: true` in next.config — no Next.js optimization | 🔴 Critical |
| Local image hosting | Images served from allsee-tech.com / screenmoove.com CDN | ⚠️ Warning |
| og:image on homepage | **Missing** — no social sharing image | 🔴 Critical |

**Finding: Images not optimized — served from external domains**
- **Evidence:** `next.config.ts` has `images: { unoptimized: true }`; all images load from `allsee-tech.com` and `screenmoove.com`
- **Impact:** No WebP conversion, no responsive sizing, no lazy-loading optimization. Also, external image hosts may block hotlinking or go down.
- **Fix:** Download images locally into `public/images/`, remove `unoptimized: true`, and use `next/image` with `remotePatterns` or local sources

**Finding: No og:image on homepage**
- **Evidence:** Homepage HTML has no `og:image` meta tag
- **Impact:** Social shares (LinkedIn, Twitter, Facebook) will show no preview image
- **Fix:** Add an OG image to the homepage metadata in `app/page.tsx`

---

### 7. AI Search Readiness (50/100)

| Element | Value | Severity |
|---------|-------|----------|
| llms.txt | Not present | ⚠️ Warning |
| Structured data for AI | Product schema helps | ✅ Pass |
| Content clarity | Good feature/spec structure | ✅ Pass |
| AI crawler permissions | No explicit policy | ℹ️ Info |

**Finding: No llms.txt file**
- **Evidence:** No `llms.txt` in the site root
- **Impact:** AI search engines (Perplexity, ChatGPT search) can't quickly understand site purpose
- **Fix:** Create `public/llms.txt` describing the site for AI search indexing

---

## Summary of Issues by Severity

### 🔴 Critical (Fix Immediately)
1. Category page titles have duplicate words ("Digital Signage Digital Signage")
2. Category descriptions reference only "Allsee Technologies" — incorrect for mixed catalog
3. Homepage CTA text says "44 products" instead of 79
4. No og:image on homepage for social sharing
5. All images unoptimized and externally hosted

### ⚠️ Warning (Fix Within 1 Month)
1. No WebSite/Organization schema on homepage
2. Some product titles exceed 60 characters
3. No AI crawler management in robots.txt
4. No llms.txt file
5. Product descriptions are scraped verbatim — low unique content

### ✅ Pass
- Robots.txt and sitemap.xml properly configured
- Canonical URLs on all pages
- JSON-LD Product schema with pricing on product pages
- Proper heading hierarchy (H1→H2→H3)
- Breadcrumb navigation with schema
- Mobile-first responsive design
- Static HTML export for fast loading
- Meta descriptions present and well-sized
