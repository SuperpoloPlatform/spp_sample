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
	
	var collection = C3D.engine.CreateCollection("test_collection");
	C3D.loader.LoadLibrary("/art/meshgen.xml", collection);
	
	var meshLine = C3D.engine.FindMeshObject("Box02_3");
	var cc = meshLine.GetWorldBoundingBox();
	// cc = meshLine.radius;
	var rad = meshLine.radius.GetRadius();
	var kkk = cc.GetCenter();
	CONSOLE.WriteLine(kkk[0] + "        " + kkk[1] + "         " + kkk[2]);
	// CONSOLE.WriteLine(rad);
	meshObjName = player.pcarray['pcmesh'].meshname;
	
	var count = Event.InstallHelper('3d','frame');
	
}catch(e){
	alert('error:',e);
}