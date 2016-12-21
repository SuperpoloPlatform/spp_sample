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
	load("/monster.js");
	load("/effect.js");
	
	Event.Send("application.open", true);
	
	/* 初始化Entity ================================================ */
	player = Entities.CreateEntity(PLAYER);
	monster = Entities.CreateEntity(MONSTER);
	//引入插件
	iDynamics = Registry.Get("iDynamics","crystalspace.dynamics.bullet");
	engine = C3D.engine;
	g3d = Registry.Get('iGraphics3D');
	view = new iView(engine,g3d);
	//获得需要附加body的MeshWrapper
	var meshwraper = engine.FindMeshObject("Cube1");
	var count = Event.InstallHelper('3d',view,'frame');
	
}catch(e){
	alert('error:',e);
}
