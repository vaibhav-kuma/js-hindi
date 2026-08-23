# Full Remediation Plan — Vaibhav Kumar Portfolio

**Generated:** 2026-08-23  
**Scope:** All 10 identified issues across critical, high, medium, low priority

---

## Issue 1: Missing Contact Information (Critical)

**Files:** `src/data/site.ts:24-26`

**Problem:** Email, LinkedIn URL, and Resume URL are empty placeholders.

**Tasks:**
- [ ] Replace `email: ""` with actual contact email
- [ ] Replace `linkedinUrl: ""` with LinkedIn profile URL
- [ ] Verify `resumeUrl` points to actual resume (currently GitHub)
- [ ] Add validation in layout.tsx to warn if contact fields empty at build time

**Validation:** Build succeeds, contact links in Footer/Contact section work, no placeholder text visible.

---

## Issue 2: No GitHub Token for Live Data Enrichment (Critical)

**Files:** `.env.example`, `src/lib/github.ts`, `src/data/projects.ts`

**Problem:** `GITHUB_TOKEN` optional but empty; project statistics hardcoded and stale.

**Tasks:**
- [ ] Add `GITHUB_TOKEN` to `.env.local` (user-provided, not committed)
- [ ] Enhance `src/lib/github.ts` to fetch live repo stats (stars, forks, pushedAt)
- [ ] Create build-time script to enrich `projects.ts` statistics from GitHub API
- [ ] Add fallback to hardcoded values if API fails/rate-limited
- [ ] Cache GitHub responses to avoid rate limits during dev builds

**Validation:** `npm run build` fetches live stats; stars/forks/lastPush reflect GitHub reality.

---

## Issue 3: No Test Suite (High)

**Files:** `package.json`, (new) `vitest.config.ts`, (new) `tests/`

**Problem:** Zero tests — no unit, integration, or e2e coverage.

**Tasks:**
- [ ] Add Vitest + React Testing Library for unit/component tests
- [ ] Add Playwright for e2e tests (critical user flows)
- [ ] Add `test` and `test:ci` scripts to `package.json`
- [ ] Write tests for:
  - `cn()` utility (clsx + tailwind-merge)
  - `formatDate()` / `formatMonthYear()`
  - Blog post parsing (`src/lib/blog/index.ts`)
  - Project data validation (slugs, tiers, required fields)
  - 3D quality tier logic (`src/lib/three/quality.ts`)
  - Homepage renders all sections
  - Blog index pagination
  - Case study page loads project by slug
- [ ] Configure coverage thresholds (min 80% for utils/lib)

**Validation:** `npm run test:ci` passes in CI; coverage report generated.

---

## Issue 4: No CI/CD Pipeline (High)

**Files:** (new) `.github/workflows/ci.yml`, (new) `.github/workflows/deploy.yml`

**Problem:** No automated lint/typecheck/build on PR; no deployment config.

**Tasks:**
- [ ] Create `.github/workflows/ci.yml`:
  - Run on PR/push to main
  - Jobs: `lint`, `typecheck`, `test`, `build`
  - Cache `node_modules` and `.next`
  - Fail fast on any job failure
- [ ] Create `.github/workflows/deploy.yml` (manual trigger or main branch):
  - Build production artifact
  - Deploy to Vercel/Netlify/Cloudflare Pages (user chooses target)
  - Require `NEXT_PUBLIC_SITE_URL` and `GITHUB_TOKEN` secrets
- [ ] Add status badge to README.md

**Validation:** PR shows all checks passing; main branch deploys automatically.

---

## Issue 5: Blog Build Resilience (High)

**Files:** `src/lib/blog/index.ts`, `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`

**Problem:** `content/blog` directory may not exist in all deployments; empty state not handled gracefully.

**Tasks:**
- [ ] Ensure `content/blog` exists in repo (add `.gitkeep` if empty)
- [ ] Add build-time check: warn if no posts found (not error)
- [ ] Handle empty posts array in BlogIndexPage (show "No posts yet" message)
- [ ] Add `generateStaticParams` for `/blog/tag/[tag]` page (currently missing)

**Validation:** Build succeeds with zero posts; tag pages generate correctly.

---

## Issue 6: Duplicate Projects Across Tiers (Medium)

**Files:** `src/data/projects.ts`

**Problem:** VADT, DarkExposure, legacy-lift-ai appear in both `featuredProjects` and `secondaryProjects`.

**Tasks:**
- [ ] Decide: keep featured projects OUT of secondary list (recommended)
- [ ] Remove duplicates from `secondaryProjects` array
- [ ] Update `ProjectsUniverse.tsx` to only show unique projects
- [ ] Verify "secondary experimental surface" count matches array length

**Validation:** No duplicate slugs across tiers; universe shows 5 featured, secondary shows remaining.

---

## Issue 7: Accessibility Gaps (Medium)

**Files:** `src/components/three/SceneCanvas.tsx`, `src/components/layout/Header.tsx`, `src/components/sections/Hero.tsx`, `src/components/sections/ProjectsUniverse.tsx`

**Problem:** 3D canvas lacks screen-reader alternatives; mobile nav state not announced; some interactive elements missing ARIA.

**Tasks:**
- [ ] Add descriptive `aria-label` to each `SceneCanvas` explaining the 3D content
- [ ] Provide text-based fallback summary for each 3D scene (visually hidden but readable)
- [ ] Add `aria-live="polite"` region for mobile nav open/close announcements
- [ ] Ensure all icon-only buttons have `aria-label` (check Header, Hero CTA, Contact links)
- [ ] Verify focus order on mobile nav (Tab cycles correctly)
- [ ] Add `prefers-reduced-motion` test in CI (Playwright)

**Validation:** axe-core scan passes; screen reader reads meaningful descriptions; keyboard navigation works.

---

## Issue 8: SEO & Metadata Gaps (Medium)

**Files:** `src/app/blog/tag/[tag]/page.tsx`, (new) `src/app/sitemap.ts`, (new) `src/app/robots.ts`, `next.config.ts`

**Problem:** Tag pages lack static params; no sitemap.xml; no robots.txt.

**Tasks:**
- [ ] Add `generateStaticParams` to `/blog/tag/[tag]/page.tsx` using `getAllTagsList()`
- [ ] Create `src/app/sitemap.ts` generating sitemap from:
  - Static routes (/, /blog, /projects/[slug], /blog/[slug], /blog/tag/[tag])
  - Dynamic project slugs from `featuredProjects`
  - Blog post slugs from `getAllSlugs()`
- [ ] Create `src/app/robots.ts` allowing all, pointing to sitemap
- [ ] Verify `metadataBase` in layout.tsx matches deployment domain
- [ ] Add JSON-LD for `WebSite` and `BlogPosting` (already partially done)

**Validation:** `npm run build` generates `public/sitemap.xml` and `public/robots.txt`; all pages have proper metadata.

---

## Issue 9: 3D Performance Optimization (Low)

**Files:** `src/components/three/DigitalCore.tsx`, `src/components/three/ProjectUniverseScene.tsx`, `src/lib/three/quality.ts`

**Problem:** Heavy particle counts and geometry on lower-tier devices; no progressive loading.

**Tasks:**
- [ ] Reduce `QUALITY.low.particleCount` from 130 → 80
- [ ] Reduce `QUALITY.medium.particleCount` from 380 → 250
- [ ] Add `Suspense` boundaries around 3D canvases with lighter fallbacks
- [ ] Implement `IntersectionObserver` to mount 3D scenes only when near viewport
- [ ] Profile with Chrome DevTools Performance tab; target <16ms frame on mid-tier mobile
- [ ] Consider removing shadows entirely (already disabled in quality config)

**Validation:** Lighthouse Performance score ≥90 on mobile; no jank on scroll.

---

## Issue 10: Unused TypeScript Export (Low)

**Files:** `src/components/three/SceneCanvas.tsx:70`

**Problem:** `SceneProps` type defined but never used.

**Tasks:**
- [ ] Remove unused `SceneProps` type alias
- [ ] Run `npm run typecheck` to confirm no regressions

**Validation:** Typecheck passes; no dead code.

---

## Dependency Graph

```
Issue 1 (Contact) ──────────────────────────────┐
Issue 2 (GitHub Token) ─────────────────────────┤
Issue 3 (Tests) ────────────────────────────────┼──► Issue 4 (CI/CD)
Issue 5 (Blog Resilience) ──────────────────────┤
Issue 6 (Duplicates) ───────────────────────────┤
Issue 7 (A11y) ─────────────────────────────────┤
Issue 8 (SEO) ──────────────────────────────────┘
Issue 9 (Perf) ─────────────────────────────────► Independent
Issue 10 (Dead Code) ───────────────────────────► Independent
```

---

## Execution Order (Recommended)

1. **Issues 1, 2, 10** — Quick wins, unblock CI
2. **Issues 3, 4** — Infrastructure for all future work
3. **Issues 5, 6, 8** — Content/SEO correctness
4. **Issue 7** — Accessibility compliance
5. **Issue 9** — Performance polish

---

## Open Questions for User

| # | Question | Recommended Answer |
|---|----------|-------------------|
| 1 | What is the actual contact email? | (User provides) |
| 2 | What is the LinkedIn profile URL? | (User provides) |
| 3 | What is the real resume URL? | (User provides or keep GitHub) |
| 4 | GitHub Personal Access Token (classic, `public_repo` scope)? | User adds to `.env.local` and GitHub Secrets |
| 5 | Deployment target for CI/CD? | Vercel (recommended for Next.js) |
| 6 | Keep duplicate projects in secondary list? | **No** — remove from secondary |
| 7 | Coverage threshold for CI? | 80% lines/functions/branches |
| 8 | Preferred e2e test scenarios? | Homepage load, blog pagination, project case study navigation |

---

## Validation Checklist (Post-Implementation)

- [ ] `npm run lint` — zero errors
- [ ] `npm run typecheck` — zero errors
- [ ] `npm run test:ci` — all pass, coverage ≥80%
- [ ] `npm run build` — succeeds, generates sitemap.xml/robots.txt
- [ ] GitHub Actions CI — green on PR
- [ ] Deploy preview — loads correctly, 3D works, contact links work
- [ ] axe-core accessibility scan — zero violations
- [ ] Lighthouse mobile performance — ≥90
- [ ] All 5 featured projects render in universe; secondary list has no duplicates