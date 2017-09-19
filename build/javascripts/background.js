(function() {

  $(".background .next").click(function() {
    var num;
    num = parseInt($(this).data("next"));
    window.canvasConfig.bg = num;
    q(".background .switch").src = q(".bg-gallery img")[num].src;
    updatePreNext();
    renderPreview();
    return null;
  });

  $(".background .pre").click(function() {
    var num;
    num = parseInt($(this).data("pre"));
    window.canvasConfig.bg = num;
    q(".background .switch").src = q(".bg-gallery img")[num].src;
    updatePreNext();
    renderPreview();
    return null;
  });

  window.updatePreNext = function() {
    var max, num;
    num = canvasConfig.bg;
    max = q(".bg-gallery img").length;
    $(".background .next").data("next", num >= max - 1 ? 0 : num + 1);
    $(".background .pre").data("pre", num <= 0 ? max - 1 : num - 1);
    return null;
  };

}).call(this);
