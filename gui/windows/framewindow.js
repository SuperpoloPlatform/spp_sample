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
	Plugin.Load("spp.script.gui.cegui");
	
	Event.Send("application.open", true);
	
	require("ui.js");
	if(!load("/framewindow/layout.js"))
	{
	    alert("Failed to load `layout.js`");
	}
	if(!load("/schemedata/uischeme.js"))
	{
	    alert("Failed to load `uischeme.js`");
	}
	
	GUI.CreateObjectScheme(SCHEMEDATA,"/framewindow");
	GUI.CreateObjectLayout(LAYOUTDATA,"/framewindow");
	
        engine = Registry.Get('iEngine');
	g3d = Registry.Get('iGraphics3D');
	view = new iView(engine,g3d);
	var count = Event.InstallHelper('3d',view,'frame');

}catch(e){
	alert('error:',e);
}