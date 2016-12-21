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

	MONSTER = {
		name : "monster",
		pc : {
			"pcmesh" : {
				action : [
					{
						name : "SetMesh",
						param : [
							['name', 'Cube1']
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
				],
				property : [
					{
						name : "gravity",
						value : 0
					}
				]
			},
			"pctimer" : {},
			"pccollisiondetection" : {},
			"pcmover" : {},
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
			"pccommandinput" : {}
		},
		
		event : {
			
		},
		property : {
			
		},
		// 接受全局事件。
		subscribe : {
			
		}
	};
}
catch (e)
{
	alert(e);
}