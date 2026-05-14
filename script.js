const questions = [
    {
        q: "Hardly ______ the meeting when the manager announced a major change that affected all departments.",
        options: ["we had started", "had we started", "we started", "did we start"],
        answer: 1,
        explanation: "After negative adverbials like 'hardly', inversion is required. The correct structure is 'Hardly had we started...' followed by 'when...'. Other options fail because they either lack inversion or use incorrect tense."
    },

    {
        q: "The proposal, ______ by several experts in the field, was ultimately rejected due to budget constraints.",
        options: ["supporting", "was supported", "supported", "to support"],
        answer: 2,
        explanation: "This is a reduced relative clause: 'which was supported' → 'supported'. The sentence needs a past participle to describe the proposal. Other options either change meaning or create grammatical errors."
    },

    {
        q: "Had the company acted sooner, it ______ facing such severe losses now.",
        options: ["would not be", "would not have been", "will not be", "is not"],
        answer: 0,
        explanation: "This is a mixed conditional: past condition → present result. 'Had the company acted sooner' implies a past action, so the result affects the present: 'would not be facing'."
    },

    {
        q: "It is widely believed that the scientist ______ a breakthrough discovery before his sudden disappearance.",
        options: ["had made", "makes", "has made", "was making"],
        answer: 0,
        explanation: "Past perfect is required because the discovery happened before another past event (disappearance). This sequencing is critical in advanced grammar."
    },

    {
        q: "Such ______ the complexity of the issue that even experienced analysts struggled to provide clear solutions.",
        options: ["is", "was", "were", "has been"],
        answer: 1,
        explanation: "This is an inversion structure: 'Such was the complexity...'. It emphasizes intensity. Present tense would be possible in general statements, but the past context ('struggled') requires 'was'."
    },

    {
        q: "Not only ______ improving efficiency, but it also significantly reduced operational costs.",
        options: ["did the system help", "the system helped", "helped the system", "does the system help"],
        answer: 0,
        explanation: "'Not only' at the beginning requires inversion: 'did the system help'. The second clause does not invert ('but it also...')."
    },

    {
        q: "She denied ______ any involvement in the incident, despite strong evidence suggesting otherwise.",
        options: ["to have", "having", "have", "had"],
        answer: 1,
        explanation: "'Deny' is followed by a gerund (-ing). 'Having' is correct because it refers to a past action prior to the denial."
    },

    {
        q: "Had it not been for his support, we ______ the project on time.",
        options: ["would not complete", "would not have completed", "did not complete", "will not complete"],
        answer: 1,
        explanation: "This is a third conditional with inversion. Past hypothetical condition → past result, so we use 'would not have completed'."
    },

    {
        q: "The report is said ______ by a team of international researchers over several years.",
        options: ["to compile", "to have been compiled", "being compiled", "to be compiling"],
        answer: 1,
        explanation: "Passive + perfect infinitive: 'is said to have been compiled' shows the action happened before the present belief. This is a common C1 structure."
    },

    {
        q: "Only after extensive analysis ______ the true cause of the problem.",
        options: ["they discovered", "did they discover", "they did discover", "discovered they"],
        answer: 1,
        explanation: "'Only after...' triggers inversion → 'did they discover'. Without inversion, the sentence is grammatically incorrect in formal English."
    },

    {
        q: "The new regulations, while ______ to improve safety standards, have raised concerns among small business owners.",
        options: ["intended", "intending", "intend", "to intend"],
        answer: 0,
        explanation: "'While intended...' is a reduced clause meaning 'while they were intended'. Past participle is required for passive meaning."
    },

    {
        q: "He seemed ______ unaware of the consequences of his actions.",
        options: ["being", "to be", "be", "been"],
        answer: 1,
        explanation: "'Seem' is followed by 'to be'. This is a common infinitive structure used to express perception or appearance."
    },

    {
        q: "No sooner ______ the announcement made than the stock prices began to fluctuate dramatically.",
        options: ["was", "had been", "did", "has been"],
        answer: 1,
        explanation: "'No sooner had + subject + past participle' is the correct inversion structure. It expresses that one action happened immediately after another."
    },

    {
        q: "Despite ______ considerable effort, the team failed to achieve the desired results.",
        options: ["to make", "making", "made", "having made"],
        answer: 3,
        explanation: "'Despite' is followed by a noun or gerund. 'Having made' emphasizes that the effort was completed before the failure, adding a more precise time relationship."
    },

    {
        q: "The manager demanded that all employees ______ the new guidelines without exception.",
        options: ["follow", "followed", "to follow", "following"],
        answer: 0,
        explanation: "This is a subjunctive structure: 'demand that + subject + base verb'. No tense marking is used."
    },

    {
        q: "So ______ the argument that it sparked a heated debate among the participants.",
        options: ["compelling was", "was compelling", "compelling is", "is compelling"],
        answer: 0,
        explanation: "'So + adjective + verb + subject' is an inversion structure. The natural form becomes 'So compelling was the argument...'."
    },

    {
        q: "He regrets ______ more time preparing for the presentation, as the outcome could have been very different.",
        options: ["not spending", "not to spend", "did not spend", "not spend"],
        answer: 0,
        explanation: "'Regret' is followed by a gerund when referring to the past. 'Not spending' correctly expresses a past regret."
    },

    {
        q: "The findings suggest that further research ______ necessary to confirm the results.",
        options: ["is", "are", "was", "be"],
        answer: 3,
        explanation: "'Suggest that' can trigger the subjunctive mood → 'be necessary'. This is more formal and typical at C1 level."
    },

    {
        q: "The professor spoke as though he ______ everything about the subject, which impressed the audience greatly.",
        options: ["knows", "knew", "had known", "has known"],
        answer: 1,
        explanation: "'As though' with hypothetical meaning uses past simple ('knew') to express unreality or exaggeration."
    },

    {
        q: "Little ______ that the decision would have such far-reaching consequences.",
        options: ["they realized", "did they realize", "they did realize", "realized they"],
        answer: 1,
        explanation: "'Little' at the beginning requires inversion → 'did they realize'. This emphasizes the unexpected nature of the situation."
    }
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