const quizData = [
  {
    question: "What does HTML stand for?",
    a: "Hyper Text Markup Language",
    b: "High Text Machine Language",
    c: "Hyperlinks Text Machine Language",
    d: "None of these",
    correct: "a"
  },
  {
    question: "Which language styles web pages?",
    a: "HTML",
    b: "CSS",
    c: "Java",
    d: "Python",
    correct: "b"
  },
  {
    question: "Which is used for web logic?",
    a: "CSS",
    b: "HTML",
    c: "JavaScript",
    d: "SQL",
    correct: "c"
  }
];

let currentQuestion = 0;
let score = 0;
let totalQuestions = quizData.length;

const questionEl = document.getElementById("question");
const qCount = document.getElementById("q-count");
const nextBtn = document.getElementById("nextBtn");

function loadQuestion() {
    clearSelection();

    const data=quizData[currentQuestion];
    questionEl.innerHTML=data.question;

    document.getElementById('a').innerText=data.a;
    document.getElementById('b').innerText=data.b;
    document.getElementById('c').innerText=data.c;
    document.getElementById('d').innerText=data.d;

    qCount.innerText=`Question ${currentQuestion + 1} / ${quizData.length}`;
}

function selectAnswer(option) {
    selected = option;
    clearSelection();
    document.getElementById(option).classList.add("selected");
}

function clearSelection() {
    document.querySelectorAll(".option").forEach(btn => {
        btn.classList.remove("selected");
    })
}

nextBtn.addEventListener("click", ()=>{
   
    if(selected == null){
        alert('Please select an answer before proceeding.');
        return;
    }

    if(selected === quizData[currentQuestion].correct){
        score++;
    }

    selected = null;
    currentQuestion++;

  
    if(currentQuestion < quizData.length ){
        loadQuestion();
    }else{
        document.querySelector(".quiz-box").innerHTML=
        `<h2>Quiz Completed!</h2>

         <h3 style="font-size:18px;text-align:center;">
         <b>Your Score: ${score} / ${totalQuestions} </b> </h3>

         <button id="nextBtn" onClick="location.reload()">Restart</button>`
    }


});

loadQuestion();