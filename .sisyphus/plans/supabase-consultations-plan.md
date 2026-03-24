# Supabase consultation form migration plan

## Goal

Replace the current dummy `/api/consultations` handler with real Supabase database persistence while preserving the existing landing-page form UX and request contract.

## Current state

- `components/landing/contact-form.tsx` posts JSON to `/api/consultations`.
- `app/api/consultations/route.ts` validates with `consultationSchema` and returns a dummy success/failure response.
- `lib/consultation-schema.ts` is the current source of truth for the payload shape.
- File attachments are metadata-only today: the client submits `file_names` and `file_count`, not file binaries.
- The repo currently has no Supabase dependency, no existing Supabase helpers, and no database migration directory.

## Recommended implementation

### 1. Preserve the existing client contract

- Keep `components/landing/contact-form.tsx` posting JSON to `/api/consultations`.
- Do not change the visible success/error UX unless required by backend behavior.
- Continue storing only `file_names` and `file_count` in this scope.

### 2. Add server-only Supabase access

- Install the minimal Supabase package needed for server-side inserts.
- Add a small server-only helper under `lib/` that creates a Supabase client from server env vars.
- Use server-only env names and keep privileged keys out of any client bundle or `NEXT_PUBLIC_*` variable.
- Do not introduce client-side Supabase usage for this form.

### 3. Replace dummy route behavior with real persistence

- Keep JSON parsing and shared Zod validation in `app/api/consultations/route.ts`.
- Remove the simulated dummy failure branch.
- Insert validated data into a `consultations` table in Supabase.
- Preserve the current response envelope shape so the frontend mutation flow still works.
- Keep a success `message` field so the current client-side error/success handling contract remains stable.
- Return user-safe error messages on insert failure and avoid leaking raw secrets or internals.

### 4. Add schema/setup artifacts

- Add a checked-in SQL file for creating the `consultations` table.
- Mirror the existing validated payload fields, plus minimal DB-managed fields such as `id` and `created_at`.
- Keep optional text fields compatible with the current schema defaults so empty values do not fail due to nullability mismatches.
- Keep the schema minimal and aligned with `lib/consultation-schema.ts` to avoid drift.

### 5. Add environment and setup documentation

- Document required server env vars such as `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.
- Add runtime guards so missing env vars fail clearly instead of crashing unpredictably.
- Document how to apply the SQL schema in Supabase.

### 6. Verify the change

- Run `npm run lint`.
- Run `npm run build`.
- Add and run the smallest viable automated test coverage for the route/helper behavior, using mocked Supabase interactions so baseline verification does not require live credentials.
- At minimum, verify these cases in an executable way:
  - valid payload inserts successfully
  - invalid JSON returns 400
  - schema validation failure returns 400
  - missing env configuration returns a server error with a safe message
  - Supabase insert failure returns a safe error response
  - the response still includes a stable `message` field for frontend handling
  - file metadata is persisted, while actual file blobs remain out of scope

## Execution order

1. Add or prepare the smallest viable automated test harness for the route layer.
2. Add the server-only Supabase helper and env guards.
3. Add the SQL schema/setup artifact for `consultations`.
4. Replace the dummy insert path in `app/api/consultations/route.ts`.
5. Add or update setup documentation.
6. Run lint, tests, and build to verify the change.

## Files likely to change

- `app/api/consultations/route.ts`
- `lib/consultation-schema.ts` only if server mapping requires safe normalization changes
- `package.json`
- new server helper under `lib/` such as `lib/supabase-server.ts`
- new SQL/setup artifact under a repo-local docs or sql path
- setup documentation file if needed

## Risks and scope boundaries

- Real file upload storage is not included in this default scope.
- Public-form spam/rate-limiting is a follow-up concern unless the user wants it included now.
- Supabase credentials and project/table provisioning are external prerequisites.
- The safest default is server-only service-role usage in the route, not direct client inserts.
- Live integration verification should be optional and gated by env presence; the default acceptance path should remain locally executable.

## Open questions / assumptions

- Assumption: “connect to Supabase DB” means storing inquiry rows only, not adding email/Slack/admin notifications.
- Assumption: attachments should remain metadata-only for now.
- Assumption: adding a minimal SQL setup artifact in-repo is acceptable.

## Acceptance criteria

- Submitting the existing landing-page inquiry form results in a real insert into Supabase instead of a dummy echo.
- The frontend success state still appears on a successful submission.
- Validation failures still return structured 400 responses.
- Missing or invalid Supabase configuration fails safely on the server.
- Baseline automated verification runs without requiring real Supabase credentials.
- The codebase passes lint and build after the change.

## Atomic commit strategy

- `test(consultations): add focused route coverage for inquiry submission`
- `feat(consultations): persist validated inquiries to Supabase`
- `docs(consultations): add Supabase env and table setup`
