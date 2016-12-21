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
	load("/camera.js");
	load("/player.js");
	load("/effect.js");
	
	
	Event.Send("application.open", true);

	camera = Entities.CreateEntity(CAMERA);
	
	player = Entities.CreateEntity(PLAYER);
	
	var pcactor = player.pcarray['pcactormove'].QueryInterface('iPcActorMove');
	var cam = camera.pcarray['pcdefaultcamera'].QueryInterface("iPcDefaultCamera").GetCamera();
	C3D.engine.SubscribeFrame(function(){
		// CONSOLE.WriteLine(pcactor.IsMoving());
		if(pcactor.IsMoving())
		{
			var v = cam.GetTransform().GetO2TTranslation();
			// CONSOLE.WriteLine(v.x + "    " + v.y + "    " + v.z);
			var v0 = new Math3.Vector3(-12, 10, -12);
			v0.Subtract(v);
			CONSOLE.WriteLine("length   ===  " + v0.Length());
			// <v y='2' x='-12' z='-12'/>
		}
	});
	
	var count = Event.InstallHelper('3d','frame');
	
}catch(e){
	alert('error:',e);
}