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
			actor.pcarray['pcactormove'].PerformAction('Forward', ['start', true]);
			actor.pcarray['pcmesh'].PerformAction('SetAnimation', ['animation','run'], ['cycle', true], ['reset', false]);
			actor.state = "run";
			nowrun = false;
			nowturn = true;
		}, "effect.forward1");
		
		Event.Subscribe(function(e){
			var actor = e.self;
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
		
	
	})();

} catch(e){
	alert(e);
}