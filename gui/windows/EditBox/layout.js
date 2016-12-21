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
		name : "editbox.layout",
		method : {
		  getvalue : function () {
		             var windowname = GUI.Editbox.Get("Demo/window/setpropertyname");	
	                 var windowvalue = GUI.Editbox.Get("Demo/window/setpropertyvalue");
                     var propertyname = windowname.GetProperty("Text");
                     var propertyvalue = windowvalue.GetProperty("Text");
                     var main = GUI.Editbox.Get("Demo/Window1/Editbox");
                     main.SetProperty(propertyname,propertyvalue);
                     var a = main.GetProperty(propertyname);
					 alert("set property "+propertyname+":"+propertyvalue+"");
					 }
		},
		window : {
	    "Demo7/Window1/OK" :
		    {
			property:{},
		    event :{ 
			"Clicked" : "getvalue"
			},
			subscribe:{}
		    }
		}
	}	
} catch( e )
{
	alert( e );
}