let quizPool = []; 
let current = 0;
let score = 0;
let time = 0;
let answered = false;
let timerInterval;

// Fisher-Yates Shuffle Algorithm
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startTimer() {
    timerInterval = setInterval(() => {
        time++;
        const mins = Math.floor(time / 60);
        const secs = time % 60;
        document.getElementById("timer").innerText = 
            `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }, 1000);
}

function initQuiz() {
    // 1. Shuffle master list and pick 20
    const shuffledMaster = shuffle([...questions]);
    quizPool = shuffledMaster.slice(0, 20);
    
    // 2. Reset stats
    current = 0;
    score = 0;
    time = 0;
    
    // 3. Start systems
    startTimer();
    loadQuestion();
}

function loadQuestion() {
    const qData = quizPool[current];
    const optionsDiv = document.getElementById("options");
    const nextBtn = document.getElementById("nextBtn");
    const feedback = document.getElementById("feedback");

    answered = false;
    nextBtn.disabled = true;
    feedback.classList.add("hidden");

    document.getElementById("question").innerText = qData.q;
    document.getElementById("progressText").innerText = `Question ${current + 1} / ${quizPool.length}`;
    document.getElementById("progressBar").style.width = `${(current / quizPool.length) * 100}%`;

    // Shuffle options for this specific question
    const shuffledOptions = shuffle([...qData.options]);

    optionsDiv.innerHTML = "";
    shuffledOptions.forEach((opt) => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(opt, qData.answer, btn);
        optionsDiv.appendChild(btn);
    });
}

function checkAnswer(selectedText, correctText, btn) {
    if (answered) return;
    answered = true;

    const allBtns = document.querySelectorAll(".option-btn");
    const feedbackArea = document.getElementById("feedback");
    const nextBtn = document.getElementById("nextBtn");
    
    allBtns.forEach(b => {
        b.disabled = true;
        if (b.innerText === correctText) b.classList.add("correct");
    });

    if (selectedText === correctText) {
        score++;
        document.getElementById("score").innerText = `Score: ${score}`;
        document.getElementById("feedback-text").innerHTML = "<strong>✅ Correct!</strong>";
    } else {
        btn.classList.add("incorrect");
        document.getElementById("feedback-text").innerHTML = "<strong>❌ Incorrect</strong>";
    }

    document.getElementById("explanation").innerText = quizPool[current].explanation;
    feedbackArea.classList.remove("hidden");
    nextBtn.disabled = false;
}

// Attach event listener to the Next Button
document.getElementById("nextBtn").addEventListener("click", () => {
    current++;
    if (current < quizPool.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    clearInterval(timerInterval);
    const container = document.querySelector(".app-container");
    container.innerHTML = `
        <div class="card" style="text-align:center; padding: 40px 20px;">
            <h1>Quiz Complete!</h1>
            <p style="font-size:64px;">🏆</p>
            <h2>${score} / ${quizPool.length}</h2>
            <p>Time: ${document.getElementById("timer").innerText}</p>
            <button class="primary-btn" onclick="location.reload()">Restart Quiz</button>
        </div>
    `;
}

// Start the app
window.onload = initQuiz;
