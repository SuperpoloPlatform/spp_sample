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
		name : "DragContainer.layout",
		method : {
 		checkboxsetvalue1 : function () {		
		            var windowname = GUI.Combobox.Get("Demo/Window2/Combobox");	
					var propertyname = windowname.GetProperty("Text");
                    var main = GUI.DragContainer.Get("Demo/Window1/DragContainer");
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
                    var main = GUI.DragContainer.Get("Demo/Window1/DragContainer");	
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
		setUVector2 : function(){
		            var windowname = GUI.DragContainer.Get("Demo/Window1/DragContainer");
					var xswindow = GUI.Editbox.Get("Demo/Window2/FrameWindow4/XS");
					var xowindow = GUI.Editbox.Get("Demo/Window2/FrameWindow4/XO");
					var yswindow = GUI.Editbox.Get("Demo/Window2/FrameWindow4/YS");
					var yowindow = GUI.Editbox.Get("Demo/Window2/FrameWindow4/YO");
					var xs = xswindow.GetProperty("Text");
					var xo = xowindow.GetProperty("Text");
					var ys = yswindow.GetProperty("Text");
					var yo = yowindow.GetProperty("Text");
					var a = windowname.GetProperty("FixedDragOffset");
					alert("before setting ,the FixedDragOffset is"+a+"");
					windowname.SetProperty("FixedDragOffset","{{[xs],[xo]},{[ys],[yo]}}");	
                    var b = windowname.GetProperty("FixedDragOffset");					
					alert("after setting ,the FixedDragOffset is"+b+"");
					},
        setimagevalue : function(){
                    var droplist1 = GUI.Combobox.Get("Demo/Window2/FrameWindow1/Combobox1");					
                    var droplist2 = GUI.Combobox.Get("Demo/Window2/FrameWindow1/Combobox2");
                    var imagesetname = droplist1.GetProperty("Text");       //��ȡimageset������
                    var imagename = droplist2.GetProperty("Text");          //��ȡimage������
                    var window = GUI.DragContainer.Get("Demo/Window1/DragContainer");
                    window.SetProperty("DragCursorImage","set:ice image:"+imagename+"");  //��DragCursorImage���Խ�������
					alert("DragCursorImage : "+imagename+" ");
                   },					
	    setVisible : function () {
		        var windowname = GUI.Combobox.Get("Demo/Window2/Combobox");
				var frame1 = GUI.FrameWindow.Get("Demo/Window2/FrameWindow1");
				var frame2 = GUI.FrameWindow.Get("Demo/Window2/FrameWindow2");
				var frame3 = GUI.FrameWindow.Get("Demo/Window2/FrameWindow3");
				var frame4 = GUI.FrameWindow.Get("Demo/Window2/FrameWindow4");
				frame1.SetProperty("Visible",false);                      //�Ȱ��������Դ�������
				frame2.SetProperty("Visible",false);                    
				frame3.SetProperty("Visible",false);				    
				frame4.SetProperty("Visible",false);
                var propertyname = windowname.GetProperty("Text");		//��ȡedit��textֵ�������޸���Ӧ�Ŀؼ�����		
				if(propertyname=="DragAlpha"){alert("DragAlpha value must be float between 0 and 1")}
				var associatedWindow = windowname.associatedWindow;              //��ȡassociatedWindow����
				var a = GUI.FrameWindow.Get(associatedWindow[propertyname]);    //����associatedWindow���ԣ���ȡ��text��Ӧ���������ô���
				a.SetProperty("Visible",true);                                  //���ø��������ô��ڿɼ�
	        },			
		editboxsetvalue: function()
			{       
			        var windowname = GUI.Combobox.Get("Demo/Window2/Combobox");
                    var propertyname = windowname.GetProperty("Text");
		            var window = GUI.Editbox.Get("Demo/Window2/FrameWindow3/Editbox");
                    var propertyvalue = window.GetProperty("Text");					
                    var main = GUI.DragContainer.Get("Demo/Window1/DragContainer");		
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
							var item1 = new GUI.ListboxTextItem("DraggingEnabled",0);
							var item2 = new GUI.ListboxTextItem("DragAlpha",1);
							var item3 = new GUI.ListboxTextItem("DragThreshold",2);
							var item4 = new GUI.ListboxTextItem("DragCursorImage",3);
							var item5 = new GUI.ListboxTextItem("StickyMode",4);
							var item6 = new GUI.ListboxTextItem("FixedDragOffset",5);
							var item7 = new GUI.ListboxTextItem("UseFixedDragOffset",6);
							var c1 = new Math3.Color4(0.0, 255.0, 255.0, 1.0);
							item1.SetTextColours(c1);
							item2.SetTextColours(c1);
							item3.SetTextColours(c1);
							item4.SetTextColours(c1);
							item5.SetTextColours(c1);
							item6.SetTextColours(c1);
							item7.SetTextColours(c1);
							obj.AddItem(item1);
							obj.AddItem(item2);
							obj.AddItem(item3);
							obj.AddItem(item4);
							obj.AddItem(item5);
							obj.AddItem(item6);
							obj.AddItem(item7);
					},
		
			 "associatedWindow" : function(obj,propt_name){	
			            obj[propt_name]=[];    //����obj[propt_name]Ϊ��
					    obj[propt_name]["DraggingEnabled"]=["Demo/Window2/FrameWindow2"];			//������obj[propt_name]	���г�ʼ��	
						obj[propt_name]["DragAlpha"]=["Demo/Window2/FrameWindow3"];
						obj[propt_name]["DragThreshold"]=["Demo/Window2/FrameWindow3"];
						obj[propt_name]["DragCursorImage"]=["Demo/Window2/FrameWindow1"];
						obj[propt_name]["StickyMode"]=["Demo/Window2/FrameWindow2"];
						obj[propt_name]["FixedDragOffset"]=["Demo/Window2/FrameWindow4"];
						obj[propt_name]["UseFixedDragOffset"]=["Demo/Window2/FrameWindow2"];
					  }					
				},
				event :{ 
				},
				subscribe:{}
			},
			"Demo/Window2/FrameWindow4/OKButton":
			{
			   property:{},
			   event:{"Clicked":"setUVector2"},
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



