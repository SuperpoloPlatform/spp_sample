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

	// 加载插件。
	Plugin.Load("crystalspace.font.server.default", "iFontServer");
	
	// 全局变量，方便调试。
	var CONSOLE = Registry.Get("i// CONSOLE");
	//// CONSOLE.Write = function(){};//关闭调试窗口

	// 设定屏幕分辨率
	// @todo 需要在UI上提供设定屏幕分辨率的选项，
	// 并且在JS层提供动态修改分辨率的接口。
	//CmdLine.AddOption("fs", true);
	CmdLine.AddOption("mode", "1280x800");
	
	// 加载Object Layout库，这是UGE的核心库。
	require("objlayout.js");

	Event.Send("application.open", true);
	
	require("ui.js");
	
	AssertTrue(load("/objlayout/uischeme.js") == true, "Failed to load `uischeme.js`");
	AssertTrue(load("/objlayout/loginlayout.js") == true, "Failed to load `loginlayout.js`");
	AssertTrue(load("/objlayout/rolechoicelayout.js") == true, "Failed to load `rolechoicelayout.js`");
	AssertTrue(load("/objlayout/progresslayout.js") == true, "Failed to load `progresslayout.js`");
	
	GUI.CreateObjectScheme(SCHEMEDATA,"/ui");
	GUI.CreateObjectLayout(ROLE_CHOICE_LAYOUT,"/ui");
	
    engine = Registry.Get('iEngine');
	g3d = Registry.Get('iGraphics3D');
	view = new iView(engine, g3d);
	var count = Event.InstallHelper('3d', view, 'frame');

	

} catch(e) {
	alert('error:',e);
}