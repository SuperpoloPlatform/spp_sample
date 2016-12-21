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
		// W键按下，前走
		Event.Subscribe(function(e) {
			var actor = e.self;
			actor.pcarray['pcactormove'].Forward(true);
		}, "effect.forward1");
		// W键抬起，前停
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].Forward(false);
		}, "effect.forward0");
		// S键按下，后走
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].Backward(true);
		}, "effect.backward1");
		// S键抬起，后停
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].Backward(false);
		}, "effect.backward0");
		// A键按下，左转
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].RotateLeft(true);
		}, "effect.rotateleft1");
		// A键抬起，转停
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].RotateLeft(false);
		}, "effect.rotateleft0");
		// D键按下，右转
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].RotateRight(true);
		}, "effect.rotateright1");
		// D键抬起，转停
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].RotateRight(false);
		}, "effect.rotateright0");
		
		// E键按下，视角向上
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcdefaultcamera'].pitchvelocity = 1.0;
		}, "effect.rotateup1");
		// E键抬起，视角向上停止
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcdefaultcamera'].pitchvelocity = 0.0;
		}, "effect.rotateup0");
		
		// C键按下，视角向下
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcdefaultcamera'].pitchvelocity = -1.0;
		}, "effect.rotatedown1");
		// C键抬起，视角向下停止
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcdefaultcamera'].pitchvelocity = 0.0;
		}, "effect.rotatedown0");
		
		// 获得当时的点的坐标
		Event.Subscribe(function(e){
			var actor = e.self;
			var pos = actor.pcarray['pcmesh'].position;
			CONSOLE.Write("x = " + pos.x + "   y = " + pos.y + "   z = " + pos.z + ".\n");
		}, "effect.getpos");
		
		// 开始XXXX的测试代码
		Event.Subscribe(function(e){
			// TODO  需要添加的功能方案
			var sectorlist = C3D.engine.sectors;
			var sec = sectorlist.Get(0);
			var meshlist = sec.meshes;
			
			var star_meshObj = C3D.engine.meshes.FindByName("Cube");
			// alert(star_meshObj.meshObject.SupportsHardTransform());
			var meshobjHardtran = star_meshObj.meshObject.SupportsHardTransform()
			CONSOLE.Write("\nmeshObject是否支持hardtransform ( true/false ) = " + meshobjHardtran + "\n");
			if(meshobjHardtran)
			{
				// 需要添加一个csReversibleTransform参数
				// star_meshObj.HardTransform( csReversibleTransform );
			}
			// 获得“Cube”meshwrapper的工厂
			var meshFac = star_meshObj.GetFactory();
			// 获得“Cube”meshobject的工厂
			var meshObjFac = star_meshObj.meshObject.GetFactory();
			// 判断是否支持HardTransform
			var meshObjFacHardtran = meshObjFac.IsSupportsHardTransform();
			CONSOLE.Write("\nmeshObjFac是否支持hardtransform ( true/false ) = " + meshObjFacHardtran + "\n");
			if(meshObjFacHardtran)
			{
				CONSOLE.Write("meshObjFac support HardTransform. \n");
				// GetTransform
				var transf = meshFac.GetTransform();
				// GetMatrix
				var matrix2 = transf.GetT2O();
				// change Matrix
				/**
					此时注意：SetScale中的参数的值和缩放成正比，即：
					1、<1，为缩小
					2、>1，为放大
				*/
				matrix2.SetScale(2, 2, 2);
				// SetMatrix
				transf.SetT2O(matrix2);
				// HardTransform
				meshFac.HardTransform(transf);
				
				/**
					以下为测试的时候用的：用变换后的meshFactoryWrapper创建出MeshWrapper，并添加到sector中进行显示
				*/
				var meshWrapper = C3D.engine.CreateMeshWrapper(meshFac, "newmesh");
				if(meshWrapper)
				{
					var pos = [15, 10, 15];
					// mesh的显示位置
					meshWrapper.movable.pos = pos;
					meshWrapper.movable.Update();
					// 添加到sector中
					meshlist.Add(meshWrapper);
				}
			}
			
			// 判断添加的MeshWrapper是否已经存在
			var res = meshlist.FindByName("newmesh");
			CONSOLE.Write( "CreateMeshWrapper is " + res + "\n" );
		}, "effect.test");
	})();

} catch(e){
	alert(e);
}