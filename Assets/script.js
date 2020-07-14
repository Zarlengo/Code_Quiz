// Global settings
let time_limit = 60;
let question_limit = 10;
let penalty_time = 10;

// Variable initialization
let number;
let questions;
let timer;
let response_timer;
let score;
let question_bank = {};
let quiz;

// Storing HTML elements as variables
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

// Creating multiple quiz options
document.querySelector("#HTML-button").addEventListener("click", startQuiz);
question_bank["HTML"] = HTMLquestions;

document.querySelector("#CSS-button").addEventListener("click", startQuiz);
question_bank["CSS"] = CSSquestions;

document.querySelector("#JS-button").addEventListener("click", startQuiz);
question_bank["JS"] = JSquestions;

document.querySelector("#jQuery-button").addEventListener("click", startQuiz);
question_bank["jQuery"] = jQueryQuestions;

document.querySelector("#Bootstrap-button").addEventListener("click", startQuiz);
question_bank["Bootstrap"] = BootstrapQuestions;

// Creating actions for to return to the instructions
document.querySelector("#play_again").addEventListener("click", homePage);
document.querySelector("#play").addEventListener("click", homePage);
document.querySelector(".nav-center").addEventListener("click", homePage);

// Creating actions for each question button
buttonA.addEventListener("click", answerQuestion);
buttonB.addEventListener("click", answerQuestion);
buttonC.addEventListener("click", answerQuestion);
buttonD.addEventListener("click", answerQuestion);

//Creating action for the "View Highscores" in the header
document.querySelector("#highscores").addEventListener("click", show_highscores);

// Clicking the submit button on the finished screen
document.querySelector("#submit").addEventListener("click", function() {
    // Remove buttons focus
    document.activeElement.blur();

    // Creates an object to upload to local storage
    let uploadOBJ;

    // Creates a new object with the current score and name
    var user = {
        name: document.querySelector("#name").value,
        quiz: quiz,
        score: score
    };

    // Checks if the name is not missing and score is not zero (this shouldn't happen as stopped earlier in the process)
    if (user.name != "" || user.score != 0) {

        // get most recent submission
        var score_list = JSON.parse(localStorage.getItem("user"));

        
        if (score_list != null) {
            // If there is an existing entry, adds the user object to the list
            score_list.push(user);
            uploadOBJ = score_list;
        } else {
            // If this is the first entry, changes the user object to an array
            uploadOBJ = [user];
        }

        // Converts the object to a string and uploads to local storage
        var json_obj = JSON.stringify(uploadOBJ);
        localStorage.setItem("user", json_obj);
    }

    // Calls function to show the high score list
    show_highscores();

});

// Clicking the "Code Quiz" in the header/nav bar

//Clicking the clear button on the high scores page
document.querySelector("#clear").addEventListener("click", function() {
    // Remove buttons focus
    document.activeElement.blur();

    // Empties out the local storage
    localStorage.removeItem("user");

    // Forces a refresh of the high score page
    show_highscores();
});

//
function homePage() {
    // Incase the user clicks in the middle of a quiz, stops the quiz and resets the on screen variables
    clearInterval(timer);
    timer_text.textContent = time_limit;
    status_section.innerHTML = "";
    response.textContent = "";
    show_only_page(".instruction", "block");
}

// Function to hide all extra pages and show only the targeted one
function show_only_page(show_element, show_type) {
    document.querySelector(".cards").style.display = "none";
    document.querySelector(".results").style.display = "none";
    document.querySelector(".highscores").style.display = "none";
    document.querySelector(".instruction").style.display = "none";
    document.querySelector(show_element).style.display = show_type;
}

// Function to reset all settings and start quiz
function startQuiz() {
    // Remove buttons focus
    document.activeElement.blur();

    // Chooses the correct language from the data bank and then random sorts the array
    quiz = this.value;
    questions = question_bank[quiz].sort (function(a, b) {
        return 0.5 - Math.random();
    });

    // Resetting of the variables for a new quiz
    number = 0;
    timer_text.textContent = time_limit;
    status_section.innerHTML = "";
    response.textContent = "";

    // Starts a new countdown timer
    runTimer(time_limit);

    // Creates a question summary side bar for tracking progress
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

    // Shows the side bar and the question page 
    status_section.style.display = "block";
    show_only_page(".cards", "block");
    document.querySelector(".input_record").style.display = "block";
    
    // Calls function to load the first question
    updateQuestion();
}

// Function to create countdown timer in top corner
function runTimer(time_remaining) {
    timer = setInterval(function() {
        time_remaining--;

        // Checks if the time remaining is a single digit and formats with a leading zero
        if (time_remaining < 10) {
            timer_text.textContent = `0${time_remaining}`;
        } else {
            timer_text.textContent = time_remaining;
        }

        // When the time runs out, stops the quiz and timer
        if (time_remaining <= 0) {
            clearInterval(timer);
            quizOver();
        }
    }, 1000)
}

// Function to add the next question to the page
function updateQuestion() {
    // Remove buttons focus
    document.activeElement.blur();

    // Updates the question title
    question_title.textContent = `Question ${number + 1}`;

    // Adds the question content to the page
    question_content.textContent = questions[number].question;

    // Creates an array of the possible answers and updates each button with the text
    let answers = questions[number].answers;
    buttonA.textContent = `A: ${answers["a"]}`;
    buttonB.textContent = `B: ${answers["b"]}`;
    buttonC.textContent = `C: ${answers["c"]}`;
    buttonD.textContent = `D: ${answers["d"]}`;

    // Updates the status bar with the current question
    document.querySelector(`#question${number}`).setAttribute("class", "status-bars active");

}

// Function to record answers and update based on correct/wrong results
function answerQuestion() {
    // Remove buttons focus
    document.activeElement.blur();

    
    if (this.id == questions[number].answer) {
        // Checks if the user selected the correct answer, displays for the user
        show_response_timed("Correct");

        // Updates the status tracker on the side
        document.querySelector(`#question${number}`).style.backgroundColor = "limegreen";
    } else {
        // For a wrong answer, updates the status tracker on the side
        document.querySelector(`#question${number}`).style.backgroundColor = "red";

        // Penalizes the timer for a wrong answer. Stops current timer and begins a new one
        let new_timer = parseInt(timer_text.textContent) - penalty_time;
        clearInterval(timer);

        if (new_timer <= 0) {
            // Checks if the last wrong answer reduces to or below 0 seconds
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

    // Moves to the next question
    number++;

    // check if all the questions have been answered or timer has run out
    if (number < question_limit) {
        updateQuestion();
    } else {
        clearInterval(timer);
        quizOver();
    }
}

// Function to limit how long the response is shown to the user
function show_response_timed(text_to_display) {
    // How long to show the response
    let timeout = 3000;

    // Removes previous timer cycles
    clearTimeout(response_timer);

    // Updates screen with the answer response
    response.textContent = text_to_display;

    // Single run function to hide response text after time has expired
    response_timer = setTimeout(function() {
        response.textContent = "";
    }, timeout)

}

// Function when timer has ended/all questions have been answered
function quizOver() {
    // Stores the current score and displays it for the user
    score = parseInt(timer_text.textContent);
    document.querySelector("#result-content").textContent = `Your score was ${score}`;

    // If the score was 0, does not give the option to store as a high score
    if (score <= 0) {
        document.querySelector(".input_record").style.display = "none";
    }

    // Hides all pages and shows the results portion (retains the sidebar of the question summary)
    show_only_page(".results", "block");
}

// Function to show the highscore screen
function show_highscores() {
    // Incase the user clicks the highscore button during a quiz, stops the quiz and resets variables
    clearInterval(timer);
    timer_text.textContent = time_limit;
    status_section.innerHTML = "";
    highscore_list.innerHTML = "";

    // Obtains the string from local storage and converts to an array of objects
    var score_list = JSON.parse(localStorage.getItem("user"));

    // Checks for existing high scores, otherwise nothing will show
    if (score_list != null) {
        // Sorts the score list based on high to low scores and then by quiz type
        score_list.sort(object_compare_score);
        score_list.sort(object_compare_quiz);

        // Creates a table object the header info
        let table_obj = document.createElement("table");

        // Creates a header row object within the table
        let head_obj = document.createElement("tr");
        head_obj.innerHTML = "<th>Quiz</th><th>Score</th><th>Name</th>"
        table_obj.append(head_obj);
        
        let body_obj = document.createElement("tbody");
        table_obj.append(body_obj);

        // Iterates through each entry in the high score list
        for (let i = 0; i < score_list.length; i++) {
            let row_quiz = score_list[i].quiz;
            let row_score = score_list[i].score;
            let row_name = score_list[i].name;

            // Creates a new row object within the table
            let row_obj = document.createElement("tr");

            // Changes row color based on even or odd condition
            if (i % 2 == 0) {
                row_obj.setAttribute("class", "score-item even");
            } else {
                row_obj.setAttribute("class", "score-item odd");
            }

            row_obj.innerHTML = `<td>${row_quiz}</td><td>${row_score}</td><td>${row_name}</td>`;
            body_obj.append(row_obj);

            // Adds the score to the screen
            highscore_list.appendChild(table_obj);
        }
    }

    // Shows only the high scores page
    status_section.style.display = "none";
    show_only_page(".highscores", "flex");

}

// Function used to sort the high score array of objects based on a high to low ordering
function object_compare_score(a, b) {
    if (a.score < b.score) return 1;
    if (b.score < a.score) return -1;
    return 0;
}

// Function used to sort the high score array of objects based on a high to low ordering
function object_compare_quiz(a, b) {
    if (a.quiz > b.quiz) return 1;
    if (b.quiz > a.quiz) return -1;
    return 0;
}