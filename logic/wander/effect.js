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
		//W键按下，前走
		Event.Subscribe(function(e) {
			var actor = e.self;
			actor.pcarray['pcactormove'].Forward(true);
		}, "effect.forward1");
		//W键抬起，前停
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].Forward(false);
		}, "effect.forward0");
		//S键按下，后走
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].Backward(true);
		}, "effect.backward1");
		//S键抬起，后停
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].Backward(false);
		}, "effect.backward0");
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
		
		//R键按下，上移
		Event.Subscribe(function(e) {
			var actor = e.self;
			actor.pcarray['pclinearmovement'].gravity = 0;
			actor.pcarray['pclinearmovement'].SetVelocity([0, 1, 0]);
		}, "effect.strafeup1");
		//R键抬起，上移停止
		Event.Subscribe(function(e) {
			var actor = e.self;
			actor.pcarray['pclinearmovement'].gravity = 19.6;
			actor.pcarray['pclinearmovement'].SetVelocity([0, 0, 0]);
		}, "effect.strafeup0");
		//F键按下，下移
		Event.Subscribe(function(e) {
			var actor = e.self;
			actor.pcarray['pclinearmovement'].gravity = 0;
			actor.pcarray['pclinearmovement'].SetVelocity([0, -1, 0]);
		}, "effect.strafedown1");
		//F键抬起，下移停止
		Event.Subscribe(function(e) {
			var actor = e.self;
			actor.pcarray['pclinearmovement'].gravity = 19.6;
			actor.pcarray['pclinearmovement'].SetVelocity([0, 0, 0]);
		}, "effect.strafedown0");
		
		//E键按下，视角向上
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcdefaultcamera'].pitchvelocity = 1.0;
		}, "effect.rotateup1");
		//E键抬起，视角向上停止
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcdefaultcamera'].pitchvelocity = 0.0;
		}, "effect.rotateup0");
		
		//C键按下，视角向下
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcdefaultcamera'].pitchvelocity = -1.0;
		}, "effect.rotatedown1");
		//C键抬起，视角向下停止
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcdefaultcamera'].pitchvelocity = 0.0;
		}, "effect.rotatedown0");
		
		//获得当时的点的坐标
		Event.Subscribe(function(e){
			var actor = e.self;
			var pos = actor.pcarray['pcmesh'].position;
			CONSOLE.Write("x = " + pos.x + "   y = " + pos.y + "   z = " + pos.z + ".\n");
		}, "effect.getpos");
		
		// 开始wander
		Event.Subscribe(function(e){
			var actor = e.self;
			WanderManger.RunWander(actor, 1000, 20, "art/wanders.xml");
		}, "effect.wander.run");
		
		// 暂停wander
		Event.Subscribe(function(e){
			var actor = e.self;
			WanderManger.Suspend();
		}, "effect.wander.suspend");
		
		// 继续wander
		Event.Subscribe(function(e){
			var actor = e.self;
			WanderManger.Resume();
		}, "effect.wander.resume");
		
		// 停止wander
		Event.Subscribe(function(e){
			var actor = e.self;
			WanderManger.Stop();
		}, "effect.wander.stop");
	})();

} catch(e){
	alert(e);
}