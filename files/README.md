# Auto-play Audio Widgets for Canva Embeds

Four lightweight, play-button-only audio widgets — one per page — designed to
be hosted via GitHub Pages and embedded into your Canva website as embedded
websites (iframes).

## How it works

- Each page (`page1.html`, `page2.html`, `page3.html`, `page4.html`) is a
  tiny standalone HTML file with just a circular play button and its own
  audio track.
- The **first time** a visitor clicks any play button on your site, that
  choice is remembered (`localStorage`) for the rest of their visit.
- On **every page after that**, the widget automatically tries to play its
  track the moment the page loads — no click needed.
- If a browser still blocks autoplay (happens occasionally on first visit,
  or in very strict browser settings), the widget just shows the play button
  instead of erroring out.

This is the most reliable pattern that works within real browser autoplay
rules — there's no way to force guaranteed autoplay-with-sound on a
completely fresh page load with zero prior interaction; all browsers block that.

## 1. Add your audio files

Drop your own MP3 files into the `audio/` folder and name them to match
what each page expects (or edit the `data-src` in the HTML to match your
filenames):

```
audio/track1.mp3
audio/track2.mp3
audio/track3.mp3
audio/track4.mp3
```

## 2. Push to your GitHub repo

Copy all these files (`audio-widget.js`, `audio-widget.css`, `page1.html`
through `page4.html`, and the `audio/` folder with your tracks) into the
repo you already created, then:

```bash
git add .
git commit -m "Add audio player widgets"
git push
```

## 3. Turn on GitHub Pages

1. In your repo on GitHub: **Settings → Pages**
2. Under "Build and deployment", set **Source** to "Deploy from a branch"
3. Choose your main branch and `/ (root)` folder → **Save**
4. GitHub will give you a URL like:
   `https://yourusername.github.io/your-repo-name/page1.html`

Wait a minute or two after enabling — it takes a moment to go live.

## 4. Embed into Canva

In Canva's website editor:

1. Go to the page where you want widget 1
2. Add an **Embed** element (search "Embed" in the elements panel, or use
   "Embed a link")
3. Paste the GitHub Pages URL for that page, e.g.
   `https://yourusername.github.io/your-repo-name/page1.html`
4. Resize the embed frame to roughly 70x70px so only the button shows,
   position it wherever you'd like on the page
5. Repeat for `page2.html`, `page3.html`, `page4.html` on their respective
   Canva pages

## Customizing

- **Loop a track:** change `data-loop="false"` to `data-loop="true"` in
  that page's HTML
- **Button size/color:** edit `audio-widget.css`
- **More pages:** copy `page1.html`, rename it, and change the `data-src`
  path to a new track

## A note on autoplay

No widget — from anyone — can guarantee sound autoplay on a visitor's very
first page load with zero interaction; every major browser blocks that by
design to prevent unwanted noise. This setup gets as close as is technically
possible: one tap unlocks audio for the rest of the visit.
