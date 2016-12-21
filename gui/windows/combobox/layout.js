/**************************************************************************
 *
 *  This file is part of the UGE(Uniform Game Engine).
 *  Copyright (C) by SanPolo Co.Ltd. 
 *  All rights reserved.
 *
 *  See http://uge.spolo.org/ for more information.
 *
 *  SanPolo Co.Ltd
 *  http://uge.spolo.org/  sales@spolo.org uge-support@spolo.org
 *
**************************************************************************/
try {
	LAYOUTDATA = {
		name : "zoom.layout",
		method : {
 		checkboxsetvalue1 : function () {		
		            var windowname = GUI.Combobox.Get("Demo7/Window2/Combobox");	
					var propertyname = windowname.GetProperty("Text");
                    var main = GUI.Combobox.Get("Demo7/Window1/Combobox");	
                    var state1 = this.GetProperty("Selected");
                    var window2 = GUI.Checkbox.Get("Demo/Window1/checkbox2");		
                    if(state1 == "True")
					{					
					window2.SetProperty("Selected",false);
                    main.SetProperty(propertyname,"True");
                    var a = main.GetProperty(propertyname);          
					alert("set property "+propertyname+":True");
					}
					},
 		checkboxsetvalue2 : function () {		
		            var windowname = GUI.Combobox.Get("Demo7/Window2/Combobox");
                    var propertyname = windowname.GetProperty("Text");					
                    var main = GUI.Combobox.Get("Demo7/Window1/Combobox");	
                    var state2 = this.GetProperty("Selected");
                    var window1 = GUI.Checkbox.Get("Demo/Window1/checkbox1");
                    if(state2 == "True")
                    {
					window1.SetProperty("Selected",false);
                    main.SetProperty(propertyname,"False");
                    var a = main.GetProperty(propertyname);
					alert("set property "+propertyname+":False");
					}
					},		 					 	
        resetdroplist :function(){
                    var MaxEditTextLength = this.GetProperty("MaxEditTextLength");
					var SortList = this.GetProperty("SortList");
					var CaratIndex = this.GetProperty("CaratIndex");
					var ReadOnly = this.GetProperty("ReadOnly");
					var SingleClickMode = this.GetProperty("SingleClickMode");
					var ForceHorzScrollbar = this.GetProperty("ForceHorzScrollbar");
					var ForceVertScrollbar = this.GetProperty("ForceVertScrollbar");
					var EditSelectionStart = this.GetProperty("EditSelectionStart");
					var EditSelectionLength = this.GetProperty("EditSelectionLength");
					var main = GUI.Combobox.Get("Demo7/Window1/Combobox");
					main.ResetList();
					this.update(MaxEditTextLength,SortList,CaratIndex,ReadOnly,SingleClickMode,ForceHorzScrollbar,ForceVertScrollbar,EditSelectionStart,EditSelectionLength);
					},	
		 setVisible : function () {
		        var windowname = GUI.Combobox.Get("Demo7/Window2/Combobox");
				var frame2 = GUI.FrameWindow.Get("Demo7/Window2/FramewWindow2");
				var frame3 = GUI.FrameWindow.Get("Demo7/Window2/FramewWindow3");
				frame2.SetProperty("Visible",false);                    //先把设置属性窗口隐藏
				frame3.SetProperty("Visible",false);				    //先把设置属性窗口隐藏
                var propertyname = windowname.GetProperty("Text");		//获取edit的text值，用来修改相应的控件属性		
				var associatedWindow = windowname.associatedWindow;              //获取associatedWindow属性
				var a = GUI.FrameWindow.Get(associatedWindow[propertyname]);    //利用associatedWindow属性，获取与text对应的属性设置窗口
				a.SetProperty("Visible",true);                                  //设置该属性设置窗口可见
	        },
			
		editboxsetvalue: function()
			{       
			        var windowname = GUI.Combobox.Get("Demo7/Window2/Combobox");
                    var propertyname = windowname.GetProperty("Text");
		            var window = GUI.Editbox.Get("Demo7/Window2/FramewWindow3/Editbox");
                    var propertyvalue = window.GetProperty("Text");					
                    var main = GUI.Combobox.Get("Demo7/Window1/Combobox");				
                    main.SetProperty(propertyname,propertyvalue);					
		            var a =main.GetProperty(propertyname);
					alert(""+propertyname+""+a+"");
            }     				
				},
		window : {	
			"Demo7/Window2/FramewWindow3/OKButton" :
		    {
				property:{},
				event :{ 
					"Clicked" : "editboxsetvalue"
				},
				subscribe:{}
		    },	
	     "Demo/Window1/checkbox1" :
		    {
				property:{},
				event :{ 
					"CheckStateChanged" : "checkboxsetvalue1"
				},
				subscribe:{}
		    },
	     "Demo/Window1/checkbox2" :
		    {
				property:{},
				event :{ 
					"CheckStateChanged" : "checkboxsetvalue2"
				},
				subscribe:{}
		    },			
			"Demo7/Window1/Combobox" :
			{
				property:{
					"update" : function(obj,propt_name){
						obj[propt_name] = function(MaxEditTextLength,SortList,CaratIndex,ReadOnly,SingleClickMode,ForceHorzScrollbar,ForceVertScrollbar,EditSelectionStart,EditSelectionLength){
						
							var item1 = new GUI.ListboxTextItem("MaxEditTextLength : "+MaxEditTextLength+"",0);
							var item2 = new GUI.ListboxTextItem("SortList : "+SortList+"",1);
							var item3 = new GUI.ListboxTextItem("CaratIndex : "+CaratIndex+"",2);
							var item4 = new GUI.ListboxTextItem("ReadOnly : "+ReadOnly+"",3);
							var item5 = new GUI.ListboxTextItem("SingleClickMode : "+SingleClickMode+"",4);
							var item6 = new GUI.ListboxTextItem("ForceHorzScrollbar : "+ForceHorzScrollbar+"",5);
							var item7 = new GUI.ListboxTextItem("ForceVertScrollbar : "+ForceVertScrollbar+"",6);
							var item8 = new GUI.ListboxTextItem("EditSelectionStart : "+EditSelectionStart+"",7);
							var item9 = new GUI.ListboxTextItem("EditSelectionLength : "+EditSelectionLength+"",8);
							var c1 = new Math3.Color4(0.0, 255.0, 255.0, 1.0);
							item1.SetTextColours(c1);
							item2.SetTextColours(c1);
							item3.SetTextColours(c1);
							item4.SetTextColours(c1);
							item5.SetTextColours(c1);
							item6.SetTextColours(c1);
							item7.SetTextColours(c1);
							item8.SetTextColours(c1);
							item9.SetTextColours(c1);
							obj.AddItem(item1);
							obj.AddItem(item2);
							obj.AddItem(item3);
							obj.AddItem(item4);
							obj.AddItem(item5);
							obj.AddItem(item6);
							obj.AddItem(item7);
							obj.AddItem(item8);
							obj.AddItem(item9);
						}
					},
					"init" : function(obj,propt_name){
						var MaxEditTextLength = obj.GetProperty("MaxEditTextLength");
						var SortList = obj.GetProperty("SortList");
						var CaratIndex = obj.GetProperty("CaratIndex");
						var ReadOnly = obj.GetProperty("ReadOnly");
						var SingleClickMode = obj.GetProperty("SingleClickMode");
						var ForceHorzScrollbar = obj.GetProperty("ForceHorzScrollbar");
						var ForceVertScrollbar = obj.GetProperty("ForceVertScrollbar");
						var EditSelectionStart = obj.GetProperty("EditSelectionStart");
						var EditSelectionLength = obj.GetProperty("EditSelectionLength");
						obj.update(MaxEditTextLength,SortList,CaratIndex,ReadOnly,SingleClickMode,ForceHorzScrollbar,ForceVertScrollbar,EditSelectionStart,EditSelectionLength);},				
				},
				event :{ 
					"DropListDisplayed" : "resetdroplist"
				},
				subscribe:{}
		    },
			"Demo7/Window2/Combobox" :
			{
				property:{
					"init" :function(obj,propt_name){
							var item1 = new GUI.ListboxTextItem("MaxEditTextLength",0);
							var item2 = new GUI.ListboxTextItem("SortList",1);
							var item3 = new GUI.ListboxTextItem("CaratIndex",2);
							var item4 = new GUI.ListboxTextItem("ReadOnly",3);
							var item5 = new GUI.ListboxTextItem("SingleClickMode",4);
							var item6 = new GUI.ListboxTextItem("ForceHorzScrollbar",5);
							var item7 = new GUI.ListboxTextItem("ForceVertScrollbar",6);
							var item8 = new GUI.ListboxTextItem("EditSelectionStart",7);
							var item9 = new GUI.ListboxTextItem("EditSelectionLength",8);
							var c1 = new Math3.Color4(0.0, 255.0, 255.0, 1.0);
							item1.SetTextColours(c1);
							item2.SetTextColours(c1);
							item3.SetTextColours(c1);
							item4.SetTextColours(c1);
							item5.SetTextColours(c1);
							item6.SetTextColours(c1);
							item7.SetTextColours(c1);
							item8.SetTextColours(c1);
							item9.SetTextColours(c1);
							obj.AddItem(item1);
							obj.AddItem(item2);
							obj.AddItem(item3);
							obj.AddItem(item4);
							obj.AddItem(item5);
							obj.AddItem(item6);
							obj.AddItem(item7);
							obj.AddItem(item8);
							obj.AddItem(item9);
					},
		
			 "associatedWindow" : function(obj,propt_name){	
			            obj[propt_name]=[];    //数组obj[propt_name]为空
					    obj[propt_name]["MaxEditTextLength"]=["Demo7/Window2/FramewWindow3"];			//对数组obj[propt_name]	进行初始化	
						obj[propt_name]["SortList"]=["Demo7/Window2/FramewWindow2"];
						obj[propt_name]["CaratIndex"]=["Demo7/Window2/FramewWindow3"];
						obj[propt_name]["ReadOnly"]=["Demo7/Window2/FramewWindow2"];
						obj[propt_name]["SingleClickMode"]=["Demo7/Window2/FramewWindow2"];
						obj[propt_name]["ForceHorzScrollbar"]=["Demo7/Window2/FramewWindow2"];
						obj[propt_name]["ForceVertScrollbar"]=["Demo7/Window2/FramewWindow2"];
						obj[propt_name]["EditSelectionStart"]=["Demo7/Window2/FramewWindow3"];
						obj[propt_name]["EditSelectionLength"]=["Demo7/Window2/FramewWindow3"];
					  }
					  
					
				},
				event :{ 
				},
				subscribe:{}
			},
			"Demo7/Window2/Combobox__auto_editbox__" :
			{
			 property:{	
					},  
			 event:{"TextChanged" :"setVisible"},
			 subscribe:{}
			 }
			
		}	
	};
} catch( e )
{
	alert( e );
}



