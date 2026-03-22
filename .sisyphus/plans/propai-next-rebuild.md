# PropAI Next Rebuild

## TL;DR
> **Summary**: Rebuild the local `prototype/` landing page inside the current Next.js App Router app with near-identical visual structure, hosted legal/footer overrides, GSAP-based parallax enhancements, and a mock contact submission flow.
> **Deliverables**:
> - Single-page Next.js landing page with section-by-section parity
> - TanStack Query + Recoil provider architecture with minimal justified usage
> - React Hook Form contact form with dummy Next API route
> - Hosted-preview privacy/footer/legal updates reflected in the UI
> - GSAP reveal/parallax interactions with reduced-motion fallback
> **Effort**: Large
> **Parallel**: YES - 2 waves
> **Critical Path**: Task 1 -> Task 2 -> Task 4 -> Task 6 -> Task 8

## Context
### Original Request
Recreate the marketing site from `prototype/` in Next.js, keep the same look and style, use TanStack Query for server store, Recoil for client store, React Hook Form for form/validation, and GSAP for stronger parallax-style scroll interaction. Use the hosted preview only for changed privacy/footer/legal details. Build only a dummy API for the form; no real DB integration yet.

### Interview Summary
- Visual baseline is local `prototype/`.
- Hosted preview is an override source only for changed legal/privacy/footer details.
- Form scope is `UI + validation + dummy API route`; actual persistence is explicitly out.
- Verification stays lightweight: `lint`, `build`, and agent-executed browser QA scenarios.
- Scroll behavior should be upgraded from simple reveal into a more deliberate parallax treatment without changing the core brand feel.

### Metis Review (gaps addressed)
- Locked TanStack Query usage to mock form submission mutation and any route-backed request state only.
- Locked Recoil usage to client-only UI state such as modal/menu/active interaction state; no broad global-state expansion.
- Added explicit reduced-motion, hydration-boundary, and legal-content verification guardrails.
- Added parity checklist expectations for required prototype behaviors: typing hero, privacy modal, floating buttons, active nav highlighting, file-upload UX, and anchor navigation.

## Work Objectives
### Core Objective
Ship a production-ready Next.js landing page implementation that visually matches the prototype, preserves all agreed interactions, incorporates updated privacy/footer/legal content from the hosted preview, and uses the requested libraries in narrowly scoped, maintainable ways.

### Deliverables
- App Router landing page implementation replacing the starter homepage.
- Provider setup for TanStack Query and Recoil under a client-only provider boundary.
- Sectionized landing-page component architecture aligned to the prototype.
- Styling system that reproduces the prototype palette, spacing, typography, and responsive behavior.
- GSAP-based reveal + parallax motion system with reduced-motion fallback.
- React Hook Form + schema validation + dummy API route + success/error handling.
- Privacy-policy modal and updated footer/company/legal details.
- App Router metadata, robots, and sitemap equivalents aligned to prototype intent.

### Definition of Done (verifiable conditions with commands)
- `npm run lint` passes with no errors.
- `npm run build` completes successfully.
- Local browser QA confirms all required sections render in prototype order and all anchor links navigate with fixed-header offset.
- Browser QA confirms privacy modal, mobile menu, floating buttons, typing hero, reveal/parallax effects, and form validation/submission behavior.
- `curl` verification against the dummy API route returns deterministic success and failure payloads.

### Must Have
- Near-identical content structure to `prototype/index.html` with hosted-preview privacy/footer/legal overrides.
- `Noto Sans KR` or a Next-managed equivalent that preserves Korean visual density.
- GSAP scoped to client components using safe cleanup.
- RHF validation implemented with a single explicit schema strategy.
- File-upload UX preserved visually; payload remains dummy/no persistence.
- Reduced-motion handling for animated sections.

### Must NOT Have (guardrails, AI slop patterns, scope boundaries)
- No real DB, email delivery, object storage, analytics, CMS, CAPTCHA, or admin tooling.
- No full-site client rendering just to support animations.
- No broad design-system abstraction unrelated to this landing page.
- No uncontrolled library sprawl beyond required packages and minimal supporting validation/icon utilities.
- No replacement of core prototype layout/content order with a new interpretation.

## Verification Strategy
> ZERO HUMAN INTERVENTION — all verification is agent-executed.
- Test decision: none for committed automated tests; verification uses `eslint`, `next build`, `curl`, and browser QA.
- QA policy: Every task includes agent-executed scenarios.
- Evidence: `.sisyphus/evidence/task-{N}-{slug}.{ext}`

## Execution Strategy
### Parallel Execution Waves
> Target: 5-8 tasks per wave. <3 per wave (except final) = under-splitting.
> Extract shared dependencies as Wave-1 tasks for max parallelism.

Wave 1: foundation, architecture, parity scaffolding, styling baseline, legal-content mapping
Wave 2: interactions, form/API flow, metadata/assets, QA hardening

### Dependency Matrix (full, all tasks)
| Task | Depends On | Notes |
|---|---|---|
| 1 | - | Establishes package/runtime foundation |
| 2 | 1 | Creates provider and app shell |
| 3 | 1 | Maps prototype sections into component structure |
| 4 | 2, 3 | Rebuilds full styling/responsive parity |
| 5 | 3, 4 | Applies hosted legal/privacy/footer overrides |
| 6 | 4, 5 | Adds GSAP and interaction behavior |
| 7 | 2, 4, 5 | Implements RHF form, file UX, and mock API |
| 8 | 5, 6, 7 | Final metadata, robots/sitemap, QA fixes |

### Agent Dispatch Summary (wave -> task count -> categories)
- Wave 1 -> 5 tasks -> `unspecified-high`, `visual-engineering`
- Wave 2 -> 3 tasks -> `visual-engineering`, `unspecified-high`

## TODOs
> Implementation + Test = ONE task. Never separate.
> EVERY task MUST have: Agent Profile + Parallelization + QA Scenarios.

- [x] 1. Install and lock the landing-page runtime foundation

  **What to do**: Add the minimum required dependencies for this scope: TanStack Query, Recoil, React Hook Form, a schema resolver with one validation library, GSAP with `@gsap/react`, and a React icon package if Font Awesome CDN is not reused. Preserve Next 16 / React 19 compatibility. Update scripts only if needed for lint/build/type-safe execution without introducing test infra.
  **Must NOT do**: Do not add Playwright, Vitest, Cypress, real backend SDKs, email providers, storage SDKs, analytics, or animation libraries outside GSAP.

  **Recommended Agent Profile**:
  - Category: `unspecified-high` — Reason: dependency/version decisions affect the whole app.
  - Skills: [] — No special skill required.
  - Omitted: [`playwright`] — No committed e2e setup in scope.

  **Parallelization**: Can Parallel: YES | Wave 1 | Blocks: [2, 3, 4, 6, 7, 8] | Blocked By: [-]

  **References**:
  - Pattern: `package.json:1` — Current runtime baseline and scripts.
  - Pattern: `AGENTS.md:1` — Must verify current Next.js docs before implementation because this repo uses a breaking Next variant.
  - External: `https://tanstack.com/query/latest/docs/framework/react/installation` — TanStack Query install guidance.
  - External: `https://recoiljs.org/docs/introduction/installation` — Recoil install guidance.
  - External: `https://react-hook-form.com/get-started` — RHF install guidance.
  - External: `https://gsap.com/resources/React/` — GSAP React integration guidance.

  **Acceptance Criteria**:
  - [ ] `package.json` includes only the agreed libraries needed for scope.
  - [ ] `npm run lint` remains available.
  - [ ] `npm run build` can run after the rest of the work without dependency conflicts.

  **QA Scenarios**:
  ```text
  Scenario: Dependency graph is correctly installed
    Tool: Bash
    Steps: Run `npm ls @tanstack/react-query recoil react-hook-form gsap @gsap/react` from repo root.
    Expected: All required packages resolve without missing dependency errors.
    Evidence: .sisyphus/evidence/task-1-runtime.txt

  Scenario: No out-of-scope packages slipped in
    Tool: Bash
    Steps: Run `npm ls @playwright/test vitest cypress resend @supabase/supabase-js` from repo root.
    Expected: Command shows packages absent or unresolved for all out-of-scope packages.
    Evidence: .sisyphus/evidence/task-1-runtime-error.txt
  ```

  **Commit**: YES | Message: `chore(app): add landing page runtime dependencies` | Files: [`package.json`, lockfile]

- [x] 2. Build the App Router shell and provider boundary

  **What to do**: Replace starter-shell assumptions with a landing-page root structure. Create a single client-side providers wrapper mounted from `app/layout.tsx` that composes `QueryClientProvider` and `RecoilRoot`. Keep the page itself server-first where possible and isolate client logic to children that need hooks/browser APIs.
  **Must NOT do**: Do not convert the entire app tree to `'use client'`. Do not hydrate static marketing content through Recoil or TanStack Query.

  **Recommended Agent Profile**:
  - Category: `unspecified-high` — Reason: app-shell boundaries and provider placement are architecture-sensitive.
  - Skills: [] — No special skill required.
  - Omitted: [`frontend-ui-ux`] — This is structural, not visual.

  **Parallelization**: Can Parallel: NO | Wave 1 | Blocks: [4, 7] | Blocked By: [1]

  **References**:
  - Pattern: `app/layout.tsx:1` — Current root layout to replace/extend.
  - Pattern: `app/page.tsx:3` — Current starter page to replace.
  - External: `https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr` — Provider and hydration boundary guidance.
  - External: `https://recoiljs.org/docs/api-reference/core/RecoilRoot/` — Client-only root guidance.

  **Acceptance Criteria**:
  - [ ] Providers are created in a dedicated client wrapper rather than in server-only files.
  - [ ] `app/layout.tsx` stays server-rendered while mounting the provider wrapper.
  - [ ] Static page sections can remain server components unless they require client-only behavior.

  **QA Scenarios**:
  ```text
  Scenario: App renders without provider boundary errors
    Tool: Bash
    Steps: Run `npm run build` after provider and shell changes.
    Expected: Build succeeds without `window is not defined`, hook-boundary, or provider-context errors.
    Evidence: .sisyphus/evidence/task-2-shell.txt

  Scenario: Client-only hooks are not leaking into server root
    Tool: Bash
    Steps: Run `npm run lint`.
    Expected: No lint or compile errors related to server/client boundary misuse in `app/layout.tsx` or page entry files.
    Evidence: .sisyphus/evidence/task-2-shell-error.txt
  ```

  **Commit**: YES | Message: `feat(app): add shared provider shell` | Files: [`app/layout.tsx`, `app/page.tsx`, provider files]

- [x] 3. Rebuild the landing-page content structure from the prototype

  **What to do**: Convert the prototype into a sectionized Next implementation: header, hero, about, tech leadership, why, services, process, quote banner, contact, footer, floating buttons, and privacy modal entry point. Preserve section order, Korean copy, CTA hierarchy, and anchor IDs. Break repeated UI into pragmatic reusable components only where repetition is real.
  **Must NOT do**: Do not redesign section order, rewrite large blocks of approved copy, or collapse all content into one oversized client component.

  **Recommended Agent Profile**:
  - Category: `visual-engineering` — Reason: section architecture and semantic parity are core UI work.
  - Skills: [`frontend-ui-ux`] — Needed for layout and component organization.
  - Omitted: [`playwright`] — Verification remains outside implementation.

  **Parallelization**: Can Parallel: YES | Wave 1 | Blocks: [4, 5, 6, 8] | Blocked By: [1]

  **References**:
  - Pattern: `prototype/index.html:99` — Header structure and nav items.
  - Pattern: `prototype/index.html:121` — Hero structure and CTA hierarchy.
  - Pattern: `prototype/index.html:167` — About section content.
  - Pattern: `prototype/index.html:222` — Tech leadership section content.
  - Pattern: `prototype/index.html:359` — Why section content.
  - Pattern: `prototype/index.html:396` — Services section content.
  - Pattern: `prototype/index.html:469` — Process section content.
  - Pattern: `prototype/index.html:536` — Quote banner CTA block.
  - Pattern: `prototype/index.html:551` — Contact form and sidebar layout.
  - Pattern: `prototype/index.html:721` — Footer and floating actions.

  **Acceptance Criteria**:
  - [ ] All prototype sections exist in the same order with matching anchor IDs.
  - [ ] Required CTA links point to the correct in-page anchors or `tel:`/external targets.
  - [ ] The privacy trigger exists in the footer entry area even before styling polish.

  **QA Scenarios**:
  ```text
  Scenario: All required sections render in the correct order
    Tool: Chrome DevTools
    Steps: Load local page, take an accessibility snapshot, verify section text appears in order: hero -> about -> tech -> why -> services -> process -> contact -> footer.
    Expected: All sections are present once, in sequence, with Korean section headings matching the prototype.
    Evidence: .sisyphus/evidence/task-3-structure.txt

  Scenario: Anchor structure is intact
    Tool: Chrome DevTools
    Steps: Click each header nav item and inspect URL hash/scroll target.
    Expected: Each nav item lands on the intended section without broken anchors.
    Evidence: .sisyphus/evidence/task-3-structure-error.txt
  ```

  **Commit**: YES | Message: `feat(home): scaffold landing page sections` | Files: [`app/page.tsx`, landing-page components]

- [x] 4. Recreate the prototype styling system and responsive parity

  **What to do**: Port the prototype’s design language into the Next app: Naver green palette, glass header, card treatments, spacing rhythm, typography scale, section wrappers, shadows, radii, and responsive layout changes at desktop/tablet/mobile breakpoints. Use either global CSS plus component classes or a minimal hybrid with Tailwind utilities, but keep one coherent styling strategy. Use a Next-managed Korean font setup that reproduces the original visual tone closely.
  **Must NOT do**: Do not leave the starter Tailwind theme intact, mix three styling paradigms, or introduce a different visual identity.

  **Recommended Agent Profile**:
  - Category: `visual-engineering` — Reason: this is the core parity/styling task.
  - Skills: [`frontend-ui-ux`] — Required for precise visual recreation.
  - Omitted: [`dev-browser`] — Implementation first; browser inspection belongs in QA.

  **Parallelization**: Can Parallel: NO | Wave 1 | Blocks: [5, 6, 7, 8] | Blocked By: [2, 3]

  **References**:
  - Pattern: `prototype/css/style.css:10` — Root color variables and token set.
  - Pattern: `prototype/css/style.css:54` — Container sizing and base section spacing.
  - Pattern: `prototype/css/style.css:153` — Fixed glass header treatment.
  - Pattern: `prototype/css/style.css:252` — Hero background and visual motif.
  - Pattern: `prototype/css/style.css:390` — About section two-column layout.
  - Pattern: `prototype/css/style.css:482` — Tech card and project grid styling.
  - Pattern: `prototype/css/style.css:638` — Why card styling.
  - Pattern: `prototype/css/style.css:699` — Service card styling.
  - Pattern: `prototype/css/style.css:867` — Contact form/sidebar layout.
  - Pattern: `prototype/css/style.css:1231` — Responsive breakpoints.
  - Pattern: `app/globals.css:1` — Existing global entry point to replace.

  **Acceptance Criteria**:
  - [ ] Core palette values visually match prototype intent, including `#03C75A` primary emphasis.
  - [ ] Desktop/tablet/mobile layouts follow the prototype breakpoint behavior.
  - [ ] Typography and spacing eliminate all starter-template styles.

  **QA Scenarios**:
  ```text
  Scenario: Desktop styling matches prototype structure
    Tool: Chrome DevTools
    Steps: Open page at 1440x1400, inspect header, hero, service grid, contact split layout, and footer.
    Expected: Fixed blurred header, hero gradient/orbs, 3-column services, 2-column contact, and dark footer all appear with no starter Next styles visible.
    Evidence: .sisyphus/evidence/task-4-styling-desktop.png

  Scenario: Responsive layout collapses correctly
    Tool: Chrome DevTools
    Steps: Resize to 768x1200 and 390x844, then inspect nav, hero stats, service cards, and contact form layout.
    Expected: Hamburger nav appears, grids collapse as expected, hero stats stack, and contact form/sidebar become single-column without overflow.
    Evidence: .sisyphus/evidence/task-4-styling-mobile.png
  ```

  **Commit**: YES | Message: `feat(home): implement landing page styling parity` | Files: [`app/globals.css`, component styles, font setup]

- [x] 5. Apply hosted legal, privacy, and footer overrides

  **What to do**: Merge the hosted-preview legal deltas into the prototype-based page: updated business registration number, privacy-policy trigger in footer, privacy modal content, and any hosted-contact/footer text changes. Preserve the rest of the prototype copy unless the hosted override clearly changes it. Ensure legal copy is rendered as application content rather than hidden external HTML.
  **Must NOT do**: Do not invent legal text, truncate the policy, or silently keep contradictory values from the local prototype when hosted overrides exist.

  **Recommended Agent Profile**:
  - Category: `unspecified-high` — Reason: content accuracy matters more than visuals here.
  - Skills: [] — No special skill required.
  - Omitted: [`frontend-ui-ux`] — This is primarily content/legal integration.

  **Parallelization**: Can Parallel: YES | Wave 1 | Blocks: [6, 7, 8] | Blocked By: [3, 4]

  **References**:
  - Pattern: `prototype/index.html:721` — Existing footer structure to extend.
  - Pattern: hosted preview HTML fetched on 2026-03-22 — Adds `privacyBtn`, `privacyOverlay`, business registration number, and legal modal content.
  - Pattern: `prototype/index.html:644` — Contact sidebar content that may need hosted overrides.

  **Acceptance Criteria**:
  - [ ] Footer shows the updated business registration number and privacy-policy trigger.
  - [ ] Privacy modal opens with the hosted-preview legal content rendered in full.
  - [ ] Contact/footer/company values are internally consistent across all occurrences.

  **QA Scenarios**:
  ```text
  Scenario: Footer legal details match hosted override
    Tool: Chrome DevTools
    Steps: Scroll to footer and inspect business registration number, privacy button label, and company info block.
    Expected: Updated registration number and privacy trigger are visible and consistent.
    Evidence: .sisyphus/evidence/task-5-legal-footer.png

  Scenario: Privacy modal content is present and accessible
    Tool: Chrome DevTools
    Steps: Click privacy button, verify modal opens, confirm heading `개인정보처리방침`, then close via close button and overlay/Escape.
    Expected: Modal opens/closes reliably, focus is restored, and core legal sections are readable.
    Evidence: .sisyphus/evidence/task-5-legal-modal.txt
  ```

  **Commit**: YES | Message: `feat(home): add privacy modal and legal overrides` | Files: [landing-page components, content constants]

- [x] 6. Implement GSAP interactions and enhanced parallax motion

  **What to do**: Replace the prototype’s plain IntersectionObserver reveal with GSAP-based, scope-safe motion. Preserve existing interaction behaviors where required: sticky-header scroll state, hero typing effect, smooth anchored navigation, floating top button visibility, active nav highlight, and subtle section reveals. Add stronger but tasteful parallax to hero background shapes, quote-banner depth, and selected cards or section media wrappers. Honor reduced-motion settings and keep animations content-safe.
  **Must NOT do**: Do not animate every element independently, create scroll-jank, pin sections unnecessarily, or break readability for Korean text blocks.

  **Recommended Agent Profile**:
  - Category: `visual-engineering` — Reason: motion design and browser behavior are central.
  - Skills: [`frontend-ui-ux`] — Needed for tasteful interaction design.
  - Omitted: [`playwright`] — Motion verification stays in QA, not implementation infra.

  **Parallelization**: Can Parallel: NO | Wave 2 | Blocks: [8] | Blocked By: [4, 5]

  **References**:
  - Pattern: `prototype/js/main.js:15` — Header scroll state.
  - Pattern: `prototype/js/main.js:43` — Reveal behavior to supersede with GSAP.
  - Pattern: `prototype/js/main.js:58` — Typing effect behavior.
  - Pattern: `prototype/js/main.js:95` — Floating top button behavior.
  - Pattern: `prototype/js/main.js:106` — Fixed-header anchor scroll offset.
  - Pattern: `prototype/js/main.js:275` — Active nav highlight behavior.
  - Pattern: `prototype/css/style.css:263` — Hero orb layers suitable for parallax.
  - Pattern: `prototype/css/style.css:824` — Quote-banner atmosphere suitable for depth motion.
  - External: `https://gsap.com/resources/React/` — `useGSAP` and cleanup requirements.

  **Acceptance Criteria**:
  - [ ] GSAP is initialized only in client components with cleanup-safe scoping.
  - [ ] Hero, selected section accents, and banner depth show stronger parallax than the prototype without harming readability.
  - [ ] `prefers-reduced-motion` disables or softens non-essential motion.

  **QA Scenarios**:
  ```text
  Scenario: Enhanced motion works on desktop
    Tool: Chrome DevTools
    Steps: Open page at desktop width, scroll from hero through quote banner, observe header state, reveal timing, parallax drift, top button, and active nav highlighting.
    Expected: Motion is visible but stable; hero/background elements move at differing rates; top button appears after threshold; active nav updates with scroll.
    Evidence: .sisyphus/evidence/task-6-motion.mp4

  Scenario: Reduced-motion fallback is respected
    Tool: Chrome DevTools
    Steps: Emulate `prefers-reduced-motion: reduce`, reload page, then scroll through the same sections.
    Expected: Content remains usable with animations removed or significantly softened; no hidden content depends on motion to become visible.
    Evidence: .sisyphus/evidence/task-6-motion-reduced.txt
  ```

  **Commit**: YES | Message: `feat(home): add gsap parallax and interaction behavior` | Files: [animation helpers, interactive components]

- [x] 7. Rebuild the contact experience with RHF, file UX, and a dummy API route

  **What to do**: Recreate the contact form using React Hook Form plus one explicit schema validation strategy, preserve the prototype’s file-drop interaction and field set, and wire submit to a mock Next route handler. Use TanStack Query mutation for submission state and Recoil only for client UI state if needed (for example success modal/overlay state only if local state is insufficient). The dummy API must accept the agreed payload shape, reject invalid payloads, simulate success/failure deterministically, and never persist data.
  **Must NOT do**: Do not add real DB writes, object storage uploads, email sending, or multipart persistence. Do not move simple input state into Recoil unnecessarily.

  **Recommended Agent Profile**:
  - Category: `unspecified-high` — Reason: form contracts, validation, and route handling need precision.
  - Skills: [] — No special skill required.
  - Omitted: [`frontend-ui-ux`] — Visual styling should already be established.

  **Parallelization**: Can Parallel: YES | Wave 2 | Blocks: [8] | Blocked By: [2, 4, 5]

  **References**:
  - Pattern: `prototype/index.html:564` — Full field inventory and form structure.
  - Pattern: `prototype/index.html:607` — File-drop zone UI.
  - Pattern: `prototype/index.html:618` — Privacy agreement checkbox.
  - Pattern: `prototype/index.html:633` — Success state content.
  - Pattern: `prototype/js/main.js:119` — File UX rules (type, count, size, duplicate handling).
  - Pattern: `prototype/js/main.js:195` — Validation logic and error-display behavior.
  - Pattern: `prototype/js/main.js:242` — Prototype payload keys.
  - External: `https://react-hook-form.com/get-started` — RHF form wiring.
  - External: `https://tanstack.com/query/latest/docs/framework/react/guides/mutations` — Mutation guidance.

  **Acceptance Criteria**:
  - [ ] Required fields, phone format, email format, message, and privacy checkbox are validated inline.
  - [ ] File UI enforces allowed extensions, 10MB-per-file limit, max 5 files, and duplicate suppression.
  - [ ] Dummy API returns success for valid payloads and structured errors for invalid payloads.
  - [ ] Success UI matches the prototype flow without implying real persistence.

  **QA Scenarios**:
  ```text
  Scenario: Valid form submission succeeds through mock API
    Tool: Chrome DevTools
    Steps: Fill name, phone, email, service type, message, check privacy, optionally add one valid file, submit form.
    Expected: Submit button enters loading state, request succeeds, and success panel replaces the form.
    Evidence: .sisyphus/evidence/task-7-form-success.png

  Scenario: Invalid form and API rejection both surface correctly
    Tool: Chrome DevTools
    Steps: Try submitting with empty required fields, then trigger an API failure path using a known invalid payload value defined by the mock route.
    Expected: Inline field errors appear first; API failure path shows a non-crashing error state/message and re-enables submit.
    Evidence: .sisyphus/evidence/task-7-form-error.png

  Scenario: Mock API contract is deterministic
    Tool: Bash
    Steps: Run `curl` POST requests against the local route with one valid JSON body and one invalid JSON body.
    Expected: Valid request returns 2xx JSON success shape; invalid request returns 4xx JSON error shape; neither persists data.
    Evidence: .sisyphus/evidence/task-7-form-api.txt
  ```

  **Commit**: YES | Message: `feat(contact): add rhf form and mock submission route` | Files: [form components, schema files, route handler]

- [x] 8. Finalize metadata, app assets, and QA hardening

  **What to do**: Replace starter metadata with production landing-page metadata, carry over the prototype SEO intent into App Router-friendly metadata configuration, and align `robots`/`sitemap` handling to the current Next app setup. Finish accessibility and interaction hardening: privacy modal focus behavior, anchor offset correctness, mobile menu close behavior, no overflow, and content consistency. Remove starter leftovers from the page and public assets only where they are unused.
  **Must NOT do**: Do not fabricate unavailable OG assets, overpromise search-console integrations, or leave conflicting starter metadata in place.

  **Recommended Agent Profile**:
  - Category: `unspecified-high` — Reason: polish spans metadata, accessibility, and correctness.
  - Skills: [] — No special skill required.
  - Omitted: [`frontend-ui-ux`] — Styling should already be stable.

  **Parallelization**: Can Parallel: NO | Wave 2 | Blocks: [Final Verification Wave] | Blocked By: [5, 6, 7]

  **References**:
  - Pattern: `prototype/index.html:7` — Title, description, keyword, canonical, OG, and JSON-LD intent.
  - Pattern: `prototype/robots.txt` — Crawl baseline.
  - Pattern: `prototype/sitemap.xml` — Sitemap baseline.
  - Pattern: `app/layout.tsx:15` — Starter metadata to replace.
  - Pattern: `README.md:1` — Starter references that should not leak into production UI.

  **Acceptance Criteria**:
  - [ ] App metadata reflects PropAI branding rather than starter Next content.
  - [ ] Robots/sitemap handling exists in an App Router-compatible form.
  - [ ] No starter logos/text/assets appear on the landing page.
  - [ ] Final lint/build pass succeeds after all QA fixes.

  **QA Scenarios**:
  ```text
  Scenario: Metadata and starter cleanup are complete
    Tool: Chrome DevTools
    Steps: Open page source or inspect document title/metadata and visible UI.
    Expected: Page title and description are PropAI-specific; no Vercel/Next starter branding remains in UI.
    Evidence: .sisyphus/evidence/task-8-metadata.txt

  Scenario: Final quality gate passes
    Tool: Bash
    Steps: Run `npm run lint && npm run build`.
    Expected: Both commands pass cleanly.
    Evidence: .sisyphus/evidence/task-8-quality.txt
  ```

  **Commit**: YES | Message: `chore(home): finalize metadata legal polish and qa fixes` | Files: [`app/layout.tsx`, metadata files, public assets, related components]

## Final Verification Wave (4 parallel agents, ALL must APPROVE)
- [x] F1. Plan Compliance Audit — oracle
- [x] F2. Code Quality Review — unspecified-high
- [x] F3. Real Manual QA — unspecified-high (+ playwright if UI)
- [x] F4. Scope Fidelity Check — deep

## Commit Strategy
- Use thin, atomic commits aligned to vertical slices: dependencies/providers, section scaffolding, styling parity, interactions, form/mock API, metadata/legal polish.
- Do not commit generated or irrelevant files.

## Success Criteria
- The Next.js homepage matches the prototype layout and hosted legal/footer deltas closely across desktop, tablet, and mobile.
- The requested libraries are installed and used for the specific responsibilities agreed in scope.
- The contact experience behaves realistically with validation and mock submission, without implying real persistence.
- Motion feels richer than the prototype while remaining performant, scoped, and accessible.
