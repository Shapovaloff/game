var start = document.querySelector('#start');
var game = document.querySelector('#game');
var timeElem = document.querySelector('#time');
var resul = document.querySelector('#result');
var timeHeader = document.querySelector('#time-header');
var resultHeader = document.querySelector('#result-header');
var gameTime = document.querySelector('#game-time');


var colors = ['red', 'green', 'blue', 'yellow', 'pink'];

var score = 0;
var isGameStarted = false;

start.addEventListener('click', startGame);
game.addEventListener('click', handlerBoxClick);
gameTime.addEventListener('input', setGameTime);

function show (elem) {
  elem.classList.remove('hide');
}

function hide (elem) {
  elem.classList.add('hide');
}

function startGame() {
  score = 0;
  setGameTime();
  gameTime.disabled = true;
  isGameStarted = true;
  game.style.backgroundColor = '#fff';
  start.classList.add('hide');

  var interval = setInterval(function() {
    var time = parseFloat(timeElem.textContent);

    if (time <= 0) {
      clearInterval(interval)
      endGame();
    } else {
      timeElem.textContent = (time - 0.1).toFixed(1);
    }
  }, 100)
  
  renderBox();
};

function setGameScore() {
  resul.textContent = score.toString();
}

function setGameTime() {
  var time = +gameTime.value;
  timeElem.textContent = time.toFixed(1);
  show(timeHeader);
  hide(resultHeader);
}

function endGame() {
  isGameStarted = false;
  setGameScore();
  gameTime.disabled = false;
  show(start);
  game.style.backgroundColor = '#ccc';
  game.innerHTML = '';
  hide(timeHeader);
  show(resultHeader);
};

function handlerBoxClick (evt) {
  if (!isGameStarted) {
    return;
  };

  if (evt.target.dataset.box) {
    score++;
    renderBox();
  };
};

function renderBox() {
  game.innerHTML = '';
  var box = document.createElement('div');
  var boxSize = getRandom(30, 100);
  var gameSize = game.getBoundingClientRect(); // Можно получить размеры контеинера
  var maxTop = gameSize.height - boxSize;
  var maxLeft = gameSize.width - boxSize;
  var randomColorIndex = getRandom(0, colors.length);
  
  box.style.height = box.style.width = boxSize + 'px';
  box.style.position = 'absolute';
  box.style.backgroundColor = colors[randomColorIndex];
  box.style.top = getRandom(0, maxTop) + 'px';
  box.style.left = getRandom(0, maxLeft) + 'px';
  box.style.cursor = 'pointer';
  box.setAttribute('data-box', 'true')

  game.insertAdjacentElement('afterbegin', box)
};

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}