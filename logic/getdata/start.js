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

	// 全局变量，方便调试。
	var CONSOLE = Registry.Get("iConsole");
	
	
	require("objlayout.js");

	Event.Send("application.open", true);
	
	Plugin.Load("spp.script.gui.cegui");
		GUI.Initialize();
	VFS.PushDir("/ui");
	var scheme = GUI.Schemes.Load("interface.scheme");

	GUI.System.SetDefaultMouseCursor("ice", "MouseArrow");

	var font = GUI.Fonts.CreateFont("FreeType","FangSong", "/fonts/SIMHEI.TTF");
	font.SetProperty("PointSize", "7");
	font.SetProperty("AutoScaled", "false");
	font.Load();

	win = GUI.Windows.LoadWindowLayout("login.layout");
	if(!win)
	{
		alert("Failed to LoadWindowLayout");
	}
	GUI.System.root = win;
	var text = GUI.Windows.Get("root/text");
	Event.Subscribe(spp.hitch(text,function(e){
		this.SetProperty("Visible",true);
		if(typeof(e.value) != "undefined")
		{
			this.SetProperty("text_theme",e.value);
		}

	}), "ui.text.show");
	VFS.PopDir ();
	
	
	if(!load("/logic.js"))
	{
	    alert("Failed to load `logic.js`");
	}
	if(!load("/effect.js"))
	{
	    alert("Failed to load `effect.js`");
	}
	var count = Event.InstallHelper('3d','frame');
	//下面这个方式，通过传入一个对象来初始化。这里我们以JSON格式来定义这个初始化对象。（比如`PLAYER`）
	//这个对象可以被保存在文件中，可以动态加载，加载进来就可以定义若干entity.
	//这里的entity你可以随意添加属性，就是普通的js对象！
	//我们的编辑器将会编辑产生一个entity def json，加载进来就是Entities.CreateEntity中的参数。

	player = Entities.CreateEntity(PLAYER);

}catch(e){
	alert('error:',e);
}
