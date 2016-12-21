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

	GIRL = {
		name : "girl",
		pc : {
			"pczonemanager" : {
				action : [
					{
						name : "Load",
						param : [
							['path', '.'],
							['file', '/art/world.xml']
						]
					}
				]
			},
			"pcdefaultcamera" : {
				action : [
					{
						name : "SetCamera",
						param : [
							// @xxdebug 使用第一人称测试，不要body挡住视线。
							['modename', 'thirdperson']
							//['modename', 'firstperson']
						]
					},
					{
						name : "SetZoneManager",
						param : [
							['entity', 'girl'], //同name一致
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
			"pcmesh" : {
				action : [
					{
						name : "SetMesh",
						param : [
							['name','girl']
						]
					},
					{
						name : "SetAnimation",
						param : [
							['animation', 'stand'],
							['cycle', true]
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
				]/*,
				property : [
					{
						name : "gravity",
						value : 0
					}
				]*/
			},
			"pcactormove" : {
				action : [
					{
						name : "SetSpeed",
						param : [
							// @xxdebug 场景比较大，测试的时候使用快速模式。
							//['movement', 4],
							['movement', 4],
							['running', 2],
							['rotation', 2],
							['jumping', 20]
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
			"pcmeshselect" : {
				action : [
					{
						name : "SetCamera",
						param : [
							['entity', 'girl']
						]
					},
					{
						name : "SetMouseButtons",
						param : [
							['buttons','r']
						]
					}
				],
				property : [
					{
						name : "global",
						value : true
					},
					{
						name : "follow",
						value : true
					}
				]
			},
			"pccommandinput" : {
				action : [
					{
						name : "Bind",
						param : [
							['trigger','y'],
							['command','add_yang']
						]
					},
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
							['trigger','e'],
							['command','rotateup']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger','c'],
							['command','rotatedown']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger','space'],
							['command','jump']
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
					//鼠标控制
					{
						name : "Bind",
						param : [
								['trigger','MouseAxis0'],
								['command','mousemove']
						]
					},
					//鼠标左键
					{
						name : "Bind",
						param : [
								['trigger','MouseButton0'],
								['command','mouseleft']
						]
					},
					{
						name : "Bind",   //鼠标滚轮向前
						param : [
							['trigger', 'MouseButton3'],
							['command', 'mouseforward']
						]
					},
					{
						name : "Bind",   //鼠标滚轮向后
						param : [
							['trigger', 'MouseButton4'],
							['command', 'mousebackward']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger', 'tab'],
							['command', 'changeview']
						]
					},
					// 调试使用的快捷键。
					{
						name : "Bind",
						param : [
							['trigger','p'],
							['command','debug_getposition_keydown']
						]
					}
				]
			}
		},
		
		// 订阅来自entity自身发出的事件，类似于`ent.behavious();`，
		// 一般这些事件都是entity内部的property class发出的。
		event : {
			//使用event 必须使用全名。系统确保在函数内使用this会调用到相关联的entity上。
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
			"pccommandinput_rotateup0" : function(){
				Event.Send({
					name : "effect.rotateup0",
					self : this
				});
			},
			"pccommandinput_rotateup1" : function(){
				Event.Send({
					name : "effect.rotateup1",
					self : this
				});
			},
			"pccommandinput_rotatedown0" : function(){
				Event.Send({
					name : "effect.rotatedown0",
					self : this
				});
			},
			"pccommandinput_rotatedown1" : function(){
				Event.Send({
					name : "effect.rotatedown1",
					self : this
				});
			},
			"pccommandinput_jump1" : function(){
				Event.Send({
					name : "effect.jump1",
					self : this
				});
			},
			"pccommandinput_jump0" : function(){
				Event.Send({
					name : "effect.jump0",
					self : this
				});
			},
			"pccommandinput_changeview0" : function(){
				Event.Send({
					name : "effect.changeview0",
					self : this
				});
			},
			"pccommandinput_mousemove" : function (msgid, x, y){
				/*
				// 没有鼠标控制
				if(this.mouseleft){
					//CONSOLE.Write("[debug] [mousemove] x: " + x[1] + "   y: " + y[1] + ".\n");
					Event.Send({
						name : "effect.mousemove",
						self : this,
						mouse_x : x[1],
						mouse_y : y[1]
					});
				}*/
			},
			"pccommandinput_mouseleft1" : function () {
				this.pcarray['pcmesh'].SetAnimation('stand', true, true);
				this.mouseleft = true;
			},
			"pccommandinput_mouseleft0" : function () {
				this.mouseleft = false;
				Event.Send({
						name : "effect.mousemoveStop",
						self : this
					});
			},
			// 滚轮向前，camera向前移动
			"pccommandinput_mouseforward1":function(){
				if(this.pcarray['pcdefaultcamera'].distance > 0.2)
				{
					Event.Send({
						name:"effect.mouseforward",
						self:this
					});
				}
			},
			// 滚轮向后，camera向后移动
			"pccommandinput_mousebackward1":function(){
				if(this.pcarray['pcdefaultcamera'].distance < 5)
				{
					Event.Send({
						name:"effect.mousebackward",
						self:this
					});
				}
			},
			"pccommandinput_debug_getposition_keydown1" : function() {
				// 调试时候获取player的坐标。
				var pos = this.pcarray['pcmesh'].position;
				CONSOLE.WriteLine("y=\"" + pos.y + "\" x=\"" + pos.x + "\" z=\"" + pos.z + "\"");
			}
		},
		// 为这个entity添加属性。
		property : {
			type : "player",
			state : "stand",
			//之所以写在这里，可以把诸如pccommandinput_rotateright1时间处理代码那直接填写normalAttack.就像subscribe一样。
			// 这里响应全局的攻击事件，具体是谁攻击谁，在函数中进行判断。
			// TODO 这里假设UI才会调用到这个事件“attack.normal”，如果其他地方也调用到了，请报bug。
			playerPack : function() {}
		},
		// 订阅全局的事件。一般这些事件都是使用`Event.Send()`发送的。
		subscribe : {
			//谁会发出这些事件呢？答案是UI,所以，这里上接UI同事。
			"ui.player.pack.set" : "playerPack",   //背包数据保存
			"ui.player.weapons.set" : "rehanding"   //换装数据保存
		}
	};
	AI_GIRL = {
		event : {
			// player发起主动攻击。
			"to_attack" : function(player, target, skill_type) {
				
			},
			"under_attack" : function(attacker, player/*被攻击*/) {
			},
			// 当怪被砍死之后，调用进来，进行经验值的添加操作，
			// 如果经验值满足升级条件，则进行升级操作。
			"levelUp" : function (under_attack, attacker){
				
			}
		}
	};

}
catch (e)
{
	alert(e);
}