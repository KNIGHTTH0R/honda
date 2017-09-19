(function() {
  var appendToBgGallery, confirmUpload, uploader;

  uploader = document.getElementById("image-uploader");

  uploader.onchange = function(e) {
    var file, files, reader, _i, _len, _results;
    if (typeof FileReader === "undefined") {
      return true;
    }
    console.log(e.target.files);
    files = e.target.files;
    _results = [];
    for (_i = 0, _len = files.length; _i < _len; _i++) {
      file = files[_i];
      console.log(file);
      if (file.type.match('image.*')) {
        reader = new FileReader();
        reader.onload = (function(theFile) {
          return function(e) {
            var dataUrl, selectArea;
            dataUrl = e.target.result;
            q("#confirm-upload").onclick = function() {
              return (function() {
                return confirmUpload(dataUrl);
              })(dataUrl);
            };
            selectArea = q('#select-area-popup img.select');
            selectArea.src = dataUrl;
            return selectArea.onload = function() {
              if (selectArea.width > selectArea.height) {
                $(selectArea).css("width", "480px");
                $(selectArea).css("height", "auto");
              } else {
                $(selectArea).css("height", "480px");
                $(selectArea).css("width", "auto");
              }
              console.log({
                handles: true,
                zIndex: 9999,
                aspectRatio: "851:315",
                x1: 0,
                y1: 0,
                x2: $(selectArea).width(),
                y2: $(selectArea).width() * 315 / 851
              });
              $.magnificPopup.open({
                items: {
                  src: $("#select-area-popup"),
                  type: 'inline'
                },
                callbacks: {
                  close: function() {
                    return $('#select-area-popup img.select').imgAreaSelect({
                      instance: true
                    }).setOptions({
                      hide: true
                    });
                  }
                }
              });
              return $('#select-area-popup img.select').imgAreaSelect({
                handles: true,
                zIndex: 9999,
                aspectRatio: "851:315",
                x1: 0,
                y1: 0,
                x2: $('#select-area-popup img.select').width(),
                y2: $('#select-area-popup img.select').width() * 315 / 851
              });
            };
          };
        })(file);
        _results.push(reader.readAsDataURL(file));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  appendToBgGallery = function(img) {
    q(".background .switch").src = img.src;
    canvasConfig.bg = q(".bg-gallery img").length;
    $("#bg-gallery").append(img);
    return updatePreNext();
  };

  confirmUpload = function(dataUrl) {
    var ctx, img, ratio, selectedArea;
    img = new Image();
    img.src = dataUrl;
    window.resizer = document.createElement("canvas");
    ratio = img.width / $('#select-area-popup img.select').width();
    selectedArea = $('#select-area-popup img.select').imgAreaSelect({
      instance: true
    }).getSelection();
    console.log(selectedArea);
    resizer.width = 851;
    resizer.height = 315;
    ctx = resizer.getContext("2d");
    ctx.drawImage(img, selectedArea.x1 * ratio, selectedArea.y1 * ratio, selectedArea.width * ratio, selectedArea.height * ratio, 0, 0, 851, 315);
    img.src = resizer.toDataURL('image/jpg');
    appendToBgGallery(img);
    $("#preview").css("background-image", "url(" + img.src + ")");
    return $.magnificPopup.close();
  };

}).call(this);
