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

	GUIDES = {
		name : "guides",
		pc : {
			//"pcdefaultcamera" : {},
			"pcmover" : {},
			"pcpathfinder" : {},
			"pcsteer" : {},
			"pcmesh" : {
				action : [
					{
						name : "SetMesh",
						param : [
							['name','guides']
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
			"pctimer" : {
				action : [
					{
						name : "WakeUp",
						param : [
							['time',600],
							['repeat',true],
							['name','position']
						]
					}
				],
			},
			"pccommandinput" : {},
		},
		event : {
			
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
