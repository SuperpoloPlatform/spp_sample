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
			actor.pcarray['pcmesh'].SetAnimation("run", true, false);
		}, "effect.forward1");
		//W键抬起，前停
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].Forward(false);
			actor.pcarray['pcmesh'].SetAnimation("stand", true, false);
		}, "effect.forward0");
		//S键按下，后走
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].Backward(true);
			actor.pcarray['pcmesh'].SetAnimation("run", true, false);
		}, "effect.backward1");
		//S键抬起，后停
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].Backward(false);
			actor.pcarray['pcmesh'].SetAnimation("stand", true, false);
		}, "effect.backward0");
		//A键按下，左转
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].RotateLeft(true);
			actor.pcarray['pcmesh'].SetAnimation("run", true, false);
		}, "effect.rotateleft1");
		//A键抬起，转停
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].RotateLeft(false);
			actor.pcarray['pcmesh'].SetAnimation("stand", true, false);
		}, "effect.rotateleft0");
		//D键按下，右转
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].RotateRight(true);
			actor.pcarray['pcmesh'].SetAnimation("run", true, false);
		}, "effect.rotateright1");
		//D键抬起，转停
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].RotateRight(false);
			actor.pcarray['pcmesh'].SetAnimation("stand", true, false);
		}, "effect.rotateright0");
		
		
		//T键按下，左移
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].StrafeLeft(true);
			actor.pcarray['pcmesh'].SetAnimation("run", true, false);
		}, "effect.strafeleft1");
		//T键抬起，停
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].StrafeLeft(false);
			actor.pcarray['pcmesh'].SetAnimation("stand", true, false);
		}, "effect.strafeleft0");
		//G键按下，右移
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].StrafeRight(true);
			actor.pcarray['pcmesh'].SetAnimation("run", true, false);
		}, "effect.straferight1");
		//G键抬起，停
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].StrafeRight(false);
			actor.pcarray['pcmesh'].SetAnimation("stand", true, false);
		}, "effect.straferight0");
		
		
		//R键按下，上移
		Event.Subscribe(function(e) {
			var actor = e.self;
			actor.pcarray['pclinearmovement'].SetVelocity([0, 10, 0]);
			actor.pcarray['pcmesh'].SetAnimation("run", true, false);
		}, "effect.strafeup1");
		//R键抬起，上移停止
		Event.Subscribe(function(e) {
			var actor = e.self;
			actor.pcarray['pclinearmovement'].SetVelocity([0, 0, 0]);
			actor.pcarray['pcmesh'].SetAnimation("stand", true, false);
		}, "effect.strafeup0");
		//F键按下，下移
		Event.Subscribe(function(e) {
			var actor = e.self;
			actor.pcarray['pclinearmovement'].SetVelocity([0, -10, 0]);
			actor.pcarray['pcmesh'].SetAnimation("run", true, false);
		}, "effect.strafedown1");
		//F键抬起，下移停止
		Event.Subscribe(function(e) {
			var actor = e.self;
			actor.pcarray['pclinearmovement'].SetVelocity([0, 0, 0]);
			actor.pcarray['pcmesh'].SetAnimation("stand", true, false);
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
		
		//开始XXXX的测试代码
		Event.Subscribe(function(e){
			//TODO  需要添加的功能方案
			var actor = e.self;
			light
		}, "effect.test");
	})();

} catch(e){
	alert(e);
}