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
		name : "progressbar.layout",
		method : {						
	    setVisible : function () {
		        var windowname = GUI.Combobox.Get("Demo/Window2/Combobox");				    
                var propertyname = windowname.GetProperty("Text");		//获取edit的text值，用来修改相应的控件属性		
                alert("Value must be float between 0 and 1");
				var associatedWindow = windowname.associatedWindow;              //获取associatedWindow属性
				var a = GUI.FrameWindow.Get(associatedWindow[propertyname]);    //利用associatedWindow属性，获取与text对应的属性设置窗口
				a.SetProperty("Visible",true);                                  //设置该属性设置窗口可见
	        },			
		editboxsetvalue: function() {       
			        var windowname = GUI.Combobox.Get("Demo/Window2/Combobox");
                    var propertyname = windowname.GetProperty("Text");
		            var window = GUI.Editbox.Get("Demo/Window2/FrameWindow3/Editbox");
                    var propertyvalue = window.GetProperty("Text");					
                    var main = GUI.ProgressBar.Get("Demo/Window1/progressbar");		
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
					        var item1 = new GUI.ListboxTextItem("CurrentProgress",0);
							var item2 = new GUI.ListboxTextItem("StepSize",1);					
							var c1 = new Math3.Color4(0.0, 255.0, 255.0, 1.0);
							item1.SetTextColours(c1);
							item2.SetTextColours(c1);							
							obj.AddItem(item1);
							obj.AddItem(item2);							
					},		
			 "associatedWindow" : function(obj,propt_name){	
			            obj[propt_name]=[];    //数组obj[propt_name]为空
					    obj[propt_name]["CurrentProgress"]=["Demo/Window2/FrameWindow3"];			//对数组obj[propt_name]	进行初始化	
					    obj[propt_name]["StepSize"]=["Demo/Window2/FrameWindow3"];			//对数组obj[propt_name]	进行初始化	
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



