---
name: site-architecture
description: ERCAS 2026 bilingual Jekyll architecture — pt ships at /site-ercas2026/, en authored but not deployed
metadata:
  type: project
---

Multi-config / multi-build bilingual site on jekyll-theme-conference 4.0.2.

**Configs:** `_config.yml` (base, language-agnostic) + `_config.pt.yml` (pt, ships now) + `_config.en.yml` (en, authored, not in CI yet).

**Source trees:** `pt/` (Portuguese, primary) and `en/` (English boilerplate, not built in CI).

**Current baseurl:** `/site-ercas2026` (GitHub Pages path). Becomes `""` when custom domain `ercas2026.ufba.br` is live.

**PT build command:** `bundle exec jekyll build --config _config.yml,_config.pt.yml -d _site`
**EN build command:** `bundle exec jekyll build --config _config.yml,_config.en.yml -d _site/en`

**Key per-lang config keys:** `baseurl`, `collections_dir`, `data_dir`, `conference.lang`, `conference.navigation.links`. Base config holds `conference.name`, `year`, `talks.tracks`, `talks.tags`, `event`, `social`.

**Merge behavior:** `conference.navigation` block is re-declared per language (Jekyll replaces nested maps wholesale). `name`/`year`/`talks`/`event`/`social` inherited from base.

**No language switcher yet** — deferred until custom domain is live at root.

**`show_errors`:** `true` in base (dev), overridden to `false` in both `_config.pt.yml` and `_config.en.yml` (production).
