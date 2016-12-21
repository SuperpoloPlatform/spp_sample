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
		
		/*
		 *     前后行走及停止,匹配事件:effect.XXXX
		 */
		//stop
		Event.Subscribe(function(e){
			var actor = e.self;
			CONSOLE.WriteLine("[Debug] effect.stop : '" + actor.name + "'");
			
			actor.pcarray['pcactormove'].PerformAction('Clear');
			actor.pcarray['pcdefaultcamera'].SetProperty('pitchvelocity',0.0);
			actor.pcarray['pcmesh'].PerformAction('SetAnimation', ['animation', 'stand'], ['cycle', true],['reset', true]);
			actor.state = "stand";
			nowrun = true;
			nowturn = false;
		}, "effect.stop");
		
		//forward
		Event.Subscribe(function(e){
			var actor = e.self;
			w_r_mark = e.mark%2;
			CONSOLE.WriteLine("[Debug] [effect.forward1] : '" + w_r_mark + "'");
			actor.pcarray['pcactormove'].PerformAction('Forward', ['start', true]);
			if(w_r_mark == 0)
			{
				actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
				actor.state = "run";
			}
			else
			{
				actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','walk'],['cycle',true],['reset', false]);
				actor.state = "walk";
			}
			nowrun = false;
			nowturn = true;
		}, "effect.forward1");
		Event.Subscribe(function(e){
			var actor = e.self;
			CONSOLE.WriteLine("[Debug] [effect.forward0] : '" + actor.name + "'");
			actor.pcarray['pcactormove'].PerformAction('Forward', ['start', false]);
			actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
			actor.state = "stand";
			nowrun = true;
			nowturn = false;
		}, "effect.forward0");
		
		//backward
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].PerformAction('Backward', ['start', true]);
			actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
			actor.state = "run";
			nowrun = false;
			nowturn = true;
		}, "effect.backward1");
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].PerformAction('Backward', ['start', false]);
			actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
			actor.state = "stand";
			nowrun = true;
			nowturn = false;
		}, "effect.backward0");
		
		/*
		 *     左右转向及停止,匹配事件:effect.rotateXXXX
		 */
		//left
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].PerformAction('RotateLeft', ['start', true]);
			if(nowturn){
				actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
			} else {
				actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
			}
		}, "effect.rotateleft1");
		Event.Subscribe(function(e){
			var actor = e.self;
			var pos = actor.pcarray['pcmesh'].GetProperty("position");
			CONSOLE.Write("player's position is : [" + pos.x + ", " + pos.y + ", " + pos.z + "]\n");
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
		
		//right
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].PerformAction('RotateRight', ['start', true]);
			if(nowturn){
				actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
			} else {
				actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
			}
		}, "effect.rotateright1");
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
		//effect.changeview0
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].PerformAction('ToggleCameraMode', []);
		}, "effect.changeview0");

		/*
		 *     视角向上下及停止,匹配事件:effect.rotateXXXX
		 */
		//up
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcdefaultcamera'].SetProperty('pitchvelocity',1.0);
			CONSOLE.WriteLine("[Debug] effect.rotateup1 : '" + actor.name + "'");
		}, "effect.rotateup1");
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcdefaultcamera'].SetProperty('pitchvelocity',0.0);
			CONSOLE.WriteLine("[Debug] effect.rotateup0 : '" + actor.name + "'");
		}, "effect.rotateup0");

		//down
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcdefaultcamera'].SetProperty('pitchvelocity',-1.0);
			CONSOLE.WriteLine("[Debug] effect.rotatedown1 : '" + actor.name + "'");
		}, "effect.rotatedown1");
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcdefaultcamera'].SetProperty('pitchvelocity',0.0);
			CONSOLE.WriteLine("[Debug] effect.rotatedown0 : '" + actor.name + "'");
		}, "effect.rotatedown0");
		
		/*
		 *     快速定位,匹配事件:effect.quick.to.position
		 */
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcdefaultcamera'].PerformAction('SetCamera', ['pitch', 0]);
			actor.pcarray['pcmesh'].PerformAction('MoveMesh', ['position', [POSITION[e.id].position_x, POSITION[e.id].position_y, POSITION[e.id].position_z]]);
			CONSOLE.WriteLine("[Debug] effect.quick.to.position : '" +POSITION[e.id].name + "'");
		}, "effect.quick.to.position");
		//High  沙盘模式
		Event.Subscribe(function(e){
			var actor = e.self;
			var pos = actor.pcarray['pcmesh'].GetProperty("position");
			var pitch = actor.pcarray['pcdefaultcamera'].GetProperty('pitch');
			CONSOLE.Write("[debug] [pitch] is :" + pitch + " .\n");
			CONSOLE.Write("player's position is : [" + pos.x + ", " + pos.y + ", " + pos.z + "]\n");
			actor.pcarray['pcmesh'].PerformAction('SetMesh',['name',PERSONDATA[e.id].mesh]);
			actor.pcarray['pcmesh'].PerformAction('MoveMesh', ['position', [-549.9447, 1200.4852, 606.4267]]);
			actor.pcarray['pcdefaultcamera'].PerformAction('SetCamera', ['pitch', -1.084]);
			CONSOLE.WriteLine("[Debug] effect.move.high_mode : '" + actor.name + "'");
		}, "effect.move.high_mode");

		/*
		 *     换装,匹配事件:effect.change
		 */
		var mesh_id;
		var parent_mesh;
		Event.Subscribe(function(e){	
			var actor = e.self;
			mesh_id = e.id;
			var position = actor.pcarray['pcmesh'].GetProperty("position");
			var meshname = actor.pcarray['pcmesh'].GetProperty("meshname");//获得当前mesh的name
			parent_mesh =meshname;
			actor.pcarray['pclinearmovement'].SetProperty('gravity', [19.6]);
			actor.pcarray['pcmesh'].PerformAction('SetVisible',['visible', false]);
			actor.pcarray['pcmesh'].PerformAction('SetMesh',['name',PERSONDATA[e.id].mesh]);
			actor.pcarray['pclinearmovement'].PerformAction('InitCD',['offset',[0, 0.0, 0]],['body',[0.5,0.5,0.5]],['legs',[0.5,0.9,0.5]]);
			if(!(meshname == 'Cube')){
				actor.pcarray['pcmesh'].PerformAction('MoveMesh', ['position', [position.x,position.y, position.z]]);
			}
			actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
			actor.pcarray['pcmesh'].PerformAction('SetVisible',['visible', true]);
			a=0.0;
			CONSOLE.WriteLine("[Debug] effect.change : '" + actor.name + "'");
		}, "effect.change");
		
		/*
		 *     同一平面的上下左右前后移动及停止,匹配事件:effect.line.XXXX
		 */
		//left
		Event.Subscribe(function(e){	
			var actor = e.self;
			actor.pcarray['pcactormove'].PerformAction('StrafeLeft', ['start', true]);
			actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
		}, "effect.line.left1");
		Event.Subscribe(function(e){	
			var actor = e.self;
			actor.pcarray['pcactormove'].PerformAction('StrafeLeft', ['start', false]);
			actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
		}, "effect.line.left0");
		
		//right
		Event.Subscribe(function(e){	
			var actor = e.self;
			actor.pcarray['pcactormove'].PerformAction('StrafeRight', ['start', true]);
			actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
		}, "effect.line.right1");
		Event.Subscribe(function(e){	
			var actor = e.self;
			actor.pcarray['pcactormove'].PerformAction('StrafeRight', ['start', false]);
			actor.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
		}, "effect.line.right0");
		
		//up
		var a=0;
		Event.Subscribe(function(e){	
			var actor = e.self;//e.i
			var position = actor.pcarray['pcmesh'].GetProperty("position");
			CONSOLE.Write("player's position is : [" + position.x + ", " + position.y + ", " + position.z + "]\n");
			//a+=0.5;
			//actor.pcarray['pclinearmovement'].PerformAction('InitCD',['offset',[0, 0-a, 0]],['body',[0.5,0.5,0.5]],['legs',[0.5,0.9,0.5]]);
			actor.pcarray['pclinearmovement'].SetProperty('gravity', [0.0]);
			actor.pcarray['pcmesh'].PerformAction('MoveMesh', ['position', [position.x, position.y + 2, position.z]]);
		}, "effect.line.up1");
		
		//down
		Event.Subscribe(function(e){
			var actor = e.self;
			var position = actor.pcarray['pcmesh'].GetProperty("position");
			if(position.y > -9.3825){
			//a-=0.5;
				//actor.pcarray['pclinearmovement'].PerformAction('InitCD',['offset',[0, 0-a, 0]],['body',[0.5,0.5,0.5]],['legs',[0.5,0.9,0.5]]);
				actor.pcarray['pclinearmovement'].SetProperty('gravity', [0.0]);
				actor.pcarray['pcmesh'].PerformAction('MoveMesh', ['position', [position.x, position.y - 2, position.z]]);
			}
		}, "effect.line.down1");
		
		/*
		 *  以下事件暂未用到
		 */
		//人物挂掉,匹配事件:effect.death
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.state = "die";
			actor.pcarray['pcmesh'].PerformAction('SetAnimation', ['animation','die'], ['cycle', false], ['reset', false]);
		}, "effect.death");
		
		//人物攻击,匹配事件:effect.attack1
		Event.Subscribe(function(e){
			var actor = e.self;
			CONSOLE.WriteLine("[Debug] effect.attack1 : '" + actor.name + "'");
			actor.pcarray['pcmesh'].PerformAction('SetAnimation', ['animation','attack'], ['cycle',true], ['reset', true]);
		}, "effect.attack1");

		//跟随效果,匹配事件:effect.tracer
		Event.Subscribe(function(e){
			var actor = e.self;
			CONSOLE.Write("con=" + actor.name);
			var target_x = e.position.x;
			var target_z = e.position.z;
			actor.pcarray['pcmover'].PerformAction('MoveTo', ['sectorname', 'Scene'], ['position', [target_x, 0, target_z]], ['sqradius', 3], ['checklos', true]);
			actor.pcarray['pcmesh'].PerformAction('SetAnimation', ['animation','run'], ['cycle', false], ['reset', false]);
		}, "effect.tracer");
		
		//删除某个Entity
		Event.Subscribe(function(e){
			var actor = e.self;
			var engine = Registry.Get('iEngine');
			var meshwarpp = engine.FindMeshObject(PERSONDATA[mesh_id].mesh); //获取到载入的对象
			var sectorlist = engine.sectors;
			var sec = sectorlist.Get(0);
			var meshlist = sec.meshes; //获取到sector的mesh列表
			meshindex = meshlist.Find(meshwarpp);
			meshlist.Remove(meshindex);
		}, "effect.delete");
		//关闭UI,恢复entity原有的位置
		Event.Subscribe(function(e){	
			var actor = e.self;
			actor.pcarray['pcmesh'].PerformAction('SetMesh',['name',parent_mesh]);
			actor.pcarray['pcmesh'].PerformAction('SetVisible',['visible', true]);
		}, "effect.restore");
		
	})();

} catch(e){
	alert(e);
}