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

	alert("点击数字键1和2来动态创建盒子。");

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

	prop_cam.PerformAction("SetCamera",['modename', 'thirdperson']);
	prop_zone.PerformAction('Load',['path','.'],['file','level.xml']);
	prop_cam.PerformAction('SetZoneManager',['entity',ent.name],['region','main'],['start','Camera']);
	
	// 设定一个mesh的名称。
	prop_pm.PerformAction('SetMesh', ['name','Player']);
	
	prop_input.PerformAction('Bind',['trigger','1'],['command','One']);
	prop_input.PerformAction('Bind',['trigger','2'],['command','Two']);
	prop_input.PerformAction('Bind',['trigger','q'],['command','TESTINGMYquit']);
	
	// 获取键盘事件。
	ent.behaviour = function(msgid,pc,p1,p2,p3,p4,p5){
		if(msgid.indexOf('TESTINGMYquit0')!=-1) {
			System.Quit();
		}
		if(msgid.indexOf('One1')!=-1) {
			
			// 往场景中添加一个盒子。
			addMeshObj2SceneTree([-1,2,0], "/factories/genMonster1.xml", "Monster1");
		}
		if(msgid.indexOf('Two1')!=-1) {
			
			// 往场景中添加一个盒子。
			addMeshFact2SceneTree([1,2,0], "/factories/genMonster2.xml", "genMonster2", "Monster2");
		}
		
	}
	
	// 在场景中扔进来一个模型
	// pos -- 该模型在场景中显示的坐标。
	// libPath -- 定义该模型的文件路径。比如`art/models/player/factories/attack.normal.xml`
	// meshObjectName -- 该模型定义的<meshobj name="attack.normal">标签的名称`attack.normal`
	addMeshObj2SceneTree = function(pos, libPath, meshObjectName)
	{
		var engine = Registry.Get('iEngine');
		var loader = Registry.Get('iLoader');
		
		loader.LoadLibrary(libPath);
		
		var meshwarpp = engine.FindMeshObject(meshObjectName); //获取到载入的对象
		
		if(meshwarpp)
		{
			// 给新添加的meshobj设定一个位置。
			meshwarpp.movable.pos = pos;
			meshwarpp.movable.Update(); //更新粒子效果的位置，让其跟随player显示
			var sectorlist = engine.sectors;
			var sec = sectorlist.Get(0);
			var meshlist = sec.meshes; //获取到sector的mesh列表
			meshlist.Add(meshwarpp);   //将获取到的对象插入到列表中 attack_effect_index是一个它的index
		}
		else
		{
			alert("failed to add mesh");
		}
	}
	
	addMeshFact2SceneTree = function(pos, libPath, meshFactName, meshObjName)
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
			meshlist.Add(meshwrapper);   //将获取到的对象插入到列表中 attack_effect_index是一个它的index
		}
		else
		{
			alert("failed to add mesh");
		}
	}
	
}catch(e){
	alert('error:',e);
}