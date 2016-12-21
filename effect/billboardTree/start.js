

try {
	Plugin.Load("crystalspace.font.server.default","iFontServer");
	Plugin.Load("spp.script.cspace.core");
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
	Entities.LoadPropertyClassFactory('cel.pcfactory.2d.billboard');

	var nowrun = false;
	var nowturn = false;

	var ent = Entities.CreateEntity();
	var tree = Entities.CreateEntity();
	//bb.name = "bb";
	ent.behaviour = function(msgid,pc,p1,p2,p3,p4,p5){
		if(msgid.indexOf('forward1')!=-1) {
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
		
		if(msgid.indexOf('rotateup1')!=-1) {
			prop_cam.SetProperty('pitchvelocity',1.0);
		}
		
		if(msgid.indexOf('rotateup0')!=-1) {
			prop_cam.SetProperty('pitchvelocity',0.0);

			alert(prop_pm.GetProperty("position"));
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
		
		/* if(msgid.indexOf('mousemove')!=-1) {
			prop_cam.PerformAction("SetCamera",['modename', 'm64_thirdperson']);
			prop_cam.SetProperty('pitch', -p2[1]); //调整摄像机上下角度
			prop_cam.SetProperty('yaw', p1[1]);
		} */
	}
	ent.name = 'effect';

	prop_zone = Entities.CreatePropertyClass(ent,'pczonemanager');
	prop_pm = Entities.CreatePropertyClass(ent,'pcmesh');
	prop_cam = Entities.CreatePropertyClass(ent,'pcdefaultcamera');
	prop_input = Entities.CreatePropertyClass(ent,'pccommandinput');
	prop_ment = Entities.CreatePropertyClass(ent,'pclinearmovement');
	prop_pcactor = Entities.CreatePropertyClass(ent,'pcactormove');
	prop_collision = Entities.CreatePropertyClass(ent,'pccollisiondetection');
	prop_tree = Entities.CreatePropertyClass(tree,'pcbillboard');
	
	prop_cam.PerformAction("SetCamera",['modename', 'thirdperson']);
	prop_zone.PerformAction('Load',['path','.'],['file','level.xml']);
	prop_cam.PerformAction('SetZoneManager',['entity',ent.name],['region','main'],['start','Camera']);
	// 添加移动和旋转速度 
	prop_pcactor.PerformAction('SetSpeed',['movement',4],['running',2],['rotation',2],['jumping',3]);
	
	// 设定一个mesh的名称。
	prop_pm.PerformAction('SetMesh', ['name','Cube']);
	prop_pm.PerformAction('SetAnimation', ['animation','stand'], ['cycle',true]);
	
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

	 C3D.engine.SubscribeFrame(function(rv){ 
		var cam = rv.camera;
		var v2d = cam.Perspective([0,0,0]);
		var x = v2d.x / C3D.g3d.width;
		var y = v2d.y / C3D.g3d.height;	
		prop_tree.SetProperty("materialname","tree");
		prop_tree.SetProperty("clickable",true);
	    prop_tree.SetProperty("restack",false);
		//prop_tree.SetProperty("text_offset",[20000,20000]);//调整位置，设置偏移量
		//prop_tree.SetProperty("text","billboard"); //不支持中文，显示是乱码
		prop_tree.SetProperty("visible",true);  //设置是否可见
	    prop_tree.SetProperty("width",61440); //调整图片的宽度
	    prop_tree.SetProperty("height",61440); //调整图片的高度
	    prop_tree.SetProperty("x",x*307200); //所在屏幕位置的x轴坐标
        prop_tree.SetProperty("y",y*307200);  //所在屏幕位置的y轴坐标
		//prop_tree.SetProperty("text_default_font_size","12");  //字体大小
       // prop_tree.SetProperty("text_default_font","/fonts/simhei.ttf"); //设置字体
	 });
	 
	 //鼠标点击billboard面板响应
	tree.behaviour = function(msgid,pc,p1,p2,p3,p4,p5){        
		if(msgid.indexOf('pcbillboard_select')!=-1) {
			
			alert("i am click");
			
			/* alert(p1[0], p1[1]);  //可返回x，y，button
			alert(p2[0], p2[1]);
			alert(p3[0], p3[1]);
			alert(1);	 */
		} 
		}
	 
	////////////////////////////////////////////////////////
	//prop_tree.PerformAction("DrawMesh", ["materialname", "bb"], ["factory", "genCube"]);
	
}catch(e){
	alert('error:',e);
}