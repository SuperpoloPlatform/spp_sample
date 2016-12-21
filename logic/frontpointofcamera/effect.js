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
		
		//开始XXXX的测试代码
		Event.Subscribe(function(e){
			//TODO  需要添加的功能方案
			var actor = e.self;
			// get iPcCamera.
			var pcamera = actor.pcarray['pcdefaultcamera'].QueryInterface("iPcCamera");
			if (pcamera)
			{
				// get iCamera.
				var camera = pcamera.GetCamera();
				if (camera)
				{
					// get iCamera transform.
					var trans = camera.GetTransform();
					if (trans)
					{
						// get front.
						var v0 = trans.GetFront();
						// get camera position.
						var v1 = trans.GetO2TTranslation();
						if (v0 && v1)
						{
							// debug log. typeof (XXX.toFixed(1)) is string
							CONSOLE.Write(typeof v1[0].toFixed(1) + "\n");
							CONSOLE.Write(v1[2].toFixed(1) + "\n");
							CONSOLE.Write(v0[0].toFixed(1) + "\n");
							CONSOLE.Write(v0[2].toFixed(1) + "\n");
							CONSOLE.Write(v0.Length() + "\n");
							// 计算摄像机正前方20距离的位置
							var x = Number(20*v0[0].toFixed(1))/Number(v0.Length());
							var z = Number(20*v0[2].toFixed(1))/Number(v0.Length());
							CONSOLE.Write(x + "\n");
							CONSOLE.Write(z + "\n");
							// add camera position.
							x = Number(x.toFixed(1)) + Number(v1[0].toFixed(1));
							z = Number(z.toFixed(1)) + Number(v1[2].toFixed(1));
							CONSOLE.Write(x + "             xxxxxx \n");
							CONSOLE.Write(z + "             yyyyyy \n");
							// MoveMesh.
							monster.pcarray['pcmesh'].MoveMesh([x, 2, z]);
							// check.
							var pos = monster.pcarray['pcmesh'].position;
							CONSOLE.Write("x = " + pos.x + "   y = " + pos.y + "   z = " + pos.z + "\n");
						}
					}
				}
			}
			
		}, "effect.test");
	})();

} catch(e){
	alert(e);
}