//this is a test.

try {

	Plugin.Load("spp.behaviourlayer.jscript");
	Event.Send("application.open",true);

	var count = Event.InstallHelper('3d','frame');

	// 全局对象，用来记录鼠标指针当前坐标值。
	var arrow = new Object();
	arrow.x = 0;
	arrow.y = 0;
	
	Entities.LoadPropertyClassFactory('cel.pcfactory.input.standard');
	Entities.LoadPropertyClassFactory('cel.pcfactory.camera.old');
	Entities.LoadPropertyClassFactory('cel.pcfactory.world.zonemanager');
	Entities.LoadPropertyClassFactory('cel.pcfactory.object.mesh');
	Entities.LoadPropertyClassFactory('cel.pcfactory.move.actor.standard'); 

	var ent = Entities.CreateEntity();
	ent.behaviour = function(msgid,pc,p1,p2,p3,p4,p5){
		if(msgid.indexOf('TESTINGMYquit0')!=-1) {
			System.Quit();
		}
		
		if(msgid.indexOf('mousemove')!=-1) {
			arrow.x = p1[1];
			arrow.y = p2[1];
		}
		if(msgid.indexOf('mouseleftclick0')!=-1) {
			// 当左键单击的时候显示坐标。
			alert("x = " + arrow.x + ", y = " + arrow.y);
		}
	}
	ent.name = 'MouseClick';

	prop_zone = Entities.CreatePropertyClass(ent,'pczonemanager');
	prop_pm = Entities.CreatePropertyClass(ent,'pcmesh');
	prop_cam = Entities.CreatePropertyClass(ent,'pcdefaultcamera');
	prop_input = Entities.CreatePropertyClass(ent,'pccommandinput');
	prop_pcactor = Entities.CreatePropertyClass(ent,'pcactormove');

	prop_cam.PerformAction("SetCamera",['modename', 'thirdperson']);
	prop_zone.PerformAction('Load',['path','.'],['file','world.xml']);
	prop_cam.PerformAction('SetZoneManager',['entity',ent.name],['region','main'],['start','Camera']);
	
	// 设定一个mesh的名称。
	prop_pm.PerformAction('SetMesh', ['name','Cube']);
	prop_pm.PerformAction('SetAnimation', ['animation','stand'], ['cycle',true]);
	
	prop_input.PerformAction('Bind',['trigger','q'],['command','TESTINGMYquit']);

	
	prop_input.PerformAction('Bind',['trigger','MouseAxis0'],['command','mousemove']);
	prop_input.PerformAction('Bind',['trigger','0mousebutton0'],['command','mouseleftclick']);
	prop_input.PerformAction('Bind',['trigger','0mousebutton1'],['command','mouserightclick']);
	 

}catch(e){
	alert('error:',e);
}