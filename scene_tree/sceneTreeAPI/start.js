//this is a test.

try {

	Plugin.Load("spp.behaviourlayer.jscript");
	Event.Send("application.open",true);

	require("s3dcore.js");
	var count = Event.InstallHelper('3d','frame');
    //加载factory
// Entities.LoadPropertyClassFactory('cel.pcfactory.input.standard');
	Entities.LoadPropertyClassFactory('cel.pcfactory.camera.old');
// Entities.LoadPropertyClassFactory('cel.pcfactory.object.mesh.collisiondetection');
	Entities.LoadPropertyClassFactory('cel.pcfactory.world.zonemanager');
	Entities.LoadPropertyClassFactory('cel.pcfactory.object.mesh');
// Entities.LoadPropertyClassFactory('cel.pcfactory.move.linear');
// Entities.LoadPropertyClassFactory('cel.pcfactory.move.actor.standard'); 
// Entities.LoadPropertyClassFactory('cel.pcfactory.object.light');
// Entities.LoadPropertyClassFactory('cel.pcfactory.logic.trigger');

	// 创建Player。
	var player = Entities.CreateEntity();
	player.name = 'player';
	
	prop_zone = Entities.CreatePropertyClass(player,'pczonemanager');
	prop_pm = Entities.CreatePropertyClass(player,'pcmesh');
	prop_cam = Entities.CreatePropertyClass(player,'pcdefaultcamera');

	prop_zone.PerformAction('Load',['path','.'],['file','level.xml']);
	prop_cam.PerformAction('SetZoneManager',['entity',player.name],['region','main'],['start','Camera']);
	
	// 设定一个mesh的名称。
	// prop_pm.PerformAction('SetMesh', ['name','Player']);
	alert(SceneTree.getFirstSector().object.name);
	alert(SceneTree.getSector(0).object.name);
	alert(C3D.engine.FindMeshObject('monster'));
	
}catch(e){
	alert('error:',e);
}