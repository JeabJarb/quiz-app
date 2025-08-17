console.log("Quiz App Initialized");

const mockedQuizData = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Berlin", isTrue: false },
      { text: "Madrid", isTrue: false },
      { text: "Paris", isTrue: true },
      { text: "Rome", isTrue: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", isTrue: false },
      { text: "Mars", isTrue: true },
      { text: "Jupiter", isTrue: false },
      { text: "Mercury", isTrue: false },
    ],
  },
  {
    question: "Who wrote the play 'Romeo and Juliet'?",
    answers: [
      { text: "Charles Dickens", isTrue: false },
      { text: "William Shakespeare", isTrue: true },
      { text: "Mark Twain", isTrue: false },
      { text: "Jane Austen", isTrue: false },
    ],
  },
  {
    question: "What is the largest mammal in the world?",
    answers: [
      { text: "African Elephant", isTrue: false },
      { text: "Blue Whale", isTrue: true },
      { text: "Giraffe", isTrue: false },
      { text: "Hippopotamus", isTrue: false },
    ],
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    answers: [
      { text: "Oxygen", isTrue: true },
      { text: "Gold", isTrue: false },
      { text: "Osmium", isTrue: false },
      { text: "Olive", isTrue: false },
    ],
  },
];

const startQuizButton = document.getElementById("startQuiz");
const cardIntro = document.querySelector(".cardBody");
const quizBody = document.querySelector(".quizBody");
const form = document.getElementById("quizForm");
const nextButton = document.getElementById("nextQuestion");
const resultP = document.getElementById("result"); // small inline message (optional)
const resultBody = document.querySelector(".resultBody");
const resultText = document.getElementById("resultText");
const resetBtn = document.getElementById("reset");

let currentQuestion = 0;
let score = 0;

function renderQuestion(index) {
  const q = mockedQuizData[index];
  form.innerHTML = `
    <fieldset class="question">
      <legend>${q.question}</legend>
      ${q.answers
        .map((a, ai) => {
          const id = `q${index}_a${ai}`;
          return `
            <div class="optionList">
              <input type="radio" id="${id}" name="q${index}" value="${ai}" />
              <label for="${id}">${a.text}</label>
            </div>
          `;
        })
        .join("")}
    </fieldset>
  `;

  // Change button label on last question
  nextButton.textContent =
    index === mockedQuizData.length - 1 ? "Finish" : "Next";
}

startQuizButton.addEventListener("click", () => {
  cardIntro.style.display = "none";
  quizBody.style.display = "block";
  resultBody.style.display = "none";
  currentQuestion = 0;
  score = 0;
  renderQuestion(currentQuestion);
});

nextButton.addEventListener("click", () => {
  const selected = form.querySelector("input[type='radio']:checked");
  if (!selected) {
    alert("Please select an answer before continuing!");
    return;
  }

  const answerIndex = Number(selected.value);
  if (mockedQuizData[currentQuestion].answers[answerIndex].isTrue) {
    score++;
  }

  currentQuestion++;

  if (currentQuestion < mockedQuizData.length) {
    renderQuestion(currentQuestion);
  } else {
    // Done
    quizBody.style.display = "none";
    resultBody.style.display = "flex";
    resultText.textContent = `Quiz completed! Your score: ${score} / ${mockedQuizData.length}`;
  }
});

resetBtn.addEventListener("click", () => {
  resultBody.style.display = "none";
  cardIntro.style.display = "flex";
  // (optional) clear any transient UI
  form.innerHTML = "";
  resultP.style.display = "none";
});
