const questions = [
    {
        question:"Which is largest animal in the world?",
        answers:[
            {text:"Shark",correct:false},
            {text:"Blue Whale",correct:true},
            {text:"Monkey",correct:false},
            {text:"Reptiles",correct:false},
        ]
    },
    {
        question:"Which is smallest country in the world?",
        answers:[
            {text:"Valican City",correct:true},
            {text:"New York",correct:false},
            {text:"Pakistan",correct:false},
            {text:"Nepal",correct:false},
        ]
    },
    {
        question:"Which is largest desert in the world?",
        answers:[
            {text:"Valahari",correct:false},
            {text:"Mohenjo Daro",correct:false},
            {text:"Al-Basr",correct:false},
            {text:"Antarctica",correct:true},
        ]
    },
    {
        question:"Which is smallest continent in the world?",
        answers:[
            {text:"Arctic",correct:false},
            {text:"Australia",correct:true},
            {text:"Asia",correct:false},
            {text:"Africa",correct:false},
        ]
    }
];

const quest = document.getElementById("questions");
const answers = document.getElementById('answers');
const next = document.getElementsByClassName('next-btn')[0];


let currentQuestionIndex = 0;
let score = 0;

function start()
{
    currentQuestionIndex = 0;
    score = 0;
    next.innerHTML="Next";
    showQuestions();
}

function showQuestions()
{
  reset()
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo= currentQuestionIndex + 1;
  quest.innerHTML= questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML=answer.text;
    button.classList.add('btn');
    answers.appendChild(button);
  if (answer.correct) {
    button.dataset.correct=answer.correct;
  }    
  button.addEventListener('click',selectAnswer)
  })
}
function reset()
{
    next.style.display="none";
    while (answers.firstChild) {
        answers.removeChild(answers.firstChild)
    }
}

function selectAnswer(e)
{
    const selectedbtn = e.target;
    const isCorrect = selectedbtn.dataset.correct==='true';
    if (isCorrect) {
        selectedbtn.classList.add('correct');
        score++;
    }
    else{
        selectedbtn.classList.add('incorrect');
    }
    Array.from(answers.children).forEach(button=>{
       if (button.dataset.correct=='true'){
        button.classList.add('correct')
       }
       button.disabled=true;
    })
    next.style.display='block';
}

function showScore()
{
    reset();
    quest.innerHTML=`You Scored ${score} out of ${questions.length}!`;
    next.innerHTML= "Play Again";
    next.style.display="block";
}

function handleNextButton()
{
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestions();
    }
    else{
        showScore();
    }
}


next.addEventListener("click",()=>{
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }
    else{
        start();
    }
})

start();