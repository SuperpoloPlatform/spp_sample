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

	PLAYER = {
		name : "player",
		text : "player",
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
			"pcmover" : {},
			"pcmesh" : {
				action : [
					{
						name : "SetMesh",
						param : [
							['name','nan1']
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
							['movement',10],
							['running',10],
							['rotation',0.5],
							['jumping',10]
						]
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
							['buttons','l']
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
					},
					{
						name : "WakeUp",
						param : [
							['time', 2000],
							['repeat', true],
							['name', 'stop']
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
							['trigger','tab'],
							['command','changeview']
						]
					},
					//
					{
						name : "Bind",
						param : [
							['trigger','y'],
							['command','lineleft']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger','u'],
							['command','lineright']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger','j'],
							['command','lineup']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger','k'],
							['command','linedown']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger','q'],
							['command','quit']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger','e'],
							['command','rotateup']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger','c'],
							['command','rotatedown']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger','b'],
							['command','high']
						]
					},
				]
			}
		},
		
		// 订阅来自entity自身发出的事件，类似于`ent.behavious();`，
		// 一般这些事件都是entity内部的property class发出的。		
		event : {
			//使用event 必须使用全名。系统确保在函数内使用this会调用到相关联的entity上。
			"pctimer_position" : function(e)
			{
				var pos = this.pcarray['pcmesh'].GetProperty("position");
				Event.Send({
					name : "broadcast.position",
					player : this,
					position : pos
				});
				//CONSOLE.Write("player's position is : [" + pos.x + ", " + pos.y + ", " + pos.z + "]\n");
			},
			//"pctimer_stop" : function(e)
			//{
			//	Event.Send({
			//		name : "effect.stop",
			//		self : this,
			//	});
			//},
			//changeview
			"pccommandinput_changeview0" :function(){
				Event.Send({
					name : "effect.changeview0",
					self : this,
				});
			},
			"pccommandinput_lineleft1" :function(){
				Event.Send({
					name : "effect.line.left1",
					self : this,
				});
			},
			"pccommandinput_lineleft0" :function(){
				Event.Send({
					name : "effect.line.left0",
					self : this,
				});
			},
			"pccommandinput_lineright1" :function(){
				Event.Send({
					name : "effect.line.right1",
					self : this,
				});
			},
			"pccommandinput_lineright0" :function(){
				Event.Send({
					name : "effect.line.right0",
					self : this,
				});
			},
			
			"pccommandinput_lineup1" :function(){
				
				Event.Send({
					name : "effect.line.up1",
					self : this,
				});
			},
			"pccommandinput_linedown1" :function(){
			
				Event.Send({
					name : "effect.line.down1",
					self : this,
				});
			},
			//
			"pccommandinput_quit0" : function(){
				System.Quit();
			},
			"pccommandinput_forward1" : function(){
				walk_or_run ++;
				Event.Send({
					name : "effect.forward1",
					self : this,
					mark : walk_or_run,
				});
			},
			"pccommandinput_forward0" : function(){
				Event.Send({
					name : "effect.forward0",
					self : this
				});
			},
			"pccommandinput_backward1" : function(){
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
			"pccommandinput_high0" :function(){
				Event.Send({
					name : "effect.move.high",
					self : this,
				});
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
			//rotateup1        rotatedown1
			"pccommandinput_rotateup1" : function(){
				Event.Send({
					name : "effect.rotateup1",
					self : this
				});
			},
			"pccommandinput_rotateup0" : function(){
				Event.Send({
					name : "effect.rotateup0",
					self : this
				});
			},
			"pccommandinput_rotatedown1" : function(){
				Event.Send({
					name : "effect.rotatedown1",
					self : this
				});
			},
			"pccommandinput_rotatedown0" : function(){
				Event.Send({
					name : "effect.rotatedown0",
					self : this
				});
			},
			"pcmeshsel_down" : function (msgid, x, y, button, entity){
				var per_name = entity[1];
				Event.Send({
					name : "effect.forward0",
					self : per_name
				});
				
				if(per_name == "classmate1"){
					CONSOLE.Write("[Debug] classmate1 is Receiving keyboard events!\n");
				}
				if(per_name == "classmate2"){
					CONSOLE.Write("[Debug] classmate2 is running!\n");
					CONSOLE.Write("[Debug] After clicking classmate2 stop!!\n");
				}
				if(per_name == "classmate3"){
					CONSOLE.Write("[Debug] classmate3 is running!\n");
					CONSOLE.Write("[Debug] After clicking classmate3 continues to run!!\n");
					Event.Send({
						name : "effect.forward1",
						self : per_name
					});
				}
				if(per_name == "classmate4"){
					CONSOLE.Write("[Debug] classmate4 is running!\n");
					CONSOLE.Write("[Debug] After clicking classmate4 will to PK with me!!\n");
				}
				if(per_name == "classmate5"){
					CONSOLE.Write("[Debug] classmate5 is talking!\n");
					CONSOLE.Write("[Debug] After clicking classmate5 runs!!\n");
					Event.Send({
						name : "effect.forward1",
						self : per_name
					});
				}
				if(per_name == "classmate6"){
					CONSOLE.Write("[Debug] classmate6 is talking!\n");
					CONSOLE.Write("[Debug] After clicking classmate6 will to PK with me!!\n");
				}
				CONSOLE.Write("[Debug] selected  is  " + per_name.name + ".\n");
			}
		},
		property : {
			//forward : 0,
			state : "stand",
		},
		// 订阅全局的事件。一般这些事件都是使用`Event.Send()`发送的。
		subscribe : {
			//谁会发出这些事件呢？答案是UI,所以，这里上接UI同事。
		}
	};

/*	CLASSMATE1 = {
		name : "classmate1",
		text : "classmate1",
		pc : {
			"pcmesh" : {
				action : [
					{
						name : "SetMesh",
						param : [
							['name','nan1']
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
			"pctimer" : {
				
			},
			"pcmover" : {
				
			},
			"pcactormove" : {
				action : [
					{
						name : "SetSpeed",
						param : [
							['movement',0.5],
							['running',0.5],
							['rotation',0.5],
							['jumping',0.5]
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
			"pccommandinput_forward1" : function(){
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
	
	CLASSMATE2 = {
		name : "classmate2",
		text : "classmate2",
		pc : {
			"pcmesh" : {
				action : [
					{
						name : "SetMesh",
						param : [
							['name','nan2']
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
			"pctimer" : {
				
			},
			"pcmover" : {
			
			},
			"pcactormove" : {
				action : [
					{
						name : "SetSpeed",
						param : [
							['movement',0.5],
							['running',0.5],
							['rotation',0.5],
							['jumping',0.5]
						]
					}
				]
			}
		},
		
		event : {

		},
		property : {
			monsterWalk : function(){
				Event.Send({
					name : "effect.forward1",
					self : this
				});
			}
		},
		subscribe : {
			"monster.walk" : "monsterWalk"
		}
	};
	
	CLASSMATE3 = {
		name : "classmate3",
		text : "classmate3",
		pc : {
			"pcmesh" : {
				action : [
					{
						name : "SetMesh",
						param : [
							['name','nv1']
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
			"pctimer" : {
				
			},
			"pcmover" : {
			
			},
			"pcactormove" : {
				action : [
					{
						name : "SetSpeed",
						param : [
							['movement',0.5],
							['running',0.5],
							['rotation',0.5],
							['jumping',0.5]
						]
					}
				]
			}
		},
		
		event : {

		},
		property : {
			monsterWalk : function(){
				Event.Send({
						name : "effect.forward1",
						self : this
					});
			}
		},
		subscribe : {
			"monster.walk" : "monsterWalk"
		}
	};
	
	CLASSMATE4 = {
		name : "classmate4",
		text : "classmate4",
		pc : {
			"pcmesh" : {
				action : [
					{
						name : "SetMesh",
						param : [
							['name','nv2']
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
			"pctimer" : {
				
			},
			"pcmover" : {
			
			},
			"pcactormove" : {
				action : [
					{
						name : "SetSpeed",
						param : [
							['movement',0.5],
							['running',0.5],
							['rotation',0.5],
							['jumping',0.5]
						]
					}
				]
			}
		},
		
		event : {

		},
		property : {
			monsterWalk : function(){
				Event.Send({
						name : "effect.forward1",
						self : this
					});
			}
		},
		subscribe : {
			"monster.walk" : "monsterWalk"
		}
	};

	CLASSMATE5 = {
		name : "classmate5",
		text : "classmate5",
		pc : {
			"pcmesh" : {
				action : [
					{
						name : "SetMesh",
						param : [
							['name','nan3']
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
			"pctimer" : {
				
			},
			"pcmover" : {
			
			},
			"pcactormove" : {
				action : [
					{
						name : "SetSpeed",
						param : [
							['movement',0.5],
							['running',0.5],
							['rotation',0.5],
							['jumping',0.5]
						]
					}
				]
			}
		},
		
		event : {

		},
		property : {
			monsterWalk : function(){
				Event.Send({
						name : "effect.forward1",
						self : this
					});
			}
		},
		subscribe : {
			//"monster.walk" : "monsterWalk"
		}
	};
	
	CLASSMATE6 = {
		name : "classmate6",
		text : "classmate6",
		pc : {
			"pcmesh" : {
				action : [
					{
						name : "SetMesh",
						param : [
							['name','nan4']
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
			"pctimer" : {
				
			},
			"pcmover" : {
			
			},
			"pcactormove" : {
				action : [
					{
						name : "SetSpeed",
						param : [
							['movement',0.5],
							['running',0.5],
							['rotation',0.5],
							['jumping',0.5]
						]
					}
				]
			}
		},
		
		event : {

		},
		property : {
			monsterWalk : function(){
				Event.Send({
						name : "effect.forward1",
						self : this
					});
			}
		},
		subscribe : {
			//"monster.walk" : "monsterWalk"
		}
	};
*/
	NPC1 = {
		name : "NPC1",
		text : "NPC1",
		pc : {
			"pcmesh" : {
				action : [
					{
						name : "SetMesh",
						param : [
							['name','nvzhanshi2']
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
							['movement', 0.5],
							['running', 0.5],
							['rotation', 0.5],
							['jumping', 0.5]
						]
					}
				]
			}
		},
		
		event : {

		},
		property : {
			monsterWalk : function(){
				Event.Send({
						name : "effect.forward1",
						self : this
					});
			}
		},
		subscribe : {

		}
	};
	
/*	BUSINESSMAN1 = {
		name : "BUSINESSMAN1",
		text : "BUSINESSMAN1",
		pc : {
			"pcmesh" : {
				action : [
					{
						name : "SetMesh",
						param : [
							['name','nvzhanshi3']
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
							['movement', 0.5],
							['running', 0.5],
							['rotation', 0.5],
							['jumping', 0.5]
						]
					}
				]
			}
		},
		
		event : {

		},
		property : {

		},
		subscribe : {

		}
	};
	
	BUSINESSMAN2 = {
		name : "BUSINESSMAN2",
		text : "BUSINESSMAN2",
		pc : {
			"pcmesh" : {
				action : [
					{
						name : "SetMesh",
						param : [
							['name','nvzhanshi4']
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
							['movement', 0.5],
							['running', 0.5],
							['rotation', 0.5],
							['jumping', 0.5]
						]
					}
				]
			}
		},
		
		event : {

		},
		property : {
		
		},
		subscribe : {

		}
	};*/
}
catch (e)
{
	alert(e);
}