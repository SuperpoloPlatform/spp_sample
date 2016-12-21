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
		
		//A键按下，左转
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].RotateLeft(true);
		}, "effect.rotateleft1");
		//A键抬起，转停
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].RotateLeft(false);
		}, "effect.rotateleft0");
		//D键按下，右转
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].RotateRight(true);
		}, "effect.rotateright1");
		//D键抬起，转停
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].RotateRight(false);
		}, "effect.rotateright0");
		
		Event.Subscribe(function(e){
			var actor = e.self;
			var pos = actor.pcarray['pcmesh'].position;
			var rot = actor.pcarray['pcmesh'].rotation;
			CONSOLE.Write("x = " + rot.x + "   y = " + rot.y + "   z = " + rot.z + ".\n");
			actor.pcarray['pcmesh'].MoveMesh([pos.x, pos.y, pos.z], [rot.x, rot.y, rot.z]);
			rot = actor.pcarray['pcmesh'].rotation;
			CONSOLE.Write("x = " + rot.x + "   y = " + rot.y + "   z = " + rot.z + ".\n");
		}, "effect.testone");

		Event.Subscribe(function(e){
			var actor = e.self;
			var pos = actor.pcarray['pcmesh'].position;
			var rot = actor.pcarray['pcmesh'].rotation;
			CONSOLE.Write("x = " + rot.x + "   y = " + rot.y + "   z = " + rot.z + ".\n");
			actor.pcarray['pcmesh'].MoveMesh([pos.x, pos.y, pos.z], [rot.x, -rot.y, rot.z]);
			rot = actor.pcarray['pcmesh'].rotation;
			CONSOLE.Write("x = " + rot.x + "   y = " + rot.y + "   z = " + rot.z + ".\n");
		}, "effect.testtwo");
	})();

} catch(e){
	alert(e);
}