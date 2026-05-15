/* ============================================
   Shared interactions across all pages
   ============================================ */

// ---------- Mobile nav toggle ----------
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navMenu.classList.toggle('open');
  });
  // Close menu when clicking a link
  navMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navMenu.classList.remove('open');
    });
  });
}

// ---------- Scroll progress bar ----------
const scrollProgress = document.getElementById('scrollProgress');
if (scrollProgress) {
  const updateProgress = () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
    scrollProgress.style.width = pct + '%';
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

// ---------- Reveal-on-scroll animations ----------
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in-view'));
}

// ---------- Video placeholder handling ----------
// If a <video> file actually loads, show it and hide the sibling placeholder text.
// If the file is missing, the placeholder stays visible.
document.querySelectorAll('.video-placeholder video, .video-frame video').forEach(video => {
  const container = video.parentElement;
  const placeholderText = container.querySelector('.play-icon, .placeholder-note, .placeholder-inner');

  video.addEventListener('loadeddata', () => {
    video.style.display = 'block';
    container.querySelectorAll('.play-icon, .placeholder-note, .placeholder-inner').forEach(el => {
      el.style.display = 'none';
    });
  });

  // Trigger load attempt
  video.load();
});

// ---------- Exercises page: tab switching ----------
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
if (tabButtons.length) {
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');
      tabButtons.forEach(b => b.classList.toggle('active', b === btn));
      tabContents.forEach(c => c.classList.toggle('active', c.id === 'tab-' + target));
    });
  });
}

// ---------- Korean text-to-speech (TTS) ----------
// Browser-native Korean voice. Plays the Korean text when speaker button is clicked.
// This is a learning aid — for the assessed video recordings, you still use your own voice.
function speakKorean(text, btn) {
  if (!('speechSynthesis' in window) || !text) return;
  // Stop anything currently playing
  speechSynthesis.cancel();

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'ko-KR';
  utter.rate = 0.9;
  utter.pitch = 1.0;

  // Try to pick the best Korean voice available
  const voices = speechSynthesis.getVoices();
  const koreanVoice = voices.find(v => v.lang === 'ko-KR' || v.lang.startsWith('ko'));
  if (koreanVoice) utter.voice = koreanVoice;

  if (btn) {
    utter.onstart = () => btn.classList.add('speaking');
    utter.onend = () => btn.classList.remove('speaking');
    utter.onerror = () => btn.classList.remove('speaking');
  }

  speechSynthesis.speak(utter);
}

// SVG markup for the speaker icon (reused everywhere)
const SPEAKER_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>';

// Clean Korean text before speaking (strip emoji/symbols)
function cleanKoreanText(text) {
  return String(text || '')
    .replace(/[✓❌💡✏️🔊→]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Auto-inject speaker buttons next to Korean text in examples and dialogues
function autoInjectSpeakers() {
  const selectors = ['.example-line .korean', '.dialogue-text .korean', '.bubble-korean'];
  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      if (el.dataset.speakInjected) return;
      if (el.classList.contains('placeholder-text')) return;

      const text = cleanKoreanText(el.textContent);
      if (!text) return;

      const btn = document.createElement('button');
      btn.className = 'speak-btn speak-btn-sm';
      btn.setAttribute('data-speak', text);
      btn.setAttribute('aria-label', 'Pronounce in Korean');
      btn.innerHTML = SPEAKER_SVG;
      el.appendChild(document.createTextNode(' '));
      el.appendChild(btn);
      el.dataset.speakInjected = '1';
    });
  });
}

// Wire up every [data-speak] button on the page
function bindSpeakButtons() {
  document.querySelectorAll('[data-speak]').forEach(btn => {
    if (btn.dataset.bound) return;
    btn.dataset.bound = '1';
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      speakKorean(btn.getAttribute('data-speak'), btn);
    });
  });
}

// Auto-inject + bind, then re-bind when voices load async
autoInjectSpeakers();
bindSpeakButtons();
if ('speechSynthesis' in window) {
  speechSynthesis.onvoiceschanged = bindSpeakButtons;
}

// ---------- Team portrait photos (About page) ----------
// When a member adds images/memberN.png, show the photo and hide the emoji.
// If the file doesn't exist, the emoji placeholder stays visible.
document.querySelectorAll('.portrait-photo').forEach(img => {
  // Browser already attempted to load the image. Check if it succeeded.
  if (img.complete && img.naturalWidth > 0) {
    img.classList.add('loaded');
  } else {
    img.addEventListener('load', () => {
      if (img.naturalWidth > 0) img.classList.add('loaded');
    });
    img.addEventListener('error', () => {
      // File missing — keep emoji visible, hide broken img icon
      img.style.display = 'none';
    });
  }
});
