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
				//记录鼠标位置
				global_x = 0;
				global_y = 0;
				/**
					摄像机绑定与解除绑定实体
				*/
				Event.Subscribe(function(e) {
					var actor = e.self;
					//摄像机人称视角
					actor.pcarray['pcdefaultcamera'].SetCamera('thirdperson');
					//摄像机绑定entity box
					actor.pcarray['pcdefaultcamera'].SetZoneManager('box', 'main', 'Camera');
					//设置间距
					actor.pcarray['pcdefaultcamera'].SetProperty('distance', 3);
					//设置摄像机跟随
					actor.pcarray['pcdefaultcamera'].SetFollowEntity('box');
						
                }, "effect.camera1");
				
				Event.Subscribe(function(e) {
					var actor = e.self;
					//摄像机人称视角
					actor.pcarray['pcdefaultcamera'].SetCamera('thirdperson');
					//摄像机绑定entity zone
					actor.pcarray['pcdefaultcamera'].SetZoneManager('zone', 'main', 'Camera');
					//设置间距
					actor.pcarray['pcdefaultcamera'].SetProperty('distance', 3);
					//设置摄像机跟随
					actor.pcarray['pcdefaultcamera'].SetFollowEntity('zone');
						
                }, "effect.split1");
				
				/**
					摄像机向前移动
				*/
				Event.Subscribe(function(e) {
					var actor = e.self;
					//获取iPcDefaultCamera对象
					var pccam = actor.pcarray['pcdefaultcamera'].QueryInterface("iPcDefaultCamera");
					//获取iPcCamera对象
					var iPcCamera = pccam.QueryInterface('iPcCamera');
					//获取摄像机对象
					var cameraObj = iPcCamera.GetCamera();
					//摄像机移动
					cameraObj.MoveWorld([-0.1, 0, 0.1], true);
						
                }, "effect.up1");
				
				/**
					摄像机向后移动
				*/
				Event.Subscribe(function(e) {
					var actor = e.self;
					CONSOLE.Write(actor.name + " .\n");
					var pccam = actor.pcarray['pcdefaultcamera'].QueryInterface("iPcDefaultCamera");
					var iPcCamera = pccam.QueryInterface('iPcCamera');
					var cameraObj = iPcCamera.GetCamera();
					cameraObj.MoveWorld([0.1, 0, -0.1], true);
						
                }, "effect.down1");
				
				/**
					摄像机向左移动
				*/
				Event.Subscribe(function(e) {
					var actor = e.self;
					var pccam = actor.pcarray['pcdefaultcamera'].QueryInterface("iPcDefaultCamera");
					var iPcCamera = pccam.QueryInterface('iPcCamera');
					var cameraObj = iPcCamera.GetCamera();
					cameraObj.MoveWorld([-0.1, 0, -0.1], true);
						
                }, "effect.left1");
				
				/**
					摄像机向右移动
				*/
				Event.Subscribe(function(e) {
					var actor = e.self;
					var pccam = actor.pcarray['pcdefaultcamera'].QueryInterface("iPcDefaultCamera");
					var iPcCamera = pccam.QueryInterface('iPcCamera');
					var cameraObj = iPcCamera.GetCamera();
					cameraObj.MoveWorld([0.1, 0, 0.1], true);
						
                }, "effect.right1");
				
				/**
					box 移动
				*/
			    Event.Subscribe(function(e) {
					var actor = e.self;
					CONSOLE.WriteLine("[Debug] effect.forword1 : '" + actor.name + "' begin");
					actor.pcarray['pcactormove'].Forward(true);
					actor.pcarray['pcmesh'].SetAnimation('run', true, false);
                }, "effect.forward1");
               
                Event.Subscribe(function(e){
					var actor = e.self;
					actor.pcarray['pcactormove'].Forward(false);
					actor.pcarray['pcmesh'].SetAnimation('stand', true, true);
                }, "effect.forward0");
               
                Event.Subscribe(function(e){
					var actor = e.self;
					actor.pcarray['pcactormove'].Backward(true);
					actor.pcarray['pcmesh'].SetAnimation('run', true, false);
                }, "effect.backward1");
               
                Event.Subscribe(function(e){
					var actor = e.self;
					actor.pcarray['pcactormove'].Backward(false);
					actor.pcarray['pcmesh'].SetAnimation('stand', true, true);
                }, "effect.backward0");
               
                Event.Subscribe(function(e){
					var actor = e.self;
					actor.pcarray['pcactormove'].RotateLeft(true);
					actor.pcarray['pcmesh'].SetAnimation('run', true, true);
                }, "effect.rotateleft1");
               
                Event.Subscribe(function(e){
					var actor = e.self;
					actor.pcarray['pcactormove'].RotateLeft(false);
					actor.pcarray['pcmesh'].SetAnimation('stand', true, true);
                }, "effect.rotateleft0");
               
                Event.Subscribe(function(e){
					var actor = e.self;
					actor.pcarray['pcactormove'].RotateRight(true);
					actor.pcarray['pcmesh'].SetAnimation('run', true, true);
                }, "effect.rotateright1");
               
                Event.Subscribe(function(e){
					var actor = e.self;
					actor.pcarray['pcactormove'].RotateRight(false);
					actor.pcarray['pcmesh'].SetAnimation('stand', true, true);
                }, "effect.rotateright0");
				
				/**
					鼠标控制摄像机移动
				*/
				Event.Subscribe(function(e){
                    var actor = e.self;
                    var pccam = actor.pcarray['pcdefaultcamera'].QueryInterface("iPcDefaultCamera");
					var iPcCamera = pccam.QueryInterface('iPcCamera');
					var cameraObj = iPcCamera.GetCamera();
					if(actor.click){   //判断是否是鼠标右键拖动
                        var x = actor.x;
						var y = actor.y;
						if(x - global_x <= 0){
							global_x = x;
							cameraObj.MoveWorld([0.01, 0, 0.01], true);  //右
						} else if (x - global_x >= 0){
							global_x = x;
							cameraObj.MoveWorld([-0.01, 0, -0.01], true); //左
						} 
						if (y - global_y <= 0){
							global_y = y;
							cameraObj.MoveWorld([-0.01, 0, 0.01], true); //前
						} else if(y - global_y >= 0){
							global_y = y;
							cameraObj.MoveWorld([0.01, 0, -0.01], true); //后
						}
					}
						
                }, "effect.mouseMove");
				
				//鼠标点下
				Event.Subscribe(function(e){
					var actor = e.self;
					actor.click = true;				
						
                }, "effect.mouseDown");
				
				//鼠标弹起
				Event.Subscribe(function(e){
					var actor = e.self;
					actor.click = false;				
						
                }, "effect.mouseUp");
				
        })();
} catch(e){
        alert(e);
}