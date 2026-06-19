---
name: project-structure
description: ERCAS 2026 bilingual site structure — multi-config builds, pt/ en/ trees, and the exclude pattern that makes it work
metadata:
  type: project
---

## Bilingual multi-config strategy

Base config: `_config.yml` — language-agnostic (title, url, collections, defaults, conference block without lang/baseurl).
Per-language: `_config.pt.yml` and `_config.en.yml` — set baseurl, collections_dir, data_dir, conference.lang, conference.navigation.

**Critical**: `include:` in Jekyll does NOT restrict which directories are built. To prevent `en/` appearing in the pt build and vice versa, use `exclude:` in each per-lang config:
- `_config.pt.yml` has `exclude: [en]`
- `_config.en.yml` has `exclude: [pt]`

Without exclude, both trees conflict on identical permalinks → build warnings.

## Current deployed language

pt-only at `baseurl: "/site-ercas2026"` (on atyimolab.github.io). en/ is authored but NOT in deploy.yml. Switch to bilingual + custom domain per GUIDE.md.

## Tree layout

```
pt/              # collections_dir for pt build
  _talks/        # 3 fake talks (keynote-abertura, telemedicina-hospitais, ia-vigilancia-epidemiologica)
  _speakers/     # 3 fake speakers (ana-costa, bruno-lima, carla-mendes)
  _rooms/        # 2 rooms (sala-principal, sala-workshop)
  _data/         # program.yml, committees.yml, sponsors.yml, important_dates.yml, lang.yml
  index.md       permalink: /
  program/index.md  permalink: /program/
  talks/index.md    permalink: /talks/
  speakers/index.md permalink: /speakers/
  location/index.md permalink: /location/
  committees.md     permalink: /committees/
  sponsors.md       permalink: /sponsors/
  important-dates.md permalink: /important-dates/
  404.html
en/              # mirror with English strings, identical IDs
_includes/       # committees.html, sponsors.html, important_dates.html
```

**Why:** Every page under pt/ needs explicit permalink (collections_dir shifts path). Without permalink, pages publish under /pt/... not /.
