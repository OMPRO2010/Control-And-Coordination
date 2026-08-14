// ==========================================
// CONTROL & COORDINATION — QUIZ SYSTEM
// ==========================================

const questions = [
    {
        question: "Which part of the nervous system controls reflex actions?",
        options: [
            "Spinal Cord",
            "Cerebellum",
            "Forebrain",
            "Thyroid Gland"
        ],
        answer: 0
    },

    {
        question: "What is the structural and functional unit of the nervous system?",
        options: [
            "Hormone",
            "Neuron",
            "Gland",
            "Receptor"
        ],
        answer: 1
    },

    {
        question: "Which part of the brain maintains balance and posture?",
        options: [
            "Cerebellum",
            "Forebrain",
            "Medulla",
            "Spinal Cord"
        ],
        answer: 0
    },

    {
        question: "Which hormone helps regulate blood glucose?",
        options: [
            "Auxin",
            "Adrenaline",
            "Insulin",
            "Thyroxine"
        ],
        answer: 2
    },

    {
        question: "Growth of a plant towards light is called:",
        options: [
            "Geotropism",
            "Hydrotropism",
            "Phototropism",
            "Chemotropism"
        ],
        answer: 2
    },

    {
        question: "Which hormone promotes plant growth?",
        options: [
            "Auxin",
            "Insulin",
            "Adrenaline",
            "Thyroxine"
        ],
        answer: 0
    },

    {
        question: "Which part of the brain is mainly responsible for thinking?",
        options: [
            "Cerebellum",
            "Forebrain",
            "Medulla",
            "Spinal Cord"
        ],
        answer: 1
    },

    {
        question: "What detects changes in the environment?",
        options: [
            "Effectors",
            "Receptors",
            "Hormones",
            "Muscles"
        ],
        answer: 1
    },

    {
        question: "Which hormone prepares the body for emergency situations?",
        options: [
            "Insulin",
            "Auxin",
            "Adrenaline",
            "Cytokinin"
        ],
        answer: 2
    },

    {
        question: "Roots growing towards water show:",
        options: [
            "Phototropism",
            "Geotropism",
            "Hydrotropism",
            "Chemotropism"
        ],
        answer: 2
    }
];


// ==========================================
// QUIZ VARIABLES
// ==========================================

let currentQuestion = 0;
let score = 0;
let answered = false;


// ==========================================
// GET HTML ELEMENTS
// ==========================================

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const questionNumberElement =
    document.getElementById("question-number");

const scoreElement =
    document.getElementById("score");

const resultElement =
    document.getElementById("quiz-result");

const nextButton =
    document.getElementById("next-question");


// ==========================================
// LOAD QUESTION
// ==========================================

function loadQuestion() {

    answered = false;

    const question = questions[currentQuestion];

    questionElement.textContent = question.question;

    questionNumberElement.textContent =
        `QUESTION ${String(currentQuestion + 1).padStart(2, "0")}`;

    scoreElement.textContent =
        `SCORE ${String(score).padStart(2, "0")}`;

    resultElement.textContent = "";

    optionsElement.innerHTML = "";

    question.options.forEach((option, index) => {

        const button = document.createElement("button");

        button.textContent = option;

        button.addEventListener("click", () => {

            checkAnswer(button, index);

        });

        optionsElement.appendChild(button);

    });

    nextButton.style.display = "none";
}


// ==========================================
// CHECK ANSWER
// ==========================================

function checkAnswer(button, selectedIndex) {

    if (answered) return;

    answered = true;

    const correctAnswer =
        questions[currentQuestion].answer;

    const allButtons =
        optionsElement.querySelectorAll("button");

    allButtons.forEach((btn, index) => {

        btn.disabled = true;

        if (index === correctAnswer) {

            btn.style.borderColor = "#55ffb0";
            btn.style.color = "#55ffb0";
            btn.style.background =
                "rgba(85,255,176,0.08)";

        }

    });


    if (selectedIndex === correctAnswer) {

        score++;

        button.style.borderColor = "#55ffb0";
        button.style.color = "#55ffb0";

        resultElement.textContent =
            "✓ CORRECT! Excellent work.";

    } else {

        button.style.borderColor = "#ff4f7b";
        button.style.color = "#ff4f7b";

        resultElement.textContent =
            "✕ NOT QUITE — the correct answer is highlighted.";
    }


    scoreElement.textContent =
        `SCORE ${String(score).padStart(2, "0")}`;

    nextButton.style.display = "inline-block";
}


// ==========================================
// NEXT QUESTION
// ==========================================

nextButton.addEventListener("click", () => {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        loadQuestion();

    } else {

        showFinalResult();

    }

});


// ==========================================
// FINAL RESULT
// ==========================================

function showFinalResult() {

    questionNumberElement.textContent = "COMPLETED";

    scoreElement.textContent =
        `SCORE ${score}/${questions.length}`;

    questionElement.textContent =
        "🎉 Quiz Complete!";

    optionsElement.innerHTML = "";

    let message;

    const percentage =
        (score / questions.length) * 100;

    if (percentage === 100) {

        message =
            "🔥 PERFECT SCORE! Your science aura is MAXIMUM.";

    } else if (percentage >= 80) {

        message =
            "🚀 Excellent! Your Control & Coordination is strong.";

    } else if (percentage >= 60) {

        message =
            "⚡ Good job! A little more revision and you'll master it.";

    } else {

        message =
            "📚 Keep practising! You can definitely improve.";

    }

    resultElement.textContent = message;

    nextButton.textContent = "↻ PLAY AGAIN";

    nextButton.style.display = "inline-block";

    nextButton.onclick = restartQuiz;
}


// ==========================================
// RESTART
// ==========================================

function restartQuiz() {

    currentQuestion = 0;

    score = 0;

    nextButton.textContent = "NEXT →";

    nextButton.onclick = null;

    loadQuestion();

}


// ==========================================
// START QUIZ
// ==========================================

loadQuestion();
