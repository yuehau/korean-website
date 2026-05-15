/* ============================================
   Quiz questions live here.

   HOW TO ADD A QUESTION:
   Paste a new object into the quizData array below.
   Each question needs:
     - question      : the question text (Korean OK)
     - options       : array of 4 answer choices
     - correctIndex  : 0, 1, 2, or 3 — which option is correct
     - explanation   : (optional) shown after answering

   You can also DELETE or EDIT any starter question below.
   The quiz auto-detects how many questions exist.
   ============================================ */

const quizData = [
  // ---- Starter questions for Lesson 6 (feel free to replace) ----
  {
    question: "비빔밥 ___ 주세요. (1 bowl)",
    options: ["한 그릇", "두 그릇", "한 잔", "한 명"],
    correctIndex: 0,
    explanation: "그릇 is the counter for bowls of food. 하나 changes to 한 before a counter."
  },
  {
    question: "커피 ___ 주세요. (3 cups)",
    options: ["세 잔", "세 그릇", "삼 잔", "셋 잔"],
    correctIndex: 0,
    explanation: "잔 is the counter for cups. 셋 changes to 세 before a counter."
  },
  {
    question: "What does 갈비탕 mean?",
    options: ["Short rib soup", "Cold noodles", "Mixed rice", "Grilled meat"],
    correctIndex: 0,
    explanation: "갈비탕 [gal-bi-tang] is a Korean beef short rib soup."
  },
  {
    question: "저는 ___ 살이에요. (20 years old)",
    options: ["스무", "스물", "이십", "이"],
    correctIndex: 0,
    explanation: "스물 changes to 스무 before the counter 살."
  },
  {
    question: "Which counter is used for bottles?",
    options: ["병", "잔", "그릇", "개"],
    correctIndex: 0,
    explanation: "병 [byeong] is the counter for bottles (water, beer, etc.)."
  },
  {
    question: "학생이 ___ 명 있어요. (10 students)",
    options: ["열", "십", "스무", "다섯"],
    correctIndex: 0,
    explanation: "열 means 10 in native Korean. Use native numbers with 명 (people)."
  },
  {
    question: "비빔밥 [bi-bim-bap] is...",
    options: ["Mixed rice with vegetables", "Cold noodles", "A sandwich", "A pizza"],
    correctIndex: 0,
    explanation: "비빔밥 is a famous Korean dish — mixed rice topped with vegetables, meat, and egg."
  },
  {
    question: "How do you say '2 bowls of ramyeon' in Korean?",
    options: ["라면 두 그릇", "라면 두 잔", "라면 둘 그릇", "라면 이 그릇"],
    correctIndex: 0,
    explanation: "둘 changes to 두 before a counter, and 그릇 is the counter for bowls."
  },
];
