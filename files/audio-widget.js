/**
 * Minimal auto-play audio widget
 * -------------------------------
 * Usage: add a container to your page like:
 *
 *   <div class="audio-widget" data-src="audio/track1.mp3" data-loop="false"></div>
 *   <script src="audio-widget.js"></script>
 *
 * Behavior:
 * - On the very first play button click anywhere on your site, we store a flag
 *   in localStorage ("siteAudioUnlocked"). This persists across page navigations
 *   (as long as the visitor stays on the same domain).
 * - On every later page load, if that flag is set, we immediately attempt to
 *   autoplay the track on that page. Modern browsers generally allow this once
 *   a visitor has already interacted with your site.
 * - If the browser still blocks autoplay (e.g. very first visit, or a strict
 *   browser setting), the widget just shows the play button so the visitor can
 *   tap it — no broken state, no console errors shown to the user.
 */

(function () {
  const UNLOCK_KEY = "siteAudioUnlocked";

  function initWidget(container) {
    const src = container.getAttribute("data-src");
    const loop = container.getAttribute("data-loop") === "true";

    if (!src) {
      console.warn("audio-widget: missing data-src on", container);
      return;
    }

    const audio = new Audio(src);
    audio.loop = loop;
    audio.preload = "auto";

    // Build the button (play-button-only style, no scrubber/volume/etc.)
    const btn = document.createElement("button");
    btn.className = "audio-widget-btn";
    btn.setAttribute("aria-label", "Play audio");
    btn.innerHTML = playIconSVG();
    container.appendChild(btn);

    let isPlaying = false;

    function setPlayingState(playing) {
      isPlaying = playing;
      btn.innerHTML = playing ? pauseIconSVG() : playIconSVG();
      btn.setAttribute("aria-label", playing ? "Pause audio" : "Play audio");
    }

    function attemptAutoplay() {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setPlayingState(true))
          .catch(() => {
            // Autoplay blocked — just leave the play button visible.
            setPlayingState(false);
          });
      }
    }

    btn.addEventListener("click", () => {
      if (isPlaying) {
        audio.pause();
        setPlayingState(false);
      } else {
        audio.play().then(() => {
          setPlayingState(true);
          localStorage.setItem(UNLOCK_KEY, "true");
        }).catch((err) => {
          console.warn("audio-widget: play failed", err);
        });
      }
    });

    audio.addEventListener("ended", () => {
      if (!loop) setPlayingState(false);
    });

    // If a previous page already unlocked audio this session, try to autoplay now.
    if (localStorage.getItem(UNLOCK_KEY) === "true") {
      attemptAutoplay();
    }
  }

  function playIconSVG() {
    return `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
  }

  function pauseIconSVG() {
    return `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>`;
  }

  function init() {
    document.querySelectorAll(".audio-widget").forEach(initWidget);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
