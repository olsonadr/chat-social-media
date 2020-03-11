const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");
const scale = 10;
const rows = canvas.height / scale;
const columns = canvas.width / scale;
var paused = 1;
var snake;

(function setup() {
    snake = new Snake();
    fruit = new Fruit();
    fruit.pickLocation();

    document.querySelector('#game-score').innerText = "Score: 0";

    window.setInterval(() => {

      if (paused == 0) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          fruit.draw();
          snake.update();
          snake.draw();

          if (snake.eat(fruit)) {
              fruit.pickLocation();
          }

          snake.checkCollision();
          document.querySelector('#game-score').innerText = "Score: " + snake.total;
      }

    }, 250);

}());

$('#game-pause-button').on("click", function() {
    paused = (paused + 1) % 2;
    $('#game-pause-label').toggleClass('hidden');
    $('#game-pause-button').text(( (paused == 1) ? ('Play') : ('Pause') ));
});

window.addEventListener('keydown', ((evt) => {
    const direction = evt.key.replace('Arrow', '');
    snake.changeDirection(direction);
}));
