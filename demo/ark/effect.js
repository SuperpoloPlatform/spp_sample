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
			CONSOLE.WriteLine("[Debug] effect.jump1 : '" + actor.name + "' begin");
			
			// @fixme 跳起来落地的时候就平躺着了，还是不要“跳”这个功能了吧。
			actor.pcarray['pcactormove'].PerformAction('Jump', ['start', true]);
			actor.pcarray['pcmesh'].SetAnimation('stand', true, false);
		}, "effect.jump1");
		
		Event.Subscribe(function(e) {
			var actor = e.self;
			CONSOLE.WriteLine("[Debug] effect.jump0 : '" + actor.name + "' begin");
			
			actor.pcarray['pcmesh'].SetAnimation('stand', true, true);
		}, "effect.jump0");
		
		Event.Subscribe(function(e) {
			var actor = e.self;
			CONSOLE.WriteLine("[Debug] effect.forword1 : '" + actor.name + "' begin");
			
			actor.pcarray['pcactormove'].Forward(true);
			actor.pcarray['pcmesh'].PerformAction('SetAnimation', ['animation','run'], ['cycle', true], ['reset', false]);
			actor.state = "run";
			nowrun = false;
			nowturn = true;
		}, "effect.forward1");
		
		Event.Subscribe(function(e){
			var actor = e.self;
			CONSOLE.WriteLine("[Debug] effect.forward0 : '" + actor.name + "'");
			
			actor.pcarray['pcactormove'].PerformAction('Forward', ['start', false]);
			actor.pcarray['pcmesh'].PerformAction('SetAnimation', ['animation', 'stand'], ['cycle', true],['reset', true]);
			actor.state = "stand";
			nowrun = true;
			nowturn = false;
		}, "effect.forward0");
		
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].PerformAction('Backward', ['start', true]);
			actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
			actor.state = "run";
			nowrun = false;
			nowturn = true;
		}, "effect.backward1");
		
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].PerformAction('Backward', ['start', false]);
			actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
			actor.state = "stand";
			nowrun = true;
			nowturn = false;
		}, "effect.backward0");
		
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].PerformAction('RotateLeft', ['start', true]);
			if(nowturn){
				actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
			} else {
				actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
			}
		}, "effect.rotateleft1");
		
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].PerformAction('RotateLeft', ['start', false]);
			if(nowrun){
				actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
			} else {
				if(nowturn){
					actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
				} else {
					actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
				}
			}
		}, "effect.rotateleft0");
		
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].PerformAction('RotateRight', ['start', true]);
			if(nowturn){
				actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
			} else {
				actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
			}
		}, "effect.rotateright1");
		
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].PerformAction('RotateRight', ['start', false]);
			if(nowrun){
				actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
			} else {
				if(nowturn){
					actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
				} else {
					actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
				}
			}
		}, "effect.rotateright0");
		
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcdefaultcamera'].SetProperty('pitchvelocity',1.0);
		}, "effect.rotateup1");
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcdefaultcamera'].SetProperty('pitchvelocity',0.0);
		}, "effect.rotateup0");
		
		
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcdefaultcamera'].SetProperty('pitchvelocity',-1.0);
		}, "effect.rotatedown1");
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcdefaultcamera'].SetProperty('pitchvelocity',-0.0);
		}, "effect.rotatedown0");
		
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].PerformAction('ToggleCameraMode', []);
		}, "effect.changeview0");
		
		//鼠标
		Event.Subscribe(function(e){
			var actor = e.self;
			
			actor.pcarray['pcmesh'].SetAnimation('stand', true, true);
			var x = e.mouse_x;
			var y = e.mouse_y;
			CONSOLE.WriteLine("[Debug] [effect mousemove] x: " + x + "   y: " + y);
			actor.pcarray['pcactormove'].mousemove = true;
			actor.pcarray['pcactormove'].MouseMove(x, y);
		}, "effect.mousemove");
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcmesh'].SetAnimation('stand', true, true);
			actor.pcarray['pcactormove'].mousemove = false;
		}, "effect.mousemoveStop");
		Event.Subscribe(function(e){
			var actor=e.self;
			CONSOLE.Write("[debug] [effect mouseforward] :"+actor.pcarray['pcdefaultcamera'].distance+".\n");
			actor.pcarray['pcdefaultcamera'].distance=actor.pcarray['pcdefaultcamera'].distance-0.2;
		},"effect.mouseforward");
		Event.Subscribe(function(e){
			var actor=e.self;
			CONSOLE.Write("[debug] [effect mousebackward] :"+actor.pcarray['pcdefaultcamera'].distance+".\n");
			actor.pcarray['pcdefaultcamera'].distance=actor.pcarray['pcdefaultcamera'].distance+0.2;
		},"effect.mousebackward");
		
		
	})();

} catch(e){
	alert(e);
}