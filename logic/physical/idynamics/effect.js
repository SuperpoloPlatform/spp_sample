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
			CONSOLE.WriteLine("player.x = " + pos.x + "   player.y = " + pos.y + "   player.z = " + pos.z + ".\n");
			pos = monster.pcarray['pcmesh'].position;
			CONSOLE.WriteLine("monster.x = " + pos.x + "   monster.y = " + pos.y + "   monster.z = " + pos.z + ".\n");
		}, "effect.getpos");
		
		//开始XXXX的测试代码
		Event.Subscribe(function(e){
			//TODO  需要添加的功能方案
			var actor = e.self;
			//创建物理子系统
			var dynamicSystem = iDynamics.CreateSystem();
			//Bullet系统
			bulletDynamicSystem = dynamicSystem.QueryInterface("CS::Physics::Bullet::iDynamicSystem");
			bulletDynamicSystem.SetInternalScale (10.0);
			//创建Body
			var irigidbody = dynamicSystem.CreateBody();
			// for(index in irigidbody)
				// CONSOLE.WriteLine("action and property of irigidbody     " + index + "\n");
			//将当前位置设置为Body的位置
			var pos = actor.pcarray['pcmesh'].position;
			irigidbody.position = [pos.x, pos.y+1, pos.z];
			//将Body和MeshWrapper绑在一起
			irigidbody.AttachMesh(meshwraper);
			//创建OrthoTransform对象
			var m0 = new Math3.Matrix3(0.4, 0.3, 0.5, 0.2, 0.7, 0.5, 0.1, 0.4, 0.1);
			var v0 = new Math3.Vector3(4.5, 3.7, 2.9);
			var r0 = new Math3.OrthoTransform(m0,v0);
			//检测OrthoTransform对象的正确性
			for( i in r0)
				CONSOLE.WriteLine(i)
			//Add a box collider to this body。
			irigidbody.AttachColliderBox([1.5, 1.5, 1.5], r0, 12, 1, 0.8);
			//设置方向和速度
			v = Math3.Vector3(10, 10, 0); 
			irigidbody.linearVelocity = v;
			
			// var yang = monster.pcarray['pccollisiondetection'].QueryInterface('iPcCollisionDetection');
			var yang = monster.pcarray['pclinearmovement'].QueryInterface('iPcLinearMovement');
			
			//开始炫MeshWrapper的变化
			C3D.engine.SubscribeFrame(function(a,b){
				if(yang.IsOnGround()){
					CONSOLE.WriteLine("hit ground");
					yang.SetOnGround(false);
				}
				iDynamics.Step(0.0003);
			});
		}, "effect.test");
	})();

} catch(e){
	alert(e);
}
