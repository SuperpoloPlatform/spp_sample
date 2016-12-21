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
	
	// create light
	var col = new Math3.Color(5.2, 2.3, 3.5);
	var light = C3D.engine.CreateLight("mylight", [0, 1, 0], 10, col, 3);
	// 此时需要判断，不能 a.b.c.d
	var sector = C3D.engine.sectors.Get(0);
	var lightlist = sector.lights;
	// add light to lightlist.
	lightlist.Add(light);
	
	
	var pcactor = player.pcarray['pcactormove'].QueryInterface('iPcActorMove');

	C3D.engine.SubscribeFrame(function(){
		
		if(pcactor.IsMoving())
		{
			CONSOLE.WriteLine(pcactor.IsMoving());
			player.pcarray['pcmesh'].SetAnimation("run", true, false);
			position = player.pcarray['pcmesh'].position;
			light.center = [position.x, position.y + 5, position.z];
		} else {
			player.pcarray['pcmesh'].SetAnimation("stand", true, false);
		}
	});
	
	var count = Event.InstallHelper('3d','frame');
	
}catch(e){
	alert('error:',e);
}