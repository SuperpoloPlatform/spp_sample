/**************************************************************************
 *
 *  This file is part of the UGE(Uniform Game Engine).
 *  Copyright (C) by SanPolo Co.Ltd. 
 *  All rights reserved.
 *
 *  See http://uge.spolo.org/ for more information.
 *
 *  SanPolo Co.Ltd
 *  http://uge.spolo.org/   sales@spolo.org uge-support@spolo.org
 *
**************************************************************************/

try {

	PLAYER = {
		name : "player",
		pc : {
			"pczonemanager" : {
				action : [
					{
						name : "Load",
						param : [
							['path', '.'],
							['file', 'level.xml']
						]
					}
				]
			},
			"pcdefaultcamera" : {
				action : [
					{
						name : "SetCamera",
						param : [
							['modename', 'thirdperson']
						]
					},
					{
						name : "SetZoneManager",
						param : [
							['entity', 'player'], //同name一致
							['region', 'main'],
							['start', 'Camera']
						]
					}
				],
				property : [
					{
						name : "distance",
						value : 3
					}
				]
			},
			"pcmover" : {},
			"pcmesh" : {
				action : [
					{
						name : "SetMesh",
						param : [
							['name','Cube']
						]
					},
					{
						name : "SetAnimation",
						param : [
							['animation','stand'],
							['cycle',true]
						]
					}
				]
			},
			"pclinearmovement" : {
				action : [
					{
						name : "InitCD",
						param : [
							['offset',[0, 0.0, 0]],
							['body',[0.5,0.5,0.5]],
							['legs',[0.5,0.9,0.5]]
						]
					}
				]
			},
			"pcactormove" : {
				action : [
					{
						name : "SetSpeed",
						param : [
							['movement',4],
							['running',2],
							['rotation',2],
							['jumping',3]
						]
					}
				],
				property : [
					{
						name : "mousemove",
						value : false
					}	
				]
			},
			// 每秒钟发送一次位置信息
			"pctimer" : {
				action : [
					{
						name : "WakeUp",
						param : [
							['time', 1000],
							['repeat', true],
							['name', 'position']
						]
					}
				]
			},
			"pccommandinput" : {
				action : [
					{
						name : "Bind",
						param : [
							['trigger','w'],
							['command','forward']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger','s'],
							['command','backward']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger','a'],
							['command','rotateleft']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger','d'],
							['command','rotateright']
						]
					},
					{
						name : "Bind",
						param : [
							// 退出键
							['trigger','ESC'],
							['command','quit']
						]
					},
					// 攻击快捷键
					{
						name : "Bind",
						param : [
							// 普通攻击
							['trigger', 'e'],
							['command', 'attack']
						]
					},
					{
						name : "Bind",
						param : [
							// 使用攻击技能1。
							['trigger', '1'],
							['command', 'attack1_keydown']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger', '2'],
							['command', 'attack2_keydown']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger', '3'],
							['command', 'attack3_keydown']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger', '4'],
							['command', 'attack4_keydown']
						]
					},
					{
						name : "Bind",   //鼠标移动
						param : [
							['trigger', 'MouseAxis0'],
							['command', 'mousemove']
						]
					},
					{
						name : "Bind",   //鼠标左键
						param : [
							['trigger', '0Mousebutton0'],
							['command', 'mouseleft']
						]
					},
					// 调试使用的快捷键。
					{
						name : "Bind",
						param : [
							['trigger','p'],
							['command','debug_getposition_keydown']
						]
					},
					{
						name : "Bind",   //背包
						param : [
							['trigger','b'],
							['command','pack']
						]
					},
					{
						name : "Bind",   //装备栏
						param : [
							['trigger','v'],
							['command','weapon']
						]
					},
					{
						name : "Bind",   //test inventory
						param : [
							['trigger','t'],
							['command','testInventory']
						]
					},
				]
			}
		},
		
		// 订阅来自entity自身发出的事件，类似于`ent.behavious();`，
		// 一般这些事件都是entity内部的property class发出的。
		event : {
			//使用event 必须使用全名。系统确保在函数内使用this会调用到相关联的entity上。
			"pctimer_position" : function(e)
			{
				var pos = this.pcarray['pcmesh'].position;
				Event.Send({
					name : "broadcast.position",
					player : this,
					position : pos
				});
				//CONSOLE.Write("player's position is : [" + pos.x + ", " + pos.y + ", " + pos.z + "]\n");
			},
			// 攻击效果结束了。
			"pctimer_attack.normal" : function(e)
			{
				CONSOLE.WriteLine("[Debug] '" + this.name + "' stop attack.");
				this.state = "stand";
			},
			// （攻击）特效结束了。
			"pctimer_attack.special" : function(e)
			{
				CONSOLE.WriteLine("[Debug] pctimer : '" + this.name + "' stop special attack effect.");
				Event.Send({
					name : "effect.attack.special.finish",
					self : this
				});
			},
			// （升级）特效结束了。
			"pctimer_levelUp.finish" : function(e)
			{
				CONSOLE.WriteLine("[Debug] [pctimer] : '" + this.name + "' stop upgrade effect.");
				Event.Send({
					name : "effect.levelUp.finish",
					self : this
				});
			},
			"pccommandinput_quit0" : function(){
				System.Quit();
			},
			"pccommandinput_forward1" : function(){
				this.control = "player";
				Event.Send({
					name : "effect.forward1",
					self : this
				});
			},
			"pccommandinput_forward0" : function(){
				Event.Send({
					name : "effect.forward0",
					self : this
				});
			},
			"pccommandinput_backward1" : function(){
				this.control = "player";
				Event.Send({
					name : "effect.backward1",
					self : this
				});
			},
			"pccommandinput_backward0" : function(){
				Event.Send({
					name : "effect.backward0",
					self : this
				});
			},
			"pccommandinput_rotateleft1" : function(){
				this.control = "player";
				Event.Send({
					name : "effect.rotateleft1",
					self : this
				});
			},
			"pccommandinput_rotateleft0" : function(){
				Event.Send({
					name : "effect.rotateleft0",
					self : this
				});
			},
			"pccommandinput_rotateright1" : function(){
				this.control = "player";
				Event.Send({
					name : "effect.rotateright1",
					self : this
				});
			},
			"pccommandinput_rotateright0" : function(){
				Event.Send({
					name : "effect.rotateright0",
					self : this
				});
			},
		},
		// 为这个entity添加属性。
		property : {
			type : "player",
			state : "stand",
			//之所以写在这里，可以把诸如pccommandinput_rotateright1时间处理代码那直接填写normalAttack.就像subscribe一样。
			// 这里响应全局的攻击事件，具体是谁攻击谁，在函数中进行判断。
			// TODO 这里假设UI才会调用到这个事件“attack.normal”，如果其他地方也调用到了，请报bug。
			normalAttack : function (e) {
				// 通过点击UI Object来调用Player发起攻击。
			},
		},
		// 订阅全局的事件。一般这些事件都是使用`Event.Send()`发送的。
		subscribe : {
			//谁会发出这些事件呢？答案是UI,所以，这里上接UI同事。
			"attack.normal" : "normalAttack"
		}
	};
	AI_PLAYER = {
		event : {
			// player发起主动攻击。
			"to_attack" : function(player, target, skill_type) {
				
			},
			"under_attack" : function(attacker, player/*被攻击*/) {
			},
		}
	};

}
catch (e)
{
	alert(e);
}