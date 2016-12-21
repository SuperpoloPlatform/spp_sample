/**************************************************************************
 *  This file is part of the UGE(Uniform Game Engine) of SPP.
 *  Copyright (C) by SanPolo Co.Ltd. 
 *  All rights reserved.
 *  See http://spp.spolo.org/ for more information.
 *
 *  SanPolo Co.Ltd
 *  http://spp.spolo.org/  sales@spolo.org spp-support@spolo.org
**************************************************************************/
try{
	(function(){
		//获得当时的点的坐标
		Event.Subscribe(function(e){
			var actor = e.self;
			var pos = actor.pcarray['pcmesh'].position;
			CONSOLE.Write("x = " + pos.x + "   y = " + pos.y + "   z = " + pos.z + ".\n");
		}, "effect.getpos");
		
		//开始XXXX的测试代码
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcmesh'].MoveMeshInstant([1000, 0, 0], [0, 0.5, 0], "Scene", 300);
		}, "effect.test");
	})();

} catch(e){
	alert(e);
}