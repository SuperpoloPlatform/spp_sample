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
			
		var nowrun = false;
		var nowturn = false;
		
		Event.Subscribe(function(e) {
			var actor = e.self;
			actor.pcarray['pcactormove'].Forward(true);
			actor.pcarray['pcmesh'].SetAnimation('run', true, false);
			actor.state = "run";
			nowrun = false;
			nowturn = true;
		}, "effect.forward1");
		
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].Forward(false);
			actor.pcarray['pcmesh'].SetAnimation('stand', true, true);
			actor.state = "stand";
			nowrun = true;
			nowturn = false;
		}, "effect.forward0");
		
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].Backward(true);
			actor.pcarray['pcmesh'].SetAnimation('run', true, false);
			actor.state = "run";
			nowrun = false;
			nowturn = true;
		}, "effect.backward1");
		
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].Backward(false);
			actor.pcarray['pcmesh'].SetAnimation('stand', true, true);
			actor.state = "stand";
			nowrun = true;
			nowturn = false;
		}, "effect.backward0");
		
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].RotateLeft(true);
			if(nowturn){
				actor.pcarray['pcmesh'].SetAnimation('run', true, false);
			} else {
				actor.pcarray['pcmesh'].SetAnimation('stand', true, true);
			}
		}, "effect.rotateleft1");
		
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].RotateLeft(false);
			if(nowrun){
				actor.pcarray['pcmesh'].SetAnimation('stand', true, true);
			} else {
				if(nowturn){
					actor.pcarray['pcmesh'].SetAnimation('run', true, false);
				} else {
					actor.pcarray['pcmesh'].SetAnimation('stand', true, true);
				}
			}
		}, "effect.rotateleft0");
		
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].RotateRight(true);
			if(nowturn){
				actor.pcarray['pcmesh'].SetAnimation('run', true, false);
			} else {
				actor.pcarray['pcmesh'].SetAnimation('stand', true, true);
			}
		}, "effect.rotateright1");
		
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].RotateRight(false);
			if(nowrun){
				actor.pcarray['pcmesh'].SetAnimation('stand', true, true);
			} else {
				if(nowturn){
					actor.pcarray['pcmesh'].SetAnimation('run', true, false);
				} else {
					actor.pcarray['pcmesh'].SetAnimation('stand', true, true);
				}
			}
		}, "effect.rotateright0");
		
		Event.Subscribe(function(e){
			var actor=player;
			if(player.mouseleft)
			{
				CONSOLE.WriteLine(e.x);
				CONSOLE.WriteLine(e.y);
				
				if(player.crystalspace_input_mouse_x > e.x)
				{
					var v0 = new Math3.Vector3(0, -1, 0);
					if(player.crystalspace_input_mouse_y > e.y)
					{
						var v1 = new Math3.Vector3(-1, 0, 0);
						v0.Add(v1);
						actor.pcarray['pclinearmovement'].PerformAction('SetAngularVelocity', ['velocity', [v0[0].toFixed(2), v0[1].toFixed(2), v0[2].toFixed(2)]]);
					}else{
						var v1 = new Math3.Vector3(1, 0, 0);
						v0.Add(v1);
						actor.pcarray['pclinearmovement'].PerformAction('SetAngularVelocity', ['velocity', [v0[0].toFixed(2), v0[1].toFixed(2), v0[2].toFixed(2)]]);
					}
				}else if(player.crystalspace_input_mouse_x < e.x)
				{
					var v0 = new Math3.Vector3(0, 1, 0);
					if(player.crystalspace_input_mouse_y < e.y)
					{
						var v1 = new Math3.Vector3(1, 0, 0);
						v0.Add(v1);
						actor.pcarray['pclinearmovement'].PerformAction('SetAngularVelocity', ['velocity', [v0[0].toFixed(2), v0[1].toFixed(2), v0[2].toFixed(2)]]);
					}else{
						var v1 = new Math3.Vector3(-1, 0, 0);
						v0.Add(v1);
						actor.pcarray['pclinearmovement'].PerformAction('SetAngularVelocity', ['velocity', [v0[0].toFixed(2), v0[1].toFixed(2), v0[2].toFixed(2)]]);
					}
				}else {
					player.pcarray['pclinearmovement'].PerformAction('SetAngularVelocity', ['velocity', [0, 0, 0]]);
				}
				
			}
		}, "crystalspace.input.mouse.0.move");
		
		Event.Subscribe(function(e){
			CONSOLE.WriteLine("crystalspace.input.mouse.0.button.down");
			player.crystalspace_input_mouse_x = e.x;
			player.crystalspace_input_mouse_y = e.y;
			// CONSOLE.WriteLine(e.x);
			// CONSOLE.WriteLine(e.y);
		}, "crystalspace.input.mouse.0.button.down");
		
		
		Event.Subscribe(function(e){
			CONSOLE.WriteLine("crystalspace.input.mouse.0.button.down");
			CONSOLE.WriteLine(e.x);
			CONSOLE.WriteLine(e.y);
			player.pcarray['pclinearmovement'].PerformAction('SetAngularVelocity', ['velocity', [0, 0, 0]]);
		}, "crystalspace.input.mouse.0.button.up");

	})();

} catch(e){
	alert(e);
}