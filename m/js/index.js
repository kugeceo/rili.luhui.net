var eventDataList = null;   
//var _baseURL = "http://baidu.open.zhwnl.cn";
var _uId="";
$(function(){
	//设置用户名
	/*setUserName();*/
	//初始化日历
	//calander.init();
	//绑定事件
	
	$("#mainCal").touchwipe({//日历左右上下滑动加载
		wipeLeft: function(result) { 
			wipeStatusRight(); 
		},
		wipeRight: function(result) { 
			wipeStatusLeft(); 
		},
		wipeUp: function(result) { 
			wipeStatusUp(); 
		},
		wipeDown: function(result) { 
			wipeStatusDown();
		},
		min_move_x:20,
		min_move_y:20,
		preventDefaultEvents:true
	});
	
	function wipeStatusLeft(span, dir, result){
		prevButtonA();
	}
	
	function wipeStatusRight(span, dir, result){
		nextButtonA();
	}
	
	function wipeStatusUp(span, dir, result){
		prevButtonA();
	}
	
	function wipeStatusDown(span, dir, result){
		nextButtonA();
	}
	
	function nextButtonA(){
		var month = currentDate.getMonth();
		var year = currentDate.getFullYear();
		var real_show_month = madeRiliDate.getMonth();
		month = real_show_month;
		month++;
		if ( month > 11 )
		{
			month = 0;
			year++;
		}
		var currentMonth = real_show_month;
		currentDate = makeCal.addTime(currentDate, 1, "month");
		if ( currentDate.getMonth() != (currentMonth+1)%12 )
		{
			currentDate.setDate(1);
			currentDate.setMonth(currentMonth+1);
		}
		$('#yearValue').text(year);
		$('#monthValue').text(month+1);
		makeCal.nextMonth(currentDate);
	}
	
	function prevButtonA(){
		var month = currentDate.getMonth();
		var year = currentDate.getFullYear();
		var real_show_month = madeRiliDate.getMonth();
		month = real_show_month;
		month--;
		if ( month < 0 )
		{
			month = 11;
			year--;
		}
		var currentMonth = real_show_month;
		currentDate = makeCal.addTime(currentDate, -1, "month");
		if ( currentDate.getMonth() != (currentMonth+11)%12 )
		{
			currentDate.setDate(1);
			currentDate.setMonth((currentMonth+11)%12);
		}
		$('#yearValue').text(year);
		$('#monthValue').text(month+1);
		makeCal.prevMonth(currentDate);
	}
	
	$("#contentDay").touchwipe({//农历、宜忌左右滑动加载
		wipeLeft: function(result) { 
			wipeStatusDayRight(); 
		},
		wipeRight: function(result) { 
			wipeStatusDayLeft(); 
		},
		wipeUp: function(result) { 
			wipeStatusDayUp(); 
		},
		wipeDown: function(result) { 
			wipeStatusDayDown(); 
		},
		min_move_x:20,
		min_move_y:20,
		preventDefaultEvents:true
	});
	
	function wipeStatusDayLeft(span, dir, result){
		prevButtonDay();
	}
	
	function wipeStatusDayRight(span, dir, result){
		nextButtonDay();
	}
	
	function wipeStatusDayUp(span, dir, result){
		prevButtonDay();
	}
	
	function wipeStatusDayDown(span, dir, result){
		nextButtonDay();
	}
	
	function nextButtonDay(){
		var day = currentDate.getDate();
		var month = currentDate.getMonth();
		var year = currentDate.getFullYear();
		var real_show_month = madeRiliDate.getMonth()+1;
		month = real_show_month;
		day++;
		currentDate = makeCal.addTime(currentDate, 1, "day");
		$('#monthDayValue').text(day);
		$('#monthMValue').text(month);
		$('#yearDayValue').text(year);
		makeCal.nextDay(currentDate);
	}
	
	function prevButtonDay(){
		var day = currentDate.getDate();
		var month = currentDate.getMonth();
		var year = currentDate.getFullYear();
		var real_show_month = madeRiliDate.getMonth()+1;
		month = real_show_month;
		day--;
		currentDate = makeCal.addTime(currentDate, -1, "day");
		$('#monthDayValue').text(day);
		$('#monthMValue').text(month);
		$('#yearDayValue').text(year);
		makeCal.nextDay(currentDate);
	}
	
	//设置indexWindow高度
	$("#indexWindow").parent().height($("#indexWindow").parent().height());
	$("#indexWindow").next().css("position","absolute");
	
	//点击'返回按钮'事件
	var back_button_a = document.getElementById('back_button_a');
	back_button_a.addEventListener('touchstart', function(){
		$(this).css('opacity','0.5');
	});
	back_button_a.addEventListener('touchend', function(){
		$(this).css('opacity','1');
		$("#body").show();
		$("#body").css('left',"-100%");
		$("#festivalDayBody").css('left','0');
		$("#body").animate({left:"0"},20);
		$("#festivalDayBody").animate({left:"100%"},20);
		setTimeout("$('#festivalDayBody').hide();",20);
		
		$("#mothDayBody").hide();
		$("#chinaFestivalBody").hide();
		
		currentDate = new Date();
		makeCal.pareData(currentDate);
		showingToday = true;
		//makeCal.makeHuangli(currentDate);
		makeCal.showCal(new Date());
		setYMVforSelect(currentDate);
	}, false);
	
	var back_button_aa = document.getElementById('back_button_aa');
	back_button_aa.addEventListener('touchstart', function(){
		$(this).css('opacity','0.5');
	});
	back_button_aa.addEventListener('touchend', function(){
		$(this).css('opacity','1');
		$("#body").show();
		$("#body").css('left',"-100%");
		$("#chinaFestivalBody").css('left','0');
		$("#body").animate({left:"0"},20);
		$("#chinaFestivalBody").animate({left:"100%"},20);
		setTimeout("$('#chinaFestivalBody').hide();",20);
		
		$("#mothDayBody").hide();
		$("#festivalDayBody").hide();
		
		currentDate = new Date();
		makeCal.pareData(currentDate);
		showingToday = true;
		//makeCal.makeHuangli(currentDate);
		makeCal.showCal(new Date());
		setYMVforSelect(currentDate);
	}, false);
	
	var back_button_day = document.getElementById('back_button_day');
	back_button_day.addEventListener('touchstart', function(){
		$(this).css('opacity','0.5');
	});
	back_button_day.addEventListener('touchend', function(){
		$(this).css('opacity','1');
		$("#body").show();
		$("#mothDayBody").show();
		$("#body").css('left',"-100%");
		$("#mothDayBody").css('left','0');
		$("#body").animate({left:"0"},20);
		$("#mothDayBody").animate({left:"100%"},20);
		setTimeout("$('#mothDayBody').hide();",20);
		
		$('#festivalDayBody').hide();
		$("#chinaFestivalBody").hide();
		
		currentDate = new Date();
		makeCal.pareData(currentDate);
		showingToday = true;
		//makeCal.makeHuangli(currentDate);
		makeCal.showCal(new Date());
		setYMVforSelect(currentDate);
	}, false);
	
	var back_button_china = document.getElementById('back_button_china');
	back_button_china.addEventListener('touchstart', function(){
		$(this).css('opacity','0.5');
	});
	back_button_china.addEventListener('touchend', function(){
		$(this).css('opacity','1');
		$("#chinaFestivalBody").show();
		$("#chinaFestivalBody").css('left',"-100%");
		$("#chinaFestivalMoreBody").css('left','0');
		$("#chinaFestivalBody").animate({left:"0"},20);
		$("#chinaFestivalMoreBody").animate({left:"100%"},20);
		setTimeout("$('#chinaFestivalMoreBody').hide();",20);
		$('#body').hide();
		$("#festivalDayBody").hide();
		
		$(".chinaFestivalMoreBody").find("#qiufen").hide();
		$(".chinaFestivalMoreBody").find("#lichun").hide();
		$(".chinaFestivalMoreBody").find("#yushu").hide();
		$(".chinaFestivalMoreBody").find("#jingzhe").hide();
		$(".chinaFestivalMoreBody").find("#chunfen").hide();
		$(".chinaFestivalMoreBody").find("#qingming").hide();
		$(".chinaFestivalMoreBody").find("#guyu").hide();
		$(".chinaFestivalMoreBody").find("#lixia").hide();
		$(".chinaFestivalMoreBody").find("#xiaoman").hide();
		$(".chinaFestivalMoreBody").find("#mangzhong").hide();
		$(".chinaFestivalMoreBody").find("#xiazhi").hide();
		$(".chinaFestivalMoreBody").find("#xiaoshu").hide();
		$(".chinaFestivalMoreBody").find("#dashu").hide();
		$(".chinaFestivalMoreBody").find("#liqiu").hide();
		$(".chinaFestivalMoreBody").find("#chushu").hide();
		$(".chinaFestivalMoreBody").find("#bailu").hide();
		$(".chinaFestivalMoreBody").find("#qiufen").hide();
		$(".chinaFestivalMoreBody").find("#hanlu").hide();
		$(".chinaFestivalMoreBody").find("#shuangjiang").hide();
		$(".chinaFestivalMoreBody").find("#lidong").hide();
		$(".chinaFestivalMoreBody").find("#xiaoxue").hide();
		$(".chinaFestivalMoreBody").find("#daxue").hide();
		$(".chinaFestivalMoreBody").find("#dongzhi").hide();
		$(".chinaFestivalMoreBody").find("#xiaohan").hide();
		$(".chinaFestivalMoreBody").find("#dahan").hide();
	}, false);
	var length = worktime.years.length;
	var year = worktime.years[length-1];
	var newDate = new Date();
	var thisYear = newDate.getFullYear();
	
	//点击"节日节气"显示节日节气的详细信息
	var lichun = document.getElementById('lichun');
	lichun.addEventListener('touchstart', function(){
		$(this).css("background","#f5f5f5");
	});
	lichun.addEventListener('touchend', function(){
		$(this).css("background","#fff");
		chinaFestivalMoreBodyShow();
		$(".chinaFestivalMoreBody").find("#lichun").show();
		
		if(parseInt(year) == parseInt(thisYear)){
			var lichun = jieqiJson["y"+parseInt(year)];
			$(".contentM #lichun .chianFestival_summary").text(year+"年立春时间是2月"+lichun[2]+"日");
		}
	}, false);
	
	
	var yushu = document.getElementById('yushu');
	yushu.addEventListener('touchstart', function(){
		$(this).css("background","#f5f5f5");
	});
	yushu.addEventListener('touchend', function(){
		$(this).css("background","#fff");
		chinaFestivalMoreBodyShow();
		$(".chinaFestivalMoreBody").find("#yushu").show();
		
		if(parseInt(year) == parseInt(thisYear)){
			var lichun = jieqiJson["y"+parseInt(year)];
			$(".contentM #yushu .chianFestival_summary").text(year+"年雨水时间是2月"+lichun[3]+"日");
		}
	}, false);
	
	var jingzhe = document.getElementById('jingzhe');
	jingzhe.addEventListener('touchstart', function(){
		$(this).css("background","#f5f5f5");
	});
	jingzhe.addEventListener('touchend', function(){
		$(this).css("background","#fff");
		
		chinaFestivalMoreBodyShow();
		
		$(".chinaFestivalMoreBody").find("#jingzhe").show();
		if(parseInt(year) == parseInt(thisYear)){
			var lichun = jieqiJson["y"+parseInt(year)];
			$(".contentM #jingzhe .chianFestival_summary").text(year+"年惊蛰时间是3月"+lichun[4]+"日");
		}
	}, false);
	
	var chunfen = document.getElementById('chunfen');
	chunfen.addEventListener('touchstart', function(){
		$(this).css("background","#f5f5f5");
	});
	chunfen.addEventListener('touchend', function(){
		$(this).css("background","#fff");
		
		chinaFestivalMoreBodyShow();
		
		$(".chinaFestivalMoreBody").find("#chunfen").show();
		if(parseInt(year) == parseInt(thisYear)){
			var lichun = jieqiJson["y"+parseInt(year)];
			$(".contentM #chunfen .chianFestival_summary").text(year+"年春分时间是3月"+lichun[5]+"日");
		}
	}, false);
	
	var qingming = document.getElementById('qingming');
	qingming.addEventListener('touchstart', function(){
		$(this).css("background","#f5f5f5");
	});
	qingming.addEventListener('touchend', function(){
		$(this).css("background","#fff");
		
		chinaFestivalMoreBodyShow();
		
		$(".chinaFestivalMoreBody").find("#qingming").show();
		if(parseInt(year) == parseInt(thisYear)){
			var lichun = jieqiJson["y"+parseInt(year)];
			$(".contentM #qingming .chianFestival_summary").text(year+"年清明时间是4月"+lichun[6]+"日");
		}
	}, false);
	
	var guyu = document.getElementById('guyu');
	guyu.addEventListener('touchstart', function(){
		$(this).css("background","#f5f5f5");
	});
	guyu.addEventListener('touchend', function(){
		$(this).css("background","#fff");
		
		chinaFestivalMoreBodyShow();
		
		$(".chinaFestivalMoreBody").find("#guyu").show();
		if(parseInt(year) == parseInt(thisYear)){
			var lichun = jieqiJson["y"+parseInt(year)];
			$(".contentM #guyu .chianFestival_summary").text(year+"年谷雨时间是4月"+lichun[7]+"日");
		}
	}, false);
	
	var lixia = document.getElementById('lixia');
	lixia.addEventListener('touchstart', function(){
		$(this).css("background","#f5f5f5");
	});
	lixia.addEventListener('touchend', function(){
		$(this).css("background","#fff");
		
		chinaFestivalMoreBodyShow();
		
		$(".chinaFestivalMoreBody").find("#lixia").show();
		if(parseInt(year) == parseInt(thisYear)){
			var lichun = jieqiJson["y"+parseInt(year)];
			$(".contentM #lixia .chianFestival_summary").text(year+"年立夏时间是5月"+lichun[8]+"日");
		}
	}, false);
	
	var xiaoman = document.getElementById('xiaoman');
	xiaoman.addEventListener('touchstart', function(){
		$(this).css("background","#f5f5f5");
	});
	xiaoman.addEventListener('touchend', function(){
		$(this).css("background","#fff");
		
		chinaFestivalMoreBodyShow();
		
		$(".chinaFestivalMoreBody").find("#xiaoman").show();
		if(parseInt(year) == parseInt(thisYear)){
			var lichun = jieqiJson["y"+parseInt(year)];
			$(".contentM #xiaoman .chianFestival_summary").text(year+"年小满时间是5月"+lichun[9]+"日");
		}
	}, false);
	
	var mangzhong = document.getElementById('mangzhong');
	mangzhong.addEventListener('touchstart', function(){
		$(this).css("background","#f5f5f5");
	});
	mangzhong.addEventListener('touchend', function(){
		$(this).css("background","#fff");
		
		chinaFestivalMoreBodyShow();
		
		$(".chinaFestivalMoreBody").find("#mangzhong").show();
		if(parseInt(year) == parseInt(thisYear)){
			var lichun = jieqiJson["y"+parseInt(year)];
			$(".contentM #mangzhong .chianFestival_summary").text(year+"年芒种时间是6月"+lichun[10]+"日");
		}
	}, false);
	
	var xiazhi = document.getElementById('xiazhi');
	xiazhi.addEventListener('touchstart', function(){
		$(this).css("background","#f5f5f5");
	});
	xiazhi.addEventListener('touchend', function(){
		$(this).css("background","#fff");
		
		chinaFestivalMoreBodyShow();
		
		$(".chinaFestivalMoreBody").find("#xiazhi").show();
		if(parseInt(year) == parseInt(thisYear)){
			var lichun = jieqiJson["y"+parseInt(year)];
			$(".contentM #xiazhi .chianFestival_summary").text(year+"年夏至时间是6月"+lichun[11]+"日");
		}
	}, false);
	
	var xiaoshu = document.getElementById('xiaoshu');
	xiaoshu.addEventListener('touchstart', function(){
		$(this).css("background","#f5f5f5");
	});
	xiaoshu.addEventListener('touchend', function(){
		$(this).css("background","#fff");
		
		chinaFestivalMoreBodyShow();
		
		$(".chinaFestivalMoreBody").find("#xiaoshu").show();
		if(parseInt(year) == parseInt(thisYear)){
			var lichun = jieqiJson["y"+parseInt(year)];
			$(".contentM #xiaoshu .chianFestival_summary").text(year+"年小暑时间是7月"+lichun[12]+"日");
		}
	}, false);
	
	var dashu = document.getElementById('dashu');
	dashu.addEventListener('touchstart', function(){
		$(this).css("background","#f5f5f5");
	});
	dashu.addEventListener('touchend', function(){
		$(this).css("background","#fff");
		
		chinaFestivalMoreBodyShow();
		
		$(".chinaFestivalMoreBody").find("#dashu").show();
		if(parseInt(year) == parseInt(thisYear)){
			var lichun = jieqiJson["y"+parseInt(year)];
			$(".contentM #dashu .chianFestival_summary").text(year+"年大暑时间是7月"+lichun[13]+"日");
		}
	}, false);
	
	var liqiu = document.getElementById('liqiu');
	liqiu.addEventListener('touchstart', function(){
		$(this).css("background","#f5f5f5");
	});
	liqiu.addEventListener('touchend', function(){
		$(this).css("background","#fff");
		
		chinaFestivalMoreBodyShow();
		
		$(".chinaFestivalMoreBody").find("#liqiu").show();
		if(parseInt(year) == parseInt(thisYear)){
			var lichun = jieqiJson["y"+parseInt(year)];
			$(".contentM #liqiu .chianFestival_summary").text(year+"年立秋时间是8月"+lichun[14]+"日");
		}
	}, false);
	
	var chushu = document.getElementById('chushu');
	chushu.addEventListener('touchstart', function(){
		$(this).css("background","#f5f5f5");
	});
	chushu.addEventListener('touchend', function(){
		$(this).css("background","#fff");
		
		chinaFestivalMoreBodyShow();
		
		$(".chinaFestivalMoreBody").find("#chushu").show();
		if(parseInt(year) == parseInt(thisYear)){
			var lichun = jieqiJson["y"+parseInt(year)];
			$(".contentM #chushu .chianFestival_summary").text(year+"年处暑时间是8月"+lichun[15]+"日");
		}
	}, false);
	
	var bailu = document.getElementById('bailu');
	bailu.addEventListener('touchstart', function(){
		$(this).css("background","#f5f5f5");
	});
	bailu.addEventListener('touchend', function(){
		$(this).css("background","#fff");
		
		chinaFestivalMoreBodyShow();
		
		$(".chinaFestivalMoreBody").find("#bailu").show();
		if(parseInt(year) == parseInt(thisYear)){
			var lichun = jieqiJson["y"+parseInt(year)];
			$(".contentM #bailu .chianFestival_summary").text(year+"年白露时间是9月"+lichun[16]+"日");
		}
	}, false);
	
	var qiufen = document.getElementById('qiufen');
	qiufen.addEventListener('touchstart', function(){
		$(this).css("background","#f5f5f5");
	});
	qiufen.addEventListener('touchend', function(){
		$(this).css("background","#fff");
		
		chinaFestivalMoreBodyShow();
		
		$(".chinaFestivalMoreBody").find("#qiufen").show();
		if(parseInt(year) == parseInt(thisYear)){
			var lichun = jieqiJson["y"+parseInt(year)];
			$(".contentM #qiufen .chianFestival_summary").text(year+"年秋分时间是9月"+lichun[17]+"日");
		}
	}, false);
	
	var hanlu = document.getElementById('hanlu');
	hanlu.addEventListener('touchstart', function(){
		$(this).css("background","#f5f5f5");
	});
	hanlu.addEventListener('touchend', function(){
		$(this).css("background","#fff");
		
		chinaFestivalMoreBodyShow();
		
		$(".chinaFestivalMoreBody").find("#hanlu").show();
		if(parseInt(year) == parseInt(thisYear)){
			var lichun = jieqiJson["y"+parseInt(year)];
			$(".contentM #hanlu .chianFestival_summary").text(year+"年寒露时间是10月"+lichun[18]+"日");
		}
	}, false);
	
	var shuangjiang = document.getElementById('shuangjiang');
	shuangjiang.addEventListener('touchstart', function(){
		$(this).css("background","#f5f5f5");
	});
	shuangjiang.addEventListener('touchend', function(){
		$(this).css("background","#fff");
		
		chinaFestivalMoreBodyShow();
		
		$(".chinaFestivalMoreBody").find("#shuangjiang").show();
		if(parseInt(year) == parseInt(thisYear)){
			var lichun = jieqiJson["y"+parseInt(year)];
			$(".contentM #shuangjiang .chianFestival_summary").text(year+"年霜降时间是10月"+lichun[19]+"日");
		}
	}, false);
	
	var lidong = document.getElementById('lidong');
	lidong.addEventListener('touchstart', function(){
		$(this).css("background","#f5f5f5");
	});
	lidong.addEventListener('touchend', function(){
		$(this).css("background","#fff");
		
		chinaFestivalMoreBodyShow();
		
		$(".chinaFestivalMoreBody").find("#lidong").show();
		if(parseInt(year) == parseInt(thisYear)){
			var lichun = jieqiJson["y"+parseInt(year)];
			$(".contentM #lidong .chianFestival_summary").text(year+"年立冬时间是11月"+lichun[20]+"日");
		}
	}, false);
	
	var xiaoxue = document.getElementById('xiaoxue');
	xiaoxue.addEventListener('touchstart', function(){
		$(this).css("background","#f5f5f5");
	});
	xiaoxue.addEventListener('touchend', function(){
		$(this).css("background","#fff");
		
		chinaFestivalMoreBodyShow();
		
		$(".chinaFestivalMoreBody").find("#xiaoxue").show();
		if(parseInt(year) == parseInt(thisYear)){
			var lichun = jieqiJson["y"+parseInt(year)];
			$(".contentM #xiaoxue .chianFestival_summary").text(year+"年小雪时间是11月"+lichun[21]+"日");
		}
	}, false);
	
	var daxue = document.getElementById('daxue');
	daxue.addEventListener('touchstart', function(){
		$(this).css("background","#f5f5f5");
	});
	daxue.addEventListener('touchend', function(){
		$(this).css("background","#fff");
		
		chinaFestivalMoreBodyShow();
		
		$(".chinaFestivalMoreBody").find("#daxue").show();
		if(parseInt(year) == parseInt(thisYear)){
			var lichun = jieqiJson["y"+parseInt(year)];
			$(".contentM #daxue .chianFestival_summary").text(year+"年大雪时间是12月"+lichun[22]+"日");
		}
	}, false);
	
	var dongzhi = document.getElementById('dongzhi');
	dongzhi.addEventListener('touchstart', function(){
		$(this).css("background","#f5f5f5");
	});
	dongzhi.addEventListener('touchend', function(){
		$(this).css("background","#fff");
		
		chinaFestivalMoreBodyShow();
		
		$(".chinaFestivalMoreBody").find("#dongzhi").show();
		if(parseInt(year) == parseInt(thisYear)){
			var lichun = jieqiJson["y"+parseInt(year)];
			$(".contentM #dongzhi .chianFestival_summary").text(year+"年冬至时间是12月"+lichun[23]+"日");
		}
	}, false);
	
	var xiaohan = document.getElementById('xiaohan');
	xiaohan.addEventListener('touchstart', function(){
		$(this).css("background","#f5f5f5");
	});
	xiaohan.addEventListener('touchend', function(){
		$(this).css("background","#fff");
		
		chinaFestivalMoreBodyShow();
		
		$(".chinaFestivalMoreBody").find("#xiaohan").show();
		if(parseInt(year) == parseInt(thisYear)){
			var lichun = jieqiJson["y"+parseInt(year)];
			$(".contentM #xiaohan .chianFestival_summary").text(year+"年小寒时间是1月"+lichun[0]+"日");
		}
	}, false);
	
	var dahan = document.getElementById('dahan');
	dahan.addEventListener('touchstart', function(){
		$(this).css("background","#f5f5f5");
	});
	dahan.addEventListener('touchend', function(){
		$(this).css("background","#fff");
		
		chinaFestivalMoreBodyShow();
		
		$(".chinaFestivalMoreBody").find("#dahan").show();
		if(parseInt(year) == parseInt(thisYear)){
			var lichun = jieqiJson["y"+parseInt(year)];
			$(".contentM #dahan .chianFestival_summary").text(year+"年大寒时间是1月"+lichun[1]+"日");
		}
	}, false);
	
	function chinaFestivalMoreBodyShow(){
		$("#chinaFestivalMoreBody").show();
		$("#chinaFestivalMoreBody").css('left',"100%");
		$("#chinaFestivalBody").css('left','0');
		$("#chinaFestivalMoreBody").animate({left:"0"},20);
		$("#chinaFestivalBody").animate({left:"-100%"},20);
		setTimeout("$('#chinaFestivalBody').hide();",20);
		
		$('#body').hide();
		$("#festivalDayBody").hide();
	}
	
	
	/*//点击"日历"里的下一天
	$('#next_button_day').bind('click', function(e){
		var day = currentDate.getDate();
		var month = currentDate.getMonth();
		var year = currentDate.getFullYear();
		var real_show_month = madeRiliDate.getMonth()+1;
		month = real_show_month;
		day++;
		var currentMonth = real_show_month;
		currentDate = makeCal.addTime(currentDate, 1, "day");
		$('#monthDayValue').text(day);
		$('#monthMValue').text(month);
		$('#yearDayValue').text(year);
		makeCal.nextDay(currentDate);
	});
	
	//点击"日历"里的上一天
	$('#prev_button_day').bind('click', function(e){
		var day = currentDate.getDate();
		var month = currentDate.getMonth();
		var year = currentDate.getFullYear();
		var real_show_month = madeRiliDate.getMonth()+1;
		month = real_show_month;
		day--;
		var currentMonth = real_show_month;
		currentDate = makeCal.addTime(currentDate, -1, "day");
		$('#monthDayValue').text(day);
		$('#monthMValue').text(month);
		$('#yearDayValue').text(year);
		makeCal.nextDay(currentDate);
	});*/
	
	var next_button_day = document.getElementById('next_button_day');
	next_button_day.addEventListener('touchstart', function(){
		$(this).css('opacity','0.5');
	});
	next_button_day.addEventListener('touchend', function(){
		$(this).css('opacity','1');
		var day = currentDate.getDate();
		var month = currentDate.getMonth();
		var year = currentDate.getFullYear();
		var real_show_month = madeRiliDate.getMonth()+1;
		month = real_show_month;
		day++;
		var currentMonth = real_show_month;
		currentDate = makeCal.addTime(currentDate, 1, "day");
		$('#monthDayValue').text(day);
		$('#monthMValue').text(month);
		$('#yearDayValue').text(year);
		makeCal.nextDay(currentDate);
	}, false);
	
	//点击"日历"里的上一天
	var prev_button_day = document.getElementById('prev_button_day');
	prev_button_day.addEventListener('touchstart', function(){
		$(this).css('opacity','0.5');
	});
	prev_button_day.addEventListener('touchend', function(){
		$(this).css('opacity','1');
		var day = currentDate.getDate();
		var month = currentDate.getMonth();
		var year = currentDate.getFullYear();
		var real_show_month = madeRiliDate.getMonth()+1;
		month = real_show_month;
		day--;
		var currentMonth = real_show_month;
		currentDate = makeCal.addTime(currentDate, -1, "day");
		$('#monthDayValue').text(day);
		$('#monthMValue').text(month);
		$('#yearDayValue').text(year);
		makeCal.nextDay(currentDate);
	}, false);
	
	//点击"日历"里的当天	
	var today_button_today = document.getElementById('today_button_today');
	today_button_today.addEventListener('touchstart', function(){
		$(this).css('opacity','0.5');
	});
	today_button_today.addEventListener('touchend', function(){
		$(this).css('opacity','1');
		currentDate = new Date();
		makeCal.pareData(currentDate);
		$('#yearDayValue').text(currentDate.getFullYear());
		$('#monthMValue').text(currentDate.getMonth()+1);
		$('#monthDayValue').text(currentDate.getDay());
		showingToday = true;
		makeCal.makeHuangli(currentDate);
		makeCal.showCal(new Date());
	});
	
	
	//点击"节日节气"事件
   var festival_button = document.getElementById('festival_button');
   festival_button.addEventListener('touchstart', function(){
		$(this).css('opacity','0.5');
	});
   festival_button.addEventListener('touchend', function(){
		$(this).css('opacity','1');
		$("#festivalDayBody").show();
		$("#body").css('left','0');
		$("#festivalDayBody").css('left','100%');
		$("#body").animate({left:"-100%"},20);
		$("#festivalDayBody").animate({left:"0"},20);
		setTimeout("$('#body').hide();",20);
		
		$('#mothDayBody').hide();
		$("#chinaFestivalBody").hide();

		$(".festivalDayBody #yuandanFestival .festival_time").text(festival_main2015[0][0]);
		$(".festivalDayBody #chunjieFestival .festival_time").text(festival_main2015[1][0]);
		$(".festivalDayBody #qingmingFestival .festival_time").text(festival_main2015[2][0]);
		$(".festivalDayBody #laodongFestival .festival_time").text(festival_main2015[3][0]);
		$(".festivalDayBody #duanwuFestival .festival_time").text(festival_main2015[4][0]);
		$(".festivalDayBody #kangzhanFestival .festival_time").text(festival_main2015[5][0]);
		$(".festivalDayBody #zhongqiuFestival .festival_time").text(festival_main2015[6][0]);
		$(".festivalDayBody #guoqingFestival .festival_time").text(festival_main2015[7][0]);
	}, false);
	
  var yuandanFestival = document.getElementById('yuandanFestival');
   yuandanFestival.addEventListener('touchstart', function(){
	   $(this).css("background","#f5f5f5");
	});
   yuandanFestival.addEventListener('touchend', function(){
	   $(this).css("background","#fff");
  // $('#yuandanFestival').click(function(){
		var length = festival_main2015[0].length - 1;
		var day = festival_main2015[0][1];
		var month = day.substring(0,2);
		var date = day.substring(2);
		var newDate = new Date();
		var year = newDate.getFullYear();
		var festivalDate = new Date(year,parseInt(month)-1,parseInt(date));
		lodaMonthDate(festivalDate,length);
	//});
	}, false);
	
	//点击"节假日到当天"事件
   var chunjieFestival = document.getElementById('chunjieFestival');
   chunjieFestival.addEventListener('touchstart', function(){
	   $(this).css("background","#f5f5f5");
	});
   chunjieFestival.addEventListener('touchend', function(){
   //$('#chunjieFestival').click(function(){
	    $(this).css("background","#fff");
		var length = festival_main2015[1].length - 1;
		var day = festival_main2015[1][1];
		var month = day.substring(0,2);
		var date = day.substring(2);
		var newDate = new Date();
		var year = newDate.getFullYear();
		var festivalDate = new Date(year,parseInt(month)-1,parseInt(date));
		lodaMonthDate(festivalDate,length);
	}, false);
   //});
	
   var qingmingFestival = document.getElementById('qingmingFestival');
   qingmingFestival.addEventListener('touchstart', function(){
	   $(this).css("background","#f5f5f5");
	});
   qingmingFestival.addEventListener('touchend', function(){
	   $(this).css("background","#fff");
  // $('#qingmingFestival').click(function(){
		var length = festival_main2015[2].length - 1;
		var day = festival_main2015[2][1];
		var month = day.substring(0,2);
		var date = day.substring(2);
		var newDate = new Date();
		var year = newDate.getFullYear();
		var festivalDate = new Date(year,parseInt(month)-1,parseInt(date));
		lodaMonthDate(festivalDate,length);
	}, false);
   //});
	
   var laodongFestival = document.getElementById('laodongFestival');
   laodongFestival.addEventListener('touchstart', function(){
	   $(this).css("background","#f5f5f5");
	});
   laodongFestival.addEventListener('touchend', function(){
	   $(this).css("background","#fff");
  // $('#laodongFestival').click(function(){
		var length = festival_main2015[3].length - 1;
		var day = festival_main2015[3][1];
		var month = day.substring(0,2);
		var date = day.substring(2);
		var newDate = new Date();
		var year = newDate.getFullYear();
		var festivalDate = new Date(year,parseInt(month)-1,parseInt(date));
		lodaMonthDate(festivalDate,length);
	}, false);
   //});
	
   var duanwuFestival = document.getElementById('duanwuFestival');
   duanwuFestival.addEventListener('touchstart', function(){
	   $(this).css("background","#f5f5f5");
	});
   duanwuFestival.addEventListener('touchend', function(){
	   $(this).css("background","#fff");
   //$('#duanwuFestival').click(function(){
		var length = festival_main2015[4].length - 1;
		var day = festival_main2015[4][1];
		var month = day.substring(0,2);
		var date = day.substring(2);
		var newDate = new Date();
		var year = newDate.getFullYear();
		var festivalDate = new Date(year,parseInt(month)-1,parseInt(date));
		lodaMonthDate(festivalDate,length);
    }, false);
   //});
	
   var kangzhanFestival = document.getElementById('kangzhanFestival');
   kangzhanFestival.addEventListener('touchstart', function(){
	   $(this).css("background","#f5f5f5");
	});
   kangzhanFestival.addEventListener('touchend', function(){
	   $(this).css("background","#fff");
   //$('#zhongqiuFestival').click(function(){
		var length = festival_main2015[5].length - 1;
		var day = festival_main2015[5][1];
		var month = day.substring(0,2);
		var date = day.substring(2);
		var newDate = new Date();
		var year = newDate.getFullYear();
		var festivalDate = new Date(year,parseInt(month)-1,parseInt(date));
		lodaMonthDate(festivalDate,length);
   }, false);
  // });
   
   var zhongqiuFestival = document.getElementById('zhongqiuFestival');
   zhongqiuFestival.addEventListener('touchstart', function(){
	   $(this).css("background","#f5f5f5");
	});
   zhongqiuFestival.addEventListener('touchend', function(){
	   $(this).css("background","#fff");
   //$('#zhongqiuFestival').click(function(){
		var length = festival_main2015[6].length - 1;
		var day = festival_main2015[6][1];
		var month = day.substring(0,2);
		var date = day.substring(2);
		var newDate = new Date();
		var year = newDate.getFullYear();
		var festivalDate = new Date(year,parseInt(month)-1,parseInt(date));
		lodaMonthDate(festivalDate,length);
   }, false);
  // });
	
   var guoqingFestival = document.getElementById('guoqingFestival');
   guoqingFestival.addEventListener('touchstart', function(){
	   $(this).css("background","#f5f5f5");
	});
   guoqingFestival.addEventListener('touchend', function(){
	   $(this).css("background","#fff");
   //$('#guoqingFestival').click(function(){
		var length = festival_main2015[7].length - 1;
		var day = festival_main2015[7][1];
		var month = day.substring(0,2);
		var date = day.substring(2);
		var newDate = new Date();
		var year = newDate.getFullYear();
		var festivalDate = new Date(year,parseInt(month)-1,parseInt(date));
		lodaMonthDate(festivalDate,length);
	}, false);
   //});
	
	//点击"农历节气与节日放假"事件
   var chinaFestival_button = document.getElementById('chinaFestival_button');
   chinaFestival_button.addEventListener('touchstart', function(){
		$(this).css('opacity','0.5');
	});
   chinaFestival_button.addEventListener('touchend', function(){
	    var _this = $(this);
	    _this.css('opacity','1');
		if(_this.hasClass('festuvalOn')){
			return;
		}
	   chinaFestivalBodyShow();
	}, false);
	
   var festivaHoliday_button = document.getElementById('festivaHoliday_button');
   festivaHoliday_button.addEventListener('touchstart', function(){
		$(this).css('opacity','0.5');
	});
   festivaHoliday_button.addEventListener('touchend', function(){
		$(this).css('opacity','1');
	   festivalDayBodyShow();
	}, false);
	
   var chinaFestival_button1 = document.getElementById('chinaFestival_button1');
   chinaFestival_button1.addEventListener('touchstart', function(){
		$(this).css('opacity','0.5');
	});
   chinaFestival_button1.addEventListener('touchend', function(){
		$(this).css('opacity','1');
	   chinaFestivalBodyShow();
	}, false);
	
   var festivaHoliday_button1 = document.getElementById('festivaHoliday_button1');
   festivaHoliday_button1.addEventListener('touchstart', function(){
		$(this).css('opacity','0.5');
	});
   festivaHoliday_button1.addEventListener('touchend', function(){
	    var _this = $(this);
	    _this.css('opacity','1');
		if(_this.hasClass('festuvalOn')){
			return;
		}
	   festivalDayBodyShow();
	}, false);
   
   function festivalDayBodyShow(){
	   $("#festivalDayBody").show();
		$("#festivalDayBody").css('left','100%');
		$("#chinaFestivalBody").css('left','0');
		$("#chinaFestivalBody").animate({left:"-100%"},20);
		$("#festivalDayBody").animate({left:"0"},20);
		setTimeout("$('#chinaFestivalBody').hide();",20);
   }
   
   function chinaFestivalBodyShow(){
	   $("#chinaFestivalBody").show();
		$("#chinaFestivalBody").css('left','100%');
		$("#festivalDayBody").css('left','0');
		$("#festivalDayBody").animate({left:"-100%"},20);
		$("#chinaFestivalBody").animate({left:"0"},20);
		setTimeout("$('#festivalDayBody').hide();",20);
		
		$('#mothDayBody').hide();
		$("#body").hide();
   }
	
	//鼠标移到左下方的logo事件
	$("#zhwnllogo").hover(function(){
		$(".jp-popover").remove();
		var _this=$(this);
		var $popvsWarp = $("<div class='jp-popover logoEWMImgPopver'></div>");
		$popvsWarp.append("<div class='logoEWMImgWarp'><img class='logoEWMImg' src='img/logoEWMImg.png'/></div>\
							<div class='blankarrow-down' style='top:94px;*top:92px;'>\
						   	<div class='arrow_dk'></div>\
						   	<div class='arrow_lt'></div></div>");
		$("body").append($popvsWarp);
		var offset = $(this).offset();
		if($.browser.msie&&parseInt($.browser.version)<=7){
			$popvsWarp.css({"top":offset.top-$popvsWarp.height()-10,"left":offset.left+14,"display":"block"});
		}else{
			$popvsWarp.css({"top":offset.top-$popvsWarp.height()-8,"left":offset.left+14,"display":"block"});
		}
		
		$popvsWarp.hover(function(){
			$popvsWarp.show();
		},function(){
			$popvsWarp.hide();
		});
	},function(){
		$(".jp-popover").hide();
	});
});

function lodaMonthDate(date,int){
	makeCal.pareData(date);
	makeCal.showCal(date);
	showingToday = false;
	//var nndate = jp_makeCal.getMonthFirst(zhongqiuDate);
	
	$("#body").show();
	$("#festivalDayBody").show();
	$("#body").css('left','100%');
	$("#festivalDayBody").css('left','0');
	$("#festivalDayBody").animate({left:"-100%"},20);
	$("#body").animate({left:"0"},20);
	setTimeout("$('#festivalDayBody').hide();",20);
	$("#mothDayBody").hide();
	$("#chinaFestivalBody").hide();
	
	/*$(".festivalDayBody").hide();
	$(".body").show();*/
	$(".body #yearValue").text(date.getFullYear());
	$(".body #monthValue").text(date.getMonth()+1);
	$(".body .block .number").addClass("numbernone");
	$(".body .block .number").removeClass("number");
	//var dateMessage = $(".body .block .block_content");
	var monthDay = date.format("MMdd");
	$("a[data=" + monthDay + "]").find(".numbernone").css("color","#444");
	var x = 0;
	for (x;x<int-1;x++){
		date = makeCal.addTime(date, 1, "day");
		monthDay = date.format("MMdd"); 
		$("a[data=" + monthDay + "]").find(".numbernone").css("color","#444");
	}
	var todayDay = currentDate.format("MMdd");
	$("a[data=" + todayDay + "]").find(".numbernone").css("color","#fff");
	//$("td[class='today']").find(".numbernone").css("color","#fff");
}

function setYMVforSelect(currentTime){
	//var yearMonth = currentTime.getFullYear()+"年"+(currentTime.getMonth()+1)+"月"；
	$("#yearValue").text(currentTime.getFullYear());
	$("#monthValue").text(currentTime.getMonth()+1);
}

function closeartDig(id){
	art.dialog.list[id].close();
}