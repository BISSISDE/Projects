const HeaderStartButton = document.getElementById("buttonStart");
const QuestionPart = document.getElementById("QuestionPart");
const StartPart = document.getElementById("StartPart");

let timer;
let isRunning = false;
let time = 0;

const timeDisplay = document.getElementById("timer");
const resetButton = document.getElementById("reset");
const startButton = document.getElementById("start");
const TimerSpan = document.getElementById("TimerSpan");

const questions = [
  {
    question: "Which method should you use to remove spaces?",
    answers: ["noProbel()", "remote()", "tirm()", "strip()"],
    correctIndex: 2,
    image:
      "https://ae04.alicdn.com/kf/S658ea6ba91ce4ab3ac9f11789cd290feN.jpg_480x480.jpg",
  },
  {
    question: "What are the advantages of using async/await?",
    answers: [
      "It generates errors and works with them.",
      "It is a synchronous function.",
      "Uses .than/.catch",
      "Async/Await helps to write like synchronous code, avoiding overload and making it easier to read.",
    ],
    correctIndex: 3,
    image:
      "https://miro.medium.com/v2/resize:fit:1200/1*eldIPqXYPsEhU0-w_gcw5w.png",
  },
  {
    question: "Identify The translation of the word / Ambitious /",
    answers: ["Мейірімді", "Жігерлі", "Қырсық", "Сараң"],
    correctIndex: 1,
    image:
      "https://i0.wp.com/hwrkmagazine.co.uk/wp-content/uploads/_pda/2023/06/3.jpg?fit=1200%2C800&ssl=1",
  },
  {
    question: "How much chromosomes does a person have?",
    answers: ["46", "39", "49", "23"],
    correctIndex: 0,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF0VNb4tXswmRDWScgGFFC1WVuGUa723jusA&s",
  },
  {
    question: "Identify The translation of the word / Stubborn /",
    answers: ["Мейірімді", "Жігерлі", "Қырсық", "Сараң"],
    correctIndex: 2,
    image:
      "https://www.themanthanschool.co.in/blog/wp-content/uploads/2021/03/Power-of-English.jpg",
  },
];

let currentQuestionIndex = 0;
let score = 0;

function displayQuestion(index) {
  const question = questions[index];
  const colorTrueFalse = document.getElementById("colorTrueFalse");
  const answerButtons = document.querySelectorAll(".QuestionOneButton");
  const questionImage = document.getElementById("questionImage");
  const textTrueFalse = document.getElementById("TextTrueFalse");
  const nextButton = document.getElementById("nextButton");

  colorTrueFalse.textContent = question.question;

  answerButtons.forEach((button, i) => {
    button.textContent = question.answers[i];
    button.disabled = false;

    button.onclick = function () {
      answerButtons.forEach((btn) => (btn.disabled = true));

      if (i === question.correctIndex) {
        textTrueFalse.textContent = "Correct!";
        textTrueFalse.style.color = "green";
        score++;
      } else {
        textTrueFalse.textContent = "Incorrect!";
        textTrueFalse.style.color = "red";
      }

      nextButton.style.display = "none";

      setTimeout(function () {
        nextQuestion();
      }, 1000);
    };
  });

  questionImage.src = question.image;
  questionImage.style.display = "block";

  if (index === questions.length - 1) {
    nextButton.textContent = "Finish Quiz";
  } else {
    nextButton.textContent = "Next Question";
    nextButton.style.display = "block";
  }
}

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    displayQuestion(currentQuestionIndex);
    document.getElementById("TextTrueFalse").textContent = "";
    document.getElementById("nextButton").style.display = "block";
  } else {
    document.getElementById("TextTrueFalse").textContent = "Quiz Finished!";
    document.getElementById("nextButton").style.display = "none";
    stopTimer();
    displayResult();
  }
}

function displayResult() {
  const Result = document.getElementById("Result");
  const finalScore = document.getElementById("finalScore");
  const timeTaken = document.getElementById("timeTaken");

  finalScore.textContent = `Your score: ${score} / ${questions.length}`;
  timeTaken.textContent = `Time taken: ${padZero(
    Math.floor(time / 60)
  )}:${padZero(time % 60)} minutes`; // Мына шетті гпт алдым

  Result.style.display = "block";
  QuestionPart.style.display = "none";
  TimerSpan.style.display = "none";
}

function startTimer() {
  isRunning = true;
  timer = setInterval(() => {
    time++;
    displayTime();
  }, 1000);
}

function stopTimer() {
  isRunning = false;
  clearInterval(timer);
}

function resetTimer() {
  stopTimer();
  time = 0;
  displayTime();
  startButton.textContent = "Start";
}

function displayTime() {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  timeDisplay.textContent = `${padZero(minutes)}:${padZero(seconds)}`;
}

function padZero(time) {
  return time < 10 ? `0${time}` : time; // и мына шетті гпт алдым
}

HeaderStartButton.addEventListener("click", () => {
  StartPart.style.display = "none";
  QuestionPart.style.display = "block";
  TimerSpan.style.display = "block";
  nextQuestion();
  currentQuestionIndex = 0;

  if (!isRunning) {
    startButton.textContent = "Rest";
    startTimer();
  }

  displayQuestion(currentQuestionIndex);
});

startButton.addEventListener("click", () => {
  if (!isRunning) {
    startButton.textContent = "Rest";
    startTimer();
  } else {
    stopTimer();
    startButton.textContent = "Continue";
  }
});

resetButton.addEventListener("click", resetTimer);

document.getElementById("nextButton").addEventListener("click", nextQuestion);

document.getElementById("playAgainButton").addEventListener("click", () => {
  document.getElementById("Result").style.display = "none";
  QuestionPart.style.display = "block";
  TimerSpan.style.display = "block";
  TextTrueFalse.textContent = "";
  resetTimer();
  score = 0;
  currentQuestionIndex = 0;
  displayQuestion(currentQuestionIndex);
});
