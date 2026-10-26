# 🎬 News Release System — 30-Second Video Package

**Futuristic / gamer theme · Audience: Gamers · Goal: Showcase the platform in ~30 seconds**

---

## 1) How to produce the actual video

I can't render a video file directly, so here's the fastest path to a finished clip:

**Option A — Record the animated showcase (easiest)**
1. Open `showcase.html` in a browser, full-screen (press `F11`), ideally at 1920×1080.
2. It auto-plays through **6 fast-cut scenes on a 30-second loop** (neon grid, scan-lines, PRESS START hook, animated stat counters) with a progress bar at the bottom.
3. Screen-record one full loop with **OBS Studio** (free), Windows **Game Bar** (`Win+G`), or macOS (`Cmd+Shift+5`).
4. Add narration (below) over it, or keep it as a silent trailer with music.

**Option B — Record the real app (most authentic)**
Screen-record the live app, following the shot list below, then lay narration on top.
Use the live build: `https://nrs.rabutenri.com/`

**Option C — Hybrid (recommended)**
Intro + outro from `showcase.html`, real app footage for the middle.

> Free, license-safe music: YouTube Audio Library or Pixabay Music. Synthwave/electronic suits the theme. Keep it under the voice at ~15%.

---

## 2) The 30-second narration script (timed · high-energy)

> Punchy gamer-trailer tone. Read with energy (~2.5 words/sec). Timecodes match the 6 scenes.
> Add a short "whoosh"/UI-click SFX on each transition for extra impact.

| Time | Scene | On-screen | Narration (energetic VO) |
|------|-------|-----------|---------------------------|
| **0:00–0:05** | Hook / Title | Logo + glitch title + "▶ PRESS START" | *"Press start… on the way you read game news."* |
| **0:05–0:10** | The hook | "Tired of hunting…?" | *"Too many tabs, too much clickbait, not enough time to play."* |
| **0:10–0:15.5** | One feed | Platform chips light up | *"One feed. Nintendo, PlayStation, Xbox, PC — every drop that matters."* |
| **0:15.5–0:21** | Stats | Counters hit 6+ / 3s / 100% | *"Six-plus channels. Key points in three seconds. A hundred percent sourced."* |
| **0:21–0:25.5** | Features | Sources · Bookmarks · Create · Trending | *"Verified sources, bookmarks, trending drops — publish your own."* |
| **0:25.5–0:30** | CTA | "PRESS PLAY ON THE NEWS" + URL | *"Press play on the news. Jump in now."* |

**Word count:** ~60 words — fits a snappy 30 seconds.
**No voiceover?** The on-screen text tells the whole story — just add music.

---

## 3) Storyboard / shot list (Option B/C with the real app · 30s)

> Keep every shot short — fast cuts hold a gamer's attention.

| # | Duration | What to show (screen recording) | Movement |
|---|----------|---------------------------------|----------|
| 1 | 0:00–0:05 | `showcase.html` title scene (logo + PRESS START) | Quick zoom-punch in |
| 2 | 0:05–0:10 | Fast scroll through the home feed | Rapid scroll |
| 3 | 0:10–0:15.5 | Click category tabs: Nintendo → PlayStation → PC | Snap-click each |
| 4 | 0:15.5–0:21 | Open an article; zoom on the **"Key points"** block | Punch-in |
| 5 | 0:21–0:25.5 | **"Sources"** list, then Bookmark + Create nav | Quick cuts |
| 6 | 0:25.5–0:30 | `showcase.html` outro: PRESS PLAY + URL | Hold on logo |

---

## 4) Tagline options (decide with the team)

Swap the live one in `index.html` (search for the `TAGLINE` comment) and scene 1 of `showcase.html`.

| Key | Tagline |
|-----|---------|
| A | **Game news, cut to the point.** *(current)* |
| B | Signal only. Zero noise. |
| C | Press play on the news. *(used on video outro)* |
| D | Your game news, decoded. |
| E | The future of the feed. |
| F | Less scrolling. More playing. |

---

## 5) Checklist before export
- [ ] Tagline chosen (if changing from current)
- [ ] Narration recorded (or on-screen captions + music only)
- [ ] Background music added at low volume (license-safe)
- [ ] Exported at 1080p, H.264 MP4, ~30s
