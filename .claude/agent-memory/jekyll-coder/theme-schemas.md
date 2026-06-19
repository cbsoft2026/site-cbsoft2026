---
name: theme-schemas
description: jekyll-theme-conference 4.0.2 verified field names, deprecated keys, data_dir/lang.yml gotcha, and checks.html findings
metadata:
  type: reference
---

## Verified layouts in gem

default, home, page, program, location, room, speaker, speaker-overview, talk, talk-overview, stream-overview, manifest, json-config, json-data, json-site, sw.js

## conference: config keys (base _config.yml)

- `name`, `year`, `tz`, `show_errors` — top-level under conference
- `event:` — `dates`, `city`, `venue`, `registration_url`
- `social:` — `email`, `instagram`
- `talks.tracks:` list of `{name, color}` — color is a Bootstrap color name (info/success/warning/danger/primary)
- `talks.tags:` list of `{name, icon}` — icon is a bootstrap-icons name
- `conference.navigation.links:` list of `{name, relative_url | absolute_url}` — set in per-lang config

## DEPRECATED keys (cause theme error bar)

- `conference.location` → move to location page front matter
- `conference.program` → move to program page front matter
- `conference.main` → move to home page front matter
- `conference.info_bars` → renamed to `conference.info.bars`
- `conference.link_preview` → renamed to `conference.meta.link_preview`
- `conference.speakers.show_firstname` → no longer supported
- `conference.talks.main_categories` → renamed to `conference.talks.tracks`
- `conference.talks.hide_icons` / `hide_link_icons` → no longer supported

## data_dir gotcha

When `data_dir: pt/_data` is set, Jekyll no longer reads the theme gem's `_data/`. The theme's `checks.html` validates `site.data.lang.version == 10`. Without lang.yml in pt/_data/, this check fails and an error bar appears.

**Fix:** copy theme gem's `_data/lang.yml` into both `pt/_data/lang.yml` and `en/_data/lang.yml`. Do not edit it — the theme owns this file.

## location layout front matter

`postal_address:` is a page-level key (not a config key), with sub-fields: `name`, `street`, `region`, `postal_code`, `locality`. `map:` is also page-level (not config).

## Liquid in YAML front matter

Jekyll does NOT interpolate Liquid in YAML front matter values. `title: "{{ site.conference.name }}"` renders literally. Use static values in front matter; use Liquid only in page body markdown.

## Collections defaults wiring

In base _config.yml:
```yaml
defaults:
  - scope: {path: "", type: talks}    values: {layout: talk}
  - scope: {path: "", type: speakers} values: {layout: speaker}
  - scope: {path: "", type: rooms}    values: {layout: room}
```
Collections must have `output: true`.

## program.yml schema

```yaml
days:
  - name: Day Name
    abbr: Abbr
    date: 2026-10-13          # ISO date
    rooms:
      - name: Sala Principal  # must match _rooms/<file>.md name: field exactly
        talks:
          - name: Talk Name   # must match _talks/<file>.md name: field exactly
            time_start: "09:00"
            time_end: "10:00"
```

## Talk front matter

`name` (req, unique, matches program.yml), `speakers` (list of speaker name strings, must match _speakers name: fields), `track` (matches a conference.talks.tracks name), `tags` (list matching conference.talks.tags names), `links`, `hide`.

## Speaker front matter

`name` (req, unique), `first_name`, `last_name` (req), `links`, `hide`.

## Room front matter

`name` (req, unique, matches program.yml room names), `hide`, `live`.
