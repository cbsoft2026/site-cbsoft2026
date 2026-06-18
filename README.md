# ERCAS 2026 — Conference Website

Static site for the ERCAS 2026 conference, built with [Jekyll](https://jekyllrb.com/) and the [jekyll-theme-conference](https://github.com/DigiLab-OVGU/jekyll-theme-conference) theme.

## Requirements

- **Ruby** 3.4.x (developed on 3.4.4)
- **Bundler** 2.4+ (for the `:windows` platform alias in the `Gemfile`)
- A Ruby version manager is recommended ([mise](https://mise.jdx.dev/), rbenv, or rvm)

## Setup

Install dependencies:

```bash
bundle install
```

## Run locally

Start the dev server with live reload:

```bash
bundle exec jekyll serve
```

Site is served at <http://localhost:4000>.

Useful flags:

- `--livereload` — auto-refresh the browser on file changes
- `--drafts` — include posts in `_drafts/`
- `--host 0.0.0.0` — expose on the local network

## Build

Generate the static site into `_site/`:

```bash
bundle exec jekyll build
```

## Project structure

```
_config.yml      # site settings + theme config
index.markdown   # home page
about.markdown   # about page
404.html         # not-found page
_site/           # generated output (gitignored)
```

> Conference content (talks, speakers, program) is added under `_data/` —
> see the [theme docs](https://github.com/DigiLab-OVGU/jekyll-theme-conference)
> for the expected data files.

## Notes

- Theme is `jekyll-theme-conference`, which is **not** a blog theme — it provides
  `talk`, `program`, `speaker`, `page`, etc. layouts, but no `post` layout.
- After editing `_config.yml`, restart the server — it is not auto-reloaded.

## Deployment

Built static output lives in `_site/`. Deploy that directory to any static host
(GitHub Pages, Netlify, etc.).
