<?php
header("Content-type:text/html;charset=utf-8");
//接受浏览器的数据
	$userPhone = $_GET['userPhone'];
//找数据库
	//连接数据库
	$conn = mysql_connect("localhost:3306","root","root");
	//选择数据库
	mysql_select_db("mytable",$conn);
	//传输数据
	$sqlstr = "select * from sephora where userPhone = '$userPhone';";

	$result = mysql_query($sqlstr,$conn);
	//关闭数据
	mysql_close($conn);
//响应
	$rows = mysql_num_rows($result);
	if($rows=="1"){
		echo "1";//存在的
	}else{
		echo "0";//不存在的
	}
?>