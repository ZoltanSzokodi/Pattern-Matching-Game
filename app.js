const message = document.querySelector('.message');
const game_area = document.querySelector('.game-area');
const button = document.querySelector('button');
const game_colors = ['red', 'blue', 'green', 'yellow'];

// Global Variables
let game_clicks = [];
let user_clicks = [];
let in_play = false;
let play_num = 2;

// Event listeners
button.addEventListener('click', playGame);
window.addEventListener('load', setUp);

function playGame() {
    if (!in_play) {
        start();
    }
}

function start() {
    button.disabled = true;
    messager('Match Pattern');
    game_clicks = [];
    user_clicks = [];
    runSequence(play_num);
}

function runSequence(num) {
    let squares = document.querySelectorAll('.box');
    num--;
    if (num < 0) {
        in_play = true;
        return;
    }
    let random_num = Math.floor(Math.random() * game_colors.length);
    game_clicks.push(game_colors[random_num]);
    console.log(game_clicks);
    squares[random_num].style.opacity = '1';
    setTimeout(function () {
        squares[random_num].style.opacity = '0.5';
        setTimeout(function () {
            runSequence(num);
        }, 100);
    }, 500);
}

function setUp() {
    for (let i = 0; i < game_colors.length; i++) {
        let div = elementFactory('div');
        div.style.backgroundColor = game_colors[i];
        div.classList.add('box');
        div.style.opacity = '0.5';
        // This is a hidden value
        div.myColor = game_colors[i];
        div.addEventListener('click', checkAnswer);
        game_area.appendChild(div);
    }
}

function elementFactory(elType) {
    let element = document.createElement(elType);
    return element;
}

function checkAnswer(event) {
    if (in_play) {
        let el = event.target;
        user_clicks.push(el.myColor);
        el.style.opacity = '1';
        setTimeout(function () {
            el.style.opacity = '0.5';
        }, 200);
        if (user_clicks.length == game_clicks.length) {
            in_play = false;
            endGame();
        }
    }
}

function endGame() {
    button.disabled = false;
    if (user_clicks.toString() == game_clicks.toString()) {
        play_num++;
        messager('Correct');
    } else {
        messager('False');
    }
}

function messager(mes) {
    message.innerHTML = mes;
}
