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
	load("/trigger.js");
	
	Event.Send("application.open", true);
	player = Entities.CreateEntity(PLAYER);
	
	var actormove = player.pcarray['pcactormove'].QueryInterface("iPcActorMove");
	C3D.engine.SubscribeFrame(function(){
		if (actormove.IsMoving())
		{
			var pos = player.pcarray['pcmesh'].position;
			for( var ids = 0; ids < TRIGGER_POS.length; ids ++ )
			{
				if (pos.x - 1 < TRIGGER_POS[ids].position.x
					&& pos.x + 1 > TRIGGER_POS[ids].position.x
					&& pos.z - 1 < TRIGGER_POS[ids].position.z
					&& pos.z + 1 > TRIGGER_POS[ids].position.z )
				{
					CONSOLE.Write("Enter\n");
					CONSOLE.Write(ids + "\n");
					if (TRIGGER_POS[ids].name == "pos1")
					{
						Event.Send({
							name : "effect.pos1",
							self : this
						});
					}
					else if (TRIGGER_POS[ids].name == "pos2")
					{
						Event.Send({
							name : "effect.pos2",
							self : this
						});
					}
					else if (TRIGGER_POS[ids].name == "pos3")
					{
						Event.Send({
							name : "effect.pos3",
							self : this
						});
					}
				}
			}
		}
	});
	
	
	var count = Event.InstallHelper('3d','frame');
	
}catch(e){
	alert('error:',e);
}