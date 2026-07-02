/* ============================================
   Flashcard engine — reads cards from flashcardData (flashcard-data.js)
   ============================================ */

(function () {
  const root = document.getElementById('flashcardApp');
  if (!root) return;

  if (!Array.isArray(flashcardData) || flashcardData.length === 0) {
    root.innerHTML = `
      <div class="quiz-empty">
        <span class="emoji">🃏</span>
        <h3 style="margin-bottom:10px;">Flashcards coming soon!</h3>
        <p>Cards will be added here once we finalize the content.</p>
        <p style="margin-top:8px; font-size:0.9rem; color:var(--text-mute);">
          (Open <code>js/flashcard-data.js</code> to add flashcards.)
        </p>
      </div>
    `;
    return;
  }

  let current = 0;

  function render() {
    const c = flashcardData[current];

    root.innerHTML = `
      <p class="flashcard-counter">Card ${current + 1} of ${flashcardData.length} · tap to flip</p>
      <div class="flashcard" id="flashcardEl">
        <div class="flashcard-inner">
          <div class="flashcard-face flashcard-front">
            <div class="front-text">${escapeHtml(c.front || '')}</div>
            ${c.pronunciation ? `<div class="pronunciation">${escapeHtml(c.pronunciation)}</div>` : ''}
            <div class="hint">↻ Tap to reveal meaning</div>
          </div>
          <div class="flashcard-face flashcard-back">
            <div class="back-text">${escapeHtml(c.back || '')}</div>
            ${c.example ? `<div class="back-example">${escapeHtml(c.example)}</div>` : ''}
          </div>
        </div>
      </div>
      <div class="flashcard-controls">
        <button class="btn btn-ghost" id="prevBtn" ${current === 0 ? 'disabled style="opacity:0.4;cursor:not-allowed;"' : ''}>← Previous</button>
        <button class="btn btn-primary" id="nextBtn" ${current === flashcardData.length - 1 ? 'disabled style="opacity:0.4;cursor:not-allowed;"' : ''}>Next →</button>
      </div>
    `;

    const card = root.querySelector('#flashcardEl');
    card.addEventListener('click', () => card.classList.toggle('flipped'));

    const prev = root.querySelector('#prevBtn');
    const next = root.querySelector('#nextBtn');
    if (current > 0) prev.addEventListener('click', () => { current--; render(); });
    if (current < flashcardData.length - 1) next.addEventListener('click', () => { current++; render(); });
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  render();
})();
