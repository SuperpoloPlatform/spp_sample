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
	
	// 加载Object Layout库，这是UGE的核心库。
	require("objlayout.js");
	
	// 初始化object layout中各个对象。
	load("/player.js");
	load("/effect.js");
	
	Event.Send("application.open", true);
	player = Entities.CreateEntity(PLAYER);
	var count = Event.InstallHelper('3d','frame');
	
	CONSOLE.WriteLine("\nEsc : 退出\n");
	CONSOLE.WriteLine("\nM : 获取当前Entity的位置信息\n");
	CONSOLE.WriteLine("\nK : 没有摄像机移动过程的效果\n");
	
}catch(e){
	alert('error:',e);
}