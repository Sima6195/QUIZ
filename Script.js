// (A) QUIZ OBJECT
const quiz = {
    // (A1) QUESTIONS & ANSWERS
    data: [
      {
        q: "What is the standard distance between the target and archer in Olympics?",
        o: ["50 meters", "70 meters", "100 meters", "120 meters"],
        a: 1,
      },
      {
        q: "Which is the highest number on a standard roulette wheel?",
        o: ["22", "24", "32", "36"],
        a: 3,
      },
      {
        q: "How much wood could a woodchuck chuck if a woodchuck would chuck wood?",
        o: ["400 pounds", "550 pounds", "700 pounds", "750 pounds"],
        a: 2,
      },
      {
        q: "Which is the seventh planet from the sun?",
        o: ["Uranus", "Earth", "Pluto", "Mars"],
        a: 0,
      },
      {
        q: "Which is the largest ocean on Earth?",
        o: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        a: 3,
      },
    ],
  
    // (A2) HTML ELEMENTS
    hWrap: null,
    hQn: null,
    hAns: null,
  
    // (A3) GAME STATE
    now: 0,
    score: 0,
  
    // (B) INIT QUIZ
    init: function () {
      this.hWrap = document.getElementById("quizWrap");
  
      this.hQn = document.createElement("div");
      this.hQn.id = "quizQn";
      this.hWrap.appendChild(this.hQn);
  
      this.hAns = document.createElement("div");
      this.hAns.id = "quizAns";
      this.hWrap.appendChild(this.hAns);
  
      this.draw();
    },
  
    // (C) DRAW QUESTION
    draw: function () {
      // (C1) Set question text
      const question = this.data[this.now];
      this.hQn.innerHTML = question.q;
  
      // (C2) Clear previous answers
      this.hAns.innerHTML = "";
  
      // (C3) Create answer options
      for (let i in question.o) {
        let radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "quiz";
        radio.id = "quizo" + i;
        this.hAns.appendChild(radio);
  
        let label = document.createElement("label");
        label.innerHTML = question.o[i];
        label.setAttribute("for", "quizo" + i);
        label.dataset.idx = i;
        label.addEventListener("click", () => this.select(label));
        this.hAns.appendChild(label);
      }
    },
  
    // (D) HANDLE ANSWER SELECTION
    select: function (option) {
      // Remove all click events to prevent double-clicking
      let allLabels = this.hAns.getElementsByTagName("label");
      for (let lbl of allLabels) {
        lbl.replaceWith(lbl.cloneNode(true)); // quick way to remove all listeners
      }
  
      // Check correctness
      let isCorrect = option.dataset.idx == this.data[this.now].a;
      if (isCorrect) {
        this.score++;
        option.classList.add("correct");
      } else {
        option.classList.add("wrong");
      }
  
      // Move to next or end
      this.now++;
      setTimeout(() => {
        if (this.now < this.data.length) {
          this.draw();
        } else {
          this.end();
        }
      }, 1000);
    },
  
    // (E) END OF QUIZ
    end: function () {
      this.hQn.innerHTML = `You have answered ${this.score} of ${this.data.length} correctly.`;
      this.hAns.innerHTML = "";
  
      // Restart button
      const btn = document.createElement("button");
      btn.innerText = "Restart Quiz";
      btn.onclick = this.reset;
      this.hAns.appendChild(btn);
    },
  
    // (F) RESET QUIZ
    reset: function () {
      quiz.now = 0;
      quiz.score = 0;
      quiz.draw();
    },
  };
  
  // (G) START QUIZ ON LOAD
  window.addEventListener("load", () => quiz.init());
  