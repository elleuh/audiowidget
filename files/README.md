# Anthony's 25th — Standalone Audio Pages

Three pages that use your exact Canva exports as full-page backgrounds,
with the play-button audio widget layered on top (bottom-right corner).
Since these are real standalone pages hosted on GitHub Pages — not
embedded inside Canva — the widget works natively with no iframe/embed
restrictions at all.

## Files

```
home.html       → the casino/Vegas page ("Anthony's 25th")
aug27.html      → "Night At The Villa" page
playlist.html   → "Add To The Playlist" page
audio-widget.js
audio-widget.css
images/home.jpg
images/aug27.jpg
images/playlist.jpg
audio/           → put your MP3s here
```

## 1. Add your audio files

Drop your tracks into `audio/` with these exact names (or edit the
`data-src` in each HTML file to match your actual filenames):

```
audio/track1.mp3   → plays on home.html
audio/track2.mp3   → plays on aug27.html
audio/track3.mp3   → plays on playlist.html
```

## 2. Upload to your GitHub repo

Add all of these into your `audiowidget` repo (a new folder like
`site/` works well, or directly alongside your existing files — just
make sure the relative paths between the HTML, JS, CSS, images, and
audio folders stay intact).

## 3. Get your live URLs

Once GitHub Pages is live, your pages will be at something like:

```
https://elleuh.github.io/audiowidget/site/home.html
https://elleuh.github.io/audiowidget/site/aug27.html
https://elleuh.github.io/audiowidget/site/playlist.html
```

(adjust the path based on exactly where you upload the `site` folder)

## 4. Link from Canva — don't embed, just link

Since Canva blocks embedding custom pages, the move here is to add a
regular **link/button** on your Canva site (e.g. "RSVP" or "Add to
Playlist" button) that points to these URLs directly. Clicking takes
the visitor to the real page — full audio, full design, no embed
fighting required.

## Notes

- The play button sits in the bottom-right corner on all 3 pages by
  default. Move it by editing the `bottom`/`right` values in
  `audio-widget.css` under `.audio-widget`.
- First click anywhere unlocks audio for the rest of the visit — after
  that, each page attempts to autoplay automatically.
- The background images are used exactly as exported from Canva, so
  the pages should look pixel-identical to your designs.
