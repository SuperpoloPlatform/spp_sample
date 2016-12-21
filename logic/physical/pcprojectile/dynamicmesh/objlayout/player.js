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
					{
						name : "Bind",
						param : [
							// 退出键
							['trigger','k'],
							['command','test']
						]
					},
				]
			}
		},
		
		// 订阅来自entity自身发出的事件，类似于`ent.behavious();`，
		// 一般这些事件都是entity内部的property class发出的。
		event : {
			//使用event 必须使用全名。系统确保在函数内使用this会调用到相关联的entity上。
			"pccommandinput_test0" : function(){
				if(yang)
				{
					var meshwrapper = C3D.engine.FindMeshObject(yang.pcarray['pcmesh'].meshname);
					var yangSec = C3D.engine.sectors.FindByName("Scene");
					alert(meshwrapper.movable.IsInSector());
				}
			},
			"pccommandinput_quit0" : function(){
				System.Quit();
			},
			"pccommandinput_add_yang1" : function() {
				// 创建entity的时候，传入的第一个参数是一个JSON串
				// 如果JSON指定一个特定的entity，则需要在JSON中setmesh以绑定到场景中已经存在的模型“实例”上。
				// 如果JSON指定一个entity template，并且JSON中定义了一个模型“本体”（的XML文件路径），
				// 那么系统会自动创建一个模型“实例”并自动绑定到当前创建的entity上，
				// 这种情况下需要在第二个参数指定一下该模型“实例”的坐标位置。
				//var yang = Entities.CreateEntity(YANG);
				yang = Entities.CreateEntity(YANG_TPL);
				
				if(!engine.FindMeshFactory("genYang"))
				{
					Registry.Get('iLoader').LoadLibrary("/art/models/yang/yang.xml");
				}
				var mf = C3D.engine.FindMeshFactory("genYang")
				if(mf)
				{
					var eng = C3D.engine;
					var sectorlist = eng.sectors;
					if(sectorlist.count)
					{
						var sector = sectorlist.Get(0);
						var meshwrapper = C3D.engine.CreateMeshWrapper(mf, "a", sector, [-Math.random()*10, 0, -Math.random()*10], true);
						var ipcmesh = yang.pcarray['pcmesh'].QueryInterface("iPcMesh");
						if(meshwrapper && ipcmesh)
						{
							ipcmesh.SetMesh(meshwrapper, false);
							yang.pcarray['pcmesh'].SetAnimation("stand", true);
							yang.pcarray['pcprojectile'].Start([1, 0, 0], 6, 30, 5);
						}
					}
				}
			},
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
