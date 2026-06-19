---
name: build-commands
description: Exact Jekyll build and serve commands for pt and en builds
metadata:
  type: reference
---

## Production pt build (CI)

```bash
bundle exec jekyll build --config _config.yml,_config.pt.yml -d _site
```

JEKYLL_ENV=production in deploy.yml. show_errors: false comes from _config.pt.yml.

## Local dev pt (show_errors: true from base config, overridden to false by pt config)

To enable show_errors locally, temporarily set it in _config.pt.yml or use a local override:
```bash
bundle exec jekyll serve --config _config.yml,_config.pt.yml
```

Note: _config.pt.yml has show_errors: false. For dev with error checking, create a _config.local.yml with `conference:\n  show_errors: true` and add it as third config.

## En sanity build (not in CI yet)

```bash
bundle exec jekyll build --config _config.yml,_config.en.yml -d _site/en
```

## When custom domain goes live (GUIDE.md)

1. Set `url: "https://ercas2026.ufba.br"` in base _config.yml
2. Set `baseurl: ""` in _config.pt.yml
3. Add en build step to deploy.yml (pt first, then en into _site/en)
4. Add language switcher links to both per-lang navigation.links
5. Add CNAME file
