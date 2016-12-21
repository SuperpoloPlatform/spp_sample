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
	

	var rotx = 1.0;

	var nowrun = false;
	var nowturn = false;


	var ent = Entities.CreateEntity();
	ent.behaviour = function(msgid,pc,p1,p2,p3,p4,p5){
		//here p1,p2,p3.. if not undefined, is a array.
		var info = '\n enter msgid= ' + msgid + ' pc = ' + pc + ' \n ';
		if(p1){
			info += ('\n parameter 1 name = '+p1[0]+' value='+p1[1] + ' \n ');
		}
		if(p2){
			info += ('\n parameter 2 name = '+p2[0]+' value='+p2[1] + ' \n ');
		}
		if(p3){
			info += ('\n parameter 3 name = '+p3[0]+' value='+p3[1]);
		}
		//alert(info);
		
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




		/*if(msgid.indexOf('jump0')!=-1) {
			prop_pcactor.PerformAction('Jump',[]);
		}*/
		
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
			//prop_cam.PerformAction("SetCamera",['modename', 'm64_thirdperson']);
			prop_cam.SetProperty('pitch', -p2[1]); //调整摄像机上下角度
			prop_cam.SetProperty('yaw', p1[1]);
		}

	}
	ent.name = 'test';

	prop_zone = Entities.CreatePropertyClass(ent,'pczonemanager');

	prop_pm = Entities.CreatePropertyClass(ent,'pcmesh');

	prop_cam = Entities.CreatePropertyClass(ent,'pcdefaultcamera');

	prop_input = Entities.CreatePropertyClass(ent,'pccommandinput');
	
	prop_ment = Entities.CreatePropertyClass(ent,'pclinearmovement');

	prop_pcactor = Entities.CreatePropertyClass(ent,'pcactormove');
	
	prop_collision = Entities.CreatePropertyClass(ent,'pccollisiondetection');

	prop_light = Entities.CreatePropertyClass(ent,'pclight');


	var id = prop_cam.AddPropertyChangeCallback(function(name,pc){
		alert('property ',name,' of propclass ',pc.name,' changed');
	});


	//aeval(function(){
	

	//prop_cam.PerformAction('SetThirdPersonOffset', ['offset', [0, 5, 0]]);

	prop_cam.SetProperty("distance",1);



	prop_cam.PerformAction("SetCamera",['modename','thirdperson']);


	bproc = prop_zone.PerformAction('Load',['path','.'],['file','level.xml']);
	bproc = prop_cam.PerformAction('SetZoneManager',['entity',ent.name],['region','main'],['start','Camera']);

	//prop_ment.PerformAction('Init',['body',[0.5,0.8,0.5]],['legs',[0.5,0.4,0.5]],['shift',[0.01,0.01,0.01]]);
     
	//添加移动和旋转速度 
	prop_pcactor.PerformAction('SetSpeed',['movement',5],['running',3],['rotation',3],['jumping',6]);



	prop_pm.PerformAction('SetMesh',['name','person2']);

	


	var engine = Registry.Get('iEngine');                

	
	prop_light.PerformAction('SetLight',['name','Lamp']);
	prop_light.PerformAction('ParentMesh',['entity',ent.name]);

	//var state = obj.meshObject.QueryInterface('iSpriteCal3DState', 0);
	//state.SetAnimCycle('stand', 1.0);
	//prop_pm.PerformAction('SetAnimation',['animation','stand'],['cycle',true]);





	//prop_ment.PerformAction('InitCDMesh',['percentage', 2.0]);
	prop_ment.PerformAction('InitCD',['offset',[0, 0.0, 0]],['body',[0.5,0.5,0.5]],['legs',[0.5,0.8,0.5]]);

	prop_input.PerformAction('Bind',['trigger','w'],['command','forward']);
	prop_input.PerformAction('Bind',['trigger','s'],['command','backward']);
	prop_input.PerformAction('Bind',['trigger','a'],['command','rotateleft']);
	prop_input.PerformAction('Bind',['trigger','d'],['command','rotateright']);
	prop_input.PerformAction('Bind',['trigger','space'],['command','jump']);	
	prop_input.PerformAction('Bind',['trigger','q'],['command','TESTINGMYquit']);
	
	//控制视角
	prop_input.PerformAction('Bind',['trigger','e'],['command','rotateup']);
	prop_input.PerformAction('Bind',['trigger','c'],['command','rotatedown']);
	
	//切换不同的视角tab键
	prop_input.PerformAction('Bind',['trigger','tab'],['command','changeview']);
	
	prop_input.PerformAction('Bind',['trigger','MouseAxis0'],['command','mousemove']);

}catch(e){
	alert('error:',e);
}