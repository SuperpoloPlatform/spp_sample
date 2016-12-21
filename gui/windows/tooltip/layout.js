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
		name : "tooltip.layout",
		method : {
 	     setVisible : function () {
		        var windowname = GUI.Combobox.Get("Demo/Window2/Combobox");
                var propertyname = windowname.GetProperty("Text");		//获取edit的text值，用来修改相应的控件属性		
                var a = GUI.FrameWindow.Get("Demo/Window2/FrameWindow3");
				a.SetProperty("Visible",true);                                  //设置该属性设置窗口可见
	        },			
		editboxsetvalue: function()
			{       
			        var windowname = GUI.Combobox.Get("Demo/Window2/Combobox");
                    var propertyname = windowname.GetProperty("Text");
		            var window = GUI.Editbox.Get("Demo/Window2/FrameWindow3/Editbox");
                    var propertyvalue = window.GetProperty("Text");					
                    var main = GUI.Tooltip.Get("Window1/EditBox__auto_tooltip__");		
                    main.SetProperty(propertyname,propertyvalue);					
		            var a =main.GetProperty(propertyname);
					alert(""+propertyname+""+a+"");
            }   		
				},
		window : {	
			"Demo/Window2/FrameWindow3/OKButton" :
		    {
				property:{},
				event :{ 
					"Clicked" : "editboxsetvalue"
				},
				subscribe:{}
		    },		
		 "Demo/Window2/Combobox" :
			{
				property:{
					"init" :function(obj,propt_name){
							var item1 = new GUI.ListboxTextItem("FadeTime",0);
							var item2 = new GUI.ListboxTextItem("DisplayTime",1);
							var item3 = new GUI.ListboxTextItem("HoverTime",2);
							var c1 = new Math3.Color4(0.0, 255.0, 255.0, 1.0);
							item1.SetTextColours(c1);
							item2.SetTextColours(c1);
							item3.SetTextColours(c1);
							obj.AddItem(item1);
							obj.AddItem(item2);
							obj.AddItem(item3);
					}			
				},
				event :{ 
				},
				subscribe:{}
			},			   
			"Demo/Window2/Combobox__auto_editbox__" :
			{
			 property:{},  
			 event:{"TextChanged" :"setVisible"},
			 subscribe:{}
		 }			
		}
	}
} catch( e )
{
	alert( e );
}



