/**
 * Minimal auto-play audio widget
 * -------------------------------
 * <div class="audio-widget" data-src="audio/track.mp3" data-loop="false"></div>
 * <script src="audio-widget.js"></script>
 *
 * - First click anywhere on the site unlocks audio for the whole visit
 *   (stored in localStorage under "siteAudioUnlocked").
 * - On every page after that, the widget tries to autoplay immediately.
 * - If the browser still blocks it, the play button just sits there
 *   waiting for a tap — no errors, no broken state.
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
          .catch(() => setPlayingState(false));
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

    if (localStorage.getItem(UNLOCK_KEY) === "true") {
      attemptAutoplay();
    }
  }

  function playIconSVG() {
    return `<svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
  }

  function pauseIconSVG() {
    return `<svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>`;
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
