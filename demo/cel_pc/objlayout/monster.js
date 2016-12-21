/**************************************************************************
 *
 *  This file is part of the UGE(Uniform Game Engine).
 *  Copyright (C) by SanPolo Co.Ltd. 
 *  All rights reserved.
 *
 *  See http://uge.spolo.org/ for more information.
 *
 *  SanPolo Co.Ltd
 *  http://uge.spolo.org/  sales@spolo.org uge-support@spolo.org
 *
**************************************************************************/

try {

	// 动作最难看的女人。
	MONSTER = {
		name : "monster",
		pc : {
			"pcmesh" : {
				action : [
					{
						name : "SetMesh",
						param : [
							['name', 'nv']
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
							['offset', [0, 0.0, 0]],
							['body', [0.5,0.5,0.5]],
							['legs', [0.5,0.9,0.5]]
						]
					}
				]
			},
			"pctimer" : {
				
			},
			"pcmover" : {
				
			},
			"pcactormove" : {
				action : [
					{
						name : "SetSpeed",
						param : [
							['movement', 4],
							['running', 2],
							['rotation', 2],
							['jumping', 3]
						]
					}
				]
			},
			"pccommandinput" : {
				action : [
					{
						name : "Bind",
						param : [
							['trigger','up'],
							['command','forward']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger','down'],
							['command','backward']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger','left'],
							['command','rotateleft']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger','right'],
							['command','rotateright']
						]
					}
				]
			}
		},
		
		event : {
			
		},
		property : {
			type : "monster",
			text : "蜘蛛精",
			life : 50,
			max_hp : 50,
			hurt : 1,
			state : "", // 状态分为stand,attack,run,die，其他的状态想到再补充。			
			result : true //怪物是否死亡 true 为未死亡，反之，为死亡
		},
		// 接受全局事件。
		subscribe : {
			
		}
	};
	AI_MONSTER = {
		event : {
			"to_attack" : function(attacker, player) {
								
			},
			"under_attack" : function(self, attack, target) {
								
			}
		}
	};
}
catch (e)
{
	alert(e);
}