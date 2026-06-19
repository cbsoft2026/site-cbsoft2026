# GUIDE — Custom Domain Setup for ERCAS 2026 (GitHub Pages + Jekyll)

How to publish this Jekyll site at the university domain
**`https://ercas2026.ufba.br/`** instead of the default
`https://atyimolab.github.io/site-ercas2026/`.

---

## 1. Overview

- **Repo:** `atyimoLAB/site-ercas2026` (organization project site)
- **Engine:** Jekyll, served by GitHub Pages
- **Current URL:** `https://atyimolab.github.io/site-ercas2026/`
- **Target URL:** `https://ercas2026.ufba.br/`
- **Domain type:** `ercas2026.ufba.br` is a **subdomain** of `ufba.br`, whose DNS
  zone is controlled by UFBA's infrastructure team.

### Two independent pieces (both required)

| Piece | Who | What it does |
|-------|-----|--------------|
| **DNS record** | UFBA infra | Routes the request *to* GitHub's servers |
| **`CNAME` file / Pages setting** | You | Tells GitHub *which repo* answers for the domain |

Neither works alone:
- DNS without the `CNAME` file → GitHub doesn't know which repo to serve.
- `CNAME` file without DNS → the domain never resolves to GitHub.

### Request flow

```
You set custom domain (UI or CNAME file)   ← the domain↔repo link is registered HERE
        │  GitHub stores: ercas2026.ufba.br → atyimoLAB/site-ercas2026
        ▼
DNS (UFBA): ercas2026.ufba.br  CNAME → atyimolab.github.io   ← gets the request to GitHub
        ▼
Browser request, Host: ercas2026.ufba.br → GitHub routing table → serve site-ercas2026 at root
```

### Key facts (common gotchas)

- **CNAME target is the org host, not the repo path.** Per GitHub docs:
  *"The `CNAME` record should always point to `<user>.github.io` or
  `<organization>.github.io`, excluding the repository name."*
  So the target is **`atyimolab.github.io`** — **never** `.../site-ercas2026`.
  DNS records point at a host, never a path.
- **An org can host many Pages sites.** One org/user site (repo named
  `atyimoLAB.github.io`) plus unlimited **project sites** (one per repo). They
  all share the same host `atyimolab.github.io`; the per-repo `CNAME` file
  disambiguates by the request's `Host` header. A given custom domain can be
  claimed by only **one** repo at a time.
- **HTTPS is free and automatic** — GitHub provisions a Let's Encrypt
  certificate. No certificate is purchased or issued by UFBA.

---

## 2. DNS request for the university infra team

Ask UFBA infra to create this record in the `ufba.br` zone:

| Field | Value |
|-------|-------|
| Type | `CNAME` |
| Name / Host | `ercas2026` (yields `ercas2026.ufba.br`) |
| Target / Value | `atyimolab.github.io.` |
| TTL | 3600 (or the zone default) |

Notes for infra:
- Subdomain → **CNAME** (no A/AAAA records; those are only for apex domains).
- Target is exactly `atyimolab.github.io` (no repository path).
- No other record (A/AAAA/CNAME) should already exist for the `ercas2026` name.
- **CAA records:** if the `ufba.br` zone has CAA records, they must allow
  Let's Encrypt (e.g. `0 issue "letsencrypt.org"`). If there are no CAA records,
  no action is needed.

> The ready-to-paste ticket text (Brazilian Portuguese) is in the
> [Appendix](#appendix--dns-ticket-pt-br).

---

## 3. Steps on our end

Do these once the UFBA CNAME record is requested (steps 1–2 can be prepared in
parallel; step 3 onward needs the DNS to exist).

1. **Confirm the DNS record resolves:**
   ```bash
   dig +short ercas2026.ufba.br CNAME
   # expected: atyimolab.github.io.
   ```

2. **Set the custom domain in GitHub:**
   Repo → **Settings → Pages → Custom domain** → enter `ercas2026.ufba.br` → Save.
   This auto-commits a `CNAME` file to the published branch and registers the
   domain↔repo mapping.

3. **Confirm the `CNAME` file** exists at the repo root with exactly:
   ```
   ercas2026.ufba.br
   ```
   (If you prefer, add this file manually instead of using the UI in step 2 —
   GitHub will populate the Pages setting on the next build.)

4. **Update `_config.yml`** for serving at the domain root:
   ```yaml
   url: "https://ercas2026.ufba.br"
   baseurl: ""
   ```
   (Previously `url: https://atyimolab.github.io`, `baseurl: /site-ercas2026`.)
   Commit and push. This fixes asset/link paths now that the site lives at `/`.

5. **Wait for the GitHub DNS check** (green check in Settings → Pages) and for
   the TLS certificate to provision (minutes up to ~24h).

6. **Enable "Enforce HTTPS"** in Settings → Pages once the certificate is ready.

7. **Verify:**
   ```bash
   curl -I https://ercas2026.ufba.br   # expect HTTP 200 + valid TLS
   ```
   Open the site, check CSS/images load (no broken paths), and confirm no
   mixed-content warnings.

---

## 4. HTTPS / TLS

- GitHub auto-provisions a **free Let's Encrypt certificate** for the custom
  domain after DNS resolves and the domain is set. Renews automatically.
- Enable **Enforce HTTPS** to redirect all HTTP traffic to HTTPS.
- No certificate is bought, uploaded, or issued by UFBA.
- **Caveat:** if `ufba.br` has CAA records, they must allow `letsencrypt.org`,
  otherwise certificate issuance fails.

---

## 5. (Optional) Organization-level domain verification

Recommended to prevent subdomain takeover. Org → **Settings → Pages → Verified
domains** generates a TXT challenge of the form
`_github-pages-challenge-atyimoLAB.ufba.br` → token. Send that name/value to
UFBA infra to add as a **TXT** record, then click **Verify**. Can be done as a
follow-up after the site is live.

---

## 6. Troubleshooting

| Symptom | Cause / fix |
|---------|-------------|
| `dig` returns nothing | DNS not propagated yet, or record not created. Wait / ping infra. |
| GitHub DNS check stays red | CNAME target wrong (must be `atyimolab.github.io`, no path) or not propagated. |
| Broken CSS / 404 assets | `baseurl` not set to `""` after moving to the custom domain. |
| "Enforce HTTPS" greyed out | Certificate not provisioned yet — wait (up to ~24h). |
| Certificate never issues | CAA record on `ufba.br` blocks Let's Encrypt — ask infra to allow `letsencrypt.org`. |
| Domain rejected by GitHub | Another repo already claims `ercas2026.ufba.br` — remove it there first. |

Useful checks:
```bash
dig +short ercas2026.ufba.br CNAME       # routing to GitHub
dig +short ercas2026.ufba.br             # final resolution
curl -I https://ercas2026.ufba.br        # status + TLS
bundle exec jekyll build                 # local build sanity after config change
```

---

## Appendix — DNS ticket (PT-BR)

> **Título:** Criação de registro DNS (CNAME) para subdomínio `ercas2026.ufba.br` → GitHub Pages
>
> **Descrição:**
>
> Olá, equipe de infraestrutura,
>
> Estamos hospedando o site do evento ERCAS 2026 no **GitHub Pages** e
> gostaríamos de publicá-lo no subdomínio institucional **`ercas2026.ufba.br`**.
>
> Para isso, solicitamos a criação do seguinte registro na zona DNS de `ufba.br`:
>
> | Campo | Valor |
> |-------|-------|
> | Tipo | `CNAME` |
> | Nome / Host | `ercas2026` (resultando em `ercas2026.ufba.br`) |
> | Valor / Destino | `atyimolab.github.io.` |
> | TTL | 3600 (ou o padrão da zona) |
>
> Observações importantes:
> - Por ser um **subdomínio**, o tipo correto é **CNAME** (não são necessários
>   registros A/AAAA, que se aplicam apenas a domínios raiz/apex).
> - O destino deve ser exatamente `atyimolab.github.io` (sem o caminho do
>   repositório). É o domínio da organização no GitHub.
> - Não deve haver outro registro (A, AAAA, CNAME) já existente para o nome
>   `ercas2026` na zona — caso exista, favor nos informar.
> - O GitHub provisiona automaticamente o certificado HTTPS (Let's Encrypt)
>   após a propagação do DNS; **nenhum certificado precisa ser emitido por vocês**.
> - **Registro CAA:** caso a zona `ufba.br` possua registros CAA, é necessário
>   que permitam a emissão pela Let's Encrypt — ex.: `0 issue "letsencrypt.org"`.
>   Se não houver nenhum registro CAA na zona, nenhuma ação é necessária. Podem
>   nos confirmar a situação atual dos registros CAA?
>
> **Perguntas:**
> 1. A equipe consegue criar registros CNAME apontando para serviços externos
>    (GitHub) na zona `ufba.br`?
> 2. Qual o tempo estimado de propagação após a criação?
> 3. Vocês conseguem nos avisar quando o registro estiver ativo?
>
> Qualquer dúvida, ficamos à disposição. Obrigado!
