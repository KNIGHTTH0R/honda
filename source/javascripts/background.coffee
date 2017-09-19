$(".background .next").click -> 
	# alert $(this).data("next")
	num = parseInt($(this).data("next"))
	window.canvasConfig.bg = num
	q(".background .switch").src = q(".bg-gallery img")[num].src
	updatePreNext()
	# drawCanvas()
	renderPreview()
	null

$(".background .pre").click -> 
	# alert q(".bg-gallery img")[parseInt($(this).data("pre"))].src
	num = parseInt($(this).data("pre"))
	window.canvasConfig.bg = num
	q(".background .switch").src = q(".bg-gallery img")[num].src
	updatePreNext()
	# drawCanvas()
	renderPreview()
	null

window.updatePreNext = ->
	num = canvasConfig.bg
	max = q(".bg-gallery img").length
	$(".background .next").data("next", if (num>=max-1) then 0 else (num+1) )
	$(".background .pre").data("pre", if (num<=0) then max-1 else (num-1) )
	null