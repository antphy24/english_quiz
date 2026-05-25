let currentQuizKey = "";
let currentQuizList = []; // This is our active 20-question playlist
let userHistory = []; // Tracks user selections for the review panel

let current = 0;
let score = 0;
let countdown = 60;
let timerInterval;
let answered = false;

// 1. UTILITIES: Shuffling
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 2. VIEW SWITCHER
function switchView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
    document.getElementById(viewId).classList.remove('hidden');
}

// 3. STORAGE SYSTEMS
function getStats(key) {
    try {
        const data = localStorage.getItem(`quiz_${key}`);
        if (data) {
            const parsed = JSON.parse(data);
            if (parsed && Array.isArray(parsed.attempts)) {
                return parsed;
            }
        }
    } catch (e) {
        console.error("Error reading localStorage:", e);
    }
    return { highscore: 0, attempts: [] };
}

function saveResult(key, scoreValue) {
    const stats = getStats(key);
    if (scoreValue > stats.highscore) stats.highscore = scoreValue;
    stats.attempts.unshift({ score: scoreValue, date: new Date().toLocaleDateString() });
    localStorage.setItem(`quiz_${key}`, JSON.stringify(stats));
}

// 4. MAIN MENU RENDER
function showMenu() {
    switchView('menu-screen');
    clearInterval(timerInterval);
    const container = document.getElementById("menu-categories");
    container.innerHTML = "";

    // SAFE CHECK: Ensure window.quizData exists before running loops
    if (!window.quizData || Object.keys(window.quizData).length === 0) {
        container.innerHTML = "<p style='padding:20px; text-align:center;'>No quiz modules found. Please check your questions.js file.</p>";
        return;
    }

    Object.keys(window.quizData).forEach(key => {
        const module = window.quizData[key];
        const stats = getStats(key);
        
        const card = document.createElement("div");
        card.className = "menu-card";
        
        let attemptsHTML = stats.attempts.slice(0, 2).map(a => `<li>${a.score}/20 (${a.date})</li>`).join('');
        if (!attemptsHTML) attemptsHTML = "<li>No attempts yet</li>";

        card.innerHTML = `
            <h4>${module.title}</h4>
            <div class="highscore-badge">🏆 High Score: ${stats.highscore}/20</div>
            <div class="history-box">
                <p>Recent Attempts:</p>
                <ul>${attemptsHTML}</ul>
            </div>
            <button class="primary-btn sm" onclick="startQuiz('${key}')">Start Module</button>
        `;
        container.appendChild(card);
    });
}

// 5. QUIZ CORE MANAGEMENT
function startQuiz(key) {
    currentQuizKey = key;
    const rawQuestions = window.quizData[key].questions;
    currentQuizList = shuffle([...rawQuestions]).slice(0, 20);
    
    current = 0;
    score = 0;
    userHistory = [];
    
    switchView('quiz-screen');
    loadQuestion();
}

function loadQuestion() {
    const qData = currentQuizList[current];
    const optionsDiv = document.getElementById("options");
    const nextBtn = document.getElementById("nextBtn");
    const feedback = document.getElementById("feedback");

    answered = false;
    nextBtn.disabled = true;
    feedback.classList.add("hidden");
    
    document.getElementById("question").innerText = qData.q;
    document.getElementById("progressText").innerText = `Question ${current + 1} / ${currentQuizList.length}`;
    document.getElementById("progressBar").style.width = `${(current / currentQuizList.length) * 100}%`;
    document.getElementById("score").innerText = `Score: ${score}`;

    const shuffledOptions = shuffle([...qData.options]);
    optionsDiv.innerHTML = "";
    
    shuffledOptions.forEach(opt => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(opt, false, btn);
        optionsDiv.appendChild(btn);
    });

    runClock();
}

function runClock() {
    clearInterval(timerInterval);
    countdown = 60;
    const timerDisplay = document.getElementById("timer");
    timerDisplay.innerText = `${countdown}s`;
    timerDisplay.classList.remove("danger");

    timerInterval = setInterval(() => {
        countdown--;
        timerDisplay.innerText = `${countdown}s`;
        if (countdown <= 10) timerDisplay.classList.add("danger");
        
        if (countdown <= 0) {
            clearInterval(timerInterval);
            checkAnswer(null, true, null); // Timeout trigger
        }
    }, 1000);
}

function checkAnswer(selectedOption, isTimeout, clickedBtn) {
    if (answered) return;
    answered = true;
    clearInterval(timerInterval);

    const qData = currentQuizList[current];
    const allBtns = document.querySelectorAll(".option-btn");
    const feedbackArea = document.getElementById("feedback");
    const feedbackText = document.getElementById("feedback-text");
    const nextBtn = document.getElementById("nextBtn");

    // 1. Track state for the final review screen
    userHistory.push({
        question: qData.q,
        selected: isTimeout ? "[Time expired]" : selectedOption,
        correct: qData.answer,
        explanation: qData.explanation,
        status: !isTimeout && selectedOption === qData.answer ? 'correct' : 'incorrect'
    });

    // 2. Lock down all buttons immediately
    allBtns.forEach(b => b.disabled = true);

    // 3. Handle visual UI changes based on actions
    if (isTimeout) {
        feedbackText.innerHTML = "<strong>⏳ Time's Up! Proceed to the next question.</strong>";
        document.getElementById("explanation").innerText = ""; 
    } else {
        allBtns.forEach(b => {
            if (b.innerText === qData.answer) b.classList.add("correct");
        });

        if (selectedOption === qData.answer) {
            score++;
            feedbackText.innerHTML = "<strong>✅ Correct!</strong>";
        } else {
            if (clickedBtn) clickedBtn.classList.add("incorrect");
            feedbackText.innerHTML = "<strong>❌ Incorrect</strong>";
        }
        
        document.getElementById("explanation").innerText = qData.explanation;
    }

    // 4. Update core tracker stats and revive the next step button
    document.getElementById("score").innerText = `Score: ${score}`;
    feedbackArea.classList.remove("hidden");
    nextBtn.disabled = false;
}

// 6. TERMINAL RESULTS & COMPREHENSIVE REVIEWS
function finishQuiz() {
    clearInterval(timerInterval);
    saveResult(currentQuizKey, score);
    
    document.getElementById("final-score").innerText = `${score} / ${currentQuizList.length}`;
    document.getElementById("quiz-title-summary").innerText = window.quizData[currentQuizKey].title;
    
    document.getElementById("review-section").classList.add("hidden");
    switchView('results-screen');
}

function generateReviewDOM() {
    const container = document.getElementById("review-container");
    container.innerHTML = "";

    userHistory.forEach((item, index) => {
        const row = document.createElement("div");
        row.className = `review-item ${item.status}`;
        row.innerHTML = `
            <p class="review-q"><strong>#${index + 1}: ${item.question}</strong></p>
            <p>Your answer: <span class="badge ${item.status}">${item.selected}</span></p>
            ${item.status === 'incorrect' ? `<p>Correct selection: <span class="badge correct">${item.correct}</span></p>` : ''}
            <p class="review-exp">💡 ${item.explanation}</p>
        `;
        container.appendChild(row);
    });
}

// 7. LISTENERS & EVENTS
document.getElementById("nextBtn").addEventListener("click", () => {
    current++;
    if (current < currentQuizList.length) {
        loadQuestion();
    } else {
        finishQuiz();
    }
});

document.getElementById("quit-btn").addEventListener("click", () => {
    if(confirm("Are you sure you want to quit this run?")) showMenu();
});

document.getElementById("review-toggle-btn").addEventListener("click", () => {
    generateReviewDOM();
    document.getElementById("review-section").classList.toggle("hidden");
});

// Boot Application
window.onload = showMenu;
