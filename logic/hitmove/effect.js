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
		
		//获得当时的点的坐标
		Event.Subscribe(function(e){
			var actor = e.self;
			var pos = actor.pcarray['pcmesh'].GetProperty("position");
			CONSOLE.Write("x = " + pos.x + "   y = " + pos.y + "   z = " + pos.z + ".\n");
		}, "effect.getpos");
	
		//开始点击地面获得3D坐标的测试代码
		Event.Subscribe(function(e){
			var actor = e.self;
			//获得当前摄像机
			var iPcCamera = actor.pcarray['pcdefaultcamera'].QueryInterface('iPcCamera');
			var cameraobj = iPcCamera.GetCamera();
			var g2d = C3D.g2d;
			var v3d = cameraobj.InvPerspective([player.mousex, g2d.height - player.mousey], 1000);
			var startBeam = cameraobj.GetTransform().GetOrigin();
			var endBeam = cameraobj.GetTransform().This2Other(v3d);
			var targetObj = engine.FindScreenTarget([player.mousex, player.mousey], 100, cameraobj);
			if(targetObj.mesh){
				var meshwrapper = targetObj.mesh;
				//获得保存点击的位置和场景的交点的struct
				var yangxiuwu = meshwrapper.HitBeam(startBeam, endBeam, true);
				//该struct中的成员有
				/**
					csVector3 isect                Intersection point in object space.
					float r                        Value between 0 and 1 indicating where on the segment the intersection occured.
					int polygon_idx                Only for HitBeamObject: the polygon/triangle index that was hit.
					iMaterialWrapper* material     Only for HitBeamObject and HitBeam: the material that was hit. Can be 0 in the case that the meshobject doesn't support getting the material.
					int facehit                    Only for HitBeamBBox: Face number that was hit.
					bool hit                       For all except HitBeamBBox: true if hit, false otherwise.  
				*/
				yang = yangxiuwu.isect;
				CONSOLE.WriteLine("Hit position x = " + yang.x + "    y = " + yang.x + "   z = " + yang.z + "\n");
				//通过MoveMesh来测试获得的坐标是否正确
				actor.pcarray['pcmesh'].PerformAction('MoveMesh', ['position', [yang.x, yang.y, yang.z]]);
				// actor.pcarray['pcmover'].PerformAction('MoveTo', ['sectorname', 'Scene'], ['position', [yang.x, yang.y, yang.z]], ['sqradius', 0.1], ['checklos', true]);
				actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
			}
		}, "effect.mouseleft1");
		
		Event.Subscribe(function(e){
			//获得Application的屏幕的像素坐标
			player.mousex = e.x;
			player.mousey = e.y;
		}, "crystalspace.input.mouse.0.move");	
		
	})();

} catch(e){
	alert(e);
}
