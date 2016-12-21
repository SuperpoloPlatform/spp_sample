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
		var id = 0;
		var flag = 0;
		var meshID = 0;
		Event.Subscribe(function(e) {
			var actor = e.self;
			actor.pcarray['pcactormove'].Forward(true);
			actor.pcarray['pcmesh'].SetAnimation("run", true, false);
			// var b = false;
			// var center = C3D.engine.FindMeshObject(meshObjName).GetWorldBoundingBox();
			id = C3D.engine.SubscribeFrame(function(){
				
				var a = collection.FindMeshObject("Box02_3");
				var ooo = a.GetWorldBoundingBox();
				var center = C3D.engine.FindMeshObject(meshObjName).GetWorldBoundingBox();
				// max
				var maxx = center.MaxX();
				var maxy = center.MaxY();
				var maxz = center.MaxZ();
				center.SetMax(0, maxx+10);
				center.SetMax(1, maxy+10);
				center.SetMax(2, maxz+10);
				
				// min
				var minx = center.MinX();
				var miny = center.MinY();
				var minz = center.MinZ();
				center.SetMin(0, minx-10);
				center.SetMin(1, miny-10);
				center.SetMin(2, minz-10);
				// center.
				// CONSOLE.WriteLine(center[0] + "        " + center[1] + "         " + center[2]);
				var radius = C3D.engine.FindMeshObject(meshObjName).radius.GetRadius();
				// CONSOLE.WriteLine(radius);
				var lll = cc.GetCenter();
				CONSOLE.WriteLine(lll[0] + "        " + lll[1] + "         " + lll[2]);
				
				var b = center.TestIntersect(ooo);
				if(b) {
					// alert("the two boxes have an intersection.");
					var sectorlist = C3D.engine.sectors;
					var sec = sectorlist.Get(0);
					var meshlist = sec.meshes;
					EXIST_YANG = meshlist.FindByName("Box02_3"); 
					if(!EXIST_YANG)
					{
						meshID = C3D.engine.sectors.Get(0).meshes.Add(a);
						C3D.engine.UnsubscribeFrame(id);
					}
				} else {
					var sectorlist = C3D.engine.sectors;
					var sec = sectorlist.Get(0);
					var meshlist = sec.meshes;
					EXIST_YANG = meshlist.FindByName("Box02_3");
					if(EXIST_YANG)
					{
						C3D.engine.sectors.Get(0).meshes.Remove(meshID);
					}
				}
			});
		}, "effect.forward1");
		//W键抬起，前停
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].Forward(false);
			actor.pcarray['pcmesh'].SetAnimation("stand", true, false);
			C3D.engine.UnsubscribeFrame(id);
		}, "effect.forward0");
		//S键按下，后走
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].Backward(true);
			actor.pcarray['pcmesh'].SetAnimation("run", true, false);
			id = C3D.engine.SubscribeFrame(function(){
				
			});
		}, "effect.backward1");
		//S键抬起，后停
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].Backward(false);
			actor.pcarray['pcmesh'].SetAnimation("stand", true, false);
			C3D.engine.UnsubscribeFrame(id);
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
		
		//R键按下，上移
		Event.Subscribe(function(e) {
			var actor = e.self;
			actor.pcarray['pclinearmovement'].gravity = 0;
			actor.pcarray['pclinearmovement'].SetVelocity([0, 100, 0]);
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
			actor.pcarray['pclinearmovement'].SetVelocity([0, 0, 1]);
			CONSOLE.Write("x = " + pos.x + "   y = " + pos.y + "   z = " + pos.z + ".\n");
		}, "effect.getpos");
		
		//开始XXXX的测试代码
		Event.Subscribe(function(e){
			//TODO  需要添加的功能方案
		}, "effect.test");
	})();

} catch(e){
	alert(e);
}