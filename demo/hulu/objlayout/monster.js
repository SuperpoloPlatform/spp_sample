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
			// 换个地方复活
			"pctimer_monster_realive" : function()
			{
				// CONSOLE.Write("[Debug] '" + this.name + "' change place to re-alive.\n");
				this.life = this.max_hp;
				this.result = true;
				// 复活位置选择在水晶前面的空地上。（空地中心的坐标是[2,0,-2]）
				var x = 2 + (1 - Math.random() * 2);
				var z = -2 + (1 - Math.random() * 2);
				this.pcarray['pcmesh'].PerformAction('MoveMesh', ['position', [x, 0, z]]);
				Event.Send({
					name : "effect.forward0",
					self : this
				});
			},
			"pcmover_impossible" : function () {
				// CONSOLE.Write(globalObj.name + "tracer.\n");
				var target_pos = globalObj.pcarray['pcmesh'].GetProperty("position");
				Event.Send({
					name : "effect.tracer",   //跟随
					self : this,
					position : target_pos
				});
			},
			// 跑开事件已经结束了。
			'pcmover_arrived' : function()
			{
				// CONSOLE.WriteLine("[Debug] " + this.name + "is arrived, after run away.");
				Event.Send({
						name : "effect.runAway0",
						self : this
					});
			},
			"pctimer_player_follow" : function (){
				Event.Send({
					name : "follow_target",
					self : this
				});
				this.pcarray['pctimer'].PerformAction(
					'WakeUp',
					['time', 5000],
					['repeat', true],
					['name', 'player_follow_target']
				);
			},
			"pctimer_player_follow_target" : function (){
				if(this.life == 0){
					return;
				}
				Event.Send({
					name : "follow_target",
					self : this
				});
			}
		},
		property : {
			type : "monster",
			text : "蜘蛛精",
			life : 50,
			max_hp : 50,
			hurt : 1,
			state : "", // 状态分为stand,attack,run,die，其他的状态想到再补充。
			experience : 100,   //杀死怪物所给的经验值
			level : 2,
			weaponDrop : [
				{
					name : "1",
					value : WEAPONDATA["1"]
				},
				{
					name : "2",
					value : WEAPONDATA["2"]
				},
				{
					name : "3",
					value : WEAPONDATA["3"]
				}
			],
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
					// CONSOLE.Write("[Debug] player is close enough, '" + this.name + "' attack player.\n");
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
	AI_MONSTER = {
		event : {
			"to_attack" : function(attacker, player) {
				// 如果monster死亡，monster不会反击
				if(!attacker.result)
					return;
				// CONSOLE.WriteLine("[Debug] <AI-Player> '" + attacker.name + "' to attack Player.");
				
				Event.Send({
					name : "broadcast.monster.attack",
					attacker : attacker,
					target : player
				});
				
				// 让攻击者显示攻击效果。
				Event.Send({
					name : "effect.attack.normal",
					attacker : attacker
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
					// CONSOLE.Write("[Debug] the life of `" + target.name + "` is " + target.life + "\n");
					
					target.result = true;
				}
				else
				{
					// CONSOLE.Write("[Debug] monster already die.\n");
					target.result = false;
				}
				
				// 怪被打死了。
				if(!target.result) {
					target.life = 0;
					// CONSOLE.Write("<---------->" + target.name + ":name.\n");
					/** player experience **/
					var attackerExperience = "level.experience." + attack.name;
					// CONSOLE.Write("[debug]<---------->" + attackerExperience + ":le\n");
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
				// CONSOLE.Write("<--->monster runaway!.\n");
				if(target.life < 45 && target.life > 0){
					var current_pos = target.pcarray['pcmesh'].GetProperty("position");
					// CONSOLE.WriteLine("[Debug] '" + target.name + "' is at :[" + current_pos.x + ", " + current_pos.z + "]");
					
					// 在当前位置的基础上偏移一段位置。
					var target_x = current_pos.x + Math.random() * 2;
					var target_z = current_pos.z + Math.random() * 2;
					// CONSOLE.WriteLine("[Debug] Target position is :[" + target_x + ", " + target_z + "]");
					
					Event.Send({
						name : "effect.runAway1",
						self : target,
						target_x : target_x,
						target_z : target_z
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