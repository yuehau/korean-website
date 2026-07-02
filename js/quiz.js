/* ============================================
   Quiz engine — reads questions from quizData (quiz-data.js)
   Features: streak tracking, confetti, achievement badges,
   best-score memory (localStorage), animated score reveal.
   ============================================ */

(function () {
  const root = document.getElementById('quizApp');
  if (!root) return;

  // Empty state — friendly message until questions are added
  if (!Array.isArray(quizData) || quizData.length === 0) {
    root.innerHTML = `
      <div class="quiz-empty">
        <span class="emoji">📝</span>
        <h3 style="margin-bottom:10px;">Quiz coming soon!</h3>
        <p>Questions will be added here once we finalize the content.</p>
        <p style="margin-top:8px; font-size:0.9rem; color:var(--text-mute);">
          (Open <code>js/quiz-data.js</code> to add questions.)
        </p>
      </div>
    `;
    return;
  }

  const STORAGE = {
    bestScore: 'kfb-quiz-best-score',
    bestStreak: 'kfb-quiz-best-streak'
  };

  let current = 0;
  let score = 0;
  let answered = false;
  let currentStreak = 0;
  let maxStreak = 0;

  function getStored(key) {
    try { return parseInt(localStorage.getItem(key) || '0', 10) || 0; }
    catch (e) { return 0; }
  }

  function setStored(key, val) {
    try { localStorage.setItem(key, String(val)); } catch (e) { /* private mode */ }
  }

  function render() {
    const q = quizData[current];
    const progressPct = (current / quizData.length) * 100;
    const showBestRow = current === 0 && (getStored(STORAGE.bestScore) > 0 || getStored(STORAGE.bestStreak) > 0);

    root.innerHTML = `
      ${showBestRow ? `
        <div class="quiz-personal-best">
          <span>🏅 Your best: <strong>${getStored(STORAGE.bestScore)}/${quizData.length}</strong></span>
          <span>🔥 Longest streak: <strong>${getStored(STORAGE.bestStreak)}</strong></span>
        </div>
      ` : ''}
      <div class="quiz-progress-wrap">
        <div class="quiz-progress-bar">
          <div class="quiz-progress-fill" style="width:${progressPct}%"></div>
        </div>
        <span class="quiz-progress-text">${current + 1} / ${quizData.length}</span>
        <div class="streak-counter ${currentStreak > 1 ? 'active' : ''}" id="streakCounter">
          <span class="streak-icon">🔥</span>
          <span class="streak-num">${currentStreak}</span>
        </div>
      </div>
      <p class="quiz-question">${escapeHtml(q.question)}</p>
      <div class="quiz-options">
        ${q.options.map((opt, i) => `
          <button class="quiz-option" data-i="${i}">${escapeHtml(opt)}</button>
        `).join('')}
      </div>
      <div class="quiz-feedback" id="quizFeedback"></div>
      <div class="quiz-controls">
        <span style="font-weight:600; color:var(--text-soft); align-self:center;">
          Score: <strong style="color:var(--coral);">${score}</strong> / ${quizData.length}
        </span>
        <button class="btn btn-primary" id="nextBtn" style="display:none;">
          ${current === quizData.length - 1 ? 'See Result →' : 'Next →'}
        </button>
      </div>
    `;

    root.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', () => handleAnswer(btn));
    });
    root.querySelector('#nextBtn').addEventListener('click', next);
    answered = false;
  }

  function handleAnswer(btn) {
    if (answered) return;
    answered = true;

    const chosen = parseInt(btn.getAttribute('data-i'), 10);
    const q = quizData[current];
    const correct = chosen === q.correctIndex;

    if (correct) {
      score++;
      currentStreak++;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else {
      currentStreak = 0;
    }

    // Update streak counter UI with animation
    const streakEl = root.querySelector('#streakCounter');
    if (streakEl) {
      streakEl.querySelector('.streak-num').textContent = currentStreak;
      streakEl.classList.toggle('active', currentStreak > 1);
      streakEl.classList.remove('bumped', 'shake');
      // Force reflow so animation re-triggers
      void streakEl.offsetWidth;
      streakEl.classList.add(correct ? 'bumped' : 'shake');
    }

    root.querySelectorAll('.quiz-option').forEach((b, i) => {
      b.disabled = true;
      if (i === q.correctIndex) b.classList.add('correct');
      if (i === chosen && !correct) b.classList.add('wrong');
    });

    const fb = root.querySelector('#quizFeedback');
    fb.classList.add('show', correct ? 'correct' : 'wrong');
    fb.innerHTML = correct
      ? `✅ <strong>정답! Correct!</strong> ${q.explanation ? '— ' + escapeHtml(q.explanation) : ''}`
      : `❌ <strong>Not quite.</strong> The correct answer is <strong>${escapeHtml(q.options[q.correctIndex])}</strong>.${q.explanation ? ' ' + escapeHtml(q.explanation) : ''}`;

    root.querySelector('#nextBtn').style.display = 'inline-flex';
  }

  function next() {
    current++;
    if (current >= quizData.length) {
      showResult();
    } else {
      render();
    }
  }

  function showResult() {
    const pct = Math.round((score / quizData.length) * 100);
    const prevBestScore = getStored(STORAGE.bestScore);
    const prevBestStreak = getStored(STORAGE.bestStreak);
    const isNewBest = score > prevBestScore;
    const isNewBestStreak = maxStreak > prevBestStreak;

    if (isNewBest) setStored(STORAGE.bestScore, score);
    if (isNewBestStreak) setStored(STORAGE.bestStreak, maxStreak);

    let message, emoji;
    if (pct === 100) { message = "Perfect! 완벽해요!"; emoji = "🏆"; }
    else if (pct >= 80) { message = "Excellent work! 잘했어요!"; emoji = "🎉"; }
    else if (pct >= 60) { message = "Good effort! Keep practicing."; emoji = "👍"; }
    else { message = "Keep at it — review the grammar and try again!"; emoji = "💪"; }

    const badges = calcBadges({ pct, maxStreak, isNewBest, score, total: quizData.length });

    root.innerHTML = `
      <div class="quiz-result">
        <div class="score-circle">
          <span id="scoreCount">0</span><span style="font-size:1.5rem;opacity:0.85;">/${quizData.length}</span>
        </div>
        ${isNewBest ? '<div class="new-best-pill">🌟 New Personal Best!</div>' : ''}
        <h3>${emoji} ${message}</h3>
        <p>You got <strong style="color:var(--coral);">${pct}%</strong> correct.</p>
        <div class="quiz-result-stats">
          <span class="result-stat">🔥 Max streak: <strong>${maxStreak}</strong></span>
          <span class="result-stat">🏅 All-time best: <strong>${Math.max(score, prevBestScore)}/${quizData.length}</strong></span>
        </div>
        ${badges.length ? `
          <div class="badge-grid">
            ${badges.map(b => `
              <div class="badge earned" title="${escapeHtml(b.desc)}">
                <div class="badge-icon">${b.icon}</div>
                <div class="badge-name">${escapeHtml(b.name)}</div>
                <div class="badge-desc">${escapeHtml(b.desc)}</div>
              </div>
            `).join('')}
          </div>
        ` : ''}
        <button class="btn btn-primary" id="restartBtn" style="margin-top:32px;">Try again →</button>
      </div>
    `;

    // Count-up animation on score
    animateNumber(root.querySelector('#scoreCount'), 0, score, 1100);

    // Confetti for great scores
    if (pct >= 80) {
      setTimeout(() => launchConfetti(), 400);
    }

    root.querySelector('#restartBtn').addEventListener('click', () => {
      current = 0; score = 0; answered = false; currentStreak = 0; maxStreak = 0;
      render();
    });
  }

  function calcBadges(stats) {
    const all = [
      {
        icon: '🏆', name: 'Perfect Score',
        desc: 'Got every question right',
        check: s => s.pct === 100
      },
      {
        icon: '🎯', name: 'Sharpshooter',
        desc: 'Scored 80% or higher',
        check: s => s.pct >= 80 && s.pct < 100
      },
      {
        icon: '🔥', name: 'Streak Master',
        desc: '5+ correct in a row',
        check: s => s.maxStreak >= 5
      },
      {
        icon: '🌟', name: 'New Personal Best',
        desc: 'Beat your previous high score',
        check: s => s.isNewBest && s.score > 0
      },
      {
        icon: '💪', name: 'Quiz Complete',
        desc: 'Finished the entire quiz',
        check: () => true
      },
    ];
    return all.filter(b => b.check(stats));
  }

  function animateNumber(el, from, to, duration) {
    if (!el) return;
    const start = performance.now();
    function step(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      el.textContent = Math.floor(from + (to - from) * eased);
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = to;
    }
    requestAnimationFrame(step);
  }

  function launchConfetti() {
    if (document.querySelector('.confetti-canvas')) return; // already running
    const canvas = document.createElement('canvas');
    canvas.className = 'confetti-canvas';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const colors = ['#FF5E78', '#FFC93C', '#4ECDC4', '#9D6CFF', '#FFFFFF'];
    const particles = [];
    const originX = canvas.width / 2;
    const originY = canvas.height * 0.4;

    for (let i = 0; i < 140; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 14 + 4;
      particles.push({
        x: originX + (Math.random() - 0.5) * 80,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 6,
        gravity: 0.32,
        size: Math.random() * 7 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 16,
        opacity: 1,
        drag: 0.992,
      });
    }

    let frameCount = 0;
    function frame() {
      frameCount++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      particles.forEach(p => {
        p.vx *= p.drag;
        p.vy = p.vy * p.drag + p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        if (frameCount > 60) p.opacity -= 0.012;
        if (p.opacity > 0 && p.y < canvas.height + 60) {
          alive = true;
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.55);
          ctx.restore();
        }
      });
      if (alive) {
        requestAnimationFrame(frame);
      } else {
        canvas.remove();
      }
    }
    requestAnimationFrame(frame);
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  render();
})();
