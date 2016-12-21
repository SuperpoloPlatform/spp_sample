//this is a test.

try {

	Plugin.Load("spp.behaviourlayer.jscript");
	Event.Send("application.open",true);
	
	//ui
	require("ui.js");
	if(!load("effect.js"))
	{
		alert("Failed to load effect.js`");
	}	
	if(!load("/ui/layout.js"))
	{
		alert("Failed to load `layout.js`");
	}
	if(!load("/ui/uischeme.js"))
	{
		alert("Failed to load uischeme.js`");
	}	
	if(!load("/ui/ui_function.js"))
	{
		alert("Failed to load ui_function.js`");
	}	
	
		
	GUI.CreateObjectScheme(SCHEMEDATA,"/ui/data");
	GUI.CreateObjectLayout(LAYOUTDATA,"/ui/data");	
	view = new iView(C3D.engine,C3D.g3d);
	var count = Event.InstallHelper('3d',view,'frame');

	Entities.LoadPropertyClassFactory('cel.pcfactory.input.standard');
	Entities.LoadPropertyClassFactory('cel.pcfactory.camera.old');
	Entities.LoadPropertyClassFactory('cel.pcfactory.object.mesh.collisiondetection');
	Entities.LoadPropertyClassFactory('cel.pcfactory.world.zonemanager');
	Entities.LoadPropertyClassFactory('cel.pcfactory.object.mesh');
	Entities.LoadPropertyClassFactory('cel.pcfactory.move.linear');
	Entities.LoadPropertyClassFactory('cel.pcfactory.move.actor.standard'); 
	Entities.LoadPropertyClassFactory('cel.pcfactory.object.light');

	var nowrun = false;
	var nowturn = false;

	var ent = Entities.CreateEntity();
	ent.behaviour = function(msgid,pc,p1,p2,p3,p4,p5){
		

	}
	ent.name = 'effect';

	prop_zone = Entities.CreatePropertyClass(ent,'pczonemanager');
	prop_pm = Entities.CreatePropertyClass(ent,'pcmesh');
	prop_cam = Entities.CreatePropertyClass(ent,'pcdefaultcamera');
	prop_input = Entities.CreatePropertyClass(ent,'pccommandinput');
	prop_ment = Entities.CreatePropertyClass(ent,'pclinearmovement');
	prop_pcactor = Entities.CreatePropertyClass(ent,'pcactormove');
	prop_collision = Entities.CreatePropertyClass(ent,'pccollisiondetection');

	prop_zone.PerformAction('Load',['path','.'],['file','level.xml']);
	prop_cam.PerformAction("SetCamera",['modename', 'thirdperson']);
	prop_cam.PerformAction('SetZoneManager',['entity',ent.name],['region','main'],['start','Camera']);
	// 添加移动和旋转速度 
	prop_pcactor.PerformAction('SetSpeed',['movement',4],['running',2],['rotation',2],['jumping',3]);
	
	// 设定一个mesh的名称。
	prop_pm.PerformAction('SetMesh', ['name','Cube']);
	prop_pm.PerformAction('SetAnimation', ['animation','stand'], ['cycle',true]);
	

}catch(e){
	alert('error:',e);
}