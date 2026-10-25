# 🎬 News Release System — 60-Second Video Package

**Group 27 · Final Year Project: News Release System — Design and Implementation**
**Audience:** Gamers · **Goal:** Showcase the system in ~60 seconds

---

## 1) How to produce the actual video

I can't render a video file in this environment, so here's the fastest path to a finished clip:

**Option A — Record the animated showcase (easiest)**
1. Open `showcase.html` in a browser, full-screen (press F11), ideally at 1920×1080.
2. It auto-plays through **6 fast-cut scenes on a 36-second loop** (neon arcade theme, PRESS START hook, animated stat counters) with a progress bar at the bottom.
3. Screen-record one full loop with any recorder: **OBS Studio** (free), Windows **Game Bar** (`Win+G`), macOS **QuickLogo → Cmd+Shift+5**, or Loom.
4. Record your narration (below) over it, or add it in editing.

**Option B — Record the real app (most authentic)**
1. Screen-record yourself using the live app at `https://fyp-nrs.geyser.host/`, following the **shot list** below.
2. Lay the narration on top. Mix in a few seconds of `showcase.html` for the title/outro.

**Option C — Hybrid (recommended for a FYP demo)**
Intro + outro from `showcase.html`, real app footage for the middle (categories → article → key points → sources → bookmark/create). This proves the system actually works, which graders love.

> Tip: Free, license-safe background music — YouTube Audio Library, or Pixabay Music. Keep it under the voice at ~15% volume.

---

## 2) The 36-second narration script (timed · high-energy)

> Punchy, upbeat gamer-trailer tone. Read with energy (~2.5 words/sec). Timecodes match the 6 showcase scenes.
> **Tip:** add a short "whoosh"/UI-click SFX on each scene transition for extra impact.

| Time | Scene | On-screen | Narration (energetic VO) |
|------|-------|-----------|---------------------------|
| **0:00–0:06** | Hook / Title | Logo + glitch title + "▶ PRESS START" | *"Press start… on the way you read game news."* |
| **0:06–0:12** | The hook | "Tired of hunting…?" | *"Too many tabs. Too much clickbait. Not enough time to actually play."* |
| **0:12–0:19** | One feed | Platform chips light up | *"The News Release System drops it all in one feed — Nintendo, PlayStation, Xbox, PC."* |
| **0:19–0:26** | Stats | Counters hit 6+ / 3s / 100% | *"Six-plus categories. The key points in three seconds. A hundred percent sourced and legit."* |
| **0:26–0:31** | Features | Sources · Bookmarks · Create · Trending | *"Verified sources, bookmarks, trending drops — even publish your own."* |
| **0:31–0:36** | CTA | "PRESS PLAY ON THE NEWS" + URL | *"Press play on the news. Jump in now."* |

**Word count:** ~75 words — fits a snappy 36 seconds with room to breathe.
**No voiceover? ** The on-screen text already tells the whole story — just add music and it works as a silent trailer.

---

## 3) Storyboard / shot list (for Option B/C with the real app · 36s)

> Keep every shot short and snappy — fast cuts hold a gamer's attention.

| # | Duration | What to show (screen recording) | Movement |
|---|----------|---------------------------------|----------|
| 1 | 0:00–0:06 | `showcase.html` title scene (logo + PRESS START) | Quick zoom-punch in |
| 2 | 0:06–0:12 | Fast scroll through the home feed | Rapid scroll, slight blur |
| 3 | 0:12–0:19 | Click category tabs: Nintendo → PlayStation → Xbox → PC | Snap-click each, ~1.5s hold |
| 4 | 0:19–0:26 | Open an article; zoom on the **"Key points"** block | Punch-in on key points |
| 5 | 0:26–0:31 | **"Sources"** list, then Bookmark + Create nav | Quick cuts between each |
| 6 | 0:31–0:36 | `showcase.html` outro: PRESS PLAY ON THE NEWS + URL | Hold on logo + URL |

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
