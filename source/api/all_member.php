<?php

$link = new mysqli('203.124.112.184','hondaaccord','Honda@1234','hondaaccord');
if (!$link){
    echo mysql_errno() ."<br>";
    echo mysql_error() ."<br>";
    echo "資料庫連結失敗，請洽管理員" ; 
}

$sql = "select * from member 
		where name is not null
		and phone is not null
		and address is not null;";
$result = $link->query($sql) ;
$myArray = array();
if ($result) {
    $tempArray = array();
    while($row = $result->fetch_object()) {
        $tempArray = $row;
        array_push($myArray, $tempArray);
    }
    echo json_encode($myArray);
} else {
	echo '{"state":"false"}';
}
mysqli_close($link);

?>