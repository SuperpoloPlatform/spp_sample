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
		name : "ItemListBox.layout",
		method : {
     	 checkboxsetvalue1 : function () {		
		            var windowname = GUI.Combobox.Get("Demo/Window2/Combobox");	
					var propertyname = windowname.GetProperty("Text");
                    var main = GUI.ItemListbox.Get("Demo/Window1/Itemlistbox");
					var window2 = GUI.Checkbox.Get("Demo/Window2/FrameWindow2/checkbox2");
                    var state = this.GetProperty("Selected");		
                    if(state == "True") 
					{
					window2.SetProperty("Selected",false);					
                    main.SetProperty(propertyname,"True");
                    var a = main.GetProperty(propertyname);          
					alert("set property "+propertyname+":True");
					}
					},
 		checkboxsetvalue2 : function () {		
		            var windowname = GUI.Combobox.Get("Demo/Window2/Combobox");
                    var propertyname = windowname.GetProperty("Text");					
                    var main = GUI.ItemListbox.Get("Demo/Window1/ItemListBox");	
					var window1 = GUI.Checkbox.Get("Demo/Window2/FrameWindow2/checkbox1");
                    var state2 = this.GetProperty("Selected");
					if(state2 == "True")
					{
                    window1.SetProperty("Selected",false);				
                    main.SetProperty(propertyname,"False");
                    var a = main.GetProperty(propertyname);
					alert("set property "+propertyname+":False");
					}
					},	
	    setVisible : function () {
		        var windowname = GUI.Combobox.Get("Demo/Window2/Combobox");
                var propertyname = windowname.GetProperty("Text");		//获取edit的text值，用来修改相应的控件属性		
				var associatedWindow = windowname.associatedWindow;              //获取associatedWindow属性
				var a = GUI.FrameWindow.Get(associatedWindow[propertyname]);    //利用associatedWindow属性，获取与text对应的属性设置窗口
				a.SetProperty("Visible",true);                                  //设置该属性设置窗口可见
	        }
		},
		window : {
	     "Demo/Window2/FrameWindow2/checkbox1" :
		    {
				property:{},
				event :{ 
					"CheckStateChanged" : "checkboxsetvalue1"
				},
				subscribe:{}
		    },
	     "Demo/Window2/FrameWindow2/checkbox2" :
		    {
				property:{},
				event :{ 
					"CheckStateChanged" : "checkboxsetvalue2"
				},
				subscribe:{}
		    },
			"Demo/Window2/Combobox" :
			{
				property:{
					"init" :function(obj,propt_name){
							var item1 = new GUI.ListboxTextItem("MultiSelect",0);
							var c1 = new Math3.Color4(0.0, 255.0, 255.0, 1.0);
							item1.SetTextColours(c1);
							obj.AddItem(item1);

					},
               "associatedWindow" : function(obj,propt_name){	
			            obj[propt_name]=[];    //数组obj[propt_name]为空
					    obj[propt_name]["MultiSelect"]=["Demo/Window2/FrameWindow2"];						
					
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
		},
		"Demo/Window1/Itemlistbox" :
		{
			 property:{
			     "init":function(obj,propt_name){
				      var item1 = GUI.Windows.CreateWindow("Demo/ItemEntry","item1");
				      var item2 = GUI.Windows.CreateWindow("Demo/ItemEntry","item2");
				      var item3 = GUI.Windows.CreateWindow("Demo/ItemEntry","item3");
					 obj.AddItem(item1);
					 obj.AddItem(item2);
					 obj.AddItem(item3);
                                                 }					 
			 },  
			 event:{"TextChanged" :"setVisible"},
			 subscribe:{}			
		}
		
	}
}	
} catch( e )
{
	alert( e );
}