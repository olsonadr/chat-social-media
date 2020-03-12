const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");
const scale = 10;
const rows = (canvas.height / scale) - 1;
const columns = (canvas.width / scale) - 1;
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

    }, 200);

}());

$(document).ready(function() {
  $('#game-pause-button').on("click", function() {
      $('#game-info-label').stop(true, true);
      paused = (paused + 1) % 2;

      if (paused == 1) {
          $('#game-info-label').text('PAUSED');
          $('#game-pause-button').text('Play');
          $('#game-info-label').show();
      }
      else {
          $('#game-info-label').text('');
          $('#game-pause-button').text('Pause');
          $('#game-info-label').hide();
      }

  });

  $('#game-info-label').on('new_high_score', function() {
      // Alert of new highscore
      $('#game-info-label').text('NEW HIGH SCORE!!');
      $('#game-info-label').show();
      $('#game-info-label').fadeOut(2000, function() {
          if (paused == 0) {
              $('game-info-label').hide();
              $('#game-info-label').text('');
          }
      });

  });

  window.addEventListener('keydown', ((evt) => {
      const direction = evt.key.replace('Arrow', '');
      snake.changeDirection(direction);
  }));

  $('#give-up-button').on("click", function() {
      if (typeof(snake) !== 'undefined') {
          snake.die();
      }
  });

});
