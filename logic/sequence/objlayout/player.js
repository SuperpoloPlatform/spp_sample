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
			"pcmover" : {},
			"pcpathfinder" : {},
			"pcsteer" : {},
			"pcmesh" : {
				action : [
					{
						name : "SetMesh",
						param : [
							['name','woman']
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
			},
			"pctimer" : {},
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
							['trigger','x'],
							['command','getpos']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger','u'],
							['command','start']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger','i'],
							['command','suspend']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger','o'],
							['command','resume']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger','p'],
							['command','over']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger','n'],
							['command','xml_open']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger','m'],
							['command','xml_close']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger','k'],
							['command','js_open']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger','l'],
							['command','js_close']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger','b'],
							['command','test_rotate']
						]
					},
					{
						name : "Bind", // 定点移动坐标的方案，jinlong的
						param : [
							['trigger','t'],
							['command','XXXXXXXXXXXX']
						]
					},
				]
			}
		},
		event : {
			"pccommandinput_start1" : function(e)
			{
				Event.Send({
					name : "effect.move.start",
					self : this
				});
			},
			"pccommandinput_test_rotate1" : function(e)
			{
				Event.Send({
					name : "effect.test.rotate",
					self : this
				});
			},
			"pccommandinput_XXXXXXXXXXXX1" : function(e)
			{// // 定点移动坐标的方案，jinlong的
				Event.Send({
					name : "effect.XXXXXXXXXXXX",
					self : this
				});
			},
			"pccommandinput_test_rotate0" : function(e)
			{
				Event.Send({
					name : "effect.js.closeyang",
					self : this
				});
			},
			"pccommandinput_suspend1" : function(e)
			{
				Event.Send({
					name : "effect.move.suspend",
					self : this
				});
			},
			"pccommandinput_resume1" : function(e)
			{
				Event.Send({
					name : "effect.move.resume",
					self : this
				});
			},
			"pccommandinput_over1" : function(e)
			{
				Event.Send({
					name : "effect.move.over",
					self : this
				});
			},
			"pccommandinput_js_open1" : function(e)
			{
				Event.Send({
					name : "effect.js.open",
					self : this
				});
			},
			"pccommandinput_js_close1" : function(e)
			{
				Event.Send({
					name : "effect.js.close",
					self : this
				});
			},
			"pccommandinput_xml_open1" : function(e)
			{
				Event.Send({
					name : "effect.xml.open",
					self : this
				});
			},
			"pccommandinput_xml_close1" : function(e)
			{
				Event.Send({
					name : "effect.xml.close",
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
