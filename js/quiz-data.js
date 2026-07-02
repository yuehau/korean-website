/* ============================================
   Practice quiz questions.

   These mirror the 10 questions in our official Google Form quiz
   (https://forms.gle/8SnY8mgvUHB27Ziw7), so students can practice
   with instant feedback here, then submit for real on quiz.html.

   HOW TO ADD/EDIT A QUESTION:
     - question      : the question text (Korean OK)
     - options       : array of 4 answer choices
     - correctIndex  : 0, 1, 2, or 3 — which option is correct
     - explanation   : (optional) shown after answering
   ============================================ */

const quizData = [
  {
    question: "What does 비빔밥 mean?",
    options: ["Kimchi", "Mixed rice", "Pizza", "Sandwich"],
    correctIndex: 1,
    explanation: "비빔밥 [bi-bim-bap] literally means 'mixed rice' — rice mixed with vegetables, meat, and egg."
  },
  {
    question: "Which is the Korean word for \"ramen\"?",
    options: ["김밥", "떡볶이", "라면", "불고기"],
    correctIndex: 2,
    explanation: "라면 [ra-myeon] is ramen. 김밥 is gimbap, 떡볶이 is tteokbokki, 불고기 is bulgogi."
  },
  {
    question: "What does \"저는 김밥을 먹어요\" mean?",
    options: ["I like gimbap", "I eat gimbap", "Gimbap is delicious", "Please give me gimbap"],
    correctIndex: 1,
    explanation: "먹어요 means 'eat' — so 저는 김밥을 먹어요 = I eat gimbap."
  },
  {
    question: "Which is the Korean native number for \"three\"?",
    options: ["셋", "하나", "넷", "둘"],
    correctIndex: 0,
    explanation: "셋 [set] is three. 하나 = 1, 둘 = 2, 넷 = 4."
  },
  {
    question: "Which Korean word means the number \"8\"?",
    options: ["일곱", "여덟", "아홉", "여섯"],
    correctIndex: 1,
    explanation: "여덟 [yeo-deol] is eight. 일곱 = 7, 아홉 = 9, 여섯 = 6."
  },
  {
    question: "Which counting word is used for bowls or dishes?",
    options: ["명", "병", "잔", "그릇"],
    correctIndex: 3,
    explanation: "그릇 [geu-reut] counts bowls/dishes. 명 = people, 병 = bottles, 잔 = cups."
  },
  {
    question: "How does 둘 change when used with a counting unit?",
    options: ["한", "세", "네", "두"],
    correctIndex: 3,
    explanation: "둘 becomes 두 before a counter — e.g. 두 그릇 (two bowls). 하나→한, 셋→세, 넷→네."
  },
  {
    question: "Which sentence means \"Please give me 2 bowls of bibimbap\"?",
    options: ["비빔밥 주세요", "비빔밥 둘 주세요", "비빔밥 두 그릇 주세요", "비빔밥 두 명 주세요"],
    correctIndex: 2,
    explanation: "Number + counter: 두 그릇 = two bowls. 명 is for people, so 두 명 would be wrong here!"
  },
  {
    question: "Which counting word is used for people?",
    options: ["병", "명", "개", "잔"],
    correctIndex: 1,
    explanation: "명 [myeong] counts people — e.g. 학생이 한 명 있어요 (There is one student)."
  },
  {
    question: "What does \"김치는 맛있어요\" mean?",
    options: ["I eat kimchi", "Kimchi is spicy", "Kimchi is delicious", "I like kimchi"],
    correctIndex: 2,
    explanation: "맛있어요 means 'is delicious' — so 김치는 맛있어요 = Kimchi is delicious."
  },
];
