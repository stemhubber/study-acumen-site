# Study Acumen — website

The public site for [Study Acumen](https://smart-storage-83653.web.app): CAPS-aligned
Maths and Physical Sciences for Grade 10–12 learners, tutors and teachers.

**Live:** https://stemhubber.github.io/study-acumen-site/

## Editing

Plain HTML/CSS/JS, no build step:

- `index.html` — all the page content (about us, features, pricing, FAQ)
- `styles.css` — styling (mobile first)
- `config.js` — the app URL the buttons link to, and the contact email

Every push to `main` republishes the site via `.github/workflows/pages.yml`.
One-time setup: Settings → Pages → Source → **GitHub Actions**.
