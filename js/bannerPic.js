
//轮播图
class BannerPic{
	constructor(obj){
		let defaultObj = {
			"boxDom":null,//轮播图的容器
			"imgDoms":[],//存放所有图片dom的数组(img标签)
			"width":"100%",
			"height":"658px",
			"imgs":[],
			//豆豆
			"douWidth":10,//
			"douHeight":2,
			"douSpace" : 10,//豆豆的间距
			"douColor" : "rgba(0,0,0,.1)",//豆豆的颜色
			"douHighColor":"white",//高亮颜色
			"douIsCircle":true,//是否是圆的
			"doudouDirection":"上",//"上"，"右"，"下"，"左"，
			
			//箭头盒子
			"direDom":null,
			"direDomHeight":100,
			
			//箭头方向
			"direPrevLeft":0,
			
			"currIndex":0,//当前显示的图片序号
			"myTimer":null,
			"timeSpace":1000,
			"direPrev":null,
			"direNext":null,
			"ulDom":null,
			
			"ulDomLeft":"50%",
		};

		//属性
		for(let key in defaultObj){
			if(obj[key]==undefined){
				this[key] = defaultObj[key];
			}else{
				this[key] = obj[key];
			}
		}

		this.width = this.boxDom.offsetWidth;
		this.height = this.boxDom.offsetHeight;
		
		this.initUI();
		this.createUI();
		this.addEvent();
		this.autoPlay();
	}

	initUI(){
		this.boxDom.style.position = "relative";
		this.boxDom.style.overflow = "hidden";
	}

	createUI(){
		//1、创建所有的img标签
		for(let i=0;i<this.imgs.length;i++){
			let imgDom = document.createElement("img");	
					
			imgDom.src = this.imgs[i];
			imgDom.style.cssText = `position: absolute;
					left:${this.width}px;
					top:0px;
					width: 100%;
					height: 100%;`;
			if(i==0){
				imgDom.style.left = "0px";
			}
			this.boxDom.appendChild(imgDom);
			this.imgDoms.push(imgDom);

		}
		
		//2、创建UL（豆豆的容器）
		this.ulDom = document.createElement("ul");
		this.ulDom.className ="ulBox";
		this.ulDom.style.cssText=`position: absolute;
					list-style: none;				
					z-index: 3;
					left:${this.ulDomLeft};//传进去的值,变量
					// transform:translate(-50%)`;
		switch(this.doudouDirection){
			case "上":
						this.ulDom.style.top="10px";
				
						break;
			case "下":
						this.ulDom.style.bottom="10px";
						
						break;
		}
		this.boxDom.appendChild(this.ulDom);
		
		//2-2、创建li（豆豆）
		for(let i=0;i<this.imgs.length;i++){
			let liDom = document.createElement("li");
			liDom.setAttribute("index",i);
			liDom.style.cssText =`
					float:left;
					width:${this.douWidth}px;
					height: ${this.douHeight}px;
					margin-right: ${this.douSpace}px;
					background-color: ${this.douColor};
				`;
			if(this.douIsCircle){
				liDom.style.borderRadius = "50%";
			}else{
				liDom.style.borderRadius = "0";
			}
			if(i==0){
				liDom.style.backgroundColor = this.douHighColor;
			}
			this.ulDom.appendChild(liDom);
		}
		//3.创建方向的盒子
		this.direDom = document.createElement("div");
		this.direDom.className = "direBox";
		this.direDom.style.cssText=`position: absolute;
					z-index: 4;
					top:${this.boxDom.offsetHeight/2-this.direDomHeight/2}px;
					width:${this.width}px;
					height:${this.direDomHeight}px;
					display:none;
					`;
		this.boxDom.appendChild(this.direDom);
		//3-1 创建左右方向
		this.direPrev = document.createElement("div");
		this.direNext = document.createElement("div");
		let direPreSpan = document.createElement("span");
		let direNextSpan = document.createElement("span");
		this.direPrev.style.cssText=`position: absolute;
					z-index: 5;
					left:${this.direPrevLeft}px;
					width:40px;
					height:100px;
					background-color:rgba(170,170,170,.7);
					text-align:center;
					line-height:115px;
					`;
		direPreSpan.style.cssText = `
					display:inline-block;
					z-index:7;
					width:16px;
					height:30px;
					background:url(img/hero_splite_arrow.png) 0 0px;
		`;
		this.direNext.style.cssText=`position:absolute;
					right:0;	
					z-index:5;
					width:40px;
					height:100px;
					background-color:rgba(170,170,170,.7);
					text-align:center;
					line-height:115px;
					`;
		direNextSpan.style.cssText = `
					display:inline-block;
					z-index:7;
					width:16px;
					height:30px;
					background:url(img/hero_splite_arrow.png) 0 15px;
				
		`;			
		this.direDom.appendChild(this.direPrev);
		this.direPrev.appendChild(direPreSpan);
		this.direDom.appendChild(this.direNext);
		this.direNext.appendChild(direNextSpan);
		this.oo(this.imgs,this.direPrev,this.direNext,this.currIndex);
	}
	addEvent(){
		//2、停止播放（给box绑定事件）
		this.boxDom.onmouseenter = ()=>{
			this.direDom.style.display = "block";
			this.stopPlay();
		}

		//3、继续播放（给box绑定事件）
		this.boxDom.onmouseleave = ()=> {
			this.autoPlay();
			this.direDom.style.display = "none";
		}
		//4、跳转(给li)
		let liDoms = $1(".ulBox")[0].children;
		for(let i=0;i<liDoms.length;i++){
			let obj = this;
			liDoms[i].onclick = function(){
				obj.goImg(this.getAttribute("index"));
			}
		}	
	}
	autoPlay(){
			this.myTimer = setInterval(()=>{
				//一、数据处理
				//1、改变数据
				let outIndex = this.currIndex;
				this.currIndex++;

				//2、边界处理
				if( this.currIndex>this.imgs.length-1){
					 this.currIndex=0;
				}

				//二、改变外观
				 this.showImg(this.currIndex,outIndex);

			},this.timeSpace);

	}

	stopPlay(){
		window.clearInterval(this.myTimer);
	}

	goImg(index){
		//一、数据处理
		//1、改变数据
		let outIndex = this.currIndex;
		this.currIndex = index;
		
		//2、边界处理
		if(this.currIndex<0 || this.currIndex>this.imgs.length-1){
			this.currIndex = 0;
		}

		//二、改变外观
		this.showImg(this.currIndex,outIndex);
	}

	//显示指定的图片//参数：//进入的图片的下标//出去的图片的下标
	showImg(inIndex,outIndex){
		if(inIndex==outIndex){
			return;
		}

		if(inIndex<0 || inIndex>this.imgs.length-1){
			return;
		}

		if(outIndex<0 || outIndex>this.imgs.length-1){
			return;
		}

		this.imgDoms[inIndex].style.left = this.width+"px";
		//1、改图片
		slideInOut(this.imgDoms[inIndex],this.imgDoms[outIndex],200);

		//2、改豆豆		
		//1）、让所有的li的background-color是pink
		// let liDoms = $1(".ulBox")[0].children;
		let liDoms = this.boxDom.children[this.imgs.length].children;
		for(let i=0;i<liDoms.length;i++){
			liDoms[i].style.backgroundColor = this.douColor;		
		}
		//2）设置当前li的background-color
		liDoms[inIndex].style.backgroundColor = this.douHighColor;
	}
	//箭头方向改变图片
	oo(imgArr,btu1,btu2,currIndex){
		let outIndex = 0;
		btu2.onclick = ()=>{
			currIndex++;
			outIndex = currIndex-1;
			if(currIndex>imgArr.length-1){
				currIndex = 0;
			}
			slideInOut(this.imgDoms[currIndex],this.imgDoms[outIndex],200);
			for(let i=0;i<this.ulDom.children.length;i++){
				this.ulDom.children[i].style.background = "rgba(0, 0, 0, 0.1)";

			}
				this.ulDom.children[currIndex].style.background = "white";
		}
		btu1.onclick = ()=>{
			currIndex--;
			outIndex = currIndex+1;
			if(currIndex<0){
				currIndex = imgArr.length-1;
			}
			slideInOut(this.imgDoms[currIndex],this.imgDoms[outIndex],200);
			for(let i=0;i<this.ulDom.children.length;i++){
				this.ulDom.children[i].style.background = "rgba(0, 0, 0, 0.1)";
			}
			this.ulDom.children[currIndex].style.background = "white";			
		}
	}
}

function $1(str){
	if(str.charAt(0)=="#"){
		return document.getElementById(str.substring(1));
	}else if(str.charAt(0)=="."){
		return document.getElementsByClassName(str.substring(1));
	}else{
		return document.getElementsByTagName(str);
	}
}	