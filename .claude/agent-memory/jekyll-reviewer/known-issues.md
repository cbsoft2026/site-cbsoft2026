---
name: known-issues
description: Recurring and known issues in ERCAS 2026 site to watch in future reviews
metadata:
  type: feedback
---

**Issues found in first review (2026-06-18) — still open as of second review (2026-06-18):**

1. **GUIDE.md and README.md publish to _site (both pt and en builds)** — neither has front matter and neither is in any `exclude:` list. They appear at `/GUIDE.md` and `/README.md` in both the pt and en built sites. Confirmed published in `_site/GUIDE.md`, `_site/README.md`, `_site/en/GUIDE.md`, `_site/en/README.md`. Fix: add `GUIDE.md` and `README.md` to `exclude:` in `_config.yml` (base config, so applies to all builds).

2. **sponsors.yml references a logo file that doesn't exist** — `sponsors/logo-placeholder.svg` is referenced in both `pt/_data/sponsors.yml:5` and `en/_data/sponsors.yml:5` but `assets/images/sponsors/` is an empty directory (confirmed). Causes a broken `<img>` at `/sponsors/` and `/en/sponsors/`. Fix: either create a placeholder SVG at `assets/images/sponsors/logo-placeholder.svg` or remove the `logo:` key from the placeholder sponsor entry.

3. **important_dates.html first column header uses wrong lang key** — `site.data.lang[site.conference.lang].program.title` resolves to "Programa" (pt) / "Program" (en). The column is meant to label the deadline event, not the conference program. Confirmed: pt build shows `<th>Programa</th>`, en shows `<th>Program</th>` — both semantically wrong. Fix: use a hardcoded bilingual label or a dedicated lang key.

4. **important_dates.html second column header "Data" is hardcoded Portuguese** — `_includes/important_dates.html:6` has literal `Data` — renders as "Data" in the English build too (confirmed). Fix: replace with `{{ site.data.lang[site.conference.lang].program.time | default: "Date" }}` or a dedicated key.

5. **pt/_data/lang.yml has two typos** — line 195: "Transmissãos" should be "Transmissões"; line 202: "hà" should be "há". These affect live streaming UI strings (low-impact until live streaming is used).

6. **`_config.pt.yml` exclude array replaces base exclude** — Jekyll replaces arrays wholesale on merge, so if base ever adds an `exclude:` list, `_config.pt.yml`'s `exclude: [en]` would clobber it. Currently fine since base has no `exclude:`. If GUIDE.md/README.md are added to base `exclude:`, verify pt and en per-lang configs don't override it.

**Confirmed clean (second review):**
- Scaffold pages (index.markdown, about.markdown, root 404.html) correctly absent from repo root.
- Build artifacts (_site/, .jekyll-cache/) not tracked; .gitignore correct.
- Both pt and en builds pass cleanly (no warnings, no errors).
- show_errors: false in both pt and en production configs; base has show_errors: true; no theme error-bar in _site/ output.
- conference.name/year/event/social survive config merge; no clobbering.
- All talk speakers cross-references valid; all track/tag values match configured names.
- program.yml talk names and room names match collection name: fields exactly.
- All pages have explicit permalink; pt builds to /site-ercas2026/program/ etc.; en builds under /en/.
- lang.yml version 10 in both pt and en _data/; pt block at line 177.
- PT nav labels Portuguese; EN nav labels English. i18n UI strings work via lang.yml.
- Bootstrap responsive classes present in all three custom includes.
- Alt text present on sponsor logos.
- Gemfile.lock committed (correct for this repo).
- ERCAS acronym in index.md body is about the acronym itself — borderline nit, not a strict violation.

**How to apply:** Check items 1-5 in every future review. Item 6 becomes load-bearing once GUIDE.md/README.md exclusion is added to base config.
