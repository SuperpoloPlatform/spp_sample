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
			"pccommandinput" : {
				action : [
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
							['trigger','ESC'],
							['command','quit']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger','m'],
							['command','testtwo']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger','k'],
							['command','testone']
						]
					},
				]
			}
		},
		event : {
			"pccommandinput_testone1" : function(e)
			{
				Event.Send({
					name : "effect.testone",
					self : this
				});
			},
			"pccommandinput_testtwo1" : function(e)
			{
				Event.Send({
					name : "effect.testtwo",
					self : this
				});
			},
			"pccommandinput_quit0" : function(){
				System.Quit();
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