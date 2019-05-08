/* 当页面打开的时候显示的遮罩层和蒙版 */
setTimeout(function() {
	let Top = document.documentElement.scrollHeight || document.body.scrollHeight;
	let srcDom = document.createElement("div")
	srcDom.style.cssText =
		`
							width:100%;
							height:${Top}px;
							background-color:rgba(50,50,50,0.6);
							z-index:100;
							position:absolute;
							left:0;
							top:0;
		
		`
	document.body.appendChild(srcDom);
	let imgDom = document.createElement("div");
	let aDom = document.createElement("a");
	aDom.href = "#"
	aDom.style.cssText =
		`
								display:block;
								width:520px;
								height:320px;
								z-index:101;
								background:url(img/hp_popup_20190505.jpg);
								position:fixed;
								left:50%;
								top:50%;
								margin-left:-260px;
								margin-top:-160px;
			`
	imgDom.style.cssText = `
							width:520px;
							height:320px;
		`;
	aDom.appendChild(imgDom);
	srcDom.appendChild(aDom);

	let delBtn = document.createElement("div")
	delBtn.style.cssText =
		`
							width:30px;
							height:30px;
							z-index:102;
							position:absolute;
							right:6px;
							top:6px;
							`;
	aDom.appendChild(delBtn);
	delBtn.onclick = function() {
		document.body.removeChild(srcDom);
	}
}, 1000)

 /* header部分 */
 
 // $(".header_box").load("common.html >.header_content");
//划过显示我的订单
 $1(".my_sephora")[0].onmouseover = function() {
	$1(".direct_top")[0].style.backgroundPosition = "-2px -10px";
	$1(".my_order")[0].style.display = "block";
	$1(".my_order")[0].onmouseover = function() {
		this.style.backgroundColor = "#d5d5d5";
	}
}
$1(".my_sephora")[0].onmouseout = function() {
	$1(".direct_top")[0].style.backgroundPosition = "-2px -16px";
	$1(".my_order")[0].style.display = "none";
}

/* search部分 */

//1.input框中placehoder值的变化
let titArr = ['请输入您需要的关键词', '春季补水小心机', '口碑女士香氛', '出街元气彩妆', '轻薄防晒精选'];
let index = 1;
$1(".input_nav_info")[0].placeholder = titArr[0];
let myTimer = setInterval(function() {
	$1(".input_nav_info")[0].placeholder = titArr[index];
	index++;
	if (index > titArr.length - 1) {
		index = 1;
	}
}, 1500);

//2. 动态创建历史浏览中的商品
let liDoms = $1(".history_info_content")[0].children;
for (let i = 0; i < liDoms.length; i++) {
	htmlStr1 =
		`<div class="product_img">
					<a href="#"><img src="img/search_h_1.jpg" alt=""></a>
				</div>
				<div class="product_brand">
					<span>LANEIGE</span>
				</div>
				<div class="product_direction">
					<a href="">兰芝水衡清盈精华水保湿乳惠选套装</a>
				</div>
			<div class="product_price">￥0</div>
		`;
	liDoms[i].innerHTML = htmlStr1;
}
// 3.input框的点击和鼠标离开事件 
$1(".input_nav_info")[0].onclick = function() {
	$1(".input_nav_info")[0].placeholder = " ";
	$1(".search_main_info")[0].style.display = "block";
	$1(".search_main_info")[0].style.zIndex = 10;
}
$1(".input_nav_info")[0].onfocus = function() {
	$1(".input_nav_info")[0].placeholder = " ";
	clearInterval(myTimer);
}
$1(".search_main_info")[0].onmouseleave = function() {
	$1(".search_main_info")[0].style.display = "none";
}

// nav部分 (jquery)
// 1.引入侧边栏的二级菜单
$(".menu_box").load("aside.html >.allshop_intem_menu_box");
//2.划过一级菜单的时候border阴影变化的效果
let oneDoms = $1(".one_stage_li");
for (let i = 0; i < oneDoms.length; i++) {
	oneDoms[i].style.cssText = `
			box-shadow:rgba(0,0,0,.2) 0 0 5px 0;
		`;
	oneDoms[i + 1].style.cssText = `
			box-shadow:rgba(0,0,0,.2) 0 0 5px 0;
		`;
}




//3.全部商品锚点链接
//问题：页面会跳到顶部
$(".all_grands_label")[0].onmouseover = function() {
	$(".all_grands")[0].style.display = "block";
}
$(".all_grands")[0].onmouseleave = function() {
	$(".all_grands")[0].style.display = "none";
}

//banner部分
//轮播图 
let a = new BannerPic({
	"boxDom": $1(".banner")[0], //轮播图的容器
	"imgs": ["img/b1.jpg", "img/b2.jpg", "img/b3.jpg", "img/b4.jpg", "img/b5.jpg"],
	"douIsCircle": false, //是否是圆的
	"doudouDirection": "下",
	"douWidth": 100,
	"douHeight": 5,
	"direPrevLeft": 240,
	"ulDomLeft": "35%",
	"timeSpace": 2000,
});

//grand部分 
// 轮播图部分
// 小轮播图
let b = new BannerPic({
	"boxDom": $1(".grand_info_left")[0], //轮播图的容器
	"imgs": ["img/g1.jpg", "img/g2.jpg"],
	"douIsCircle": false, //是否是圆的
	"doudouDirection": "下",
	"douWidth": 100,
	"douHeight": 5,
	"direPrevLeft": 0,
	"ulDomLeft": "35%",
	"timeSpace": 2000,
});
// 右边品牌和遮罩层部分 
let grands = $1(".per_grand_info");
for (let i = 0; i < grands.length; i++) {
	grandStr =
		`<a href="#"><img src="img/gI1.png" alt=""></a>
					<ul class="grand_info_mask">
						<li class="mask_box">
							<p>丝芙兰</p>
							<a href="#">点击查看</a>
						</li>
					</ul>`;
	grands[i].innerHTML = grandStr;
}

// 精品推荐
let productDom = $1(".product_c");
for (let i = 0; i < productDom.length; i++) {
	moveCartoon(productDom[i], 0, 10, 20);
}
// <!-- 护肤品类 -->
//护肤品中的动画效果
function moveCartoon(dom1, startValue, endValue, timeLong) {
	let step = startValue;
	let time = null;
	dom1.style.right = step + "px";
	dom1.onmouseover = function() {
		clearInterval(time);
		time = setInterval(() => {
			step++;
			this.style.right = step + "px";
			if (step >= endValue) {
				step = endValue;
				clearInterval(time);
			}
		}, timeLong)
	}
	dom1.onmouseout = function() {
		clearInterval(time);
		time = setInterval(() => {
			step--;
			this.style.right = step + "px";
			if (step <= startValue) {
				clearInterval(time);
				step = startValue;
			}
		}, timeLong)
	}

}
let boxDoms = $1(".category_content_right_img")
for (let j = 0; j < boxDoms.length; j++) {
	moveCartoon(boxDoms[j], -5, 10, 20);
}

//猜你喜欢部分
let likeDom = $1(".for_like_content_info");
// console.log(likeDom.length)
for (let i = 0; i < likeDom.length; i++) {
	likeStr =
		`
			<div class="for_like_content_img"><a href="#"><img src="img/for_like_1_280x280.jpg" alt=""></a></div>
			<div class="for_like_content_grand">SHISEIDO</div>
			<a href="#" class="for_like_content_dire">安热沙水能户外防晒乳惠选套装</a>
			<div class="for_like_content_price">￥298.00</div>`;
	likeDom[i].innerHTML = likeStr;
}

//左侧导航栏的楼层效果
//第一步:
var floorArr = [];
$(".category").each(function() {
	let everyTop = $(this).offset().top; //每个div距离页面顶部的距离。
	floorArr.push(everyTop);
})
console.log(floorArr);

window.onscroll = function() {
	let t = document.documentElement.scrollTop || document.body.scrollTop;
	let search_scroll = $1(".search_scroll")[0];
	//左侧栏的定位
	let Left1 = $1(".search_scroll_box")[0].offsetLeft - 60;
	$1(".left_aisde_nav")[0].style.cssText =
		`
				position:fixed;
				left:${Left1}px;
				top:100px;
				z-index:10;
			`;
	//右侧栏的定位
	let Right1 = $1(".search_scroll_box")[0].offsetLeft + 1210;
	$1(".right_aside_nav")[0].style.cssText =
		`
				position:fixed;
				left:${Right1}px;
				top:255px;
				z-index:10;
			`;

	//当t>800的时候，让头部显示
	if (t > 800) {
		search_scroll.style.cssText =
			`
				left:0;
				top:0;
				z-index:10;
				box-shadow:10px 0 10px rgba(0,0,0,.5);
			`;
		$1(".my_shoppcar")[0].style.display = "none";
		$1(".search_infoIntem")[0].style.display = "none";
	} else {
		search_scroll.style.cssText = "static";
	}
	//t>1200的时候，左侧导航栏出现
	if (t > 1200) {
		$(".left_aisde_nav")[0].style.display = "block";
	} else {
		$(".left_aisde_nav")[0].style.display = "static";

	}
	//t>1600的时候，右侧边栏出现
	if (t > 1600) {
		$(".right_aside_nav")[0].style.display = "block";
	} else {
		$(".right_aside_nav")[0].style.display = "static";

	}
	$1(".back_top")[0].onclick = function() {
		document.body.scrollTop = document.documentElement.scrollTop = 0;
	}


	//左侧导航栏的楼层效果
	/* 第二步 */
	scrollMove();
	
}
function scrollMove() {
	//滚动条滚动的距离
	var scrollTop = $(window).scrollTop() + 100;
	var index = 0;
	for (var i = 0; i < floorArr.length-1; i++) {
		var now = floorArr[i]; //当前楼层距离顶部的距离
		var next = floorArr[i + 1]; //下一楼层距离顶部的距离。
		if (scrollTop >= now && scrollTop < next) {
			index = i;
		} else if (scrollTop >= floorArr[floorArr.length - 1]) {
			index = floorArr.length-1;
		}
	}
	//3. 根据楼层索引，去改变楼层导航的样式
	// $(".left_aisde_nav li").eq(index).addClass("active").siblings("li").removeClass("active")
}

/* 第三步 */
//4. 给楼层导航绑定点击事件。
	$(".left_aisde_nav li").click(function() {
		 //取消滚动监听
		$(window).off("scroll");
		$(this).addClass("active").siblings("li").removeClass("active");
		//获得点击li的索引。
		var idx = $(this).index();
		//根据索引获取楼层顶部距离
		var sTop = floorArr[idx]-120;
		
		document.body.scrollTop = document.documentElement.scrollTop = sTop
// 		$(document.body).animate({
// 		    scrollTop:sTop
// 		},500,function(){    //回调函数，因为取消了监听事件，所以在点击完之后，在次调用监听事件。
// 			console.log(sTop)
// 		    $(window).on("scroll",scrollMove)
// 		})
	})

function $1(str) {
	if (str.charAt(0) == "#") {
		return document.getElementById(str.substring(1));
	} else if (str.charAt(0) == ".") {
		return document.getElementsByClassName(str.substring(1));
	} else {
		return document.getElementsByTagName(str);
	}
}
