# Study Acumen — website

The public site for [Study Acumen](https://smart-storage-83653.web.app): CAPS-aligned
Maths and Physical Sciences for Grade 10–12 learners, tutors and teachers.

**Live:** https://stemhubber.github.io/study-acumen-site/

## Shareable links

Visitors choose "I'm a learner" or "I'm a tutor or teacher" and the page shows only what's
relevant to them (they can switch any time from the bar under the header). To skip the
question, send a link that picks the view for them:

- Learners: https://stemhubber.github.io/study-acumen-site/?for=learner
- Tutors & teachers: https://stemhubber.github.io/study-acumen-site/?for=tutor

In `index.html`, `data-for="learner"` / `"tutor"` marks content for one audience,
`data-for="any"` shows after either choice, and `data-for="none"` only before a choice.

## Editing

Plain HTML/CSS/JS, no build step:

- `index.html` — all the page content (about us, features, pricing, FAQ)
- `styles.css` — styling (mobile first)
- `config.js` — the app URL the buttons link to, and the contact email

Every push to `main` republishes the site via `.github/workflows/pages.yml`.
One-time setup: Settings → Pages → Source → **GitHub Actions**.
