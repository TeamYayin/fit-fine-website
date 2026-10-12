# Agent Guidelines & Workspace Rules: Eugen Fit & Fine Website

## 1. Git Workflow & Safety
* **NEVER Run `git push`**: Stage changes, run pre-commit checks, and commit locally. The user will review and push manually.
* **Descriptive Conventional Commits**: 
  * Always provide specific, distinguishable commit messages adhering to Conventional Commits: `<type>(<scope>): <clear description>`.
  * Never use generic or hardcoded messages like `feat: Rework fit-fine-website into Astro`.
  * Always execute commits using the pre-commit script:
    `./scripts/pre-commit.sh "<type>(<scope>): <description>"`

## 2. Testing & Build Integrity
* **Pre-Commit Invariant**: All unit tests (`npm test`) and static site builds (`npm run build`) must pass cleanly before finalizing any task or commit.
* **Test Maintenance**: When adding or updating layouts, forms, or APIs, ensure corresponding test assertions in `test/website.test.js` are updated.

## 3. Serverless Functions & Email Deliverability (Cloudflare & Resend)
* **Cloudflare Environment Variables**:
  * Non-secret runtime variables (e.g., `CONTACT_FROM_EMAIL`, `CONTACT_RECEIVER_EMAIL`) MUST be declared in `wrangler.jsonc` under `"vars": { ... }` to prevent Cloudflare from wiping them on automated Git deployments.
  * Secrets (e.g., `RESEND_API_KEY`) must be stored in Cloudflare's encrypted vault or local `.dev.vars` and never committed to git.
* **Verified Senders Only**:
  * Never fall back to `onboarding@resend.dev` for user-facing transactional emails. Resend's sandbox blocks non-owner recipients with a 403 error. Always use the verified domain address (e.g. `noreply-contact@eugenfnf.com`).
* **SOLID Principles (Single Responsibility)**:
  * Email markup, layout, and copy must reside in dedicated template modules (`functions/templates/emailTemplates.js`), completely decoupled from HTTP routing, validation, and network transport in `functions/api/contact.js`.

## 4. Astro Content Collections (Blog System)
* **Folder-Based Post Structure**:
  * Blog posts live in dedicated folders: `src/content/blog/<post-slug>/index.md`.
* **Collection Non-Entries**:
  * Astro parses every markdown file in `src/content/blog/` as a content entry against the schema in `src/content/config.ts`.
  * Documentation or non-entry markdown files must either be prefixed with an underscore (e.g., `_README.md`) or stored outside the collection in `docs/`.
* **Luxury Styling**:
  * All markdown posts must render through `src/layouts/BlogLayout.astro` with `.prose-luxury` typography styling, author metadata, and coaching concierge callouts.

## 5. Staff & Admin Terminology
* Use **"Staff Login"** and **"Staff Portal"** instead of "Admin Login" / "Admin Portal" across public-facing navigation and authentication dialogs.
