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

	// 一只山羊的entity template
	YANG_TPL = {
		pc : {
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
			"pcprojectile" : {},
			"pclinearmovement" : {
				action : [
					{
						name : "InitCD",
						param : [
							['offset', [0, 0.0, 0]],
							['body', [0.5, 0.5, 0.5]],
							['legs', [0.5, 0.9, 0.5]]
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
			"pctimer" : {
				action : [
					{
						name : "WakeUp",
						param : [
							['time', 1000],
							['repeat', true],
							['name', 'position']
						]
					}
				]
			},
			"pcmover" : {},
			"pccommandinput" : {
				action : [
					{
						name : "Bind",
						param : [
							['trigger','m'],
							['command','getpos']
						]
					}
				]
			}
		},
		
		event : {
			
			"pccommandinput_getpos1" : function(e)
			{
				//alert(0000);
				Event.Send({
					name : "effect.forward1",
					self : yang1
				});
			}
		},
		property : {
			type : "monster",
			text : "羊一号",
			life : 1000,
			max_hp : 1000,
			hurt : 10,
			state : "", // 状态分为stand,attack,run，其他的状态想到再补充。
			experience : 800,
			level : 10,
			result : true //怪物是否死亡 true 为未死亡，反之，为死亡
		},
		// 接受全局事件。
		subscribe : {
			// 按照player广播的位置信息，角色是否攻击player。
			"broadcast.position" : function(e)
			{
				// monster挂了就不要再攻击了。
				if(this.life == 0)
					return;
				
				// 当player接近monster的时候，monster发起攻击动作。
				var player = e.player;
				var player_pos = e.position;
				var monster_pos = this.pcarray['pcmesh'].GetProperty("position");
				if( (player_pos.x - monster_pos.x) <= 1 &&
					(player_pos.x - monster_pos.x) >= -1 &&
					(player_pos.z - monster_pos.z) <= 1 &&
					(player_pos.z - monster_pos.z) >= -1
				)
				{
					CONSOLE.Write("[Debug] player is close enough, '" + this.name + "' attack player.\n");
					// monster发起攻击。
					this.AIObject.onEvent("to_attack", /*攻击者*/this, /*被攻击者*/player);
				}
			},
			// Player广播：我攻击了一个monster，monster自己的AI负责判断是否自己被攻击。
			"broadcast.player.attack" : function(e)
			{
				this.AIObject.onEvent("under_attack", this, /*攻击者*/e.attacker, /*被攻击者*/e.target);
			}
		}
	};
	AI_YANG = {
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
