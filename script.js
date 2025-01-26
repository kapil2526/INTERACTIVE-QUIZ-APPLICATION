const questions = [
    {
      question: "What is the capital of France?",
      choices: ["Paris", "Berlin", "Rome", "Madrid"],
      answer: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      choices: ["Earth", "Mars", "Jupiter", "Venus"],
      answer: "Mars",
    },
    {
      question: "Who wrote 'Romeo and Juliet'?",
      choices: ["William Shakespeare", "Charles Dickens", "J.K. Rowling", "Mark Twain"],
      answer: "William Shakespeare",
    },
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  const questionElement = document.getElementById("question");
  const choicesElement = document.getElementById("choices");
  const nextButton = document.getElementById("next");
  const scoreElement = document.getElementById("score");
  
  function loadQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
  
    currentQuestion.choices.forEach((choice) => {
      const li = document.createElement("li");
      li.textContent = choice;
      li.addEventListener("click", () => selectAnswer(li, choice === currentQuestion.answer));
      choicesElement.appendChild(li);
    });
  }
  
  function resetState() {
    nextButton.disabled = true;
    while (choicesElement.firstChild) {
      choicesElement.removeChild(choicesElement.firstChild);
    }
  }
  
  function selectAnswer(selectedElement, isCorrect) {
    clearSelection();
    if (isCorrect) {
      selectedElement.classList.add("correct");
      score++;
    } else {
      selectedElement.classList.add("wrong");
    }
    nextButton.disabled = false;
  }
  
  function clearSelection() {
    Array.from(choicesElement.children).forEach((child) => {
      child.classList.remove("correct", "wrong");
    });
  }
  
  nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      quizOver();
    }
  });
  
  function quizOver() {
    questionElement.textContent = "Quiz Completed!";
    choicesElement.innerHTML = "";
    nextButton.style.display = "none";
    scoreElement.textContent = `Your score is ${score} / ${questions.length}`;
  }
  
  // Initialize the quiz
  loadQuestion();
  