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

// 测试在场景树中动态添加meshobj

try {

	Plugin.Load("spp.behaviourlayer.jscript");
	Event.Send("application.open",true);

	var count = Event.InstallHelper('3d','frame');

	Entities.LoadPropertyClassFactory('cel.pcfactory.input.standard');
	Entities.LoadPropertyClassFactory('cel.pcfactory.camera.old');
	Entities.LoadPropertyClassFactory('cel.pcfactory.object.mesh.collisiondetection');
	Entities.LoadPropertyClassFactory('cel.pcfactory.world.zonemanager');
	Entities.LoadPropertyClassFactory('cel.pcfactory.object.mesh');
	Entities.LoadPropertyClassFactory('cel.pcfactory.move.linear');
	Entities.LoadPropertyClassFactory('cel.pcfactory.move.actor.standard'); 
	Entities.LoadPropertyClassFactory('cel.pcfactory.object.light');

	// 创建一个entity
	var ent = Entities.CreateEntity();
	ent.name = 'player';
	
	prop_zone = Entities.CreatePropertyClass(ent,'pczonemanager');
	prop_pm = Entities.CreatePropertyClass(ent,'pcmesh');
	prop_cam = Entities.CreatePropertyClass(ent,'pcdefaultcamera');
	prop_input = Entities.CreatePropertyClass(ent,'pccommandinput');
	prop_ment = Entities.CreatePropertyClass(ent,'pclinearmovement');
	prop_pcactor = Entities.CreatePropertyClass(ent,'pcactormove');
	prop_collision = Entities.CreatePropertyClass(ent,'pccollisiondetection');

	prop_cam.PerformAction("cel.action.SetCamera",['modename', 'thirdperson']);
	prop_zone.PerformAction('cel.action.Load',['path','.'],['file','level.xml']);
	prop_cam.PerformAction('cel.action.SetZoneManager',['entity',ent.name],['region','main'],['start','Camera']);
	
	// 设定一个mesh的名称。
	prop_pm.PerformAction('cel.action.SetMesh', ['name','Player']);
	
	prop_input.PerformAction('cel.action.Bind',['trigger','s'],['command','backward']);
	prop_input.PerformAction('cel.action.Bind',['trigger','q'],['command','TESTINGMYquit']);
	
	// 获取键盘事件。
	ent.behaviour = function(msgid,pc,p1,p2,p3,p4,p5){
		if(msgid.indexOf('TESTINGMYquit0')!=-1) {
			System.Quit();
		}
		if(msgid.indexOf('backward1')!=-1) {
			
			// 往场景中添加一个盒子。
			addModel2SceneTree([0,2,0], "/factories/genMonster.xml", "Monster");
		}
	}
	
	// meshObjectName -- 该模型定义的<meshobj name="attack.normal">标签的名称`attack.normal`
	addModel2SceneTree = function(pos, libPath, meshObjectName)
	{
		var engine = Registry.Get('iEngine');
		var meshobj = engine.FindMeshObject(meshObjectName); 
		
		/*//mesh object
		entityObj_mesh = Entities.GetEntity(meshobj);
		alert("[debug] entity object (mesh object):" + entityObj_mesh);
		*/
		//entity name
		entityObj_name = Entities.GetEntity("player");
		alert("[debug] entity object (entity name):" + entityObj_name);
		
		/*// int num 第几个 entity
		entityObj_num = Entities.GetEntity(2);
		alert("[debug] entity object (entity number):" + entityObj_num);
		*/
	}
	
}catch(e){
	alert('error:',e);
}