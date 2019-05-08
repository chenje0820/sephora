<?php
header("Content-type:text/html;charset=utf-8");
//接受浏览器的数据
	$userPhone = $_POST["userPhone"];
	$userPass = $_POST["userPass"];

//找数据库
	//连接数据库
	$conn = mysql_connect("localhost:3306","root","root");
	if(!$conn){
		echo "服务器出错";
	}else{
		//选择数据库
		mysql_select_db("myTable",$conn);
		//传输数据
		$sqlstr = "insert into sephora(userPhone,userPass)
				values('$userPhone','$userPass')";

		$result = mysql_query($sqlstr,$conn);
		//关闭数据
		mysql_close($conn);
	//响应
		if($result>0){
			echo "1";//注册成功
		}else{
			echo "0";//注册成功
		}
	}


?>