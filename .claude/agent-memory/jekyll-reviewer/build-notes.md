---
name: build-notes
description: Build commands, CI config, and known build behavior for ERCAS 2026
metadata:
  type: project
---

**Both pt and en builds pass cleanly** (no warnings, no errors) as of second review 2026-06-18.

**PT build:** `bundle exec jekyll build --config _config.yml,_config.pt.yml -d _site`
**EN build:** `bundle exec jekyll build --config _config.yml,_config.en.yml -d _site/en`

**Note:** `--strict_front_matter` and `--strict_variables` flags were NOT used because the theme gem's templates use variables that would likely trigger strict_variables false positives. The standard build was used instead.

**CI (deploy.yml):**
- Runs on: `ubuntu-latest`, ruby `3.4`
- Builds pt only: `bundle exec jekyll build --config _config.yml,_config.pt.yml -d _site` with `JEKYLL_ENV=production`
- Uses `actions/checkout@v5`, `ruby/setup-ruby@v1`, `actions/configure-pages@v6`, `actions/upload-pages-artifact@v5`, `actions/deploy-pages@v5`
- `show_errors: false` in pt build (overridden in `_config.pt.yml`) — no theme error-bar in production
- EN build is NOT in CI yet (by design, deferred until custom domain)
- deploy.yml is correct: single pt build, JEKYLL_ENV=production, upload/deploy steps present

**Permalink strategy:** All pages/overviews have explicit `permalink:` in front matter (e.g., `/program/`, `/talks/`). No `/pt/` leakage in built URLs. No `/en/` path leakage in en build.

**URL output verified:**
- PT: `_site/program/`, `_site/talks/`, `_site/speakers/`, `_site/committees/`, `_site/sponsors/`, `_site/important-dates/`, `_site/location/`
- EN: `_site/en/program/`, `_site/en/talks/`, etc. (baseurl=/en, url=https://atyimolab.github.io)
- Canonical URLs: pt → `https://atyimolab.github.io/site-ercas2026/`; en → `https://atyimolab.github.io/en/`

**jekyll-include-cache:** Required by theme, present in Gemfile and `plugins:` in `_config.yml`. Build works.

**Default Jekyll exclusions apply:** `Gemfile`, `Gemfile.lock`, `vendor` are excluded. But `GUIDE.md` and `README.md` are NOT excluded and DO publish to both `_site/` and `_site/en/`. See known-issues item 1.

**Scaffold pages:** index.markdown, about.markdown, root 404.html all correctly absent from repo root.

**show_errors:** base=true, pt=false, en=false. No error-bar appears in either built site output.
