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

	//开启快捷键（调试）
	Registry.Get('iBugPlug',"crystalspace.utilities.bugplug");

	// 全局变量，方便调试。
	var CONSOLE = Registry.Get("iConsole");
	//CONSOLE.Write = function(){};//关闭调试窗口

	// 设定屏幕分辨率
	// @todo 需要在UI上提供设定屏幕分辨率的选项，
	// 并且在JS层提供动态修改分辨率的接口。
	//CmdLine.AddOption("fs", true);
	CmdLine.AddOption("mode", "800x600");
	
	// 加载Object Layout库，这是UGE的核心库。
	require("objlayout.js");

	Event.Send("application.open", true);
	
	if(!load("/objlayout/zone.js"))
	{
	    alert("Failed to load `/objlayout/box.js`");
	}
	if(!load("/objlayout/box.js"))
	{
	    alert("Failed to load `/objlayout/box.js`");
	}
	
	
	// 初始化效果。
	if(!load("/effect.js"))
	{
	    alert("Failed to load `effect.js`");
	}
	
	zone = Entities.CreateEntity(ZONE);
	box = Entities.CreateEntity(BOX);
	//Entities.CreateAI(player, AI_PLAYER);
	
    engine = Registry.Get('iEngine');
	g3d = Registry.Get('iGraphics3D');
	view = new iView(engine,g3d);
	var count = Event.InstallHelper('3d',view,'frame');

}catch(e){
	alert('error:',e);
}