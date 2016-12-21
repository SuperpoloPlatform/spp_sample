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
		Event.Subscribe(function(e) {
			var actor = e.self;
			pos = actor.pcarray['pcmesh'].GetProperty('position');
			CONSOLE.WriteLine("[Debug] effect.forword1 : '" + pos.x + " " + pos.y + " " + pos.z + "' begin");
			actor.pcarray['pcactormove'].Forward(true);
			actor.pcarray['pcmesh'].SetAnimation('run', true, false);
			
			var direct = new Math3.Vector3(3, 1, -3);
			//mesh 对象
			var meshObj = engine.meshes.FindByName('Cube');
			//获取 mesh 对象 transform
			var transRev = meshObj.movable.GetTransform().GetTransform();
			//设置四元组
			var quater = new Math3.Quaternion(transRev.GetT2O());
			//获取四元组矩阵
			var quaterMatrix = quater.GetMatrix();
			//计算方向向量
			// pos = box.pcarray['pcmesh'].position;
			var direct = quaterMatrix.MultVector(direct);
			CONSOLE.Write("d0 :" + direct.x + "; " + direct.y + "; " + direct.z + " .\n");
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
			Event.Send({
				name : "effect.direction"
			});
			
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
			Event.Send({
				name : "effect.direction"
			});
			
		}, "effect.rotateright0");
		
		/**
			动态创建Sequence标签
		*/
		//direct = new Math3.Vector3(0, 0, 0);
		Event.Subscribe(function(e){
			/**
				正方向方向向量
			*/
			
			//mesh 对象
			var meshObj = engine.meshes.FindByName('Cube');
			//获取 mesh 对象 transform
			var transRev = meshObj.movable.GetTransform().GetTransform();
			direct = transRev.GetT2OTranslation();
			CONSOLE.Write("d00 :" + direct.x + "; " + direct.y + "; " + direct.z + " .\n");
			//设置四元组
			var quater = new Math3.Quaternion(transRev.GetT2O());
			//获取四元组矩阵
			var quaterMatrix = quater.GetMatrix();
			//计算方向向量
			// pos = box.pcarray['pcmesh'].position;
			direct = quaterMatrix.MultVector(direct);
			// for(i in direct){
				// CONSOLE.Write("i1 :" + i + "; " + direct[i] + " .\n");
			// }
			CONSOLE.Write("d0 :" + direct.x + "; " + direct.y + "; " + direct.z + " .\n");
			/**
				正方向的左右两个方向向量
			*/
			matrix1 = new Math3.Matrix3(0, 0, 1, 0, 1, 0, -1, 0, 0);
			matrix2 = new Math3.Matrix3(0, 0, 1, 0, 1, 0, 1, 0, 0);
			offSet1 = matrix1.MultVector(direct);
			offSet2 = matrix2.MultVector(direct);
			CONSOLE.Write("d1 :" + offSet1.x + "; " + offSet1.y + "; " + offSet1.z + " .\n");
			CONSOLE.Write("d2 :" + offSet2.x + "; " + offSet2.y + "; " + offSet2.z + " .\n");
			
		}, "effect.direction");
		
		Event.Subscribe(function(e){
			//C3D为全局变量
			var actor = e.self;
			CONSOLE.Write("typeof :" + typeof(offSet1) + " .\n");
			if(typeof(offSet1) == "undefined" && typeof(offSet2) == "undefined"){
				/**
				正方向方向向量
				*/
				//mesh 对象
				var meshObj = engine.meshes.FindByName('Cube');
				//获取 mesh 对象 transform
				var transRev = meshObj.movable.GetTransform().GetTransform();
				direct = transRev.GetT2OTranslation();
				//设置四元组
				var quater = new Math3.Quaternion(transRev.GetT2O());
				//获取四元组矩阵
				var quaterMatrix = quater.GetMatrix();
				//计算方向向量
				// pos = box.pcarray['pcmesh'].position;
				direct = quaterMatrix.MultVector(direct);
				matrix1 = new Math3.Matrix3(0, 0, 1, 0, 1, 0, -1, 0, 0);
				matrix2 = new Math3.Matrix3(0, 0, -1, 0, 1, 0, 1, 0, 0);
				offSet1 = matrix1.MultVector(direct);
				offSet2 = matrix2.MultVector(direct);
			}
			offSet1 = new Math3.Vector3(offSet1.x, 0, offSet1.z);
			offSet2 = new Math3.Vector3(offSet2.x, 0, offSet2.z);
			CONSOLE.Write("d3 :" + offSet1.x + "; " + offSet1.y + "; " + offSet1.z + " .\n");
			CONSOLE.Write("d4 :" + offSet2.x + "; " + offSet2.y + "; " + offSet2.z + " .\n");
			//为全局变量，设置值
			// offSet1 = newVector1;
			// offSet2 = newVector2;
			/**
				动态创建Sequence
			*/
			//获取iSequenceManager，用来管理sequence
			var seqManager = C3D.seqmanager;
			//获取iEngineSequenceManager
			var enSequence = C3D.ensequence;
			//创建 CreateSequence
			var sequenceWrap = enSequence.CreateSequence('shakeEffect1');
			//创建 CreateParameterESM mesh对象
			var meshObj = engine.meshes.FindByName('Cube');
			var meshEsm = enSequence.CreateParameterESM(meshObj);
			//创建 CreateTrigger
			var trigger = enSequence.CreateTrigger('shakeTrigger');
			//创建 CreateParameterESM trigger对象
			var triggerEsm = enSequence.CreateParameterESM(trigger);
			/**
				设置Sequence移动列表
			*/
			//设置移动位置
			sequenceWrap.AddOperationMoveDuration(300, meshEsm, offSet1,30);
			//设置时间延迟
			sequenceWrap.AddOperationCheckTrigger(330, triggerEsm, 20);
			sequenceWrap.AddOperationMoveDuration(350, meshEsm, offSet2,30);
			sequenceWrap.AddOperationTriggerState(380, triggerEsm, 20);
			sequenceWrap.AddOperationMoveDuration(400, meshEsm, offSet2,30);
			sequenceWrap.AddOperationTriggerState(430, triggerEsm, 20);
			sequenceWrap.AddOperationMoveDuration(450, meshEsm, offSet1,30);
			sequenceWrap.AddOperationTriggerState(480, triggerEsm, 20);
			sequenceWrap.AddOperationMoveDuration(500, meshEsm, offSet1,30);
			sequenceWrap.AddOperationTriggerState(530, triggerEsm, 20);
			sequenceWrap.AddOperationMoveDuration(550, meshEsm, offSet2,30);
			sequenceWrap.AddOperationTriggerState(580, triggerEsm, 20);
			sequenceWrap.AddOperationMoveDuration(600, meshEsm, offSet2,30);
			sequenceWrap.AddOperationTriggerState(630, triggerEsm, 20);
			sequenceWrap.AddOperationMoveDuration(650, meshEsm, offSet1,30);
			//获取iSequence，sequence属性封装了Set和Get
			var seq = sequenceWrap.sequence;
			//RunSequence可以有缺省值
			seqManager.RunSequence(1, seq);
			
		}, "effect.shakeStart.effect1");
		
		/**
			在world.xml文件，加Sequence标签
		*/
		Event.Subscribe(function(e){
			//C3D为全局变量
			var actor = e.self;
			//获取iSequenceManager，用来管理sequence
			var seqManager = C3D.seqmanager;
			//获取iEngineSequenceManager
			var enSequence = C3D.ensequence;
			var sequenceWrap = enSequence.FindSequenceByName('shakeEffect2');
			//获取iSequence，sequence属性封装了Set和Get
			var sequence = sequenceWrap.sequence;
			//RunSequence可以有缺省值
			seqManager.RunSequence(1, sequence);
		}, "effect.shakeStart.effect2");
		
	})();
} catch(e){
        alert(e);
}
