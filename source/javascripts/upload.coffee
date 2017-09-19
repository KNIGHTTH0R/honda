uploader = document.getElementById("image-uploader");
uploader.onchange = (e) ->
	# console.log(e)
	if(typeof FileReader == "undefined")
		return true

	console.log e.target.files

	files = e.target.files

	for file in files
		console.log(file)
		if file.type.match('image.*') 
			reader = new FileReader()
			reader.onload = ((theFile) ->
				return (e) ->
					dataUrl = e.target.result

					q("#confirm-upload").onclick = ->
						return (->
							confirmUpload(dataUrl)
						)(dataUrl)

					selectArea = q('#select-area-popup img.select')

					selectArea.src = dataUrl

					selectArea.onload = ->
						if (selectArea.width>selectArea.height)
							$(selectArea).css("width", "480px")
							$(selectArea).css("height", "auto")
						else
							$(selectArea).css("height", "480px")
							$(selectArea).css("width", "auto")
						console.log
					        handles: true,
					        zIndex: 9999,
					        aspectRatio: "851:315"
					        ,
					        x1: 0,
					        y1: 0,
					        x2: $(selectArea).width(),
					        y2: $(selectArea).width()*315/851
					        # ,
					        # onSelectEnd: someFunction
					    # )
						$.magnificPopup.open(
							items:
								src: $("#select-area-popup"),
								type: 'inline'
							callbacks:
								close: ->
									$('#select-area-popup img.select').imgAreaSelect({ instance: true }).setOptions({hide:true})
						)

						$('#select-area-popup img.select').imgAreaSelect(
					        handles: true,
					        zIndex: 9999,
					        aspectRatio: "851:315"
					        ,
					        x1: 0,
					        y1: 0,
					        x2: $('#select-area-popup img.select').width(),
					        y2: $('#select-area-popup img.select').width()*315/851
					        # ,
					        # onSelectEnd: someFunction
					    )

					# img.onload = ->
					# 	img_width = img.width
					# 	img_height = img.height
					# 	preview = 
					# 	# canvas = document.getElementById("cover-photo")
					# 	ctx = canvas.getContext("2d")
					# 	ctx.drawImage(img,0,0,851,315)
			)(file)
			reader.readAsDataURL(file)

appendToBgGallery = (img) ->
	q(".background .switch").src = img.src
	canvasConfig.bg = q(".bg-gallery img").length
	$("#bg-gallery").append(img)
	updatePreNext()
	# renderPreview()

confirmUpload = (dataUrl) ->
	img = new Image()
	img.src = dataUrl
	window.resizer = document.createElement "canvas"
	ratio = img.width/$('#select-area-popup img.select').width()
	selectedArea = $('#select-area-popup img.select').imgAreaSelect({ instance: true }).getSelection()
	console.log selectedArea
	resizer.width = 851
	resizer.height = 315
	ctx = resizer.getContext("2d")
	ctx.drawImage(
		img,
		selectedArea.x1*ratio, selectedArea.y1*ratio,
		selectedArea.width*ratio, selectedArea.height*ratio,
		0, 0,
		851, 315
	)
	img.src = resizer.toDataURL('image/jpg')
	appendToBgGallery img
	$("#preview").css "background-image", "url("+img.src+")"
	$.magnificPopup.close()
