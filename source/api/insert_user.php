<?php 

session_start();

if($_SERVER['REQUEST_METHOD']=='POST') {

	require '../fb-php-sdk/facebook.php';

	$app_id = '249524198523497';
	$app_secret = '1dc229753dc0e38779aa8befb31c47ef';
	$app_namespace = 'honda_promotion_dev';
	$app_url = 'https://apps.facebook.com/' . $app_namespace . '/';
	$scope = 'user_photos,publish_stream,user_likes';

	// Init the Facebook SDK
	$facebook = new Facebook(array(
	     'appId'  => $app_id,
	     'secret' => $app_secret,
	));

	$user = $facebook->getUser();

	// If the user has not installed the app, redirect them to the Login Dialog
	if (!$user) {
	    $loginUrl = $facebook->getLoginUrl(array(
	    'scope' => $scope,
	    'redirect_uri' => "http://honda.dash.tw/api/insert_user.php",
	    ));

	    print('<script> top.location.href=\'' . $loginUrl . '\'</script>');
	} else {
		$link = new mysqli('203.124.112.184','hondaaccord','Honda@1234','hondaaccord');
		if (!$link){
		    echo mysql_errno() ."<br>";
		    echo mysql_error() ."<br>";
		    echo "資料庫連結失敗，請洽管理員" ; 
		}

		$sql = "INSERT INTO `hondaaccord`.`member` (`uid` ,`name` ,`email` ,`created_at`)"."VALUES ('".$user."', NULL , NULL , '".date('Y/m/d')."');";
		$result = $link->query($sql) ;
		if ($result==1) {
			$_SESSION["has_shared"]=true;
		}
		mysqli_close($link);

		print('<script> location.href="https://kevinshu.com/honda/draw.html"</script>');
	}
}
?>