<?php
header("Content-type:text/html;charset=utf-8");
//1获取浏览的数据
	$userPhone = $_POST["userPhone"];
	$userPass = $_POST["userPass"];

//2.找数据库
	//2.1连接数据库
	$con = mysql_connect("localhost:3306","root","root");
	if(!$con){
		echo "服务器出错";

	}else{
		//2.2选择数据库
		mysql_select_db("mytable",$con);
		//2.3传输数据
		$sqlstr = "select * from sephora where userPhone = '$userPhone' and userPass = '$userPass'";

		$result = mysql_query($sqlstr,$con);
		//3.关闭数据库s
		mysql_close($con);

		$rows = mysql_num_rows($result);
		//4.响应
		if($rows == 1){
			echo "1";//登录成功
		}else{
			echo "0";//登录失败
		}
	}