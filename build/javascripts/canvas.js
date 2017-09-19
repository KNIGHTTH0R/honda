(function() {
  var CANVAS_RATIO, CAR_HEIGHT, CAR_WIDTH, LIMIT_LENGTH, PREVIEW_CAR_RATIO, bg;

  window.canvasConfig = {
    car: 0,
    frameIndex: 0,
    x: 200,
    y: 80,
    size: 1,
    bg: 0,
    wheel: 0,
    color: 0
  };

  LIMIT_LENGTH = 200;

  CAR_WIDTH = 742;

  CAR_HEIGHT = 386;

  CANVAS_RATIO = 851 / 760;

  PREVIEW_CAR_RATIO = 0.5;

  bg = document.getElementById("bg");

  window.renderPreview = function() {
    $("#preview").css("background-image", "url(" + q(".bg-gallery img")[canvasConfig.bg].src + ")");
    $("#preview .car .inner").attr("src", q("#car-gallery img")[canvasConfig.car].src);
    $("#preview .car").css("left", canvasConfig.x + "px");
    $("#preview .car").css("top", canvasConfig.y + "px");
    $("#preview .car .inner").css("left", -canvasConfig.frameIndex * CAR_WIDTH * PREVIEW_CAR_RATIO * canvasConfig.size + "px");
    $("#preview .car .inner").css("width", 26712 * canvasConfig.size * PREVIEW_CAR_RATIO + "px");
    $("#preview .car .inner").css("height", 386 * canvasConfig.size * PREVIEW_CAR_RATIO + "px");
    $("#preview .car").css("width", canvasConfig.size * CAR_WIDTH * PREVIEW_CAR_RATIO + "px");
    return $("#preview .car").css("height", canvasConfig.size * CAR_HEIGHT * PREVIEW_CAR_RATIO + "px");
  };

  window.drawCanvas = function() {
    var canvas, car, ctx;
    canvas = document.getElementById("cover-photo");
    ctx = canvas.getContext("2d");
    bg = document.getElementById("bg-thumbnail");
    ctx.drawImage(bg, 0, 0, 851, 315);
    car = q("#car-gallery img")[canvasConfig.car];
    return ctx.drawImage(car, canvasConfig.frameIndex * CAR_WIDTH, 0, CAR_WIDTH, CAR_HEIGHT, canvasConfig.x * CANVAS_RATIO, canvasConfig.y * CANVAS_RATIO, CAR_WIDTH * canvasConfig.size * CANVAS_RATIO * PREVIEW_CAR_RATIO, CAR_HEIGHT * canvasConfig.size * CANVAS_RATIO * PREVIEW_CAR_RATIO);
  };

  window.moveCar = function(direction) {
    switch (direction) {
      case 'up':
        window.canvasConfig.y -= 4;
        break;
      case 'down':
        window.canvasConfig.y += 4;
        break;
      case 'left':
        window.canvasConfig.x -= 4;
        break;
      case 'right':
        window.canvasConfig.x += 4;
    }
    return renderPreview();
  };

}).call(this);
