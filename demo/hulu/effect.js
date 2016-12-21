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
		// 显示攻击效果。
		var showAttackEffect = function(actor, skill) {
			var effect = actor.attack_effect[skill];
			
			var engine = Registry.Get('iEngine');
			var loader = Registry.Get('iLoader');
			loader.LoadLibrary(effect.path);
			
			var meshwarpp = engine.FindMeshObject(effect.name); //获取到载入的对象
			// 设定特效meshobj的位置和发出攻击的actor在一块。
			var pos = actor.pcarray['pcmesh'].GetProperty("position");
			actor.pcarray['pcmesh'].PerformAction(
				'AttachSocketMesh',
				['socket', 'socketjian'],
				['object', effect.name]
			);
			//pos.y = 0.5; // 效果应该有一点高度，看起来更像是从剑上发出来的。
			meshwarpp.movable.pos = pos;
			meshwarpp.movable.Update(); //更新粒子效果的位置，让其跟随player显示
			var sectorlist = engine.sectors;
			var sec = sectorlist.Get(0);
			var meshlist = sec.meshes; //获取到sector的mesh列表
			actor.attack_effect_index = meshlist.Add(meshwarpp);   //将获取到的对象插入到列表中 attack_effect_index是一个它的index
		}
		
		// 显示升级效果。
		var showUpgradeEffect = function(actor) {
			var effect = actor.upgrade_effect[actor.level];
			
			var engine = Registry.Get('iEngine');
			var loader = Registry.Get('iLoader');
			loader.LoadLibrary(effect.path);
			
			var meshwarpp = engine.FindMeshObject(effect.name); //获取到载入的对象
			// 设定特效meshobj的位置和发出攻击的actor在一块。
			var pos = actor.pcarray['pcmesh'].GetProperty("position");
			actor.pcarray['pcmesh'].PerformAction(
				'AttachSocketMesh',
				['socket', 'socketjian'],
				['object', effect.name]
			);
			//pos.y = 0.5; // 效果应该有一点高度，看起来更像是从剑上发出来的。
			meshwarpp.movable.pos = pos;
			meshwarpp.movable.Update(); //更新粒子效果的位置，让其跟随player显示
			var sectorlist = engine.sectors;
			var sec = sectorlist.Get(0);
			var meshlist = sec.meshes; //获取到sector的mesh列表
			actor.upgrade_effect_index = meshlist.Add(meshwarpp);   //将获取到的对象插入到列表中 attack_effect_index是一个它的index
		}
	
		var nowrun = false;
		var nowturn = false;
		
		Event.Subscribe(function(e) {
			AssertTrue(typeof(e) != "undefined", "`e` is undefined");
			var actor = e.self;
			// CONSOLE.WriteLine("[Debug] effect.forword1 : '" + actor.name + "' begin");
			
			AssertTrue(typeof(actor) != "undefined", "`e` is undefined");
			AssertTrue(typeof(actor.pcarray['pcactormove']) != "undefined", "`e` is undefined");
			actor.pcarray['pcactormove'].Forward(true);
			
			AssertTrue(typeof(actor.pcarray['pcmesh']) != "undefined", "`e` is undefined");
			actor.pcarray['pcmesh'].PerformAction('SetAnimation', ['animation','run'], ['cycle', true], ['reset', false]);
			actor.state = "run";
			nowrun = false;
			nowturn = true;
		}, "effect.forward1");
		
		Event.Subscribe(function(e){
			var actor = e.self;
			// CONSOLE.WriteLine("[Debug] effect.forward0 : '" + actor.name + "'");
			
			actor.pcarray['pcactormove'].PerformAction('Forward', ['start', false]);
			actor.pcarray['pcmesh'].PerformAction('SetAnimation', ['animation', 'stand'], ['cycle', true],['reset', true]);
			actor.state = "stand";
			nowrun = true;
			nowturn = false;
		}, "effect.forward0");
		
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
		
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.state = "die";
			actor.pcarray['pcmesh'].PerformAction('SetAnimation', ['animation','die'], ['cycle', false], ['reset', false]);
		}, "effect.death");
		
		// 普通攻击效果。
		Event.Subscribe(function(e){
			var actor = e.attacker;
			
			// CONSOLE.WriteLine("[Debug] effect.attack.normal : '" + actor.name + "' begin");
			actor.pcarray['pcmesh'].PerformAction('SetAnimation', ['animation','attack'], ['cycle',false], ['reset', false]);
			
		}, "effect.attack.normal");
		
		// 带特技的攻击。
		Event.Subscribe(function(e){
			var actor = e.attacker;
			var skill = e.skill; // 攻击技能类型
			
			// CONSOLE.WriteLine("[Debug] effect.attack.special : '" + actor.name + "' , type : " + skill);
			actor.pcarray['pcmesh'].PerformAction('SetAnimation', ['animation', 'attack'], ['cycle', false], ['reset', false]);
			
			showAttackEffect(actor, skill);
			
		}, "effect.attack.special");
		
		// 攻击特效结束，将特效模型移除。
		Event.Subscribe(function(e){
			var actor = e.self;
			// CONSOLE.WriteLine("[Debug] effect.attack.special.finish : '" + actor.name + "'");
			
			// 将攻击特效删除掉。
			var engine = Registry.Get('iEngine');
			var sectorlist = engine.sectors;
			var sec = sectorlist.Get(0);
			var meshlist = sec.meshes; //获取到sector的mesh列表
			actor.pcarray['pcmesh'].PerformAction('DetachSocketMesh',['socket','socketjian']);
			meshlist.Remove(actor.attack_effect_index);   // 将我攻击效果对应的mesh从列表中删除。
		}, "effect.attack.special.finish");
		
		// 显示跑开的效果。
		Event.Subscribe(function(e) {
			var actor = e.self;
			// CONSOLE.WriteLine("[Debug] effect.runAway1 : '" + actor.name + "'");
			
			actor.state = "run";
			actor.pcarray['pcmover'].PerformAction('MoveTo', ['sectorname', 'Scene'], ['position', [e.target_x, 0, e.target_z]], ['sqradius', /*这个值是什么意思*/1], ['checklos', true]);
			
			// 跑步效果。
			//actor.pcarray['pcactormove'].PerformAction('Forward', ['start', true]);
			actor.pcarray['pcmesh'].PerformAction('SetAnimation', ['animation','run'], ['cycle', true], ['reset', false]);
			
		}, "effect.runAway1");
		// 跑开效果结束。
		Event.Subscribe(function(e) {
			var actor = e.self;
			// CONSOLE.WriteLine("[Debug] effect.runAway0 : '" + actor.name + "'");
			
			actor.state = "stand";
			
			// 跑步效果结束
			//actor.pcarray['pcactormove'].PerformAction('Forward', ['start', false]);
			actor.pcarray['pcmesh'].PerformAction('SetAnimation', ['animation', 'stand'], ['cycle', true],['reset', true]);
		}, "effect.runAway0");

		// 显示跟随效果。
		Event.Subscribe(function(e){
			var actor = e.self;
			// CONSOLE.Write("con=" + actor.name);
			var target_x = e.position.x;
			var target_z = e.position.z;
			actor.pcarray['pcmover'].PerformAction('MoveTo', ['sectorname', 'Scene'], ['position', [target_x, 0, target_z]], ['sqradius', 3], ['checklos', true]);
			actor.pcarray['pcmesh'].PerformAction('SetAnimation', ['animation','run'], ['cycle', false], ['reset', false]);
		
		}, "effect.tracer");
		
		// Player升级时候显示的效果。
		Event.Subscribe(function(e){
			var actor = e.self;
			// CONSOLE.Write("[Debug] [effect.levelup] Actor Name : " + actor.name);
			// CONSOLE.Write("[Debug] [effect.levelup] Actor Level : " + actor.level);
			showUpgradeEffect(actor);
		}, "effect.levelUp");
		
		// 升级特效结束，将特效模型移除。
		Event.Subscribe(function(e){
			var actor = e.self;
			// CONSOLE.WriteLine("[Debug] effect.levelUp.finish : '" + actor.name + "'");
			
			// 将攻击特效删除掉。
			var engine = Registry.Get('iEngine');
			var sectorlist = engine.sectors;
			var sec = sectorlist.Get(0);
			var meshlist = sec.meshes; //获取到sector的mesh列表
			actor.pcarray['pcmesh'].PerformAction('DetachSocketMesh',['socket','socketjian']);
			meshlist.Remove(actor.upgrade_effect_index);   // 将我攻击效果对应的mesh从列表中删除。
		}, "effect.levelUp.finish");
		
		Event.Subscribe(function (e){
			var actor = e.self;
			var target = e.target;
			var pos = e.position;
			actor.pcarray['pcmover'].PerformAction(
				'MoveTo',
				['sectorname', 'Scene'],
				['position', [pos.x, 0, pos.z]],
				['sqradius', 3], 
				['checklos', true]
			);
			
		}, "effect.followTarget");
		
		//物品掉落
		Event.Subscribe(function (e){
			var actor = e.self;
			goodsDrop(actor);
			
			var engine = Registry.Get('iEngine');
			var loader = Registry.Get('iLoader');
			loader.LoadLibrary("art/models/nvzhanshi/factories/xiangzi.xml");
			var meshwarpp = engine.FindMeshObject('Cube007'); //获取到载入的对象
			// 设定特效meshobj的位置和发出攻击的actor在一块。
			// alert(meshwarpp);
			var pos = actor.pcarray['pcmesh'].GetProperty("position");
		    meshwarpp.movable.pos = pos;
			meshwarpp.movable.Update(); //更新粒子效果的位置，让其跟随player显示
			var sectorlist = engine.sectors;
			var sec = sectorlist.Get(0);
			var meshlist = sec.meshes; //获取到sector的mesh列表
			// alert(meshlist);
			meshlist.Add(meshwarpp);   
			
		}, "effect.goods.drop.monster");
		
		var goodsDrop = function (actor){
			// CONSOLE.Write("[debug] [goods drop out] " + actor.name + " .\n");
			
		}

	})();

} catch(e){
	alert(e);
}