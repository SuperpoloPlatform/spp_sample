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
		//W键按下，前走
		Event.Subscribe(function(e) {
			var actor = e.self;
			actor.pcarray['pcactormove'].PerformAction('Forward', ['start', true]);
			actor.pcarray['pcmesh'].PerformAction('SetAnimation', ['animation','run'], ['cycle', true], ['reset', false]);
			actor.state = "run";
			nowrun = false;
			nowturn = true;
		}, "effect.forward1");
		//W键抬起，前停
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].PerformAction('Forward', ['start', false]);
			actor.pcarray['pcmesh'].PerformAction('SetAnimation', ['animation', 'stand'], ['cycle', true],['reset', true]);
			actor.state = "stand";
			nowrun = true;
			nowturn = false;
		}, "effect.forward0");
		
		//S键按下，后走
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].PerformAction('Backward', ['start', true]);
			actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
			actor.state = "run";
			nowrun = false;
			nowturn = true;
		}, "effect.backward1");
		//S键抬起，后停
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].PerformAction('Backward', ['start', false]);
			actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
			actor.state = "stand";
			nowrun = true;
			nowturn = false;
		}, "effect.backward0");
		
		//A键按下，左转
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].PerformAction('RotateLeft', ['start', true]);
			if(nowturn){
				actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
			} else {
				actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
			}
		}, "effect.rotateleft1");
		//A键抬起，转停
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
		
		//D键按下，右转
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].PerformAction('RotateRight', ['start', true]);
			if(nowturn){
				actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
			} else {
				actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
			}
		}, "effect.rotateright1");
		//D键抬起，转停
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
		
		//E键按下，视角向上
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcdefaultcamera'].SetProperty('pitchvelocity',1.0);
		}, "effect.rotateup1");
		//E键抬起，视角向上停止
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcdefaultcamera'].SetProperty('pitchvelocity',0.0);
		}, "effect.rotateup0");
		
		//C键按下，视角向下
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcdefaultcamera'].SetProperty('pitchvelocity',-1.0);
		}, "effect.rotatedown1");
		//C键抬起，视角向下停止
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcdefaultcamera'].SetProperty('pitchvelocity',0.0);
		}, "effect.rotatedown0");
		
		//鼠标点击打印当前像素坐标 
		Event.Subscribe(function(e){
			CONSOLE.WriteLine("crystalspace.input.mouse.0.button.down");
			CONSOLE.WriteLine(player.mousex + "              " + player.mousey);
		}, "crystalspace.input.mouse.0.button.down");
		
		Event.Subscribe(function(e){
			CONSOLE.WriteLine("crystalspace.input.mouse.0.move");
			//在鼠标移动的过程中时刻获取当前的屏幕的像素坐标，x和y
			player.mousex = e.x;
			player.mousey = e.y;
			CONSOLE.WriteLine(player.mousex + "       " + player.mousey);
			var pccam = player.pcarray['pcdefaultcamera'].QueryInterface("iPcDefaultCamera");
			var iPcCamera = pccam.QueryInterface('iPcCamera');
			var cameraobj = iPcCamera.GetCamera();
			//通过像素坐标获取当前像素坐标对应的场景中的meshobj的name
			var targetObj = engine.FindScreenTarget([player.mousex, player.mousey], 100, cameraobj);
			//如果当前像素坐标对应的场景中没有任何meshobj的话，是不执行if内的
			if(targetObj.mesh){
				var meshwrapper = targetObj.mesh.object.name;
				CONSOLE.Write("[FindScreenTarget] meshwrapper's name" + "             " + meshwrapper + " .\n");
				//获取获得的meshobj的name的前4个字符，一栋楼的命名是有规范的，取其公共部分，进行传值
				player.flag = meshwrapper.substr(0, 4);
				CONSOLE.WriteLine(player.flag);
				// if(根据player.flag判断){
					/**
						//你需要给UI发鼠标移动过程中触发UI显示的消息
						Event.Send({
							name : "ui.xxxx.show",
							self : player,
							meshobj : player.flag
						});
					*/
				// }
				if("Cube" == player.flag){
					CONSOLE.WriteLine("I'm Cube");
				}
				
			}
		}, "crystalspace.input.mouse.0.move");		
		
		Event.Subscribe(function(e){
			CONSOLE.WriteLine("crystalspace.input.mouse.0.button.up");
			CONSOLE.WriteLine(player.flag);
			// if(根据player.flag判断){
				/**
					//你需要给UI发鼠标点击触发UI显示的消息
					Event.Send({
						name : "ui.xxxx.show",
						self : player,
						meshobj : player.flag
					});
				*/
			// }
		}, "crystalspace.input.mouse.0.button.up");
		
		
		Event.Subscribe(function(e){
			CONSOLE.WriteLine("effect.mouseleft.down");
		}, "effect.mouseleft.down");
		
		Event.Subscribe(function(e){
			CONSOLE.WriteLine("effect.mouseleft.up");
		}, "effect.mouseleft.up");
			
	})();

} catch(e){
	CONSOLE.WriteLine(e);
}