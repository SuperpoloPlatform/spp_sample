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

	// 终极BOSS
	YANG1 = {
		name : "yang1",
		pc : {
			"pcmesh" : {
				action : [
					{
						name : "SetMesh",
						param : [
							['name', 'yang']
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
			}
		},
		
		event : {
		},
		property : {
			
		},
		// 接受全局事件。
		subscribe : {
		}
	};
	AI_YANG1 = {
		event : {
			"to_attack" : function(attacker, player, effect_name) {
				// 如果monster死亡，monster不会反击
				if(!attacker.result)
					return;
				CONSOLE.WriteLine("[Debug] <AI-Player> '" + attacker.name + "' to attack Player.");
				
				Event.Send({
					name : "broadcast.monster.attack",
					attacker : attacker,
					target : player
				});
				
				// 让攻击者显示攻击效果。
				Event.Send({
					name : "effect.attack.normal",
					attacker : attacker,
				});
				
			},
			"under_attack" : function(self, attack, target) {
				// 如果monster死亡，player不会攻击
				if(!target.result)
					return;
				// 如果Player攻击的不是我，我就不用反映。
				if(target != self)
					return;
			
				// 怪兽失血操作
				if(target.life > attack.hurt)
				{
					// 被打并失血。
					target.life -= attack.hurt;
					Event.Send({
						name : "ui.target.status.set",
						cur_hp : target.life,
						max_hp : target.max_hp
					});
					CONSOLE.Write("[Debug] the life of `" + target.name + "` is " + target.life + "\n");
					
					target.result = true;
				}
				else
				{
					CONSOLE.Write("[Debug] monster already die.\n");
					target.result = false;
				}
				
				// 怪被打死了。
				if(!target.result) {
					target.life = 0;
					CONSOLE.Write("<---------->" + target.name + ":name.\n");
					/** player experience **/
					var attackerExperience = "level.experience." + attack.name;
					CONSOLE.Write("[debug]<---------->" + attackerExperience + ":le\n");
					Event.Send({
						name : "level.experience.player",
						self : target
					});
					/** death **/
					Event.Send({
						name : "effect.death",
						self : target
					});
					/** goods drop out **/
					Event.Send({
						name : "effect.goods.drop.monster",
						self : target
					});
					// 15秒之后换个地方复活。
					target.pcarray['pctimer'].PerformAction(
						'WakeUp',
						['time', 15000],
						['repeat', false],
						['name', 'monster_realive']
					);
					
				}
				
				// 怪物血太少了要逃跑。
				// TODO 需要放到怪兽的AI中进行处理。
				CONSOLE.Write("<--->monster runaway!.\n");
				if(target.life < 45 && target.life > 0){
					var current_pos = target.pcarray['pcmesh'].GetProperty("position");
					CONSOLE.WriteLine("[Debug] '" + target.name + "' is at :[" + current_pos.x + ", " + current_pos.z + "]");
					
					// 在当前位置的基础上偏移一段位置。
					var target_x = current_pos.x + Math.random() * 2;
					var target_z = current_pos.z + Math.random() * 2;
					CONSOLE.WriteLine("[Debug] Target position is :[" + target_x + ", " + target_z + "]");
				
					target.pcarray['pcmover'].PerformAction('MoveTo', ['sectorname', 'Scene'], ['position', [target_x, 0, target_z]], ['sqradius', 1], ['checklos', true]);
					Event.Send({
						name : "effect.forward1",
						self : target
					});
					
					attack.control = "AI";
					target.pcarray['pctimer'].PerformAction(
						'WakeUp',
						['time', 1500],
						['repeat', false],
						['name', 'player_follow']
					);
				}
				
			}
		}
	};
}
catch (e)
{
	alert(e);
}