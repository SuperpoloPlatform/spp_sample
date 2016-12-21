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
						value : 3
					}
				]
			},
			"pcmover" : {},
			"pcmesh" : {
				action : [
					{
						name : "SetMesh",
						param : [
							['name','nan']
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
				property : [
					{
						name : "mousemove",
						value : false
					}	
				]
			},
			"pcmeshselect" : {
				action : [
					{
						name : "SetCamera",
						param : [
							['entity', 'player']
						]
					},
					{
						name : "SetMouseButtons",
						param : [
							['buttons','r']
						]
					}
				],
				property : [
					{
						name : "global",
						value : true
					},
					{
						name : "follow",
						value : true
					}
				]
			},
			// 每秒钟发送一次位置信息
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
			"pcinventory" :{
				action : [
					{
						name : "AddTemplate",
						param : [
							['name', 'test'],
							['amount', 2],
							['returns', true]
						]
					}
				]
			},
			"pccommandinput" : {
				action : [
					{
						name : "Bind",
						param : [
							['trigger','w'],
							['command','forward']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger','s'],
							['command','backward']
						]
					},
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
							// 退出键
							['trigger','ESC'],
							['command','quit']
						]
					},
					// 攻击快捷键
					{
						name : "Bind",
						param : [
							// 普通攻击
							['trigger', 'e'],
							['command', 'attack']
						]
					},
					{
						name : "Bind",
						param : [
							// 使用攻击技能1。
							['trigger', '1'],
							['command', 'attack1_keydown']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger', '2'],
							['command', 'attack2_keydown']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger', '3'],
							['command', 'attack3_keydown']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger', '4'],
							['command', 'attack4_keydown']
						]
					},
					{
						name : "Bind",   //鼠标移动
						param : [
							['trigger', 'MouseAxis0'],
							['command', 'mousemove']
						]
					},
					{
						name : "Bind",   //鼠标左键
						param : [
							['trigger', '0Mousebutton0'],
							['command', 'mouseleft']
						]
					},
					// 调试使用的快捷键。
					{
						name : "Bind",
						param : [
							['trigger','p'],
							['command','debug_getposition_keydown']
						]
					},
					{
						name : "Bind",   //背包
						param : [
							['trigger','b'],
							['command','pack']
						]
					},
					{
						name : "Bind",   //装备栏
						param : [
							['trigger','v'],
							['command','weapon']
						]
					},
					{
						name : "Bind",   //test inventory
						param : [
							['trigger','t'],
							['command','testInventory']
						]
					},
				]
			}
		},
		
		// 订阅来自entity自身发出的事件，类似于`ent.behavious();`，
		// 一般这些事件都是entity内部的property class发出的。
		event : {
			//使用event 必须使用全名。系统确保在函数内使用this会调用到相关联的entity上。
			"pccommandinput_testInventory1" : function()   //test inventory
			{
				// CONSOLE.Write("\n[debug] [test inventory]   " + this.pcarray['pcinventory'].PerformAction(
					// 'AddTemplate',
					// ['name', 'test'], ['amount', 1])
					// + " .\n"
				// );
			},
			"pctimer_position" : function(e)
			{
				// CONSOLE.WriteLine(this.pcarray['pcmesh'].position);
				Event.Send({
					name : "broadcast.position",
					player : this,
					position : this.pcarray['pcmesh'].position
				});
				//// CONSOLE.Write("player's position is : [" + pos.x + ", " + pos.y + ", " + pos.z + "]\n");
			},
			// 攻击效果结束了。
			"pctimer_attack.normal" : function(e)
			{
				// CONSOLE.WriteLine("[Debug] '" + this.name + "' stop attack.");
				this.state = "stand";
			},
			// （攻击）特效结束了。
			"pctimer_attack.special" : function(e)
			{
				// CONSOLE.WriteLine("[Debug] pctimer : '" + this.name + "' stop special attack effect.");
				Event.Send({
					name : "effect.attack.special.finish",
					self : this
				});
			},
			// （升级）特效结束了。
			"pctimer_levelUp.finish" : function(e)
			{
				// CONSOLE.WriteLine("[Debug] [pctimer] : '" + this.name + "' stop upgrade effect.");
				Event.Send({
					name : "effect.levelUp.finish",
					self : this
				});
			},
			"pccommandinput_quit0" : function(){
				System.Quit();
			},
			"pccommandinput_forward1" : function(){
				this.control = "player";
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
				this.control = "player";
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
				this.control = "player";
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
				this.control = "player";
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
			"pccommandinput_pack1" : function(){  //这个是用来打开背包
				Event.Send({
					  name : "ui.player.packOpened.set",
					  self: this
				});
			},
			"pccommandinput_weapon1" : function(){  //这个是用来打开装备栏
				Event.Send({
					  name : "ui.player.weaponsOpened.set",
					  self: this
				});
			},
			"pccommandinput_mousemove" : function (msgid, x, y){
				//// CONSOLE.WriteLine("[Debug][mousemove_pos] '" + "x:" + x[1] + "   " + "y:" + y[1] + " .\n");
				//this.pcarray['pcactormove'].PerformAction('MouseMove', ['x', x[1]], ['y', y[1]]);
			},
			"pccommandinput_mouseleft1" : function (){
				// CONSOLE.WriteLine("[Debug][mouseleft_pos] '" + "x:" + this.mouse_x + "   " + "y:" + this.mouse_y + " .\n");
			},
			"pcmeshsel_down" : function (msgid, x, y, button, entity) {
				var sel = entity[1];
				// CONSOLE.WriteLine("[Debug] [name]: '" + sel.name + "' is selected from mouse.");
				// CONSOLE.WriteLine("[Debug] [type]: '" + sel.type + "' is selected from mouse.");
				
				this.target = entity[1];
				
				Event.Send({
						//visible:是否显示
				        //target:目标名称
				        //cur_hp:目标当前生命值
				        //max_hp:目标最大生命值
				        //cur_mp:目标当前魔法值
				        //max_mp:目标最大魔法值
				        //level:目标等级
					name : "ui.target.status.set",
					target : sel.text,
					cur_hp : sel.life,
					max_hp : sel.max_hp,
					visible : true
				});
				/** UI 对话框 **/
				if(sel.type == "npc"){   //商人
					Event.Send({
						name : "ui.npc.dialog.set",
						visible : true,
						text : "你好，我是防具商人"   //对话显示内容
					});
				}
				
				/** monster 死亡后爆出装备 **/
				if(!sel.result){
					Event.Send({
						name : "ui.player.packAddProp.set",
						weapons : sel.weaponDrop
					});
				}
			},
			// 普通攻击
			"pccommandinput_attack1" : function () {
				// CONSOLE.WriteLine("[Debug] Keyboard input attack, type 'normal'.");
				// 直接交给AI来判断是是否攻击。
				this.AIObject.onEvent("to_attack", /*攻击者*/this, /*被攻击者*/this.target, 0);
			},
			// 带有技能的攻击
			"pccommandinput_attack1_keydown1" : function () {
				// CONSOLE.WriteLine("[Debug] Keyboard input attack, type special 1.");
				this.AIObject.onEvent("to_attack", /*攻击者*/this, /*被攻击者*/this.target, 1);
			},
			"pccommandinput_attack2_keydown1" : function () {
				// CONSOLE.WriteLine("[Debug] Keyboard input attack, type special 2.");
				this.AIObject.onEvent("to_attack", /*攻击者*/this, /*被攻击者*/this.target, 2);
			},
			"pccommandinput_attack3_keydown1" : function () {
				// CONSOLE.WriteLine("[Debug] Keyboard input attack, type special 3.");
				this.AIObject.onEvent("to_attack", /*攻击者*/this, /*被攻击者*/this.target, 3);
			},
			"pccommandinput_attack4_keydown1" : function () {
				// CONSOLE.WriteLine("[Debug] Keyboard input attack, type special 4.");
				this.AIObject.onEvent("to_attack", /*攻击者*/this, /*被攻击者*/this.target, 4);
			},
			"pccommandinput_debug_getposition_keydown1" : function() {
				// 调试时候获取player的坐标。
				var pos = this.pcarray['pcmesh'].position;
				// CONSOLE.WriteLine("y=\"" + pos.y + "\" x=\"" + pos.x + "\" z=\"" + pos.z + "\"");
			},
			// 换个地方复活
			"pctimer_player_realive" : function()
			{
				// CONSOLE.Write("[Debug] Player change place to re-alive.\n");
				
				alert("你已经死了，是否重新开始？");
				
				// 重置玩家信息，让他复活把。
				this.life = 100;
				this.result = true;
				
				// 设定复活地点。
				this.pcarray['pcmesh'].MoveMesh([Math.random()*5, 0, Math.random()*5]);
				
				// 重置所有玩家信息，比如血条。
				Event.Send({
					name : "ui.player.status.set",
					player : "玩家",
					cur_hp : this.life,
					max_hp : this.max_hp,
					cup_mp : 0,
					max_mp : this.max_mp,
					level : 1,
					hurt : this.hurt
				});
			},
			"pcinventory_addchild" : function (){   //test inventory messages
				// CONSOLE.Write("---[debug] [inventory] '" + this.name + "inventory true' .\n");
			},
		},
		// 为这个entity添加属性。
		property : {
			type : "player",
			life : 100, // 当前生命值
			max_hp : 100, // 最大生命值（和当前生命值一起，用来提供给UI，显示血条。）
			cur_mp : 0, // 当前魔法值 （显示在血条下方）
			max_mp : 10, // 最大魔法值
			hurt : 80, // 伤害值，比如砍monster的时候，应该掉血多少值。
			state : "", // 状态分为stand,attack,run，其他的状态想到再补充。（用于在player挥剑时候设定状态，防止没有完成动作就开始第二次挥剑。）
			experience : 0,   //升级所积累的经验值
			level : 1,   //等级
			pack : [  //背包
				{
				name : "5",   //装备号,用来加以区分装备
				value : WEAPONDATA["5"]
				}
				
			],
			weapons : [
				{
					name : "1",   //装备名称,用来加以区分装备
					value : WEAPONDATA["1"]   
				},
				{
					name : "3",
					value : WEAPONDATA["3"]  
				},
			],
			control : "player",   //控制权，默认在玩家手里，也就是手动控制。值为:AI，则是电脑控制。
			result : true, // 用来判断这个player是死还是活。
			forward : 0,
			state : "stand",
			//之所以写在这里，可以把诸如pccommandinput_rotateright1时间处理代码那直接填写normalAttack.就像subscribe一样。
			// 这里响应全局的攻击事件，具体是谁攻击谁，在函数中进行判断。
			// TODO 这里假设UI才会调用到这个事件“attack.normal”，如果其他地方也调用到了，请报bug。
			normalAttack : function (e) {
				// 通过点击UI Object来调用Player发起攻击。
				this.AIObject.onEvent("to_attack", /*攻击者*/e.attacker, /*被攻击者*/e.target, 0);
			},
			attackSpecial : function (e) {
				// 通过点击UI Object来调用Player发起攻击，使用特技。
				this.AIObject.onEvent("to_attack", /*攻击者*/e.attacker, /*被攻击者*/e.target, /*技能*/e.skill);
			},
			levelUp : function (e){
				// 升级
				this.AIObject.onEvent("levelUp", e.self, this);
			},
			followTarget : function (e){
				// CONSOLE.WriteLine("[Debug][follow---control] " + this.control + " .\n");
				if(this.control == "player"){
					return;
				}
				var target = e.self;
				var pos = target.pcarray['pcmesh'].position;
				Event.Send({
					name : "effect.followTarget",
					self : this,
					target : target,
					position :pos
				});
			},
			playerPack : function (e){   // 背包
				var idStr = e.id;
				if(typeof WEAPONDATA[idStr] == "object")
					var idObj = WEAPONDATA[idStr];
				// CONSOLE.Write("[debug] [weapon] pack info " + WEAPONDATA[idStr].name + " .\n");
				if(typeof idObj != "object")
					return;
				// CONSOLE.Write("[debug] [weapon] pack info " + idObj.name + " .\n");
				this.pack[this.pack.length] = {name : idObj.name, value : idObj};   //向道具列表中添加道具
			},
			rehanding : function (e){   //装备栏
				var idStr = e.id;
				if(typeof WEAPONDATA[idStr] == "object")
					var idObj = WEAPONDATA[idStr];
				// CONSOLE.Write("[debug] [weapon] pack info " + WEAPONDATA[idStr].name + " .\n");
				if(typeof idObj != "object")
					return;
				// CONSOLE.Write("[debug] [weapon] pack info .\n");
				this.weapons[this.weapons.length] = {name : idObj.id.name, value : idObj.id};   //向道具列表中添加道具
			},
			effect_special2 : function (){
				this.AIObject.onEvent("to_attack", /*攻击者*/this, /*被攻击者*/this.target, 1);
			},
			effect_special3 : function (){
				this.AIObject.onEvent("to_attack", /*攻击者*/this, /*被攻击者*/this.target, 2);
			},
			effect_special4 : function (){
				this.AIObject.onEvent("to_attack", /*攻击者*/this, /*被攻击者*/this.target, 3);
			},
			// 攻击特效的名称，特效模型的路径。
			attack_effect : [{
				name : "attack.normal",
				path : "/art/models/player/factories/attack.normal.xml"
			}, {
				name : "attack.special1",
				path : "/art/models/player/factories/attack.special1.xml"
			}, {
				name : "attack.special2",
				path : "/art/models/player/factories/attack.special2.xml"
			}, {
				name : "attack.special3",
				path : "/art/models/player/factories/attack.special3.xml"
			}, {
				name : "attack.special4",
				path : "/art/models/player/factories/attack.special4.xml"
			}],
			// 升级效果
			upgrade_effect : [{
				name : "upgrade.level1",
				path : "/art/models/player/factories/upgrade.level1.xml"
			}, {
				name : "upgrade.level2",
				path : "/art/models/player/factories/upgrade.level2.xml"
			}, {
				name : "upgrade.level3",
				path : "/art/models/player/factories/upgrade.level3.xml"
			}, {
				name : "upgrade.level4",
				path : "/art/models/player/factories/upgrade.level4.xml"
			}, {
				name : "upgrade.level5",
				path : "/art/models/player/factories/upgrade.level5.xml"
			}, {
				name : "upgrade.level6",
				path : "/art/models/player/factories/upgrade.level6.xml"
			}, {
				name : "upgrade.level7",
				path : "/art/models/player/factories/upgrade.level7.xml"
			}, {
				name : "upgrade.level8",
				path : "/art/models/player/factories/upgrade.level8.xml"
			}, {
				name : "upgrade.level9",
				path : "/art/models/player/factories/upgrade.level9.xml"
			}]
		},
		// 订阅全局的事件。一般这些事件都是使用`Event.Send()`发送的。
		subscribe : {
			//谁会发出这些事件呢？答案是UI,所以，这里上接UI同事。
			"attack.normal" : "normalAttack",
			"attack.special" : "attackSpecial",
			// 某个monster群发了对player的攻击消息。
			"broadcast.monster.attack" : function(e)
			{
				// 被monster攻击。
				this.AIObject.onEvent("under_attack", /*攻击者*/e.attacker, /*被攻击者*/this);
			},
			"level.experience.player" : "levelUp",   //升级
			"follow_target" : "followTarget",    //跟随
			"ui.player.pack.set" : "playerPack",   //背包数据保存
			"ui.player.weapons.set" : "rehanding",   //换装数据保存
			"attack.normal" : "normalAttack",   //UI普通攻击
			"attack.special2" : "effect_special2",   //UI特效攻击
			"attack.special3" : "effect_special3",   //同上
			"attack.special4" : "effect_special4",   //同上
		}
	};
	AI_PLAYER = {
		event : {
			// player发起主动攻击。
			"to_attack" : function(player, target, skill_type) {
				// CONSOLE.WriteLine("[Debug] <AI-Player> Player to attack monster");
				
				// 没有选中monster，不进行攻击。
				if(typeof(target) == "undefined")
				{
					// CONSOLE.WriteLine("[Debug] <AI-Player> No monster is selected.");
					return;
				}
				
				// 如果monster死亡，player不会攻击
				if(!target.result)
					return;
				// 如果正在挥剑，那就不用再次发送攻击事件了。
				if (player.state == "attack")
				{
					// CONSOLE.WriteLine("[Debug] Player is attaking, not to attack again.");
					return;
				}
				
				// 获得玩家以及怪兽的位置信息。
				var player_pos = player.pcarray['pcmesh'].position;
				var target_pos = target.pcarray['pcmesh'].position;
				
				// under_attack是否在attacker的攻击范围。
				// CONSOLE.WriteLine("[Debug] <AI-Player> player's position is : [" + player_pos.x + ", " + player_pos.y + ", " + player_pos.z + "]\n");
				// CONSOLE.WriteLine("[Debug] <AI-Player> monster's position is : [" + target_pos.x + ", " + target_pos.y + ", " + target_pos.z + "]\n");
				if( (player_pos.x - target_pos.x) > 1 ||
					(player_pos.x - target_pos.x) < -1 ||
					(player_pos.z - target_pos.z) > 1 ||
					(player_pos.z - target_pos.z) < -1
				)
				{
					// CONSOLE.WriteLine("[Debug] Distence between '" + player.name + "' and '" + target.name + "' is too far.");
					return;
				}
				
				// 这时候才是有效攻击，设定状态为攻击状态。
				player.state = "attack";
				
				// 广播攻击事件
				Event.Send({
					name : "broadcast.player.attack",
					attacker : player,
					target : target
				});
				
				// 设定延时，在一秒钟内无法发起第二次挥剑。
				player.pcarray['pctimer'].PerformAction(
					'WakeUp',
					['time', 1000],
					['repeat', false],
					['name', 'attack.normal']
				);
				
				// 让攻击者显示攻击效果。
				if(typeof(skill_type) == "undefined" || skill_type == 0)
				{
					// 默认攻击，没有技能。
					Event.Send({
						name : "effect.attack.normal",
						attacker : player
					});
				}
				else
				{
					// 带有技能的攻击效果。
					Event.Send({
						name : "effect.attack.special",
						attacker : player,
						skill : skill_type
					});
					player.pcarray['pctimer'].PerformAction(
						'WakeUp',
						['time', 1000],
						['repeat', false],
						['name', 'attack.special']
					);
				}
				
			},
			"under_attack" : function(attacker, player/*被攻击*/) {
				// CONSOLE.WriteLine("[Debug] <AI-Player> '" + attacker.name + "' to attack Player");
				
				// 被玩家被攻击，并且已经死了，就不要在攻击了。
				if(player.result == false)
					return;
				
				// 失血操作，player被攻击
				if(player.life > attacker.hurt)
				{
					// 被打并失血。
					player.life -= attacker.hurt;
					Event.Send({
						name : "ui.player.status.set",
						cur_hp : player.life,
						max_hp : player.max_hp
					});
					// CONSOLE.Write("[Debug] the life of `" + player.name + "` is " + player.life + "\n");
					
					player.result = true;
				}
				else
				{
					// CONSOLE.Write("[Debug] Player already die.\n");
					player.result = false;
				}
				
				if(!player.result){
					// 如果已经死了，就不用在处理了。
					if(player.life == 0)
						return;
					
					// 3.7秒之后换个地方复活。
					player.pcarray['pctimer'].PerformAction(
						'WakeUp',
						['time', 3700],
						['repeat', false],
						['name', 'player_realive']
					);
					
					// 玩家被打死了。
					player.life = 0;
					// CONSOLE.WriteLine("[Debug] '" + player.name + "' is terminated.");
					Event.Send({
						name : "effect.death",
						self : player
					});
				}
			},
			// 当怪被砍死之后，调用进来，进行经验值的添加操作，
			// 如果经验值满足升级条件，则进行升级操作。
			"levelUp" : function (under_attack, attacker){
				// 增加经验值
				// CONSOLE.WriteLine("[Debug] [AI] " + attacker.name + " XP : " + attacker.experience);
				attacker.experience += 150; //under_attack.experience;
				// CONSOLE.WriteLine("[Debug] [AI] " + attacker.name + " XP : " + attacker.experience);
				
				var nextLevelXP = attacker.level * 100 + 50;
				// CONSOLE.WriteLine("[Debug] [AI] Next Level Up XP : " + nextLevelXP);
				
				// 当前经验值是否满足升级条件。
				while(attacker.experience >= nextLevelXP){
					
					// CONSOLE.WriteLine("[Debug] [AI] " + attacker.name + " Level before upgrade: " + attacker.level);
					attacker.experience -= (attacker.level * 100 + 50);   //超出升级标准的经验
					Event.Send({   //升级动作效果
						name : "effect.levelUp",
						self : attacker
					});
					// 定时关闭升级特效。
					attacker.pcarray['pctimer'].PerformAction(
						'WakeUp',
						['time', 2000],
						['repeat', false],
						['name', 'levelUp.finish']
					);
					attacker.level += 1;
					// CONSOLE.WriteLine("[Debug] [AI] " + attacker.name + " Level after upgrade : " + attacker.level);
				}
				
				
			}
		}
	};

}
catch (e)
{
	alert(e);
}