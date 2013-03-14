
/*
 * 在ie7中有问题，放在 form中会崩溃
 * 无法限定日期，有待进一步修正
 * */
var _ESONCalendar = window.ESONCalendar = {
		hasFoot:false,
		weeks:"日一二三四五六",
		months:"一,二,三,四,五,六,七,八,九,十,十一,十二",
		start:2013,
		end:2020,
		color:{caption:"#A4B9D7",border:"#C0D0E8",tablebg:"#F6F6F6",selectedbg:"#FF9900",foot_co:"#003366",selectedco:"#ffffff"},
		dateBox:[],
		splitChar:"-",
		splitChar2:":",
		hotInput:null,
		initli:false,
		init:function(){return this.addStyle().addUI().hide();},
		uanv_tool_CE:function(type,id,parent,className,HTML){var obj=document.createElement(type.toUpperCase());id&&(obj.id=id);className&&(obj.className=className);HTML&&(obj.innerHTML=HTML);parent||(parent=document.body);return parent.appendChild(obj);},uanv_tool_getWeek:function(date,i){var tmp=new Date(date);tmp.setDate(i);return tmp.getDay();},uanv_tool_isIn:function(o,parent){while(o!=parent&&o!=document.body){o=o.parentNode};return o!=document.body;},onselect:function(d){this.hotInput&&(this.hotInput.value=d.y+this.splitChar+d.m+this.splitChar+d.d),this.hide()},addStyle:function(){var cssText="#ESONCalendar_Win{background:" + this.color.caption + ";position:absolute;z-index:9999}";cssText+="#ESONCalendar_caption{padding:3px;background:" + this.color.caption + ";overflow:hidden;}";cssText+=".clear{clear:both}";cssText+="#selMonth{margin-right:5px;width:80px}";cssText+="#selYear{margin-right:3px;}";cssText+="#ESONCalendar_table{background:" + this.color.tablebg + ";border-collapse:collapse;border:1px solid " + this.color.border + "}";cssText+="#ESONCalendar_table th{border:1px " + this.color.border + " solid}";cssText+="#ESONCalendar_week{background:" + this.color.border + "}";cssText+="#ESONCalendar_week th{font-size:12px;width:18px;height:18px;}";cssText+="#dateBox{font:normal 12px /120% 'arial';}";cssText+="#dateBox th{font-weight:normal}";cssText+="#dateBox .unselected{cursor:pointer;background:" + this.color.tablebg + ";}";cssText+="#dateBox .sunday{cursor:pointer;background:" + this.color.tablebg + ";color:red}";cssText+="#dateBox .current,#dateBox .selected{cursor:pointer;background:" + this.color.selectedbg + ";color:" + this.color.selectedco + "}";cssText+="#ESONCalendar_foot{padding:2px 0 2px 0;line-height:130%;text-align:center;font-size:11px;color:" + this.color.foot_co + ";background:" + this.color.border + "}";cssText+="#ESONCalendar_Win iframe{position:absolute;z-index:-1;top:0;left:0}";var STYLE=document.createElement('style');STYLE.setAttribute("type","text/css");STYLE.styleSheet&&(STYLE.styleSheet.cssText=cssText)||STYLE.appendChild(document.createTextNode(cssText));document.getElementsByTagName('head')[0].appendChild(STYLE);return this;},addUI:function(){if(this.initli){return;}
		this.Win=this.uanv_tool_CE("DIV","ESONCalendar_Win");KillSelectIframe=this.uanv_tool_CE("IFRAME",false,this.Win);
		var _caption=this.uanv_tool_CE("DIV","ESONCalendar_caption",this.Win);
		var selMonth=this.uanv_tool_CE("SELECT","selMonth",_caption);
		var selYear=this.uanv_tool_CE("SELECT","selYear",_caption);
		this.selMonth=selMonth;
		this.selYear=selYear;
		selMonth.onchange=selYear.onchange=function(){ESONCalendar.dateUp(new Date(selYear.value,selMonth.value,ESONCalendar.d))};for(var i=0;i<12;i++){var tmp=new Option(this.months.split(",")[i]+"月",i);selMonth.options.add(tmp); 			};for(var i=this.start;i<this.end;i++){var tmp=new Option(i,i);selYear.options.add(tmp);};this.uanv_tool_CE("DIV",false,_caption,"clear");var table=this.uanv_tool_CE("TABLE","ESONCalendar_table",this.Win);var tbody=this.uanv_tool_CE("TBODY",false,table);var tr=this.uanv_tool_CE("TR","ESONCalendar_week",tbody);for(var i=0;i<7;i++){var th=this.uanv_tool_CE("TH",false,tr,false,new String(this.weeks).charAt(i));}tbody=this.uanv_tool_CE("TBODY","dateBox",table);for(var i=0;i<6;i++){tr=this.uanv_tool_CE("TR",false,tbody);for(var j=0;j<7;j++){var thisBox=this.uanv_tool_CE("TH",false,tr,false,"&nbsp;");this.dateBox[i*7 + j]=thisBox;}};if(this.hasFoot){this.foot=this.uanv_tool_CE("DIV","ESONCalendar_foot",this.Win,false,this.footText);this.foot.innerHTML="UANV_日历 版权作者所有";}KillSelectIframe.frameBorder=0;KillSelectIframe.width=this.Win.offsetWidth;KillSelectIframe.height=this.Win.offsetHeight;document.onclick=document.body.onclick=function(e){e||(e=window.event);var src=e.target||e.srcElement;var tmp=src.nodeName.toUpperCase();if(tmp=="HTML"||tmp=="BODY"){return ESONCalendar.hide();}if(src==ESONCalendar.hotInput||ESONCalendar.uanv_tool_isIn(src,ESONCalendar.Win)){return;}ESONCalendar.hide();};this.initli=true;return this;},dateUp:function(date,first){var space=this.uanv_tool_getWeek(date,1);var m2d=31,index=1;this.y=date.getFullYear(),this.m=date.getMonth()+1,this.d=date.getDate();this.h=date.getHours();this.mi=date.getMinutes();this.s=date.getSeconds();this.selMonth.options[this.m-1].selected="selected";this.selYear.options[this.y-this.start].selected="selected";var isRN=(this.y%4==0&&this.y%4!=100||this.y%100==0&&this.y%400==0);if(/-4|-6|-9|-11/.test("-"+this.m)){m2d=30};if(this.m==2){m2d=isRN?29:28};for(var i=0;i<42;i++){var _this=this.dateBox[i];_this.isSunday=_this.className=_this.isInMonth=_this.onmouseover=_this.onmouseout=_this.onclick=null;if(i<space||i>(m2d+space-1)){_this.uanv_tool_isInMonth=false;_this.innerHTML="&nbsp;";continue};_this.innerHTML=index++;_this.className="unselected";_this.isInMonth=true;var week=this.uanv_tool_getWeek(date,_this.innerHTML);if(week==0||week==6){_this.className="sunday";_this.isSunday=true;}if(first&&(index-1)==this.d){_this.className="selected";}_this.onmouseover=function(){if(this.className!="selected")this.className="current"};_this.onmouseout=function(){if(this.className!="selected")this.className=this.isSunday?"sunday":"unselected"};_this.onclick=function(){var allD=ESONCalendar.dateBox;for(var i=0;i<allD.length;i++){var _for=allD[i];_for.className="";if(_for.isInMonth){_for.className="unselected";}if(_for.isSunday){_for.className="sunday";}};this.className="selected";ESONCalendar.d=this.innerHTML;ESONCalendar.onselect({y:ESONCalendar.y,m:ESONCalendar.m,d:this.innerHTML,h:ESONCalendar.h,mi:ESONCalendar.mi,s:ESONCalendar.s});};};return this;},
		showTo:function(obj){
			var oldObj=obj;
			for(var pos={x:0,y:0};obj;obj=obj.offsetParent){
				pos.x+=obj.offsetLeft;
				pos.y+=obj.offsetTop
			};
			this.Win.style.left=pos.x+"px";
			this.Win.style.top=(pos.y+2+oldObj.offsetHeight)+"px";
			this.Win.style.display="";
			return this;
		},
		bind:function(input){
				if(!this.initli){this.init();
			}
			"string"==typeof(input)&&(input=document.getElementById(input));
			if(!input.type||input.type.toUpperCase()!="TEXT"){return this;}
			input.onfocus=function(){
				var dates=this.value.split(ESONCalendar.splitChar);
				var bindD=this.value.length>0 ? new Date(dates[0],dates[1]-1,dates[2]) : new Date();
				ESONCalendar.dateUp(bindD,true);
				ESONCalendar.showTo(ESONCalendar.hotInput=this);};
				return this;
			},
		hide:function(){this.Win.style.display="none";return this},
		setInfo:function(v){this.foot.innerHTML=v;return this}};