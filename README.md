# News Release System — Marketing Site & Video Showcase

A futuristic, gamer-styled marketing website and 30-second video package for the
**News Release System**, a gamer-first game-news platform.

🔗 **Live builds:**
- https://nrs.rabutenri.com/ (primary / latest test build)
- https://fyp-nrs.geyser.host/ (original build)

## What's in here

| File | Purpose |
|------|---------|
| `index.html` | The marketing website (open this in a browser) |
| `styles.css` | Futuristic/gamer styling (neon, grid, glow, glassmorphism) |
| `script.js` | Scroll reveals + animated stat counters |
| `showcase.html` | Auto-playing 30-second animated showcase — screen-record this to make the video |
| `VIDEO-SCRIPT.md` | Narration script, storyboard/shot list, and tagline options |
| `previous-version/` | The earlier (light-theme) version, archived for reference |

## How to run it

**No PHP, no server, no build step** — plain HTML/CSS/JS.

- **Easiest:** download the files into one folder and double-click `index.html`.
- **In VS Code:** install the *Live Server* extension, then right-click `index.html` → *Open with Live Server*.
- **Online:** publish free via GitHub Pages (Settings → Pages → Deploy from branch → `main`).

## The video

Open `showcase.html` full-screen (press `F11`) and screen-record one 30-second loop
with OBS, Windows Game Bar (`Win+G`), or macOS (`Cmd+Shift+5`). See `VIDEO-SCRIPT.md`
for the narration and shot list.

## Customise

- **Tagline** — in `index.html`, search for the `TAGLINE` comment and change one line
  (six options in `VIDEO-SCRIPT.md`). Also update scene 1 of `showcase.html` to match.
- **Remove the team section** — in `index.html`, delete everything between the
  `<!-- TEAM START -->` and `<!-- TEAM END -->` comments. That's the only block to remove.

---

News Release System — game news, cut to the point.
