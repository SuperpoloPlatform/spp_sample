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
	
	/* 加载基本的JS库。 =============================================== */
	
	// 加载Object Layout库，这是UGE的核心库。
	require("objlayout.js");

	/* 初始化数据。 ================================================== */
	
	// 初始化object layout中各个对象。
	load("/player.js");
	load("/guides.js");
	load("/effect.js");

	
	Event.Send("application.open", true);
	
	/* 初始化Entity ================================================ */

	player = Entities.CreateEntity(PLAYER);
	guides = Entities.CreateEntity(GUIDES);
	
	engine = Registry.Get('iEngine');
	var count = Event.InstallHelper('3d','frame');

}catch(e){
	alert('error:',e);
}