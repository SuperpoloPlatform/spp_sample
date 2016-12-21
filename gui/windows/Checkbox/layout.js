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
	name : "checkbox.layout",
	method : {
	checkboxsetvalue1 : function () {		
        var windowname = GUI.Combobox.Get("Demo7/Window2/Combobox");	
	    var propertyname = windowname.GetProperty("Text");
	    var main = GUI.Checkbox.Get("Demo/Window1/Checkbox");	
        var window2 = GUI.Checkbox.Get("Demo/Window1/checkbox2");
        var state1 = this.GetProperty("Selected");	
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
	    var main = GUI.Checkbox.Get("Demo/Window1/Checkbox");	
        var window1 = GUI.Checkbox.Get("Demo/Window1/checkbox1");
        var state2 = this.GetProperty("Selected");	
		if(state2 == "True")
		{
        window1.SetProperty("Selected",false);		
	    main.SetProperty(propertyname,"True");
	    var a = main.GetProperty(propertyname);          
		alert("set property "+propertyname+":True");
		}
		},	 					 		
	 setVisible : function () {
		var windowname = GUI.Combobox.Get("Demo7/Window2/Combobox");
			var frame2 = GUI.FrameWindow.Get("Demo7/Window2/FramewWindow2");
			frame2.SetProperty("Visible",false);                    //先把设置属性窗口隐藏				    
	var propertyname = windowname.GetProperty("Text");		//获取edit的text值，用来修改相应的控件属性		
			var associatedWindow = windowname.associatedWindow;             //获取associatedWindow属性
			var a = GUI.FrameWindow.Get(associatedWindow[propertyname]);    //利用associatedWindow属性，获取与text对应的属性设置窗口
			a.SetProperty("Visible",true);                                  //设置该属性设置窗口可见
	}
			},
	window : {	
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
		"Demo7/Window2/Combobox" :
		{
			property:{
				"init" :function(obj,propt_name){
						var item1 = new GUI.ListboxTextItem("Selected",0);
						obj.AddItem(item1);
				},		
		 "associatedWindow" : function(obj,propt_name){	
			    obj[propt_name]=[];    //数组obj[propt_name]为空
				    obj[propt_name]["Selected"]=["Demo7/Window2/FramewWindow2"];			//对数组obj[propt_name]	进行初始化	
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



