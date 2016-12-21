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
						value : 10
					}
				]
			},
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
			},
			"pctimer" : {
				action : [
					{
						name : "WakeUp",
						param : [
							['time', 5000],
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
							['trigger','Shift+s'],
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
							['trigger','ESC'],
							['command','quit']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger','m'],
							['command','getpos']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger','k'],
							['command','disable']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger','mouseButton0'],
							['command','able']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger','o'],
							['command','add']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger','p'],
							['command','del']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger','i'],
							['command','cooked']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger','x'],
							['command','cycle']
						]
					},
				]
			}
		},
		event : {
			"pctimer_position" : function(e)
			{
				CONSOLE.WriteLine("After Five seconds, event is Activate(true) and mouseButton0");
				this.pcarray['pccommandinput'].Activate(true);
				//鼠标左键点击时，会去掉所有bind事件
				this.pcarray['pccommandinput'].Bind('mouseButton0', 'able');
			},
			"pccommandinput_disable1" : function(e)
			{
				Event.Send({
					name : "effect.disable",
					self : this
				});
			},
			"pccommandinput_cycle_" : function(e)
			{
				Event.Send({
					name : "effect.cycle",
					self : this
				});
			},
			"pccommandinput_able1" : function(e)
			{
				Event.Send({
					name : "effect.able",
					self : this
				});
			},
			"pccommandinput_add1" : function(e)
			{
				Event.Send({
					name : "effect.add",
					self : this
				});
			},
			"pccommandinput_del1" : function(e)
			{
				Event.Send({
					name : "effect.del",
					self : this
				});
			},
			"pccommandinput_cooked1" : function(e)
			{
				Event.Send({
					name : "effect.cooked",
					self : this
				});
			},
			"pccommandinput_getpos1" : function(e)
			{
				Event.Send({
					name : "effect.getpos",
					self : this
				});
			},
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
			"pccommandinput_rotateup1" : function(){
				Event.Send({
					name : "effect.rotateup1",
					self : this
				});
			},
			"pccommandinput_rotateup0" : function(){
				Event.Send({
					name : "effect.rotateup0",
					self : this
				});
			},
			"pccommandinput_rotatedown1" : function(){
				Event.Send({
					name : "effect.rotatedown1",
					self : this
				});
			},
			"pccommandinput_rotatedown0" : function(){
				Event.Send({
					name : "effect.rotatedown0",
					self : this
				});
			},
		},
		property : {
		},
		subscribe : {
		}
	};
}
catch (e)
{
	alert(e);
}