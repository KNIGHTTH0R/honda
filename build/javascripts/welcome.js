(function() {

  $("#enter").mouseover(function() {
    return $(".engine-btn").addClass("engine-btn-hover");
  }).mouseout(function() {
    return $(".engine-btn").removeClass("engine-btn-hover");
  }).click(function() {
    var audio;
    $(".engine-btn").addClass("engine-btn-active");
    $(".enter").hide();
    audio = document.getElementById('engine');
    audio.play();
    return $("#car-light").animate({
      opacity: 0.6
    }, 300, function() {
      return $("#car-light").animate({
        opacity: 0.2
      }, 200, function() {
        return $("#car-light").animate({
          opacity: 0.8
        }, 400, function() {
          return $("#car-light").animate({
            opacity: 0.3
          }, 200, function() {
            var animate;
            return animate = $("#car-light").animate({
              opacity: 0.8
            }, 1000, function() {
              var myAudio;
              $("#welcome").fadeOut();
              myAudio = document.getElementById("music");
              myAudio.addEventListener('ended', function() {
                this.currentTime = 0;
                return this.play();
              }, false);
              return myAudio.play();
            });
          });
        });
      });
    });
  });

}).call(this);
