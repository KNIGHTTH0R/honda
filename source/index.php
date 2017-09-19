<?php
    require './fb-php-sdk/facebook.php';

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

// Get the current user
$user = $facebook->getUser();

// If the user has not installed the app, redirect them to the Login Dialog
if (!$user) {
    $loginUrl = $facebook->getLoginUrl(array(
    'scope' => $scope,
    'redirect_uri' => $app_url,
    ));

    print('<script> top.location.href=\'' . $loginUrl . '\'</script>');
} else {
	print('<script> location.href=\'./app.html\'</script>');
}
?>