window.addEventListener("load", function () {
  var width = 640,
    height = 340,
    ganelive = true,
    level = 1,
    life = 5,
    color = "white";
  var enemies = [
    {
      x: 100,
      y: 100,
      speedy: 2,
      w: 40,
      h: 40,
    },
    {
      x: 200,
      y: 1,
      speedy: 2,
      w: 40,
      h: 40,
    },
    {
      x: 330,
      y: 100,
      speedy: 3,
      w: 40,
      h: 40,
    },
    {
      x: 450,
      y: 100,
      speedy: -3,
      w: 40,
      h: 40,
    },
  ];
  var player = {
    x: 10,
    y: 160,
    speedx: 2,
    ismove: false,
    w: 40,
    h: 40,
  };
  var goal = {
    x: 580,
    y: 160,
    w: 50,
    h: 38,
  };
  var sprites = {};
  var move = function () {
    player.ismove = true;
  };
  var stop = function () {
    player.ismove = false;
  };
  var canvas = document.getElementById("mycanvas");
  var ctx = canvas.getContext("2d");
  canvas.addEventListener("mousedown", move);
  canvas.addEventListener("mouseup", stop);
  canvas.addEventListener("touchstart", move);
  canvas.addEventListener("touchend", stop);
  var update = function () {
    if (checkCollision(player, goal)) {
      alert("You Win !");
      level += 1;
      life += 1;
      player.speedx += 1;
      player.x = 10;
      player.y = 160;
      player.ismove = false;
      for (var i = 0; i < enemies.length; i++) {
        if (enemies[i].speedy > 1) {
          enemies[i].speedy += 1;
        } else {
          enemies[i].speedy -= 1;
        }
      }
    }
    if (player.ismove) {
      player.x = player.x + player.speedx;
    }
    var e = 0;
    var n = enemies.length;
    enemies.forEach(function (element, index) {
      if (checkCollision(player, element)) {
        if (life === 0) {
          alert("X Game Over X");
          for (var i = 0; i < enemies.length; i++) {
            if (enemies[i].speedy > 1) {
              enemies[i].speedy -= level - 1;
            } else {
              enemies[i].speedy += level - 1;
            }
          }
          level = 1;
          life = 6;
          player.speedx = 2;
        }
        if (life > 0) {
          life -= 1;
        }
        player.x = 10;
        player.y = 160;
        player.ismove = false;
      }
      element.y += element.speedy;
      if (element.y <= 10) {
        element.y = 10;
        element.speedy *= -1;
      } else if (element.y >= height - 50) {
        element.y = height - 50;
        element.speedy *= -1;
      }
    });
  };
  var draw = function () {
    ctx.clearRect(0, 0, width, height);
    ctx.font = "12px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Level : " + level, 10, 15);
    ctx.fillText("Life : " + life, 10, 35);
    ctx.fillText("Speed : " + player.speedx, 10, 55);
    ctx.fillStyle = color;
    ctx.fillRect(player.x, player.y, player.w, player.h);
    ctx.fillStyle = "red";
    enemies.forEach(function (element, index) {
      ctx.fillRect(element.x, element.y, element.w, element.h);
    });
    ctx.fillStyle = "green";
    ctx.fillRect(goal.x, goal.y, goal.w, goal.h);
  };
  var step = function () {
    update();
    draw();
    if (ganelive) {
      window.requestAnimationFrame(step);
    }
  };
  var checkCollision = function (rect1, rect2) {
    var closeOnWidth =
      Math.abs(rect1.x - rect2.x) <= Math.max(rect1.w, rect2.w);
    var closeOnHeight =
      Math.abs(rect1.y - rect2.y) <= Math.max(rect1.h, rect2.h);
    return closeOnHeight && closeOnWidth;
  };
  step();
});
