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

	BUSINESSMAN = {
		name : "businessman",
		pc : {
			"pcmesh" : {
				action : [
					{
						name : "SetMesh",
						param : [
							['name', 'business']
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
							['movement',4],
							['running',2],
							['rotation',2],
							['jumping',3]
						]
					}
				]
			},
			"pctrigger" : {
				action : [
					{
						name : "SetupTriggerSphere",
						param : [
							['sector', 'Scene'],
							['position', [-2, 0, -4]],
							['radius', 5]
						]
					}
					/*{
						name : "SetupTriggerAboveMesh",
						param : [
							['entity', "businessman"],
							['maxdistance', 5]
						]
					}*/
				],
				property : [
					{
						name : "enable",
						value : false
					}
				]
			}
		},
		event : {
			"pctrigger_entityenters" : function (){
				var pos = this.pcarray['pcmesh'].GetProperty("position");
				// CONSOLE.Write("[debug] [tigger]" + pos.x + "," + pos.y + "," + pos.z);
			},
			"pctrigger_entityleaves" : function (){
				var pos = this.pcarray['pcmesh'].GetProperty("position");
				// CONSOLE.Write("[debug] [tigger]" + pos.x + "," + pos.y + "," + pos.z);
			}
		},
		property : {
			type : "npc",
			text : "防具商人"
		},
		subscribe : {
			
		}
	};
	AI_BUSINESSMAN = {
		event : {
			
		}
	};
}
catch (e)
{
	alert(e);
}