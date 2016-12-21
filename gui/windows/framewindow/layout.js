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
		name : "framewindow.layout",
		method : {
 		checkboxsetvalue1 : function () {		
		            var windowname = GUI.Combobox.Get("Demo/Window2/Combobox");	
					var propertyname = windowname.GetProperty("Text");
                    var main = GUI.FrameWindow.Get("Demo/Window1/FrameWindow");
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
                    var main = GUI.FrameWindow.Get("Demo/Window1/FrameWindow");	
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
        setimagevalue : function(){
		            var windowname = GUI.Combobox.Get("Demo/Window2/Combobox");
					var propertyname = windowname.GetProperty("Text");
                    var droplist1 = GUI.Combobox.Get("Demo/Window2/FrameWindow1/Combobox1");					
                    var droplist2 = GUI.Combobox.Get("Demo/Window2/FrameWindow1/Combobox2");
                    var imagesetname = droplist1.GetProperty("Text");       //获取imageset的名称
                    var imagename = droplist2.GetProperty("Text");          //获取image的名称
                    var window = GUI.FrameWindow.Get("Demo/Window1/FrameWindow");
                    window.SetProperty(propertyname,"set:ice image:"+imagename+"");  //对DragCursorImage属性进行设置
					alert("DragCursorImage : "+imagename+" ");
                   },					
	    setVisible : function () {
		        var windowname = GUI.Combobox.Get("Demo/Window2/Combobox");
				var frame1 = GUI.FrameWindow.Get("Demo/Window2/FrameWindow1");
				var frame2 = GUI.FrameWindow.Get("Demo/Window2/FrameWindow2");
				var frame3 = GUI.FrameWindow.Get("Demo/Window2/FrameWindow3");
				frame1.SetProperty("Visible",false);                      //先把设置属性窗口隐藏
				frame2.SetProperty("Visible",false);                    
				frame3.SetProperty("Visible",false);				    
                var propertyname = windowname.GetProperty("Text");		//获取edit的text值，用来修改相应的控件属性		
				if(propertyname=="DragAlpha"){alert("DragAlpha value must be float between 0 and 1")}
				var associatedWindow = windowname.associatedWindow;              //获取associatedWindow属性
				var a = GUI.FrameWindow.Get(associatedWindow[propertyname]);    //利用associatedWindow属性，获取与text对应的属性设置窗口
				a.SetProperty("Visible",true);                                  //设置该属性设置窗口可见
	        },			
		editboxsetvalue: function() {       
			        var windowname = GUI.Combobox.Get("Demo/Window2/Combobox");
                    var propertyname = windowname.GetProperty("Text");
		            var window = GUI.Editbox.Get("Demo/Window2/FrameWindow3/Editbox");
                    var propertyvalue = window.GetProperty("Text");					
                    var main = GUI.FrameWindow.Get("Demo/Window1/FrameWindow");		
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
         "Demo/Window2/FrameWindow1/Combobox1" :
             {
                property:{
                    "init" :function(obj,propt_name){
                            var item1 = new GUI.ListboxTextItem("ice",0);
                            var c1 = new Math3.Color4(0.0,255.0,255.0,1.0);
                            item1.SetTextColours(c1);
                            obj.AddItem(item1);
							}
							},
				event :  {},
				subscribe : {}
				},
		 "Demo/Window2/FrameWindow1/Combobox2" :
		 {
		        property:{
				    "init" :function(obj,propt_name){
					        var item1 = new GUI.ListboxTextItem("MouseEsWeCursor",0);
							var item2 = new GUI.ListboxTextItem("MouseArrow",1);
							var item3 = new GUI.ListboxTextItem("MouseMoveCursor",2);
							var item4 = new GUI.ListboxTextItem("MouseNeSwCursor",3);
							var item5 = new GUI.ListboxTextItem("MouseNoSoCursor",4);
							var item6 = new GUI.ListboxTextItem("MouseNwSoCursor",5);
							var item7 = new GUI.ListboxTextItem("MouseTarget",6);					
							var item8 = new GUI.ListboxTextItem("MouseTextBar",7);		
							var c1 = new Math3.Color4(0.0, 255.0, 255.0, 1.0);
							item1.SetTextColours(c1);
							item2.SetTextColours(c1);
							item3.SetTextColours(c1);
							item4.SetTextColours(c1);
							item5.SetTextColours(c1);
							item6.SetTextColours(c1);
							item7.SetTextColours(c1);							
							item8.SetTextColours(c1);							
							obj.AddItem(item1);
							obj.AddItem(item2);
							obj.AddItem(item3);
							obj.AddItem(item4);
							obj.AddItem(item5);
							obj.AddItem(item6);
							obj.AddItem(item7);
							obj.AddItem(item8);
						}
						},
			    event:{},
				subscibe : {}
				},
		 "Demo/Window2/FrameWindow1/Combobox2__auto_editbox__" :
		 {
		        property:{},
				event:{
				"TextChanged":"setimagevalue"},
				subscribe:{}
		},
		 "Demo/Window2/Combobox" :
			{
				property:{
					"init" :function(obj,propt_name){
					        var item1 = new GUI.ListboxTextItem("SizingEnabled",0);
							var item2 = new GUI.ListboxTextItem("FrameEnabled",1);
							var item3 = new GUI.ListboxTextItem("TitlebarEnabled",2);
							var item4 = new GUI.ListboxTextItem("CloseButtonEnabled",3);
							var item5 = new GUI.ListboxTextItem("RollUpEnabled",4);
							var item6 = new GUI.ListboxTextItem("RollUpState",5);
							var item7 = new GUI.ListboxTextItem("SizingBorderThickness",6);					
							var item8 = new GUI.ListboxTextItem("NSSizingCursorImage",7);		
							var item9 = new GUI.ListboxTextItem("EWSizingCursorImage",8);		
							var item10 = new GUI.ListboxTextItem("NWSESizingCursorImage",9);		
							var item11 = new GUI.ListboxTextItem("NESESizingCursorImage",10);	
							var item12 = new GUI.ListboxTextItem("DragMovingEnabled",11);						
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
							item10.SetTextColours(c1);							
							item11.SetTextColours(c1);							
							item12.SetTextColours(c1);							
							obj.AddItem(item1);
							obj.AddItem(item2);
							obj.AddItem(item3);
							obj.AddItem(item4);
							obj.AddItem(item5);
							obj.AddItem(item6);
							obj.AddItem(item7);
							obj.AddItem(item8);
							obj.AddItem(item9);
							obj.AddItem(item10);
							obj.AddItem(item11);							
							obj.AddItem(item12);							
					},		
			 "associatedWindow" : function(obj,propt_name){	
			            obj[propt_name]=[];    //数组obj[propt_name]为空
					    obj[propt_name]["SizingEnabled"]=["Demo/Window2/FrameWindow2"];			//对数组obj[propt_name]	进行初始化	
					    obj[propt_name]["DragMovingEnabled"]=["Demo/Window2/FrameWindow2"];			//对数组obj[propt_name]	进行初始化	
					    obj[propt_name]["FrameEnabled"]=["Demo/Window2/FrameWindow2"];			//对数组obj[propt_name]	进行初始化	
					    obj[propt_name]["TitlebarEnabled"]=["Demo/Window2/FrameWindow2"];			//对数组obj[propt_name]	进行初始化	
					    obj[propt_name]["CloseButtonEnabled"]=["Demo/Window2/FrameWindow2"];			//对数组obj[propt_name]	进行初始化	
					    obj[propt_name]["RollUpState"]=["Demo/Window2/FrameWindow2"];			//对数组obj[propt_name]	进行初始化	
					    obj[propt_name]["RollUpEnabled"]=["Demo/Window2/FrameWindow2"];			//对数组obj[propt_name]	进行初始化	
					    obj[propt_name]["SizingBorderThickness"]=["Demo/Window2/FrameWindow3"];			//对数组obj[propt_name]	进行初始化	
						obj[propt_name]["NSSizingCursorImage"]=["Demo/Window2/FrameWindow1"];
						obj[propt_name]["EWSizingCursorImage"]=["Demo/Window2/FrameWindow1"];
						obj[propt_name]["NWSESizingCursorImage"]=["Demo/Window2/FrameWindow1"];
						obj[propt_name]["NESESizingCursorImage"]=["Demo/Window2/FrameWindow1"];
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



