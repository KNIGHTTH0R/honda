window.canvasConfig = {car:0, frameIndex:0, x:200, y:80, size: 1, bg:0, wheel:0, color:0}
LIMIT_LENGTH = 200
CAR_WIDTH = 742
CAR_HEIGHT = 386
CANVAS_RATIO = 851/760 # 顯示的cover photo與實際產出的比例
PREVIEW_CAR_RATIO = 0.5
bg = document.getElementById("bg")

window.renderPreview = ->
	$("#preview").css("background-image", "url("+q(".bg-gallery img")[canvasConfig.bg].src+")")
	# $("#preview .car").css("background-image", "url("+q("#car-gallery img")[canvasConfig.car].src+")")
	$("#preview .car .inner").attr("src", q("#car-gallery img")[canvasConfig.car].src)
	$("#preview .car").css("left",canvasConfig.x+"px")
	$("#preview .car").css("top",canvasConfig.y+"px")
	$("#preview .car .inner").css("left", -(canvasConfig.frameIndex)*CAR_WIDTH*PREVIEW_CAR_RATIO*canvasConfig.size+"px")
	$("#preview .car .inner").css("width",26712*canvasConfig.size*PREVIEW_CAR_RATIO+"px")
	$("#preview .car .inner").css("height",386*canvasConfig.size*PREVIEW_CAR_RATIO+"px")
	$("#preview .car").css("width",canvasConfig.size*CAR_WIDTH*PREVIEW_CAR_RATIO+"px")
	$("#preview .car").css("height",canvasConfig.size*CAR_HEIGHT*PREVIEW_CAR_RATIO+"px")
	

window.drawCanvas = ->
	canvas = document.getElementById("cover-photo")
	ctx = canvas.getContext("2d")

	# draw background
	bg = document.getElementById("bg-thumbnail")
	ctx.drawImage(bg ,0,0, 851, 315)

	# draw car
	car = q("#car-gallery img")[canvasConfig.car]
	ctx.drawImage(
		car, 
		canvasConfig.frameIndex*CAR_WIDTH, 0,
		CAR_WIDTH, CAR_HEIGHT,
		canvasConfig.x*CANVAS_RATIO, canvasConfig.y*CANVAS_RATIO,
		CAR_WIDTH*canvasConfig.size*CANVAS_RATIO*PREVIEW_CAR_RATIO, CAR_HEIGHT*canvasConfig.size*CANVAS_RATIO*PREVIEW_CAR_RATIO
	)


window.moveCar = (direction)->
	switch direction
		when 'up' then window.canvasConfig.y -= 4
		when 'down' then window.canvasConfig.y += 4
		when 'left' then window.canvasConfig.x -= 4
		when 'right' then window.canvasConfig.x += 4
	# drawCanvas()
	renderPreview()
