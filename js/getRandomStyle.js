//产生四位随机验证码

function  randomCode(n){
	let arr = [];
	let str ="";
	//1将数字,字母全部push进数组中
	for(var i =0;i<=9;i++){
		arr.push(i);
	}
	for(var i = 65;i <= 90;i++){
		arr.push(String.fromCharCode(i));
	}     
	for(var i = 97;i <= 122;i++){
		arr.push(String.fromCharCode(i));
	}
	//2.随机产生4位验证码
	for(var i=0;i<n;i++){
		let index =parseInt(Math.random()*arr.length);
		str += arr[index];
	}
	return str;
}


//产生随机的颜色
function getColor(){
	var str ="#";
	for(var i =0;i<6;i++){	
		let num = parseInt(Math.random()*16);
		str += num.toString(16);	
	}
	return str;
}