//= require jquery.min
//= require bootstrap.min
//= require totem-pole

$.getJSON("//honda.dash.tw/api/all_member.php",{},function(data){
	TP("#member-info",data);
	$("#js-draw").click(function(){
		var luckyNumber = parseInt(data.length*Math.random(),10);
		console.log(data[luckyNumber]);
		TP("#lucky-star-info", data[luckyNumber]);
		$("#lucky-star").show();
	});
});