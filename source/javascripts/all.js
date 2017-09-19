//= require browser
//= require jquery.min
//= require preload
//= require background
//= require canvas
//= require rotate
//= require welcome
//= require fb
//= require post-file
//= require jq.mp.min
//= require upload
//= require jq.imgareaselect.min

// document.domain = 'localhost:4567';


function q(selector) {
	var result = document.querySelectorAll(selector);
	if (result.length==1) {
		return result[0];
	} else {
		return result;
	}
}

$("#next-step").click(
	function(){
		// $("#step1").fadeOut();
		$("#step1").fadeOut();
		setTimeout( function(){
				var i = 0;
				$("#step2 .property a").each( function () {
					var $_this = $(this);
					setTimeout(function(){$_this.fadeIn();},500*i);
					i++;
				});
			}, 200
		)

	drawCanvas();
	document.getElementById("download").href=document.getElementById("cover-photo").toDataURL('image/jpg');

	setTimeout( function(){
		$(".export .loading").hide();
		$(".export #export, .export #download").css("display","inline-block");
	}, 4000);
});

$("#step2 .close").click(
	function(){
		// $("#step1").fadeOut();
		$("#step1").fadeIn();
});

// 移動車子
$("#move a").mousedown(function(){
	var direction = $(this).data("direction");
	moveCar(direction);
	var timerId = setInterval(function(){
		moveCar(direction);
	},150);
	$(this).mouseup(function(){
		clearInterval(timerId);
	});
});

// 縮放車子
$("#zoom .zoom-in").click(function(){
	window.canvasConfig.size += 0.1;
	renderPreview();
});
$("#zoom .zoom-out").click(function(){
	window.canvasConfig.size -= 0.1;
	renderPreview();
});

// Export to facebook
$(".export #export").click(function(){
	exportToFacebook();
});

$(".export #download").click(function(){
	$(this).hide();
	$(".export #download-done").css("display","inline-block");
});

$("#lane-watch").magnificPopup({
	type: 'image',
	closeOnContentClick: true,
	closeBtnInside: false,
	mainClass: 'mfp-no-margins', // class to remove default margin from left and right side
	image: {
		verticalFit: true
	}
});

$("#backward-camera").magnificPopup({
	type: 'image',
	closeOnContentClick: true,
	closeBtnInside: false,
	mainClass: 'mfp-no-margins', // class to remove default margin from left and right side
	image: {
		verticalFit: true
	}
});

$("#guidance").magnificPopup({
	type: 'image',
	closeOnContentClick: true,
	closeBtnInside: false,
	mainClass: 'mfp-no-margins', // class to remove default margin from left and right side
	image: {
		verticalFit: true
	}
});

$("#show-interior").magnificPopup({
	items: {
		src: '#interior-popup',
		type: 'inline'
	}
});

$("#play-cf").magnificPopup({
	items: {
		src: '#cf-video',
		type: 'inline'
	}
});

$("#js-draw-info").magnificPopup({
	items: {
		src: '#draw-info',
		type: 'inline'
	}
});

$("#select-area-popup #cancel-upload").click(function(){
	$.magnificPopup.close();
});

$(".color .color-option").click(function(){
	canvasConfig.color = parseInt($(this).data("color"));
	canvasConfig.car = canvasConfig.wheel*4+canvasConfig.color;
	renderPreview();
});

$(".wheel .wheel-option").click(function(){
	canvasConfig.wheel = parseInt($(this).data("wheel"));
	canvasConfig.car = canvasConfig.wheel*4+canvasConfig.color;
	renderPreview();
});