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
							['modename', 'freelook']
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
						value : 10
					}
				]
			},
			"pcmover" : {},
			"pcmesh" : {
				action : [
					{
						name : "SetMesh",
						param : [
							['name','tree']
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
							['body',[10.5,10.5,10.5]],
							['legs',[0.5,0.9,0.5]]
						]
					}
				],
				property : [
					{
						name : "gravity",
						value : 0
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
			"pcmeshselect" : {
				action : [
					{
						name : "SetCamera",
						param : [
							['entity', 'player']
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
				]
			}
		},
		
		// 订阅来自entity自身发出的事件，类似于`ent.behavious();`，
		// 一般这些事件都是entity内部的property class发出的。
		event : {
					
			"pccommandinput_quit0" : function(){
				System.Quit();
			},
			"pccommandinput_forward1" : function(){
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
			
			"pccommandinput_mousemove" : function (msgid, x, y){
				if(this.mouseleft){
					CONSOLE.Write("[debug] [mousemove] x: " + x[1] + "   y: " + y[1] + ".\n");
					Event.Send({
						name : "effect.mousemove",
						self : this,
						mouse_x : x[1],
						mouse_y : y[1]
					});
				}
			},
			"pccommandinput_mouseleft1" : function (){
				player.mouseleft = true;
			},
			"pccommandinput_mouseleft0" : function (){
				player.mouseleft = false;
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
		},
		// 为这个entity添加属性。
		property : {
			// 用于判断鼠标左键是否按下。
			mouseleft: false,
		},
		// 订阅全局的事件。一般这些事件都是使用`Event.Send()`发送的。
		subscribe : {
			//谁会发出这些事件呢？答案是UI,所以，这里上接UI同事。
			
		}
	};


}
catch (e)
{
	alert(e);
}