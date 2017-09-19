(function() {
  var bgImg, carImg, counter, i, img, max, _i, _j, _ref, _ref1;

  bgImg = ['./images/bg/0.jpg', './images/bg/1.jpg', './images/bg/2.jpg', './images/bg/3.jpg', './images/bg/4.jpg', './images/bg/5.jpg', './images/bg/6.jpg', './images/bg/7.jpg', './images/bg/8.jpg', './images/bg/9.jpg'];

  carImg = ['./images/car/VTi-black.png', './images/car/VTi-titanium.png', './images/car/VTi-white.png', './images/car/VTi-gold.png', './images/car/VTiS-black.png', './images/car/VTiS-titanium.png', './images/car/VTiS-white.png', './images/car/VTiS-gold.png'];

  counter = bgImg.length + carImg.length;

  max = bgImg.length + carImg.length;

  for (i = _i = 0, _ref = bgImg.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
    img = document.createElement("img");
    img.src = bgImg[i];
    img.onload = (function() {
      var src;
      src = bgImg[i];
      return function() {
        counter -= 1;
        $("#welcome .loading .percent").text(parseInt((max - counter) * 100 / max, 10) + "%");
        if (counter <= 0) {
          renderPreview();
          return $("#loading").fadeOut();
        }
      };
    })();
    $("#bg-gallery").append(img);
  }

  for (i = _j = 0, _ref1 = carImg.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
    img = document.createElement("img");
    img.src = carImg[i];
    img.onload = (function() {
      var src;
      src = carImg[i];
      return function() {
        counter -= 1;
        $("#welcome .loading .percent").text(parseInt((max - counter) * 100 / max, 10) + "%");
        if (counter <= 0) {
          renderPreview();
          return $("#loading").fadeOut();
        }
      };
    })();
    $("#car-gallery").append(img);
  }

}).call(this);
