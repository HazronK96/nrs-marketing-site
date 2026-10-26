# News Release System — Marketing Site & Video Showcase

A futuristic, gamer-styled **dynamic** marketing website and 30-second video package
for the **News Release System**, a gamer-first game-news platform.

🔗 **Live build:** https://nrs.rabutenri.com/

## What's in here

| File | Purpose |
|------|---------|
| `index.html` | The marketing website (renders content dynamically from `content.json`) |
| `content.json` | **All site content** — edit here, or via `admin.html` |
| `admin.html` | Password-gated admin panel: edit content + view user feedback |
| `styles.css` | Futuristic/gamer styling (neon, grid, glow, glassmorphism) |
| `script.js` | Loads content, renders the site, handles the feedback form |
| `showcase.html` | Auto-playing 30-second animated showcase (for the video) |
| `VIDEO-SCRIPT.md` | Narration script, storyboard/shot list, tagline options |
| `previous-version/` | The earlier (static) version, archived for reference |

## Dynamic content (what changed)

The site is now **data-driven**: all text lives in `content.json` and is rendered by
`script.js`. There are two ways to change content:

1. **Admin panel (recommended):** open `admin.html`, log in, edit the fields.
   - **Apply changes** → saves to this browser (localStorage) so the live site updates instantly here.
   - **Export JSON** → downloads an updated `content.json`. Replace the file and re-push to make it permanent for everyone.
2. **Edit `content.json` directly** and re-push.

### Admin login
- Default password: `admin123` (change `ADMIN_PASSWORD` in `admin.html`).
- To disable the login gate entirely, set `REQUIRE_LOGIN = false` in `admin.html`.
- Note: this is a **client-side demo gate**, not real server security.

### User feedback
- The site has a **feedback form** (the "Feedback" section).
- Submissions are always stored in the browser (localStorage) and shown in the
  **Feedback tab** of `admin.html`, where you can export them to CSV.

**Make feedback persist across ALL visitors (free, no backend) — Formspree:**
1. Sign up free at https://formspree.io and create a new form.
2. Copy its form ID (the part after `/f/` in the endpoint, e.g. `abcdwxyz`).
3. Paste it into `feedback.formspreeId` in `content.json` (or the
   "Formspree form ID" field in the admin panel), then re-push.
4. Submissions are now emailed to you and visible in your Formspree dashboard.
   (A local copy is still kept for the admin Feedback tab.)
- Leave `formspreeId` blank to stay in local-only mode (fine for a demo).

## How to run it

Because the site **fetches `content.json`**, run it from a local server (not by
double-clicking the file, which browsers block for `fetch`):

- **In VS Code:** install the *Live Server* extension → right-click `index.html` → *Open with Live Server*.
- **Online:** GitHub Pages (Settings → Pages → Deploy from branch → `main`) serves it fine.

## The video

Open `showcase.html` full-screen (`F11`) and screen-record one 30-second loop
(OBS / Windows Game Bar / macOS screen record). See `VIDEO-SCRIPT.md`.

## Customise notes

- **Tagline:** edit `hero.tagline` in `content.json` (or via admin).
- **Hide the team section:** set `team.visible` to `false` (or untick it in admin).
- **Show the original build again:** set its `visible` to `true` under `access.portals` and `footer.links`.
- **Hide the discreet admin link:** set `footer.showAdminLink` to `false` (or untick in admin).
- **Edit lists** (features, steps, stats, audience points, launch portals, team members):
  use the collapsible list editors in the admin panel — add, remove, and edit items.

---

News Release System — the future of the feed.
