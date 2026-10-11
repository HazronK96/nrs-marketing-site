# 🎬 News Release System — 60-Second Video Package

**Group 27 · Final Year Project: News Release System — Design and Implementation**
**Audience:** Gamers · **Goal:** Showcase the system in ~60 seconds

---

## 1) How to produce the actual video

I can't render a video file in this environment, so here's the fastest path to a finished clip:

**Option A — Record the animated showcase (easiest)**
1. Open `showcase.html` in a browser, full-screen (press F11), ideally at 1920×1080.
2. It auto-plays through **6 scenes on a 60-second loop** with a progress bar at the bottom.
3. Screen-record one full loop with any recorder: **OBS Studio** (free), Windows **Game Bar** (`Win+G`), macOS **QuickLogo → Cmd+Shift+5**, or Loom.
4. Record your narration (below) over it, or add it in editing.

**Option B — Record the real app (most authentic)**
1. Screen-record yourself using the live app at `https://fyp-nrs.geyser.host/`, following the **shot list** below.
2. Lay the narration on top. Mix in a few seconds of `showcase.html` for the title/outro.

**Option C — Hybrid (recommended for a FYP demo)**
Intro + outro from `showcase.html`, real app footage for the middle (categories → article → key points → sources → bookmark/create). This proves the system actually works, which graders love.

> Tip: Free, license-safe background music — YouTube Audio Library, or Pixabay Music. Keep it under the voice at ~15% volume.

---

## 2) The 60-second narration script (timed)

> Read at a relaxed pace (~150 words/min ≈ 150 words total). Timecodes match the showcase scenes.

| Time | Scene | On-screen | Narration (voiceover) |
|------|-------|-----------|------------------------|
| **0:00–0:10** | Title | Logo + "News Release System" | *"Keeping up with gaming news shouldn't feel like a second job. Meet the News Release System."* |
| **0:10–0:20** | Problem | "Scattered & noisy" | *"Game news is scattered across dozens of sites, buried under clickbait, and it's hard to know what's actually true."* |
| **0:20–0:30** | Categories | Nintendo / PlayStation / Xbox / PC chips | *"So we built one clean feed. Filter by Nintendo, PlayStation, Xbox or PC — and see everything that matters in one place."* |
| **0:30–0:40** | Key points | ★ Key points list | *"Every story opens with key points, so you get the whole picture in seconds before you read a single paragraph."* |
| **0:40–0:50** | Trust + features | Sources + bookmarks + create | *"And every release links back to its original sources — so you can trust it. Bookmark what you love, or publish your own."* |
| **0:50–1:00** | Call to action | "Press play on the news" + URL | *"The News Release System. Press play on the news. Try it live today."* |

**Word count:** ~140 words — comfortably fits 60 seconds with breathing room.

---

## 3) Storyboard / shot list (for Option B/C with the real app)

| # | Duration | What to show (screen recording) | Movement |
|---|----------|---------------------------------|----------|
| 1 | 0:00–0:10 | `showcase.html` title scene (or app home blurred → logo) | Static / gentle zoom-in |
| 2 | 0:10–0:20 | Fast montage: scroll the home feed quickly | Smooth scroll down |
| 3 | 0:20–0:30 | Click category tabs: Nintendo → PlayStation → PC | Click each, 2s hold |
| 4 | 0:30–0:40 | Open one article; highlight the **"Key points"** block | Scroll to Key points, pause |
| 5 | 0:40–0:50 | Scroll to **"Sources"** list; then show Bookmark + Create nav | Hover/click bookmark |
| 6 | 0:50–1:00 | `showcase.html` outro scene with URL | Static, fade to logo |

---

## 4) Alternative taglines / name angles (decide with the team)

Pick one for the title card and outro — swap it in `showcase.html` (scene 1 `<p class="lead">`) and `index.html` (`#tagline`).

| Key | Tagline | Vibe |
|-----|---------|------|
| A | **Game news, cut to the point.** | Punchy, benefit-first *(currently live)* |
| B | Every headline that matters — summarised, sourced, built for gamers. | Descriptive, full value prop |
| C | Less scrolling. More playing. | Gamer-relatable, snappy |
| D | The source behind the story. | Trust / credibility angle |
| E | Your game news, summarised and sourced. | Clear + functional |
| F | Press play on the news. | Playful gaming pun *(used on outro)* |

**Name angles** (if you want a short product name alongside "News Release System"):
- **NRS** — simple initialism, matches your URL
- **PlayFeed** / **GameWire** / **PressStart News** — gamer-flavoured product names (optional branding; the formal project title stays "News Release System: Design and Implementation")

---

## 5) Checklist before you export
- [ ] Tagline chosen and updated in `index.html` + `showcase.html`
- [ ] Team member names/roles filled into the Team section of `index.html`
- [ ] Narration recorded (or on-screen captions used instead)
- [ ] Background music added at low volume (license-safe)
- [ ] Exported at 1080p, H.264 MP4, ~60s
