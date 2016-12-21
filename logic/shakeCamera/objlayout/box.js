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
	BOX = {
		name : "box",
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
						['modename', 'firstperson']
						]
					},
					{
					name : "SetZoneManager",
					param : [
						['entity', 'box'], 
						['region', 'main'],
						['start', 'Camera']
						]
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
						['offset',[0, -1, 0]],
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
				]
			},
			"pccommandinput" : {
				action : [
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
								['trigger', 'w'],
								['command', 'forward']
						]
					},
					{
						name : "Bind",
						param : [
								['trigger', 's'],
								['command', 'backward']
						]
					},
					{
						name : "Bind",
						param : [
								['trigger', 'a'],
								['command', 'rotateleft']
						]
					},
					{
						name : "Bind",
						param : [
								['trigger', 'd'],
								['command', 'rotateright']
						]
					},
					{
					name : "Bind",
					param : [
						['trigger','up'],
						['command','shakeStart.effect1']
						]
					},
					{
					name : "Bind",
					param : [
						['trigger','down'],
						['command','shakeStart.effect2']
						]
					}
				]
			}
		},
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
			/**
				动态创建Sequence
			*/
			"pccommandinput_shakeStart.effect11" : function (){
					Event.Send({
							name : "effect.shakeStart.effect1",
							self : this
					});
			},
			/**
				在world.xml设置Sequence标签
			*/
			"pccommandinput_shakeStart.effect21" : function (){
					Event.Send({
							name : "effect.shakeStart.effect2",
							self : this
					});
			}
		},
	};
}
catch (e)
{
alert(e);
}