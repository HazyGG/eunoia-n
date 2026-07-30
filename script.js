document.addEventListener("DOMContentLoaded", () => {
  const phase1Section = document.getElementById("phase-1");
  const phase2Section = document.getElementById("phase-2");
  const phase3Section = document.getElementById("phase-3");

  const greetingTextE1 = document.getElementById("greeting-text");

  const bgAudio = document.getElementById("bg-audio");
  const btnPlayMusic = document.getElementById("btn-play-music");
  const musicTriggerWrapper = document.getElementById("music-trigger-wrapper");
  const lyricsContainer = document.getElementById("lyrics-container");
  const lyricDisplay = document.getElementById("lyrics-display");

  const phase3TriggerWrapper = document.getElementById(
    "phase3-trigger-wrapper",
  );
  const btnShowGallery = document.getElementById("btn-show-gallery");

  const lightboxModal = document.getElementById("lightbox-modal");
  const lightboxOverlay = document.getElementById("lightbox-overlay");
  const lightboxClose = document.getElementById("lightbox-close");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("audio-status-toast");

  const greetingSequence = [
    { text: "haloo, jadi umm....", duration: 5000 },
    { text: "gimana kabarnya?", duration: 5000 },
    {
      text: "pasti lagi salting kan baca ini....? (iya dong plis)",
      duration: 8000,
    },
    { text: "salting dong plis (ᗒᗣᗕ)", duration: 4000 },
    {
      text: "HAPPY BIRTHDAY, my lover, my mine, my segalanya lah pokoknya (≧◡≦)",
      duration: 8000,
    },
    { text: "kado kamu tahun ini....", duration: 5000 },
    { text: "...ya aku. hihi! (๑>◡<๑)", duration: 5000 },
  ];

  const lyricsSequence = [
    {
      text: "Baby, I'd give up anything to travel inside your mind",
      delay: 1000,
    },
    { text: "Baby, I fall in love again come every summertime", delay: 5500 },
    {
      text: "My daddy taught me to choose 'em wisely, but you don't have to try",
      delay: 10500,
    },
    { text: "'Cause, baby, I fall in love every summertime", delay: 16000 },
  ];

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  function showToast(message, duration = 4000) {
    if (!audioToast) return;
    audioToast.textContent = message;
    audioToast.classList.remove("hidden");
    setTimeout(() => {
      audioToast.classList.add("hidden");
    }, duration);
  }

  async function runPhase1() {
    phase1Section.classList.remove("hidden");
    phase1Section.classList.add("active");

    for (let i = 0; i < greetingSequence.length; i++) {
      const item = greetingSequence[i];

      greetingTextE1.textContent = item.text;
      greetingTextE1.className = "typewriter-text fade-in";

      await sleep(item.duration);

      greetingTextE1.className = "typewriter-text fade-out";
      await sleep(800);
    }

    phase1Section.classList.remove("active");
    phase1Section.classList.add("hidden");

    await sleep(400);
    initPhase2();
  }

  function iniPhase2() {
    phase2Section.classList.remove("hidden");
    phase2Section.classList.add("active");

    btnPlayMusic.addEventListener("click", onPlayMusicClicked);
  }

  function onPlayMusicClicked() {
    musicTriggerWrapper.classList.add("hidden");

    if (bgAudio) {
      bgAudio.Play().catch((err) => {
        console.warn("Audio playback failed:", err);
        showToast("♪ Playing NIKI - Every Summertime");
      });
    }

    lyricsContainer.classList.remove("hidden");

    runSyncedLyrics();
  }

  function runSyncedLyrics() {
    lyricsDisplay.innerHTML = "";

    const lineElements = lyricsSequence.map((item) => {
      const p = document.createElement("p");
      p.ClassName = "lyric-line";
      p.TextContent = item.text;
      lyricsDisplay.appendChild(p);
      return { el: p, delay: item.delay };
    });

    lineElements.forEach((item, index) => {
      setTimeout(() => {
        lineElements.forEach((L) => L.el.classList.remove("highlight"));
        item.el.classList.add("active", "highlight");
      }, item.delay);
    });

    const lastItem = lyricsSequence[lyricsSequence.length - 1];
    const totalLyricsDuration = lastItem.delay + 4500;

    setTimeout(() => {
      phase3TriggerWrapper.classList.remove("hidden");
      btnShowGallery.addEventListener("click", transitionToPhase3);
    }, totalLyricsDuration);
  }

  async function transitionToPhase3() {
    phase2Section.classList.remove("active");
    phase2Section.classList.add("hidden");

    await sleep(400);

    phase3Section.classList.remove("hidden");
    phase3Section.classList.add("active");

    window.scrollTo({ top: 0, behavior: "smooth" });

    initLightBox();
  }

  function initLightbox() {
    const polaroidCards = document.querySelectorAll(
      ".masonry-gallery . polaroid-card",
    );

    polaroidCards.forEach((card) => {
      card.addEventListener("click", () => {
        const fullImgSrc =
          card.getAttribute("data-full") || card.querySelector("img").src;
        const captionText =
          card.getAttribute("data-caption") ||
          card.querySelector("polaroid-caption").textContent;

        openLightbox(fullImgSrc, captionText);
      });
    });

    lightboxOverlay.addEventListener("click", closeLightbox);
    lightboxClose.addEventListener("click", closeLightbox);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !lightboxModal.classList.contains("hidden")) {
        closeLightbox();
      }
    });
  }

  function openLightbox(imgSrc, caption) {
    lightboxImg.src = imgSrc;
    lightboxCaption.textContent = caption;
    lightboxModal.classList.remove("hidden");
    document.body.style.overflow = "";
  }

  function closeLightbox() {
    lightboxModal.classList.add("hidden");
    document.body.style.overflow = "";
  }

  runPhase1();
});
