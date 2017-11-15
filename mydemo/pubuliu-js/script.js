console.log('window.onload start');
window.hArr = []; //为了保存数据，定义为全局变量，功能在waterfall()中有说明
window.onload = function(){
	//初始化变量条件
	//取出main下class为box的元素
	var oParent = document.getElementById('main');
	var oBoxs = document.getElementsByClassName('box');
	//计算整个页面的列数
	var oBoxW = oBoxs[0].offsetWidth;  //因为每个元素的宽都是相等的
	var cols = Math.floor(document.documentElement.clientWidth/oBoxW);
	// 设置main的宽
	oParent.style.cssText = 'width:' + (oBoxW*cols) + 'px;margin:0 auto;';
	//图片数据信息(用对象)
	var dataInt = {
		'data':[
			{'src':'0.jpg'},{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}
		   ,{'src':'5.jpg'},{'src':'6.jpg'},{'src':'7.jpg'},{'src':'8.jpg'},{'src':'9.jpg'}
			],
		'i':0
	}
	//dataInt变量说明: 用一个对象来代替后台传递的数据
	waterfall(oBoxs,cols,0);
	window.onscroll = function(){
		var munBox = oBoxs.length; 
		//munBox变量说明：
		//	更新每次滚动前的.box的容器数量
		//	传给waterfall()后，避免了函数的多次的重复进行相同的运算(可以提高性能)

		//将数据块渲染到当前页面的尾部
		if(checkScrollSlide(oBoxs) && dataInt.i<dataInt.data.length){
			
			//-------------------------------------
			//createElement()函数说明：
			//	功能：创建元素，根据条件添加class，并查入到指定父元素中
			//	参数说明：
			//		elementName:创建的元素名
			//		className:添加的class名，不添加时参数为unclass
			//		parentElement：指定插入的父元素
			//		return：返回一个创建好的元素
			function createElement(elementName,className,parentElement){
				var ele = document.createElement(elementName);
				if(className != 'uncalss'){ele.className = className;}
				parentElement.appendChild(ele);
				return ele;
			}
			var oBox = createElement('div','box',oParent);
			var oPic = createElement('div','pic',oBox);
			var oImg = createElement('img','unclass',oPic);
			oImg.src = 'images/'+dataInt.data[dataInt.i++].src;
			if(dataInt.i==dataInt.data.length){dataInt.i=0;}
			//if语句说明：
			//	检测图片数据,当图片加载完最后一张时,重新从第一张开始加载
			
			//功能：渲染再次加载的新元素
			waterfall(oBoxs,cols,munBox);
		}
		
	}
	console.log('window.onload end');
}
//------------------------------------------
//定位图片插入位置的数组（每列底部高度）
//参数说明：
//	oBoxs:需要排列的元素集合(这个参数必须是动态的，否则会出错) 
//	cols:元素排列的列数
//	startIndex:元素编历的起始位置
//	return:无返回值 
function waterfall(oBoxs,cols,startIndex){      
	console.log('进入waterfall...','startIndex:'+startIndex,'hArr:'+hArr);
	  
	for(var i=startIndex;i<oBoxs.length;i++){
		if(i<cols){
			hArr.push(oBoxs[i].offsetHeight);
			//使用图片的列数cols来定义了hArr数组的大小
			//hArr功能：存储了每列图片的总高度
		}else{
			var minH = Math.min.apply(null,hArr);
			var index = hArr.indexOf(minH);
			oBoxs[i].style.position = 'absolute';
			oBoxs[i].style.top = minH + 'px';
			oBoxs[i].style.left = oBoxs[index].offsetLeft + 'px';
			hArr[index] += oBoxs[i].offsetHeight;
			//else功能:
			//	筛选出每列图片的总高度最小的
			//	取出高度数据，根据高度数据添加新的图片
			//	为新的图片添加相应的定位(position,top,left)参数
			//	更新每列图片新的总高度数据
		}
		console.log('第'+i+'执行waterfall>for,hArr:',hArr);
	}
}
//------------------------------------------------------------
//检测是否具备了加载了数据块的条件
//函数说明：
//	oBoxs: 需要排列元素的集合(这个参数必须是动态的，否则会出错)
//	return: true|false  (具备|不具备加载条件)
function checkScrollSlide(oBoxs){
	var lastBox  = oBoxs[oBoxs.length-1];
	var lastBoxH = Math.floor(lastBox.offsetTop)
				   +Math.floor(lastBox.offsetHeight/1.3);
	//lastBoxH变量说明：自己体会,不说明了
	var scrollTop = document.body.scrollTop 
				    || document.documentElement.scrollTop;
	//scrollTop变量说明：网页被滚上去的高度(网页顶部距离浏览器窗口的距离)
	var height = document.body.clientHeight
					|| document.documentElement.clientHeight;
	//height变量说明：浏览器窗口的高度

	//调试开始
	console.log('lastBoxH:'+lastBoxH);
	console.log('scrollTop:'+scrollTop , 'height:'+height);
	console.log('checkScrollSlide>return:',(lastBoxH<scrollTop+height));
	//调试结束
	return (lastBoxH<scrollTop+height)?true:false;
}
//到此js代码完结,还会更新,有新bug请 @地球心