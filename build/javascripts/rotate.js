(function() {

  $(".rotate-panel").mousedown(function(e) {
    var anchor;
    anchor = e.clientX;
    return $(this).mousemove(function(e) {
      if ((anchor - e.clientX) > 4) {
        window.canvasConfig.frameIndex += 1;
        if (canvasConfig.frameIndex > 35) {
          canvasConfig.frameIndex = 0;
        }
        anchor = e.clientX;
        return renderPreview();
      } else if ((anchor - e.clientX) < -4) {
        window.canvasConfig.frameIndex -= 1;
        if (canvasConfig.frameIndex < 0) {
          canvasConfig.frameIndex = 35;
        }
        anchor = e.clientX;
        return renderPreview();
      }
    });
  });

  $(".rotate-panel").mouseup(function(e) {
    return $(this).unbind("mousemove");
  });

}).call(this);
