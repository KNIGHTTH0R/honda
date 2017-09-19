<?php

$link = new mysqli('203.124.112.184','hondaaccord','Honda@1234','hondaaccord');
if (!$link){
    echo mysql_errno() ."<br>";
    echo mysql_error() ."<br>";
    echo "資料庫連結失敗，請洽管理員" ; 
}

$sql = "select * from member where `uid` = '".mysqli_real_escape_string($link, $_GET["uid"])."';";
$result = $link->query($sql) ;
if ($result->num_rows == 1) {
	$row = $result->fetch_row();
	echo json_encode($row);
	// if ($row[1]!=null && $row[2]!=null && $row[3]!=null) {
	// 	json_encode
	// }
	// echo '{"state":"true"}';
} else {
	echo '{"state":"false"}';
}
mysqli_close($link);

?>