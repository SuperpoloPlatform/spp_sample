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
	
	alert("键“K”键出现盒子放大的效果");
	CONSOLE.WriteLine("\nHardTransform的使用教程\n")
	CONSOLE.WriteLine('\nW S A D : 前进 后退 左转 右转\n');
	CONSOLE.WriteLine("\nE C Esc M : 仰视 俯视 退出 获取两个Entity的当前坐标\n");
	CONSOLE.WriteLine("\nK : 放大盒子 \n");
	
}catch(e){
	alert('error:',e);
}