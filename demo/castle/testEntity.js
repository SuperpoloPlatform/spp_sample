//this is a test.

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
	Entities.LoadPropertyClassFactory('cel.pcfactory.move.mover');
	Entities.LoadPropertyClassFactory('cel.pcfactory.object.mesh.select');
	

	var rotx = 1.0;
	var ent = Entities.CreateEntity();
	var ent2 = Entities.CreateEntity();

	var nowrun = false;
	var nowturn = false;

	ent.behaviour = function(msgid,pc,p1,p2,p3,p4,p5){
		//here p1,p2,p3.. if not undefined, is a array.
		var info = '\n enter msgid= ' + msgid + ' pc = ' + pc + ' \n ';
		if(p1){
			info += ('\n parameter p1 name = '+p1[0]+' value='+p1[1] + ' \n ');
		}
		if(p2){
			info += ('\n parameter p2 name = '+p2[0]+' value='+p2[1] + ' \n ');
		}
		if(p3){
			info += ('\n parameter p3 name = '+p3[0]+' value='+p3[1]);
		}
		//alert(info);
		if(msgid == 'pcmeshsel_down') {
			alert(prop_pm.GetProperty("meshname"));
		}

		if(msgid.indexOf('forward1')!=-1) {
			//alert(prop_pm.GetProperty("position"));
			var atr = prop_pm.GetProperty("position");
			//prop_light.PerformAction('MoveLight', ['start', [atr[0],atr[1],atr[2]]]);
			prop_pcactor.PerformAction('Forward', ['start', true]);
			prop_pm.PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
			nowrun = true;
		}else if(msgid.indexOf('forward0')!=-1) {
			prop_pcactor.PerformAction('Forward', ['start', false]);
			if(nowturn) {
				prop_pm.PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
			} else {
				prop_pm.PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
			}
			nowrun = false;
		}
		if(msgid.indexOf('TESTINGMYquit0')!=-1) {
			System.Quit();
		}
		if(msgid.indexOf('backward1')!=-1) {
			prop_pcactor.PerformAction('Backward', ['start', true]);
			prop_pm.PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
			nowrun = true;
		}
		if(msgid.indexOf('backward0')!=-1) {
			prop_pcactor.PerformAction('Backward', ['start', false]);
			if(nowturn) {
				prop_pm.PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
			} else {
				prop_pm.PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
			}	
			nowrun = false;
		}

		if(msgid.indexOf('rotateleft1')!=-1) {
			prop_pcactor.PerformAction('RotateLeft', ['start', true]);
			prop_pm.PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
			nowturn = true;
		}
		if(msgid.indexOf('rotateleft0')!=-1) {
			prop_pcactor.PerformAction('RotateLeft', ['start', false]);
			if(nowrun) {
				prop_pm.PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
			} else {
				prop_pm.PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
			}
			nowturn = false;
		}

		if(msgid.indexOf('rotateright1')!=-1) {
			prop_pcactor.PerformAction('RotateRight', ['start', true]);
			prop_pm.PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
			nowturn = true;
		}
		if(msgid.indexOf('rotateright0')!=-1) {
			prop_pcactor.PerformAction('RotateRight', ['start', false]);
			if(nowrun) {
				prop_pm.PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
			} else {
				prop_pm.PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
			}
			nowturn = false;
		}

		if(msgid.indexOf('jump0')!=-1) {
			prop_pcactor.PerformAction('Jump',['start', true]);
			prop_pm.PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
		}

		if(msgid.indexOf('jump1')!=-1) {
			prop_pcactor.PerformAction('Jump',['start', false]);
			prop_pm.PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', false]);
		}
		
		if(msgid.indexOf('rotateup1')!=-1) {
			prop_cam.SetProperty('pitchvelocity',1.0);
		}
		
		if(msgid.indexOf('rotateup0')!=-1) {
			prop_cam.SetProperty('pitchvelocity',0.0);
		}
		
		if(msgid.indexOf('rotatedown1')!=-1) {
			prop_cam.SetProperty('pitchvelocity',-1.0);
		}
		
		if(msgid.indexOf('rotatedown0')!=-1) {
			prop_cam.SetProperty('pitchvelocity',0.0);
		}
		
		if(msgid.indexOf('changeview0')!=-1) {
			prop_pcactor.PerformAction('ToggleCameraMode',[]);
		}

		if(msgid.indexOf('mousemove')!=-1) {
			//prop_pcactor.SetProperty('mousemove', [p1[1],p2[1]]);
			//alert(prop_pcactor.SetProperty('mousemove', [p1[1],p2[1]]));
			prop_cam.PerformAction("SetCamera",['modename', 'thirdperson']);
			//prop_cam.PerformAction("SetCamera",['fpoffset', 'freelook']);
			prop_cam.SetProperty('pitch', -p2[1]); //调整摄像机上下角度
			prop_cam.SetProperty('yaw', p1[1]);
			//alert(prop_pcactor.SetProperty('yaw', p1[1]));
			
			x = p1[1];
			y = p2[1];
		}

		if(msgid.indexOf('mousebutton1')!=-1) {
			//prop_pcactor.PerformAction('RotateRight', ['start', true]);
			prop_pcactor.PerformAction('RotateTo', ['yrot', yrot]);
			var atr = prop_pm.GetProperty("position");
			yrot += 60;
			//alert("x=" + atr[0], "y=" + atr[1], "z=" + atr[2]);
			//alert(prop_mv.GetProperty("GetPosition"));
			/*var atr = prop_pm.GetProperty("position");
			prop_pcactor.PerformAction('Forward', ['start', true]);
			prop_pm.PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
			nowrun = true;*/
		}

		if(msgid.indexOf('mousebutton0')!=-1) {
			//mesh
			//alert(prop_pm.PerformAction("SetMesh", ['filename', 'aaa'])); 
			//alert(prop_pm.GetProperty("hitbeam"));
			//alert("r");
			//prop_pcactor.PerformAction('StartTurnLeft', ['start', false]);
			/*
			prop_pcactor.PerformAction('Forward', ['start', false]);
			if(nowturn) {
				prop_pm.PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
			} else {
				prop_pm.PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
			}
			nowrun = false;*/
		}

	}
	var x;
	var y;
	var yrot = 0;
	ent.name = 'test';
	ent2.name = 'test2';

	/** ent **/
	prop_zone = Entities.CreatePropertyClass(ent,'pczonemanager');
	prop_pm = Entities.CreatePropertyClass(ent,'pcmesh');
	prop_cam = Entities.CreatePropertyClass(ent,'pcdefaultcamera');
	prop_input = Entities.CreatePropertyClass(ent,'pccommandinput');
	prop_ment = Entities.CreatePropertyClass(ent,'pclinearmovement');
	prop_pcactor = Entities.CreatePropertyClass(ent,'pcactormove');
	prop_light = Entities.CreatePropertyClass(ent,'pclight');
	prop_mv = Entities.CreatePropertyClass(ent,'pcmover');
	prop_ms = Entities.CreatePropertyClass(ent,'pcmeshselect');
	prop_collision = Entities.CreatePropertyClass(ent,'pccollisiondetection');

	prop_ms.PerformAction('SetCamera',['entity', ent.name]);
	//prop_ms2.PerformAction('SetMouseButtons',['buttons','r']); // mouse right button
	//alert(prop_ms.PerformAction('SetCamera',['entity','test']));
	
	/** ent2 **/
	//prop_zone2 = Entities.CreatePropertyClass(ent2,'pczonemanager');
	prop_pm2 = Entities.CreatePropertyClass(ent2,'pcmesh');
	//prop_cam2 = Entities.CreatePropertyClass(ent2,'pcdefaultcamera');
	//prop_input2 = Entities.CreatePropertyClass(ent2,'pccommandinput');
	prop_ment2 = Entities.CreatePropertyClass(ent2,'pclinearmovement');
	//prop_pcactor2 = Entities.CreatePropertyClass(ent2,'pcactormove');
	//prop_light2 = Entities.CreatePropertyClass(ent2,'pclight');
	//prop_mv2 = Entities.CreatePropertyClass(ent2,'pcmover');
	prop_ms2 = Entities.CreatePropertyClass(ent2,'pcmeshselect');
	//prop_collision2 = Entities.CreatePropertyClass(ent,'pccollisiondetection');

	//prop_ms2.PerformAction('SetCamera',['entity','test']);
	//prop_ms2.PerformAction('SetMouseButtons',['buttons','r']);
	//prop_ms2.PerformAction('SetCamera',['entity','test2']);
	


	var id = prop_cam.AddPropertyChangeCallback(function(name,pc){
		alert('property ',name,' of propclass ',pc.name,' changed');
	});

	
	//aeval(function(){
	prop_cam.SetProperty("distance",6);


	prop_cam.PerformAction("SetCamera",['modename','thirdperson']);


	bproc = prop_zone.PerformAction('Load',['path','.'],['file','level.xml']);


	bproc = prop_cam.PerformAction('SetZoneManager',['entity',ent.name],['region','main'],['start','Camera']);

	//prop_ment.PerformAction('Init',['body',[0.5,0.8,0.5]],['legs',[0.5,0.4,0.5]],['shift',[0.01,0.01,0.01]]);
     
	//添加移动和旋转速度 
	prop_pcactor.PerformAction('SetSpeed',['movement',5],['running',3],['rotation',3],['jumping',3]);
	prop_pm.PerformAction('SetMesh',['name','person1']);

	prop_pm2.PerformAction('SetMesh',['name','person2']);

	// 站立
	/*iEngine = Registry.Get('iEngine');
	var obj = iEngine.FindMeshObject('person1',0);
	var state = obj.meshObject.QueryInterface('iSpriteCal3DState', 1);
	state.SetAnimCycle('stand', 1.0);*/
	prop_pm.PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);

	
	//prop_ment.PerformAction('InitCDMesh',['percentage',0.01]);
	prop_ment.PerformAction('InitCD',['offset',[0,0.0,1]],['body',[0.4,1,0.3]],['legs',[0.3,0.3,0.2]]);
	
	prop_ment2.PerformAction('InitCD',['offset',[0,0.0,1]],['body',[0.4,1,0.3]],['legs',[0.3,0.3,0.2]]);

	/** 加灯光跟随实体 **/
	prop_light.PerformAction('SetLight',['name','Lamp11']);
	//alert(prop_light.PerformAction('SetLight',['name','Lamp11']));
	prop_light.PerformAction('ParentMesh',['entity',ent.name]);

	prop_input.PerformAction('Bind',['trigger','w'],['command','forward']);
	prop_input.PerformAction('Bind',['trigger','s'],['command','backward']);
	prop_input.PerformAction('Bind',['trigger','a'],['command','rotateleft']);
	prop_input.PerformAction('Bind',['trigger','d'],['command','rotateright']);
	prop_input.PerformAction('Bind',['trigger','space'],['command','jump']);	
	prop_input.PerformAction('Bind',['trigger','q'],['command','TESTINGMYquit']);
	
	//控制视角
	prop_input.PerformAction('Bind',['trigger','e'],['command','rotateup']);
	prop_input.PerformAction('Bind',['trigger','c'],['command','rotatedown']);
	
	//鼠标事件
	prop_input.PerformAction('Bind',['trigger','0MouseAxis0'],['command','mousemove']);
	prop_input.PerformAction('Bind',['trigger','0MouseButton0'],['command','mousebutton']);

	

}catch(e){
	alert('error:',e);
}