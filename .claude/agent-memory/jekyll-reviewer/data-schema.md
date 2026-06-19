---
name: data-schema
description: ERCAS 2026 collection/data file schemas and cross-reference IDs
metadata:
  type: project
---

**Collections** (in `pt/` and `en/`): `_talks/`, `_speakers/`, `_rooms/`. All configured in base `_config.yml` with layout defaults.

**_talks/*.md required fields:** `name` (must match program.yml talk name exactly), `speakers` (list of speaker `name`s). Optional: `track` (must match `conference.talks.tracks` name), `tags` (list matching `conference.talks.tags` names), `links`, `hide`.

**_speakers/*.md required fields:** `name` (must match talk `speakers` list), `first_name`, `last_name`. Optional: `links`, `hide`.

**_rooms/*.md required fields:** `name` (must match program.yml room `name` exactly). Optional: `hide`, `live`.

**program.yml schema:** `days[].name/abbr/date` → `rooms[].name` → `talks[].name/time_start/time_end`. Room names and talk names must match collection `name:` fields exactly (not file slugs).

**Custom data files per language:**
- `committees.yml`: `[{group, members: [{name, affiliation?, url?}]}]`
- `sponsors.yml`: `[{tier, items: [{name, logo?, url?}]}]` — logo path relative to `assets/images/`
- `important_dates.yml`: `[{label, date (ISO 8601), done?}]`
- `lang.yml`: copied from gem (version 10), contains `en`/`de`/`fr`/`pt` blocks

**Current fake data identifiers (pt and en):**
- Talks: `keynote-abertura.md` (name: "Keynote de Abertura"), `telemedicina-hospitais.md`, `ia-vigilancia-epidemiologica.md`
- Speakers: `ana-costa.md`, `bruno-lima.md`, `carla-mendes.md`
- Rooms: `sala-principal.md` (name: "Sala Principal"), `sala-workshop.md` (name: "Sala Workshop")
- Tracks: Pesquisa/info, Indústria/success, Educação/warning

**Cross-reference integrity (verified):** All program.yml talk names and room names match collection `name:` fields exactly. All talk `speakers` entries match speaker `name:` fields.
