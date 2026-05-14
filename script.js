const questions = [
    { q: "She made a ______ to study abroad.", options: ["decision", "choice", "selection", "plan"], answer: 0, explanation: "'Make a decision' is the correct collocation." },
    { q: "He is interested ______ learning Spanish.", options: ["on", "in", "at", "for"], answer: 1, explanation: "'Interested in' is correct." },
    { q: "They suggested ______ earlier.", options: ["to leave", "leaving", "leave", "left"], answer: 1, explanation: "'Suggest' is followed by -ing." },
    { q: "She has lived here ______ 2015.", options: ["since", "for", "from", "during"], answer: 0, explanation: "'Since' is used with a point in time." },
    { q: "We need to ______ attention.", options: ["make", "take", "pay", "do"], answer: 2, explanation: "'Pay attention' is correct." },
    { q: "They will ______ a new company.", options: ["set up", "set off", "set out", "set back"], answer: 0, explanation: "'Set up' = establish." },
    { q: "If I ______ you, I would accept.", options: ["was", "were", "am", "be"], answer: 1, explanation: "Formal: 'If I were you'." },
    { q: "He avoided ______ the issue.", options: ["answer", "to answer", "answering", "answered"], answer: 2, explanation: "'Avoid' takes -ing." },
    { q: "Rarely ______ such an event.", options: ["we see", "have we seen", "we have seen", "see we"], answer: 1, explanation: "Inversion → 'have we seen'." },
    { q: "He must have ______ it earlier.", options: ["see", "seen", "saw", "seeing"], answer: 1, explanation: "Modal perfect → past participle." },
    { q: "It had a strong ______ on results.", options: ["impact", "effect", "result", "cause"], answer: 0, explanation: "'Impact on' is most natural." },
    { q: "Students ______ hard succeed.", options: ["study", "studying", "studied", "to study"], answer: 1, explanation: "Reduced clause: 'students studying'." },
    { q: "Only then ______ the truth.", options: ["he realized", "did he realize", "he did realize", "realized he"], answer: 1, explanation: "Inversion → 'did he realize'." },
    { q: "If he had tried, he ______ now.", options: ["would succeed", "would be succeeding", "would have succeeded", "succeeds"], answer: 1, explanation: "Mixed conditional." },
    { q: "She is capable ______ solving it.", options: ["of", "to", "for", "in"], answer: 0, explanation: "'Capable of' is fixed." },
    { q: "He stopped ______ when sick.", options: ["to smoke", "smoking", "smoke", "smoked"], answer: 1, explanation: "'Stopped smoking' = quit." },
    { q: "Having ______, he left.", options: ["finish", "finished", "finishing", "to finish"], answer: 1, explanation: "Participle clause uses past participle." },
    { q: "He is believed ______ the best.", options: ["to be", "be", "being", "been"], answer: 0, explanation: "'Believed to be'." },
    { q: "She took advantage ______ it.", options: ["from", "of", "on", "with"], answer: 1, explanation: "'Take advantage of'." },
    { q: "Not only ______ talented, but hardworking.", options: ["she is", "is she", "she was", "was she"], answer: 1, explanation: "Inversion after 'not only'." }
];

let current = 0;
let score = 0;
let time = 0;
let answered = false;

// Timer Logic
setInterval(() => {
    time++;
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    document.getElementById("timer").innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}, 1000);

function loadQuestion() {
    const q = questions[current];
    const optionsDiv = document.getElementById("options");
    const nextBtn = document.getElementById("nextBtn");
    const feedback = document.getElementById("feedback");

    answered = false;
    nextBtn.disabled = true;
    feedback.classList.add("hidden");

    document.getElementById("question").innerText = q.q;
    document.getElementById("progressText").innerText = `Question ${current + 1} / ${questions.length}`;
    document.getElementById("progressBar").style.width = `${(current / questions.length) * 100}%`;

    optionsDiv.innerHTML = "";
    q.options.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(i, btn);
        optionsDiv.appendChild(btn);
    });
}

function checkAnswer(i, btn) {
    if (answered) return;
    answered = true;

    const q = questions[current];
    const allBtns = document.querySelectorAll(".option-btn");
    const feedback = document.getElementById("feedback");
    
    allBtns.forEach(b => b.disabled = true);

    if (i === q.answer) {
        score++;
        btn.classList.add("correct");
        document.getElementById("feedback-text").innerHTML = "<strong>✅ Correct!</strong>";
    } else {
        btn.classList.add("incorrect");
        allBtns[q.answer].classList.add("correct");
        document.getElementById("feedback-text").innerHTML = "<strong>❌ Incorrect</strong>";
    }

    document.getElementById("score").innerText = `Score: ${score}`;
    document.getElementById("explanation").innerText = q.explanation;
    feedback.classList.remove("hidden");
    document.getElementById("nextBtn").disabled = false;
}

document.getElementById("nextBtn").onclick = () => {
    current++;
    if (current < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
};

function showResults() {
    document.getElementById("progressBar").style.width = "100%";
    const container = document.querySelector(".app-container");
    container.innerHTML = `
        <div class="card" style="text-align:center; display:flex; flex-direction:column; justify-content:center;">
            <h1>Quiz Complete!</h1>
            <p style="font-size:48px; margin:10px 0;">🎯</p>
            <h2>Your Score: ${score} / ${questions.length}</h2>
            <p>Total Time: ${Math.floor(time / 60)}m ${time % 60}s</p>
            <button class="primary-btn" onclick="location.reload()">Try Again</button>
        </div>
    `;
}

loadQuestion();