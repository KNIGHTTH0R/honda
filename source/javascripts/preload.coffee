bgImg = [	'./images/bg/0.jpg',
			'./images/bg/1.jpg',
			'./images/bg/2.jpg',
			'./images/bg/3.jpg',
			'./images/bg/4.jpg',
			'./images/bg/5.jpg',
			'./images/bg/6.jpg',
			'./images/bg/7.jpg',
			'./images/bg/8.jpg',
			'./images/bg/9.jpg']
carImg = [	'./images/car/VTi-black.png',
			'./images/car/VTi-titanium.png',
			'./images/car/VTi-white.png',
			'./images/car/VTi-gold.png',
			'./images/car/VTiS-black.png',
			'./images/car/VTiS-titanium.png',
			'./images/car/VTiS-white.png',
			'./images/car/VTiS-gold.png']
counter = bgImg.length + carImg.length
max = bgImg.length + carImg.length

for i in [0...bgImg.length]
	img = document.createElement("img")
	img.src = bgImg[i]
	img.onload = do ->
		src = bgImg[i]
		return ->
			counter -= 1
			$("#welcome .loading .percent").text( parseInt( (max-counter)*100/max, 10) + "%" )
			if counter <= 0
				renderPreview()
				$("#loading").fadeOut()
	$("#bg-gallery").append(img)

for i in [0...carImg.length]
	img = document.createElement("img")
	img.src = carImg[i]
	img.onload = do ->
		src = carImg[i]
		return ->
			counter -= 1
			$("#welcome .loading .percent").text( parseInt( (max-counter)*100/max, 10) + "%" )
			if counter <= 0
				renderPreview()
				$("#loading").fadeOut()
	$("#car-gallery").append(img)

# $("#bg-gallery img, #car-gallery img").load ->
# 	counter -= 1
# 	if counter <= 0
# 		drawCanvas()
# 		$("#loading").fadeOut()
# 		alert("OK")