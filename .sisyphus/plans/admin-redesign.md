# `/admin` redesign plan

## Goal
Improve the `/admin` screen so it feels organized, breathable, and easier to scan, while preserving the existing data flow and visual language already defined in this repo.

## Findings
- The clutter problem is centered on `app/admin/consulation-list.tsx`, not the login card.
- `app/admin/page.tsx` should stay mostly unchanged because it only handles auth state and data fetching.
- The repo already has a clear token system in `app/globals.css` for colors, radii, shadows, buttons, and spacing.
- Stitch is best used here to generate and iteratively refine the admin list screen structure before code changes.

## Scope
### In scope
- Redesign the authenticated `/admin` list screen using Stitch MCP.
- Improve visual hierarchy, whitespace, card structure, and table readability.
- Keep the current content model: title, logout action, consultation list, file download actions, and empty state.
- Implement the approved design in `app/admin/consulation-list.tsx`.
- Make minimal supporting adjustments in `app/admin/admin-login.tsx` only if needed for visual consistency.

### Out of scope
- Changing Supabase queries or authentication logic.
- Reworking `/admin` routing structure.
- Broad design refactors outside the admin area.

## Execution plan
1. Create a new Stitch project dedicated to the `/admin` redesign.
2. Generate a desktop-first admin dashboard/list screen from a focused prompt that keeps the current information architecture but improves:
   - page-level spacing
   - header hierarchy
   - separation between shell, summary, and table area
   - table density/readability
   - action clarity
   - empty/loading state presentation
3. If the first draft is close but still busy, run one iterative `edit_screens` pass to tighten hierarchy and spacing.
4. Translate the approved Stitch direction into `app/admin/consulation-list.tsx`, reusing existing tokens and shared visual patterns from `app/globals.css`.
5. Leave `app/admin/page.tsx` logic intact unless a tiny presentation-only change is required.
6. Verify with diagnostics, lint/build if applicable, and browser QA on `/admin`.

## Files expected to change
- `app/admin/consulation-list.tsx`
- `app/admin/admin-login.tsx` (optional, only if alignment tweaks are needed)
- `app/globals.css` (only if minimal shared admin styles are truly needed)

## Design direction for Stitch
- Use the existing brand tokens already present in the repo: green primary, soft gray surfaces, rounded cards, subtle borders, elevated white panels.
- Turn the current single large container into clearer layers:
  - page shell
  - top header/action row
  - optional lightweight stats or meta strip if it helps orientation
  - main data card with a clearer table header and more deliberate spacing
- Keep the screen desktop-first, but avoid layouts that collapse poorly on narrower widths.
- Preserve a professional admin tone rather than a marketing-page aesthetic.

## Verification
- `lsp_diagnostics` on all changed files must be clean.
- Run repo validation (`npm run lint`, and build if the touched area requires it).
- Manual QA via Chrome DevTools browser tools must include these exact checks:
  1. Open `/admin` locally.
  2. Log in with the current credentials defined in `app/admin/admin-login.tsx`.
  3. Confirm the authenticated admin screen renders with the redesigned spacing/hierarchy intact.
  4. Confirm the logout action returns the user to the login screen.
  5. Confirm the empty state remains readable and well spaced when there are no consultations.
  6. If consultation rows exist locally, confirm the table remains scannable, long content does not break layout, and file download actions still open the expected public URLs.

## Commit / implementation checkpoints
- Keep the implementation in small, reviewable checkpoints: Stitch direction finalized first, then TSX layout updates, then any minimal shared CSS additions.
- If validation fails after a checkpoint, fix before expanding scope.

## Risks / watchpoints
- Avoid over-designing the screen beyond what the current data model supports.
- Avoid adding too many one-off styles when existing tokens/classes already solve the problem.
- Keep the table usable for long content and file download actions.
