const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyperlinks and Text Markup Language", correct: false },
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Home Tool Markup Language", correct: false },
            { text: "Hyperlink Text Markup Language", correct: false },
        ]
    },
    {
        question: "Which of the following is a programming language?",
        answers: [
            { text: "XML", correct: false },
            { text: "JSON", correct: false },
            { text: "CSS", correct: false },
            { text: "Python", correct: true },
        ]
    },
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "Cascading Style Sheets", correct: true },
            { text: "Creative Style Sheets", correct: false },
            { text: "Computer Style Sheets", correct: false },
            { text: "Colorful Style Sheets", correct: false },
        ]
    },
    {
        question: "What is the purpose of JavaScript in web development?",
        answers: [
            { text: "To style web pages", correct: false },
            { text: "To provide structure to web content", correct: false },
            { text: "To create dynamic behavior on web pages", correct: true },
            { text: "To define web page layout", correct: false },
        ]
    },
    {
        question: "Which symbol is used for single-line comments in Python?",
        answers: [
            { text: "//", correct: false },
            { text: "/* */", correct: false },
            { text: "#", correct: true },
            { text: "--", correct: false },
        ]
    },
    {
        question: "What does the SQL acronym stand for?",
        answers: [
            { text: "Structured Query Language", correct: true },
            { text: "Standard Query Language", correct: false },
            { text: "Sequential Query Language", correct: false },
            { text: "Structured Question Language", correct: false },
        ]
    },
    {
        question: "Which data structure uses Last In, First Out (LIFO) principle?",
        answers: [
            { text: "Queue", correct: false },
            { text: "Stack", correct: true },
            { text: "Tree", correct: false },
            { text: "Linked List", correct: false },
        ]
    },
    {
        question: "What does IDE stand for in programming?",
        answers: [
            { text: "Integrated Development Environment", correct: true },
            { text: "Interactive Development Environment", correct: false },
            { text: "Integrated Design Environment", correct: false },
            { text: "Interactive Design Environment", correct: false },
        ]
    },
    {
        question: "In object-oriented programming, what is encapsulation?",
        answers: [
            { text: "Combining data and methods that operate on the data into a single unit", correct: false },
            { text: "Inheritance of properties and behaviors from a parent class", correct: false },
            { text: "Ability of an object to take many forms", correct: false },
            { text: "Hiding the internal state of an object and requiring all interaction to be performed through an object's methods", correct: true },
        ]
    },
    {
        question: "Which of the following is NOT a fundamental data type in Python?",
        answers: [
            { text: "int", correct: false },
            { text: "float", correct: false },
            { text: "list", correct: true },
            { text: "str", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();