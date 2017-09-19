window.fbInfo={};

window.fbAsyncInit = function() {
	// init the FB JS SDK
	
	FB.init({
		appId      : '249524198523497',                        // App ID from the app dashboard
		// channelUrl : '//pj1.kevinshu.com/channel.html', // Channel file for x-domain comms
		status     : true,                                 // Check Facebook Login status
		xfbml      : true                                  // Look for social plugins on the page
	});
	FB.getLoginStatus(function(response) {
        fbInfo.uid = response.authResponse.userID ? response.authResponse.userID : null;
		fbInfo.accessToken = response.authResponse.accessToken;
		findOrCreateAlbum();
		hasShared();
    });
};

function login() {
	FB.getLoginStatus(function(response) {
		if (response.status === 'connected') {
			fbInfo.uid = response.authResponse.userID;
			fbInfo.accessToken = response.authResponse.accessToken;
			hasShared();
			findOrCreateAlbum();
		} else if (response.status === 'not_authorized') {
			FB.login(function(response) {
				if (response.authResponse) {
					fbInfo.uid = response.authResponse.userID;
					fbInfo.accessToken = response.authResponse.accessToken;
					findOrCreateAlbum();
				} else {
					location.reload();
				}
			}, {scope: 'user_photos'});
		} else {
			// the user isn't logged in to Facebook.
		}
		alert(response.status);
	});
}

// Load the SDK asynchronously
(function(d, s, id){
	 var js, fjs = d.getElementsByTagName(s)[0];
	 if (d.getElementById(id)) {return;}
	 js = d.createElement(s); js.id = id;
	 js.src = "//connect.facebook.net/zh_TW/all.js";
	 fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

function creatAlbum() {
	$.post(
		"https://graph.facebook.com/"+fbInfo.uid+"/albums",
		{
			name: "Honda Accord",
			access_token: fbInfo.accessToken
		},
		function(result){
			fbInfo.albumId = result.id;
		}
	)
}

function findOrCreateAlbum() {
	var queryString = "select name, aid, object_id from album WHERE owner = '"+fbInfo.uid+"' and name = 'Honda Accord'";
	$.getJSON(
		"https://graph.facebook.com/fql",
		{
			q: queryString,
			access_token: fbInfo.accessToken
		},
		function(result){
			console.log(result);
			if (result.data.length==0) {
				creatAlbum();
			} else {
				fbInfo.albumId = result.data[0].object_id;
				// alert(fbInfo.albumId);
			}
		}
	)
}

function shareAndRedirect() {
	FB.ui({
			method: 'feed',
			link: 'https://apps.facebook.com/honda_promotion_dev/',
			picture: 'http://honda.dash.tw/images/feed.jpg',
			name: 'Honda Accord',
			caption: 'Common!',
			description: '我用New Honda Accord APP一下子就建立了一個好酷的個人封面圖喔！你也來玩玩吧！'
			// ,
			// redirect_uri: 'http://honda.dash.tw/api/insert_user.php'
		},
	    function(response){
			if(response && response.post_id) {
				$.post('https://kevinshu.com/honda/api/insert_user.php',{},function(){
					location.href = 'http://honda.dash.tw/draw.html';
				});
			} else {
				self.location.href = 'http://honda.dash.tw/draw.html';
			}
    	}
    );
}

function hasShared(){
	$.getJSON("https://kevinshu.com/honda/api/has_shared.php",
		{uid: fbInfo.uid},function(data){
			$("#shared-loading").hide();
			if(data.state){
				$.getJSON("https://kevinshu.com/honda/api/has_info.php",
					{uid: fbInfo.uid},function(data){
						if(!data[1]||!data[2]||!data[3]){
							$("#info-form input[name=uid]").val(fbInfo.uid);
							$("#info-form input[name=name]").val(data[1]);
							$("#info-form input[name=phone]").val(data[2]);
							$("#info-form input[name=address]").val(data[3]);
							$("#info-form").show();
						} else {
							$("#shared-msg").show();
						}
				});
			} else {
				$("#share-btn").show();
			}
	});
}