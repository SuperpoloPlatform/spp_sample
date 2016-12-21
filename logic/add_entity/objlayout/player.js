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
			"pccommandinput" : {
				action : [
					{
						name : "Bind",
						param : [
							['trigger','y'],
							['command','add_yang']
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
				]
			}
		},
		
		// 订阅来自entity自身发出的事件，类似于`ent.behavious();`，
		// 一般这些事件都是entity内部的property class发出的。
		event : {
			//使用event 必须使用全名。系统确保在函数内使用this会调用到相关联的entity上。
			"pccommandinput_quit0" : function(){
				System.Quit();
			},
			"pccommandinput_add_yang1" : function() {
				// 已经添加过了。
				if(typeof EXIST_YANG !="undefined")
				{
					alert("yang already exist");
					return;
				}
				var add = function(pos, libPath, meshFactName, meshObjName)
				{
					var engine = Registry.Get('iEngine');
					var loader = Registry.Get('iLoader');
					
					loader.LoadLibrary(libPath);
					
					var mf = engine.FindMeshFactory(meshFactName);
					if(!mf)
					{
						alert("failed to find meshfact!");
						return;
					}
					
					var meshwrapper = engine.CreateMeshWrapper(mf, meshObjName);
					
					if(meshwrapper)
					{
						// 给新添加的meshobj设定一个位置。
						meshwrapper.movable.pos = pos;
						meshwrapper.movable.Update(); //更新粒子效果的位置，让其跟随player显示
						var sectorlist = engine.sectors;
						var sec = sectorlist.Get(0);
						var meshlist = sec.meshes; //获取到sector的mesh列表
						EXIST_YANG = meshlist.Add(meshwrapper);   //将获取到的对象插入到列表中 attack_effect_index是一个它的index
						alert("the index of yang is " + EXIST_YANG);
					}
					else
					{
						alert("failed to add mesh");
					}
				}
				add([0, 0, -5], "/art/models/yang/yang.xml", "yang", "yang");
				var yang1 = Entities.CreateEntity(YANG1);
				
			},
		},
		// 为这个entity添加属性。
		property : {
		},
		// 订阅全局的事件。一般这些事件都是使用`Event.Send()`发送的。
		subscribe : {
			
		}
	};

}
catch (e)
{
	alert(e);
}