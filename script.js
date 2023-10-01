const questions = [
    {
        question:"Which of the following is not a valid Java data type?",
        answers: [
            { text:"int", correct:false},
            { text:"float", correct:false},
            { text:"boolean", correct:false},
            { text:"string", correct:true}
        ]        
    },

    {
        question:"In Java, which keyword is used to declare a constant variable?",
        answers: [
            { text:"constant", correct:false},
            { text:"final", correct:true},
            { text:"static", correct:false},
            { text:"const", correct:false}
        ]        
    },

    {
        question:'In Java, what is the purpose of the "break" statement?',
        answers: [
            { text: "To terminate the program", correct: false },
            { text: "To exit a loop or switch statement", correct: true },
            { text: "To create a new line in the output", correct: false },
            { text: "To jump to a specified label in the code", correct: false }
        ]
    },

    {
        question:"Which of the following is a checked exception in Java?",
        answers: [
            { text: " NullPointerException", correct: false },
            { text: "ArithmeticException", correct: false },
            { text: "IOException", correct: true },
            { text: "ArrayIndexOutOfBoundsException", correct: false }
        ]
    },

];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex =0;
let score = 0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML ="Next";
    showQuestion();
}

function showQuestion()
{
    resetstate();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex+1;
    questionElement.innerHTML= questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct)
        {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}
function resetstate()
{
    nextButton.style.display="none";
    while(answerButtons.firstChild)
    {
        answerButtons.removeChild(answerButtons.firstChild);
    }

}

function selectAnswer(e)
{
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect)
    {
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
      if(button.dataset.correct==="true")
      {
        button.classList.add("correct"); 
      }  
      button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore()
{
    resetstate();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton()
{
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length)
    {
        showQuestion();
    }
    else{
        showScore();
    }
}
nextButton.addEventListener("click", ()=>
{
    if(currentQuestionIndex<questions.length)
    {
        handleNextButton();
    }
    else{
        startQuiz();
    }
})
 startQuiz();