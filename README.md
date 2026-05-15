# Korean for Beginners — Group 4 FOM 1

A website for the **LMPU3282 Korean for Beginners** assignment, covering
**Lesson 6: 얼마예요? (How much is it?)**.

## How to view the site

Just double-click `index.html` — it opens in any browser. No installation, no build step.

> If videos don't play when you open the file directly, use a tiny local server:
> open the folder in VS Code and use the **Live Server** extension, or run
> `python -m http.server` in this folder and visit `http://localhost:8000`.

## Folder structure

```
korean website/
├── index.html         ← Home page (start here)
├── vocabulary.html    ← Vocabulary + member recordings
├── grammar.html       ← Counting units (단위 명사)
├── exercises.html     ← Quiz + flashcards
├── dialogue.html      ← Role-play video + script
├── about.html         ← Group 4 members
├── css/
│   └── style.css      ← All styles (edit colors here)
├── js/
│   ├── main.js              ← Shared (nav, animations)
│   ├── quiz.js              ← Quiz engine (don't edit)
│   ├── quiz-data.js         ← ✏️ EDIT: add quiz questions here
│   ├── flashcards.js        ← Flashcard engine (don't edit)
│   └── flashcard-data.js    ← ✏️ EDIT: add flashcards here
├── videos/            ← ✏️ ADD: drop your .mp4 files here
└── images/            ← ✏️ ADD: drop member photos here
```

## What you need to fill in

### 1. Member names + student IDs
Open **about.html** and **vocabulary.html**.
Find `[Member 1 Name]`, `[Student ID]`, etc. — replace with real names/IDs.

### 2. Vocabulary words (per member)
Open **vocabulary.html**.
Each member card has 3 word slots. Replace `[Korean word 1]`,
`[English translation]`, and `[Example sentence in Korean]` with real content.
You can add more `<div class="vocab-word">…</div>` blocks if needed (up to 5).

### 3. Videos
Drop MP4 files into the `videos/` folder. See `videos/README.txt` for filenames.

### 4. Member photos (optional but nice)
Drop JPGs into `images/`. See `images/README.txt` for instructions.

### 5. Quiz + flashcards
Open `js/quiz-data.js` and `js/flashcard-data.js`. Each file has a comment
at the top showing the format. Just paste entries into the array.

### 6. Group dialogue
Open **dialogue.html** and replace `[Korean line 1]` / `[English translation 1]`
with your group's actual dialogue script (6–8 lines, 2–3 speakers).

## Color palette (in `css/style.css`)

To recolor the site, edit the `:root` variables at the top of `style.css`.

| Variable | Color | Use |
|---|---|---|
| `--coral` | `#FF5E78` | Primary buttons, accents |
| `--yellow` | `#FFC93C` | Highlights, secondary |
| `--teal` | `#4ECDC4` | Mint accents |
| `--purple` | `#9D6CFF` | Gradient accents |
| `--bg` | `#FFF5E1` | Page background |

## Coursework checklist

- [x] Educational Korean language website
- [x] Lesson 6 chosen (얼마예요?)
- [x] Vocabulary section (placeholders ready)
- [x] Grammar explanation (counting units)
- [x] Interactive exercises (quiz + flashcards)
- [x] Dialogue section + role-play video slot
- [x] Contact / About page with member info
- [x] Audio/video playback
- [x] Clear navigation
- [x] Visually appealing design

⚠️ Coursework reminders:
- **No AI voices** — use your own voice for all recordings.
- **Show your face** in vocabulary + dialogue videos.
- **Dialogue video**: 1–3 minutes, 2–3 speakers, 6–8 lines.
- **Deadline**: Week 14 (Mar/Apr 2026, T2610).

Made with 💛 by Group 4 FOM 1.
