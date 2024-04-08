const questions = [
    {
       question: "Javascript is an _______ language?",
       answers: [
        { text: "Object Oriented", correct: true},
        { text: "Object-Based", correct: false},
        { text: "Procedural", correct: false},
        { text: "None of the above", correct: false},
       ]
    },
    {
       question: "Which of the following methods is used to access HTML elements using Javascript?",
       answers: [
        { text: "getElementbyId()", correct: false},
        { text: "getElementsbyClassname", correct: false},
        { text: "Both A and B", correct: true},
        { text: "None of the above", correct: false},
       ]
    },
    {
       question: "Which of the following methods can be used to display data in some form using Javascript?",
       answers: [
        { text: "document.write()", correct: false},
        { text: "console.log()", correct: false},
        { text: "window.alert()", correct: false},
        { text: "All of the above", correct: true},
       ]
    },
    {
       question: "When an operator's value is NULL, the typeof returned by the unary operator is:",
       answers: [
        { text: "Boolean", correct: false},
        { text: "Undefined", correct: false},
        { text: "Object", correct: true},
        { text: "Integer", correct: false},
       ]
    },
    {
       question: "Which function is used to serialize an object into a JSON string in Javascript?",
       answers: [
        { text: "stringify()", correct: true},
        { text: "parse()", correct: false},
        { text: "convert()", correct: false},
        { text: "None of the above", correct: false},
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
    let questionNo = currentQuestionIndex +1;
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
    }else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();