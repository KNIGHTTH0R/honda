$(".rotate-panel").mousedown (e) ->
	anchor = e.clientX
	$(this).mousemove (e) ->
		if (anchor - e.clientX)>4
			window.canvasConfig.frameIndex+=1
			if canvasConfig.frameIndex>35
				canvasConfig.frameIndex = 0
			anchor = e.clientX
			# drawCanvas()
			renderPreview()
		else if (anchor - e.clientX)<-4
			window.canvasConfig.frameIndex-=1
			if canvasConfig.frameIndex<0
				canvasConfig.frameIndex = 35
			anchor = e.clientX
			# drawCanvas()
			renderPreview()

$(".rotate-panel").mouseup (e) ->
	$(this).unbind "mousemove"