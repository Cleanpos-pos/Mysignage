# My-Signage.com — SEO Action Plan

**Priority order by impact. Each fix includes the exact file to change.**

---

## Priority 1 — Critical Fixes (Do Now)

### 1.1 Fix category page duplicate titles and descriptions
**File:** `app/category/[slug]/page.tsx` — `generateMetadata` function  
**Issue:** Title outputs "Digital Signage Digital Signage Displays"  
**Fix:** Change title template to avoid repeating the category name:
```ts
title: `${category.name} Displays & Solutions`,
description: `Browse ${category.count} ${category.name.toLowerCase()} products at My-Signage.com. Commercial-grade display solutions from leading manufacturers.`,
```

### 1.2 Fix homepage CTA text (says "44" instead of "79")
**File:** `app/page.tsx` — CTA section near bottom  
**Fix:** Change `"With over 44 products"` to `"With over 79 products"`

### 1.3 Add og:image to homepage
**File:** `app/page.tsx` — metadata export  
**Fix:** Add to metadata:
```ts
openGraph: {
  images: [{ url: "https://my-signage.com/og-image.jpg", width: 1200, height: 630 }],
}
```
Then create a 1200x630 branded OG image and place in `public/og-image.jpg`

---

## Priority 2 — High Impact (This Week)

### 2.1 Add WebSite + Organization schema to homepage
**File:** `app/page.tsx` or `app/layout.tsx`  
**Fix:** Add JSON-LD script:
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "My-Signage.com",
  "url": "https://my-signage.com",
  "description": "Premium digital signage solutions catalog"
}
```
And Organization schema with phone number and brand info.

### 2.2 Shorten title tag suffix
**File:** `app/layout.tsx` — metadata title template  
**Fix:** Change `"%s | My-Signage.com"` to `"%s | My-Signage"` (saves 4 chars per page)

### 2.3 Add llms.txt for AI search
**File:** Create `public/llms.txt`  
**Content:**
```
# My-Signage.com
> Premium digital signage product catalog with 79+ commercial displays

## Products
Browse commercial-grade digital signage: high brightness window displays, interactive touch screens, video walls, outdoor signage, freestanding digital posters, self-service kiosks, and digital menu boards.

## Brands
Products from Allsee Technologies and ScreenMoove.

## Contact
Phone: 0808 175 3956
```

---

## Priority 3 — Medium Impact (This Month)

### 3.1 Download and locally host product images
**Why:** External hotlinking is fragile; prevents Next.js image optimization  
**Fix:** Write a script to download all product images to `public/images/products/`, update JSON data to use local paths, then enable `next/image` optimization

### 3.2 Add unique content to product descriptions
**Why:** Scraped descriptions are duplicate content from source sites  
**Fix:** Rewrite top 20 product descriptions with unique copy targeting buying intent keywords

### 3.3 Add AI crawler rules to robots.txt
**File:** `app/robots.ts`  
**Fix:** Add explicit rules (allow or disallow as preferred):
```ts
rules: [
  { userAgent: "*", allow: "/" },
  { userAgent: "GPTBot", allow: "/" },
  { userAgent: "ClaudeBot", allow: "/" },
  { userAgent: "PerplexityBot", allow: "/" },
],
```

---

## Priority 4 — Nice to Have (When Time Permits)

- Add `ItemList` schema to category pages for product carousels in SERPs
- Convert BreadcrumbList from Microdata to JSON-LD for consistency  
- Add `AggregateOffer` to products with multiple size variants
- Create a blog section for content marketing (buying guides, comparison articles)
- Add `hreflang` if expanding to other languages/regions
- Implement server-side search with `/search` page for site search box in Google

---

## Expected Impact After Fixes

| Metric | Current | After Fixes |
|--------|---------|-------------|
| SEO Score | 74/100 | ~88/100 |
| Indexable pages | 91 | 91+ |
| Rich results eligible | Product pages only | Products + Sitelinks + Organization |
| Social sharing | No image preview | Full OG previews |
| AI search visibility | Basic | Enhanced with llms.txt |
