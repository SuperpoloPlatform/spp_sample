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
							['trigger','m'],
							['command','getpos']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger','k'],
							['command','test']
						]
					},
				]
			}
		},
		event : {
			"pccommandinput_test1" : function(e)
			{
				Event.Send({
					name : "effect.test",
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