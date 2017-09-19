<?php

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

// if (!$user) {
//     $loginUrl = $facebook->getLoginUrl(array(
//     'scope' => $scope,
//     'redirect_uri' => "http://honda.dash.tw/draw.html",
//     ));

//     print('<script> top.location.href=\'' . $loginUrl . '\'</script>');
// } else {
$link = new mysqli('203.124.112.184','hondaaccord','Honda@1234','hondaaccord');
if (!$link){
    echo mysql_errno() ."<br>";
    echo mysql_error() ."<br>";
    echo "資料庫連結失敗，請洽管理員" ; 
}

$sql = 	"update member set `name`='".mysqli_real_escape_string($link, $_POST["name"]).
		"' , `phone`='".mysqli_real_escape_string($link, $_POST["phone"]).
		"' , `address`='".mysqli_real_escape_string($link, $_POST["address"]).
		"' where `uid` = '".mysqli_real_escape_string($link, $_POST["uid"])."';";
$result = $link->query($sql) ;
// if ($result == true) {
// 	echo '{"state":"ok"}';
// } else {
// 	echo '{"state":"false"}';
// }
// echo $sql;
mysqli_close($link);
// }
print('<script> top.location.href="https://kevinshu.com/honda/draw.html"</script>');

?>