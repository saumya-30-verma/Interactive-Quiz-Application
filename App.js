const startBtn = document.getElementById("start-btn");
const welcomeScreen = document.getElementById("welcome-screen");
const quizScreen = document.getElementById("quiz-screen");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreDisplay = document.getElementById("score-display");

let score = 0;

startBtn.addEventListener("click", () => {
  welcomeScreen.classList.remove("active");
  quizScreen.classList.add("active");
  showQuestion();
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateMathQuestion() {
  const a = getRandomInt(1, 20);
  const b = getRandomInt(1, 20);
  const correct = a + b;
  let wrong = [correct + 1, correct - 1, correct + 5].filter(n => n !== correct);

  return {
    question: `What is ${a} + ${b}?`,
    answers: shuffle([
      { text: correct.toString(), correct: true },
      ...wrong.map(w => ({ text: w.toString(), correct: false }))
    ])
  };
}

function generateScienceQuestion() {
  const questions = [
    {
      question: "Which metal is usually used to make the batteries for electric vehicles?",
      answers: [
        { text: "Lithium", correct: true },
        { text: "Uranium", correct: false },
        { text: "Aluminium", correct: false },
        { text: "Lead", correct: false }
      ]
    },
    {
      question: "Which form of the sun’s energy provides solar power?",
      answers: [
        { text: "Heat", correct: true },
        { text: "Light", correct: false },
        { text: "Both", correct: false },
        { text: "Neither", correct: false }
      ]
    }
  ];
  return questions[Math.floor(Math.random() * questions.length)];
}

function generateEnglishQuestion() {
  const questions = [
    {
      question: "I'll go home and get changed before we go out for dinner. Which is a phrasal verb?",
      answers: [
        { text: "go home", correct: true },
        { text: "get changed", correct: false },
        { text: "go out", correct: false },
        { text: "none", correct: false }
      ]
    },
    {
      question: "Its my first time playing football. Which word is incorrect?",
      answers: [
        { text: "Its", correct: true },
        { text: "my", correct: false },
        { text: "time", correct: false },
        { text: "playing", correct: false }
      ]
    }
  ];
  return questions[Math.floor(Math.random() * questions.length)];
}

function generateTechQuestion() {
  const questions = [
    {
      question: "What does CSS stand for?",
      answers: [
        { text: "Cascading Style Sheets", correct: true },
        { text: "Computer Style Syntax", correct: false },
        { text: "Creative Style System", correct: false },
        { text: "Coding Style Sheet", correct: false }
      ]
    },
    {
      question: "Which language is used for web apps?",
      answers: [
        { text: "JavaScript", correct: true },
        { text: "Python", correct: false },
        { text: "C++", correct: false },
        { text: "Swift", correct: false }
      ]
    }
  ];
  return questions[Math.floor(Math.random() * questions.length)];
}

function getRandomQuestion() {
  const generators = [generateMathQuestion, generateEnglishQuestion, generateScienceQuestion, generateTechQuestion];
  const selected = generators[Math.floor(Math.random() * generators.length)];
  return selected();
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function showQuestion() {
  resetState();
  const currentQuestion = getRandomQuestion();
  questionElement.innerHTML = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
  }

  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  scoreDisplay.innerHTML = `Score: ${score}`;
  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  showQuestion();
});

