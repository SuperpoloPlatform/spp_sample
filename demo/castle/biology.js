
//biology类，npc继承于它
function biology(name,life,weapon)
{
 this.name=name;
 this.life=life;
 this.weapon=weapon;
 this.rank=1;
 this.experience=0;
 this.attack_value=10;
//使用state记录当前状态0：普通，1：交谈，2：战斗,3死亡。
  this.state;
  this.npc=0;
  //与某个npc建立联系
  this.dailog=function(biology)
   {  
        this.npc=biology;
		//alert("set up a dailog");
   }
   //取消联系
   this.enddaiog=function()
   {
   this.npc.state=0;
   this.npc=0; 
   this.state=0;   
   }
   //升级
   this.addrank=function()
   { 
       var change=this.rank;
         if(10<=this.experience<30)
		   this.rank=2;
		 else if(30<=this.experience<60)
		    this.rank=3;
		else if(60<=this.experience<100)
		    this.rank=4;
			//执行升级动作
		if(change!=this.rank)
			{
			alert("change");
			}
   }
   //攻击操作，每次攻击必须指明npc对象
   this.attack=function(biology)
   {    
        //this.dailog(biology);
		alert("attack");
        this.npc.state=3;
        this.state=3;
       if (this.npc.life>0)
	   {
	     this.npc.life=this.npc.life-(this.rank*3+this.attack_value);
	   }
	   else 
	   {
	      this.experience=this.experience+(this.npc.rank*3);
		  alert("rank");
		  this.addrank();
	   }
   }
}


function player()
{
       _this=this;
	   
       this.ent = Entities.CreateEntity();
	   this.ent.name=this.name;
	_this.prop_zone = Entities.CreatePropertyClass( this.ent,'pczonemanager');
	_this.prop_pm = Entities.CreatePropertyClass(this.ent,'pcmesh');
	_this.prop_cam = Entities.CreatePropertyClass(this.ent,'pcdefaultcamera');
	
	_this.prop_input = Entities.CreatePropertyClass(this.ent,'pccommandinput');
	_this.prop_ment = Entities.CreatePropertyClass(this.ent,'pclinearmovement');
	_this.prop_pcactor = Entities.CreatePropertyClass(this.ent,'pcactormove');
	_this.prop_light = Entities.CreatePropertyClass(this.ent,'pclight');
	_this.prop_mv = Entities.CreatePropertyClass(this.ent,'pcmover');
	_this.prop_ms = Entities.CreatePropertyClass(this.ent,'pcmeshselect');
	_this.prop_collision = Entities.CreatePropertyClass(this.ent,'pccollisiondetection');
	_this.prop_ms.PerformAction('SetCamera',['entity', this.ent.name]);
	//_this.prop_ms.PerformAction('SetCamera',['entity', "monster"]);
	//_this.prop_pm2 = Entities.CreatePropertyClass(ent2,'pcmesh');
	//_this.prop_ment2 = Entities.CreatePropertyClass(ent2,'pclinearmovement');
	//s_this.prop_ms2 = Entities.CreatePropertyClass(ent2,'pcmeshselect');

	   
	   
	   this.init=function()
  {    
alert(21);



	 _this.prop_cam.SetProperty("distance",6);


	_this.prop_cam.PerformAction("SetCamera",['modename','thirdperson']);


	bproc = _this.prop_zone.PerformAction('Load',['path','.'],['file','level.xml']);


	bproc = _this.prop_cam.PerformAction('SetZoneManager',['entity', _this.ent.name],['region','main'],['start','Camera']);

	//_this.prop_ment.PerformAction('Init',['body',[0.5,0.8,0.5]],['legs',[0.5,0.4,0.5]],['shift',[0.01,0.01,0.01]]);
     
	//添加移动和旋转速度 
	_this.prop_pcactor.PerformAction('SetSpeed',['movement',5],['running',3],['rotation',3],['jumping',3]);
	_this.prop_pm.PerformAction('SetMesh',['name','person1']);
	//alert(_this.prop_pm.PerformAction('SetMesh',['name','person1']));

	//_this.prop_pm2.PerformAction('SetMesh',['name','person2']);

	// 站立
	/*iEngine = Registry.Get('iEngine');
	var obj = iEngine.FindMeshObject('person1',0);
	var state = obj.meshObject.QueryInterface('iSpriteCal3DState', 1);
	state.SetAnimCycle('stand', 1.0);*/
	_this.prop_pm.PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);

	
	//_this.prop_ment.PerformAction('InitCDMesh',['percentage',0.01]);
	_this.prop_ment.PerformAction('InitCD',['offset',[0,0.0,1]],['body',[0.4,1,0.3]],['legs',[0.3,0.3,0.2]]);
	
	//_this.prop_ment2.PerformAction('InitCD',['offset',[0,0.0,1]],['body',[0.4,1,0.3]],['legs',[0.3,0.3,0.2]]);

	/** 加灯光跟随实体 **/
	_this.prop_light.PerformAction('SetLight',['name','Lamp11']);
	//alert(_this.prop_light.PerformAction('SetLight',['name','Lamp11']));
	_this.prop_light.PerformAction('ParentMesh',['entity', _this.ent.name]);

	_this.prop_input.PerformAction('Bind',['trigger','w'],['command','forward']);
	_this.prop_input.PerformAction('Bind',['trigger','s'],['command','backward']);
	_this.prop_input.PerformAction('Bind',['trigger','a'],['command','rotateleft']);
	_this.prop_input.PerformAction('Bind',['trigger','d'],['command','rotateright']);
	_this.prop_input.PerformAction('Bind',['trigger','space'],['command','jump']);	
	_this.prop_input.PerformAction('Bind',['trigger','q'],['command','TESTINGMYquit']);
	
	//控制视角
	_this.prop_input.PerformAction('Bind',['trigger','e'],['command','rotateup']);
	_this.prop_input.PerformAction('Bind',['trigger','c'],['command','rotatedown']);
	
	//鼠标事件
	_this.prop_input.PerformAction('Bind',['trigger','0MouseAxis0'],['command','mousemove']);
	_this.prop_input.PerformAction('Bind',['trigger','0MouseButton0'],['command','mousebutton']);

	 
	 	_this.ent.behaviour = function(msgid,pc,p1,p2,p3,p4,p5)
		{	
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
		alert("3212");
			alert(kd.get(_this.prop_pm.GetProperty("meshname")));
			//_this.attack(_this.npc);
		}

		if(msgid.indexOf('forward1')!=-1) {
			//alert(_this.prop_pm.GetProperty("position"));
			var atr = _this.prop_pm.GetProperty("position");
			//_this.prop_light.PerformAction('MoveLight', ['start', [atr[0],atr[1],atr[2]]]);
			_this.prop_pcactor.PerformAction('Forward', ['start', true]);
			_this.prop_pm.PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
			nowrun = true;
		}else if(msgid.indexOf('forward0')!=-1) {
			_this.prop_pcactor.PerformAction('Forward', ['start', false]);
			if(nowturn) {
				_this.prop_pm.PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
			} else {
				_this.prop_pm.PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
			}
			nowrun = false;
		}
		if(msgid.indexOf('TESTINGMYquit0')!=-1) {
			System.Quit();
		}
		if(msgid.indexOf('backward1')!=-1) {
			_this.prop_pcactor.PerformAction('Backward', ['start', true]);
			_this.prop_pm.PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
			nowrun = true;
		}
		if(msgid.indexOf('backward0')!=-1) {
			_this.prop_pcactor.PerformAction('Backward', ['start', false]);
			if(nowturn) {
				_this.prop_pm.PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
			} else {
				_this.prop_pm.PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
			}	
			nowrun = false;
		}

		if(msgid.indexOf('rotateleft1')!=-1) {
			_this.prop_pcactor.PerformAction('RotateLeft', ['start', true]);
			_this.prop_pm.PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
			nowturn = true;
		}
		if(msgid.indexOf('rotateleft0')!=-1) {
			_this.prop_pcactor.PerformAction('RotateLeft', ['start', false]);
			if(nowrun) {
				_this.prop_pm.PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
			} else {
				_this.prop_pm.PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
			}
			nowturn = false;
		}

		if(msgid.indexOf('rotateright1')!=-1) {
			_this.prop_pcactor.PerformAction('RotateRight', ['start', true]);
			_this.prop_pm.PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
			nowturn = true;
		}
		if(msgid.indexOf('rotateright0')!=-1) {
			_this.prop_pcactor.PerformAction('RotateRight', ['start', false]);
			if(nowrun) {
				_this.prop_pm.PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
			} else {
				_this.prop_pm.PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
			}
			nowturn = false;
		}

		if(msgid.indexOf('jump0')!=-1) {
			_this.prop_pcactor.PerformAction('Jump',['start', true]);
			_this.prop_pm.PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
		}

		if(msgid.indexOf('jump1')!=-1) {
			_this.prop_pcactor.PerformAction('Jump',['start', false]);
			_this.prop_pm.PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', false]);
		}
		
		if(msgid.indexOf('rotateup1')!=-1) {
			_this.prop_cam.SetProperty('pitchvelocity',1.0);
		}
		
		if(msgid.indexOf('rotateup0')!=-1) {
			_this.prop_cam.SetProperty('pitchvelocity',0.0);
		}
		
		if(msgid.indexOf('rotatedown1')!=-1) {
			_this.prop_cam.SetProperty('pitchvelocity',-1.0);
		}
		
		if(msgid.indexOf('rotatedown0')!=-1) {
			_this.prop_cam.SetProperty('pitchvelocity',0.0);
		}
		
		if(msgid.indexOf('changeview0')!=-1) {
			_this.prop_pcactor.PerformAction('ToggleCameraMode',[]);
		}

		if(msgid.indexOf('mousemove')!=-1) {
			//_this.prop_pcactor.SetProperty('mousemove', [p1[1],p2[1]]);
			//alert(_this.prop_pcactor.SetProperty('mousemove', [p1[1],p2[1]]));
			_this.prop_cam.PerformAction("SetCamera",['modename', 'thirdperson']);
			//_this.prop_cam.PerformAction("SetCamera",['fpoffset', 'freelook']);
			_this.prop_cam.SetProperty('pitch', -p2[1]); //调整摄像机上下角度
			_this.prop_cam.SetProperty('yaw', p1[1]);
			//alert(_this.prop_pcactor.SetProperty('yaw', p1[1]));
			
			x = p1[1];
			y = p2[1];
		}

		if(msgid.indexOf('mousebutton1')!=-1) {
			//_this.prop_pcactor.PerformAction('RotateRight', ['start', true]);
			_this.prop_pcactor.PerformAction('RotateTo', ['yrot', yrot]);
			var atr = _this.prop_pm.GetProperty("position");
			//yrot += 60;
			
			//alert("x=" + atr[0], "y=" + atr[1], "z=" + atr[2]);
			//alert(_this.prop_mv.GetProperty("GetPosition"));
			/*var atr = _this.prop_pm.GetProperty("position");
			_this.prop_pcactor.PerformAction('Forward', ['start', true]);
			_this.prop_pm.PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
			nowrun = true;*/
		}

		if(msgid.indexOf('mousebutton0')!=-1) {
			//mesh
			//alert(_this.prop_pm.PerformAction("SetMesh", ['filename', 'aaa'])); 
			//alert(_this.prop_pm.GetProperty("hitbeam"));
			//alert("r");
			//_this.prop_pcactor.PerformAction('StartTurnLeft', ['start', false]);
			/*
			_this.prop_pcactor.PerformAction('Forward', ['start', false]);
			if(nowturn) {
				_this.prop_pm.PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
			} else {
				_this.prop_pm.PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
			}
			nowrun = false;*/
		}
	
  }
}
}
player.prototype =new biology("player",100,"knife");

/*
alert(p.life);
alert(p.weapon);
alert(b.weapon);
alert(b.life);
p.dailog(b);
alert(p.npc.name);
alert(p.name);
*/

