# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Static website for **ERCAS 2026** (Escola Regional de Computação Aplicada à Saúde), a health-informatics conference in Salvador/BA, Oct 13–15 2026. Built with **Jekyll 4.4** + the **`jekyll-theme-conference`** (~4.0.2) theme, deployed to GitHub Pages. Primary language is **Portuguese**; an **English** build exists as boilerplate but is **not deployed yet**.

`jekyll-theme-conference` is not a blog theme — it ships `home`, `program`, `talk`, `speaker`, `room`, `page` layouts but **no `post` layout**. Theme docs / source: https://github.com/DigiLab-OVGU/jekyll-theme-conference

## Commands

Install deps: `bundle install` (Ruby 3.4.x; see `.ruby-version`).

**Builds and the dev server MUST pass a layered `--config`.** Plain `bundle exec jekyll serve` reads only `_config.yml`, which has no `collections_dir`/`data_dir` — so no content renders. Always include a language config:

```bash
# Local dev (Portuguese) — live reload
bundle exec jekyll serve --config _config.yml,_config.pt.yml --livereload

# Local dev (English)
bundle exec jekyll serve --config _config.yml,_config.en.yml --livereload

# Production build (what CI runs)
bundle exec jekyll build --config _config.yml,_config.pt.yml -d _site
```

After editing any `_config*.yml`, **restart** the server — config is not auto-reloaded.

There are no tests or linters. The build itself is the gate: `show_errors: true` (set in `_config.yml`) makes the theme surface broken cross-references (a talk pointing at a missing speaker, etc.) as visible page errors. The language configs override it to `false` for production, so **run the PT build locally and check for theme error output** before committing content changes.

## Architecture

### Layered, per-language config

`_config.yml` is the shared base (theme, plugins, collections, `conference.*` event metadata, tracks, tags). Each language adds a thin overlay:

- `_config.pt.yml` → `baseurl: /site-ercas2026`, `collections_dir: pt`, `data_dir: pt/_data`, `conference.lang: pt`, PT navigation, excludes `en/`.
- `_config.en.yml` → `baseurl: /en`, `collections_dir: en`, `data_dir: en/_data`, `conference.lang: en`, EN navigation, excludes `pt/`.

So **`pt/` and `en/` are parallel, self-contained site trees** — same structure, translated content. A language build sees only its own tree. When you add/restructure content, **mirror the change in both `pt/` and `en/`**.

Each tree contains: page markdown (`index.md`, `program/index.md`, `talks/index.md`, `speakers/index.md`, `committees.md`, `sponsors.md`, `important-dates.md`, `location/index.md`, `404.html`), the collection folders `_talks/ _speakers/ _rooms/`, and `_data/` (`program.yml`, `committees.yml`, `sponsors.yml`, `important_dates.yml`, `lang.yml`).

### Collections and how content links together

Collections `talks`, `speakers`, `rooms` are declared in `_config.yml` (with `output: true` and default layouts) but their files live under each language tree because of `collections_dir`. **Cross-references are by display-name strings, not IDs or file paths:**

- A talk's front matter `speakers:` lists speaker **names** that must match a speaker doc's `name`.
- A talk's `track:` must match a track `name` in `_config.yml` → `conference.talks.tracks`.
- `_data/program.yml` schedules talks by repeating their **`name`** under each day → room. Room/talk/speaker names must agree across the data file, the collection docs, and `_config.yml`.

Because links are name-based, renaming anything means updating every place that names it (collection doc, `program.yml`, `_config.yml`). This is exactly what `show_errors: true` helps catch.

### Custom includes (sections the theme lacks)

The theme has no native committees / sponsors / important-dates rendering, so `_includes/committees.html`, `_includes/sponsors.html`, `_includes/important_dates.html` render those from the corresponding `_data/*.yml`. The page markdown is a thin shell that sets layout/permalink and calls `{% include … %}`.

### i18n strings: `lang.yml`

`_data/lang.yml` is the theme's translation table (keys like `program.*`, `speaker.*`, `location.*`), shipped with `en/de/fr/pt`. Custom keys have been **added** to it (e.g. `important_dates.{event,date}`) for the custom includes; includes read `site.data.lang[site.conference.lang].<key>` with a `| default:` fallback. When adding a custom include that needs labels, add the keys to **both** trees' `lang.yml`.

## Deployment

`.github/workflows/deploy.yml` builds on push to `main` and deploys to GitHub Pages. It **only builds the PT config** (`_config.yml,_config.pt.yml`) and uploads `_site/`. The English build is intentionally not wired in — see the comment in `_config.en.yml`. To launch EN later: add a second build step and a language switcher.

### Pending custom-domain migration

Site currently serves at `https://atyimolab.github.io/site-ercas2026/`; target is **`https://ercas2026.ufba.br/`**. Full runbook is in `GUIDE.md` (DNS request to UFBA infra, GitHub Pages settings, HTTPS). When the domain goes live, set `url: https://ercas2026.ufba.br` and `baseurl: ""` (the per-language `baseurl` values exist only for the current GitHub Pages path layout). `GUIDE.md` and `README.md` are `exclude`d from the build.
