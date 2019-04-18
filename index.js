const QUESTIONS = [
    {
        question: 'Which MLB league allows a designated hitter in the lineup?',
        answers: [
            'National League', 'American League', 'Pacific League', 'Every league allows it'
        ],
        correctAnswer: 'American League',
        image: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/54/American_League_logo.svg/1200px-American_League_logo.svg.png',
        alt: 'American League logo'
    },
    {
        question: 'Which number is associated with the shortstop position?',
        answers: [
            '3', '5', '6', '7'
        ],
        correctAnswer: '6',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Baseball_positions.svg/2000px-Baseball_positions.svg.png',
        alt: 'Diagram showing MLB positions with associated numbers'
    },
    {
        question: 'Which MLB player holds the record for most career home runs?',
        answers: [
            'Babe Ruth', 'Barry Bonds', 'Hank Aaron', 'Alex Rodriguez'
        ],
        correctAnswer: 'Barry Bonds',
        image: 'https://cdn-s3.si.com/images/barry-bonds-inline.jpg',
        alt: 'A picture of Barry Bonds'
    },
    {
        question: 'Which of these teams does not play in the American League West division?',
        answers: [
            'Seattle Mariners', 'Texas Rangers', 'Houston Astros', 'San Diego Padres'
        ],
        correctAnswer: 'San Diego Padres',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/San_Diego_Padres_logo.svg/1200px-San_Diego_Padres_logo.svg.png',
        alt: 'The San Diego Padres logo'
    },
    {
        question: 'Which team won the 2018 World Series?',
        answers: [
            'Milwaukee Brewers', 'Houston Astros', 'Boston Red Sox', 'Los Angeles Dodgers'
        ],
        correctAnswer: 'Boston Red Sox',
        image: 'https://thumbor.forbes.com/thumbor/fit-in/0x0/filters%3Aformat%28jpg%29/https%3A%2F%2Fi.forbesimg.com%2Fmedia%2Flists%2Fteams%2Fboston-red-sox_416x416.jpg',
        alt: 'The Boston Red Sox logo'
    },
    {
        question: 'What is the record for most wins in a regular season?',
        answers: [
            '122', '111', '129', '116'
        ],
        correctAnswer: '116',
        image: 'https://s.hdnux.com/photos/23/00/22/4981951/9/920x920.jpg',
        alt: 'The Mariners celebrating after getting 116 wins'
    },
    {
        question: 'Who was the first MLB player to be voted into the Hall of Fame unanimously?',
        answers: [
            'Mariano Rivera', 'Ken Griffey Jr.', 'Babe Ruth', 'Ted Williams'
        ],
        correctAnswer: 'Mariano Rivera',
        image: 'https://static01.nyt.com/images/2019/01/23/sports/23halloffame-rivera/23halloffame-rivera-articleLarge.jpg?quality=75&auto=webp&disable=upscale',
        alt: 'A picture of Mariano Rivera'
    },
    {
        question: 'Which MLB player holds the record for most career hits?',
        answers: [
            'Derek Jeter', 'Ty Cobb', 'Stan Musial', 'Pete Rose'
        ],
        correctAnswer: 'Pete Rose',
        image: 'http://cdn.bostonsportsextra.com/wp-content/uploads/2018/11/rose-gambling-baseball.jpg',
        alt: 'Pete Rose rounding first base'
    },
    {
        question: 'Which of these cities does not have two MLB teams?',
        answers: [
            'Los Angeles', 'Houston', 'New York City', 'Chicago'
        ],
        correctAnswer: 'Houston',
        image: 'https://i.redd.it/biyfdpfp5rp21.jpg',
        alt: 'A picture of the Houston skyline'
    },
    {
        question: 'Which of these teams has never appeared in a World Series?',
        answers: [
            'San Diego Padres', 'Tampa Bay Rays', 'Colorado Rockies', 'Washington Nationals'
        ],
        correctAnswer: 'Washington Nationals',
        image: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a3/Washington_Nationals_logo.svg/1200px-Washington_Nationals_logo.svg.png',
        alt: 'The Washington Nationals logo'
    },
];

let questionNumber = 0;
let score = 0;

function createQuestion() {
    if (questionNumber <= QUESTIONS.length - 1) {
        return `<h1>${QUESTIONS[questionNumber].question}</h1>
            <fieldset class="questionFieldset">
                <label class="answer">
                    <input type="radio" name="answer" value="${QUESTIONS[questionNumber].answers[0]}" required>
                        <span>${QUESTIONS[questionNumber].answers[0]}</span> 
                    </input>
                </label>
                <label class="answer">
                    <input type="radio" name="answer" value="${QUESTIONS[questionNumber].answers[1]}" required>
                        <span>${QUESTIONS[questionNumber].answers[1]}</span> 
                    </input>
                </label>
                <label class="answer">
                    <input type="radio" name="answer" value="${QUESTIONS[questionNumber].answers[2]}" required>
                        <span>${QUESTIONS[questionNumber].answers[2]}</span> 
                    </input>
                </label>
                <label class="answer">
                    <input type="radio" name="answer" value="${QUESTIONS[questionNumber].answers[3]}" required>
                        <span>${QUESTIONS[questionNumber].answers[3]}</span> 
                    </input>
                </label>
                <button type="submit" class="submitButton">Submit</button>
            </fieldset>`;
    } else {
        renderResults();
        retryQuiz();
        $('.currentQuestion').text(10);        
    }
}

function displayQuestion() {
    $('.questionForm').html(createQuestion());
}

function startQuiz() {
    $('.startPage').on('click', '.startButton', function(evt) {
        $('.startPage').remove();
        $('.currentQuestion').text(1);
        displayQuestion();
    });
}

function handleSelectedAnswer() {
    $('.questionForm').on('submit', function(evt) {
        evt.preventDefault();
        let selected = $('input:checked');
        let chosenAnswer = selected.val();
        let correctAnswer = `${QUESTIONS[questionNumber].correctAnswer}`;
        if (chosenAnswer === correctAnswer) {
            handleCorrectAnswer();
        } else {
            handleIncorrectAnswer();
        }
    });
}

function colorSelectedAnswer() {
    $('.questionPage').on('click', '.answer', function(evt) {
      $('.answer').removeClass('selected');
      $(this).addClass('selected');
    });
}

function correctFeedback() {
    showAnswerPage();
    $('.answerPage').html(`
        <section class="correctAnswer">
            <p>Good job, that answer is correct!</p>
            <img class="answerImage" src="${QUESTIONS[questionNumber].image}" alt="${QUESTIONS[questionNumber].alt}">
            <button type="button" class="nextQuestionButton">Next</button>
        </section>`);
}

function incorrectFeedback() {
    showAnswerPage();
    let correctAnswer = `${QUESTIONS[questionNumber].correctAnswer}`;
    $('.answerPage').html(`
        <section class="incorrectAnswer">
            <p>That answer is incorrect.</p>
            <p>The correct answer is <span>${correctAnswer}</span>.</p>
            <img class="answerImage" src="${QUESTIONS[questionNumber].image}" alt="${QUESTIONS[questionNumber].alt}">
            <button type="button" class="nextQuestionButton">Next</button>
        </section>`);
}

function handleCorrectAnswer() {
    correctFeedback();
    incrementCurrentScore();
    incrementPossilbeScore();
}

function handleIncorrectAnswer() {
    incorrectFeedback();
    incrementPossilbeScore();
}

function nextQuestion() {
    $('.answerPage').on('click', '.nextQuestionButton', function(evt) {
        showQuestionPage();
        incrementQuestionNumber();    
        displayQuestion();
    });
}

function renderResults() {
    $('.questionPage').hide();
    if (score >= 8) {
        $('.resultPage').html(`<section class="results">
          <h3>Congratulations! You're an expert!</h3>
          <p>Your final score was ${score}/10</p>
          <img src="https://cdn-images-1.medium.com/max/1600/0*FD0f5S1iYeLzeJ6k.jpg" alt="Ken Griffey Jr. hitting a home run.">
          <button type="button" class="retryButton">Retry Quiz</button>
        </section>`);
    } else if (score < 8 && score >= 5) {
        $('.resultPage').html(`<section class="results">
          <h3>Good job, you know your Major League Baseball.</h3>
          <p>Your final score was ${score}/10</p>
          <img src="https://cdn-images-1.medium.com/max/1600/0*FD0f5S1iYeLzeJ6k.jpg" alt="Ken Griffey Jr. hitting a home run.">
          <button type="button" class="retryButton">Retry Quiz</button>
        </section>`);
    } else {
        $('.resultPage').html(`<section class="results">
          <h3>Study up on some of your baseball knowledge and you'll be an expert in no time. </h3>
          <p>Your final score was ${score}/10</p>
          <img src="https://www.gannett-cdn.com/-mm-/bd80273d5edc395f98038de5e6df8ffb9a1c6071/c=0-108-2316-1411/local/-/media/2018/05/27/USATODAY/usatsports/bd87a2a4d1e34d2dacc00ee87344fa03.jpg?width=3200&height=1680&fit=crop" alt="A batter striking out.">
          <button type="button" class="retryButton">Retry Quiz</button>
        </section>`);
    }
}

function retryQuiz() {
    $('.resultPage').on('click', '.retryButton', function(evt) {
      location.reload();
    });
}

function incrementQuestionNumber() {
    questionNumber++;
    $('.currentQuestion').text(questionNumber + 1);
}

function incrementCurrentScore() {
    score++;
    $('.currentScore').text(score);
}

function incrementPossilbeScore() {
    $('.possibleScore').text(questionNumber + 1);
}

function showAnswerPage() {
    $('.questionPage').hide();
    $('.answerPage').show();
}

function showQuestionPage() {
    $('.answerPage').hide();
    $('.questionPage').show();
}

function quiz() {
    startQuiz();
    createQuestion();
    nextQuestion();
    handleSelectedAnswer();
    colorSelectedAnswer();
}

$(quiz);