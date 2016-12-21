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
			CONSOLE.WriteLine("K Key is unpressed, Event is 'effect.disable'");
			var actor = e.self;
			//Activates this input property class.
			actor.pcarray['pccommandinput'].Activate(false);
			//get iPcCommandInput
			var ipam = actor.pcarray['pccommandinput'].QueryInterface('iPcCommandInput');
			var bingKey = ipam.GetBind("c");
			CONSOLE.WriteLine("C key binding events  ：  " + bingKey);
			//Disable Keyboard Events
			CONSOLE.WriteLine("DisableKeyboardEvents");
			ipam.DisableKeyboardEvents();
		}, "effect.disable");
		
		Event.Subscribe(function(e){
			CONSOLE.WriteLine("Mouse Left is unpressed, Event is 'effect.able'");
			var actor = e.self;
			//Enable Keyboard Events
			var ipam = actor.pcarray['pccommandinput'].QueryInterface('iPcCommandInput');
			CONSOLE.WriteLine("EnableKeyboardEvents");
			ipam.EnableKeyboardEvents();
			CONSOLE.WriteLine("Cooked is false");
			actor.pcarray['pccommandinput'].cooked = false;
		}, "effect.able");
		
		Event.Subscribe(function(e){
			CONSOLE.WriteLine("O Key is unpressed, Event is 'effect.add'");
			var actor = e.self;
			//Enable Keyboard Events
			actor.pcarray['pccommandinput'].Bind('m', 'getpos');
		}, "effect.add");
		
		Event.Subscribe(function(e){
			CONSOLE.WriteLine("P Key is unpressed, Event is 'effect.del'");
			var actor = e.self;
			//Enable Keyboard Events
			actor.pcarray['pccommandinput'].RemoveBind('m', 'getpos');
			actor.pcarray['pccommandinput'].RemoveAllBinds();
		}, "effect.del");
		
		Event.Subscribe(function(e){
			CONSOLE.WriteLine("I Key is unpressed, Event is 'effect.cooked'");
			var actor = e.self;
			CONSOLE.WriteLine("Cooked is true");
			actor.pcarray['pccommandinput'].cooked = true;
		}, "effect.cooked");
		
		Event.Subscribe(function(e){
			CONSOLE.WriteLine("触发事件为：：：：：pccommandinput_cycle_");
		}, "effect.cycle");
		
	})();

} catch(e){
	alert(e);
}