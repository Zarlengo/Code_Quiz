let time_limit = 60;
let question_limit = 10;
let number;
let questions;
let timer;
let score;

let question_title = document.querySelector("#question-title")
let question_content = document.querySelector("#question-content")
let buttonA = document.querySelector("#a");
let buttonB = document.querySelector("#b");
let buttonC = document.querySelector("#c");
let buttonD = document.querySelector("#d");
let response = document.querySelector("#answer-result");
let timer_text = document.querySelector("#timer");
let footer = document.querySelector("footer");
let status_section = document.querySelector(".status-content");
let highscore_list = document.querySelector("#score_list");

document.querySelector("#start-button").addEventListener("click", startQuiz);
document.querySelector("#play_again").addEventListener("click", startQuiz);
buttonA.addEventListener("click", answerQuestion);
buttonB.addEventListener("click", answerQuestion);
buttonC.addEventListener("click", answerQuestion);
buttonD.addEventListener("click", answerQuestion);
document.querySelector("#highscores").addEventListener("click", show_highscores);

function startQuiz() {
    document.activeElement.blur();
    questions = HTMLquestions.sort (function(a, b) {
        return 0.5 - Math.random();
    });

    number = 0;
    runTimer(time_limit);
    status_section.innerHTML = "";
    for (let i = 0; i < question_limit; i++) {
        let problem = document.createElement("div");
        problem.textContent = `Question ${i + 1}`;
        problem.setAttribute("id", `question${i}`);
        if (i % 2 == 0) {
            problem.setAttribute("class", "status-bars even");
        } else {
            problem.setAttribute("class", "status-bars odd");
        }
        status_section.appendChild(problem);
    }
    status_section.style.display = "block";
    document.querySelector(".instruction").style.display = "none";
    document.querySelector(".highscores").style.display = "none";
    document.querySelector(".results").style.display = "none";
    document.querySelector(".cards").style.display = "block";
    fillHTML();
}

function runTimer(time_remaining) {
    let count = time_remaining;
    timer = setInterval(function() {
        count--;
        if (count < 10) {
            timer_text.textContent = `0${count}`;
        } else {
            timer_text.textContent = count;
        }
        if (count <= 0) {
            clearInterval(timer);
            quizOver();
        }
    }, 1000)
}

function fillHTML() {
    document.activeElement.blur();
    question_title.textContent = `Question ${number + 1}`;
    question_content.textContent = questions[number].question;
    let answers = questions[number].answers;
    buttonA.textContent = `A: ${answers["a"]}`;
    buttonB.textContent = `B: ${answers["b"]}`;
    buttonC.textContent = `C: ${answers["c"]}`;
    buttonD.textContent = `D: ${answers["d"]}`;
}

function answerQuestion() {
    document.activeElement.blur();
    if (this.id == questions[number].answer) {
        response.textContent = `Correct`;
        document.querySelector(`#question${number}`).style.backgroundColor = "limegreen";
    } else {
        document.querySelector(`#question${number}`).style.backgroundColor = "red";
        let new_timer = parseInt(timer_text.textContent) - 10;
        clearInterval(timer);
        if (new_timer <= 0) {
            timer_text.textContent = "00";
            quizOver();
            return;
        } else if (new_timer < 10) {
            timer_text.textContent = `0${new_timer}`;
        } else {
            timer_text.textContent = new_timer;
        }
        runTimer(new_timer);
        response.textContent = `Wrong, the correct answer was: ${questions[number].answers[questions[number].answer]}`;
    }

    number++;

    if (number < question_limit) {
        fillHTML();
    } else {
        clearInterval(timer);
        quizOver();
    }
}

function quizOver() {
    score = parseInt(timer_text.textContent);
    document.querySelector("#result-content").textContent = `Your score was ${score}`;
    document.querySelector(".instruction").style.display = "none";
    document.querySelector(".highscores").style.display = "none";
    document.querySelector(".cards").style.display = "none";
    document.querySelector(".results").style.display = "block";
}

document.querySelector("#submit").addEventListener("click", function() {
    let uploadOBJ;
    document.activeElement.blur();
    var user = {
        name: document.querySelector("#name").value,
        score: score
    };
    if (user.name != "") {

        // get most recent submission
        var score_list = JSON.parse(localStorage.getItem("user"));
        if (score_list != null) {
            score_list.push(user);
            uploadOBJ = score_list;
        } else {
            uploadOBJ = [user];
        }
        var json_obj = JSON.stringify(uploadOBJ);
        localStorage.setItem("user", json_obj);
    }
    show_highscores();

});

function show_highscores() {
    highscore_list.innerHTML = "";
    var score_list = JSON.parse(localStorage.getItem("user"));
    console.log(score_list);
    if (score_list != null) {
        for (let i = 0; i < score_list.length; i++) {
            let score_line = document.createElement("div");
            score_line.textContent = `${score_list[i].score}: ${score_list[i].name}`;
            if (i % 2 == 0) {
                score_line.setAttribute("class", "score-item even");
            } else {
                score_line.setAttribute("class", "score-item odd");
            }
            highscore_list.appendChild(score_line);
        }
    }


    status_section.style.display = "none";
    document.querySelector(".instruction").style.display = "none";
    document.querySelector(".cards").style.display = "none";
    document.querySelector(".results").style.display = "none";
    document.querySelector(".highscores").style.display = "block";

}



document.querySelector("#clear").addEventListener("click", function() {
    document.activeElement.blur();
    localStorage.removeItem("user");
});