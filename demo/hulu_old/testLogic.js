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
	Entities.LoadPropertyClassFactory('cel.pcfactory.object.mesh.select');
	Entities.LoadPropertyClassFactory('cel.pcfactory.tools.timer');

	var rotx = 1.0;

	/** 动作方法 **/
	function biology(){
		
		//攻击操作，每次攻击必须指明npc对象
		this.attack = function (player, monster){   
			this.pplayname = player.name;
			this.pmonstername = monster.name;
			/** player **/
			this.phurt = player.hurt;
			this.plife = monster.life;
			var	iEngine = Registry.Get('iEngine');  
			var obj = iEngine.FindMeshObject('person1',0);
			var state = obj.meshObject.QueryInterface('iSpriteCal3DState', 0);
			state.SetAnimCycle(3, 1.0);
			if(this.plife > 0){
				if(this.plife > this.phurt){
					this.plife = this.plife - this.phurt;
					monster.life = this.plife;
				} 
				if(this.plife < this.phurt){
					diep = true;
				}
			}
			/** monster **/
			this.mhurt = monster.hurt;
			this.mlife = player.life;
			var	iEngine = Registry.Get('iEngine');  
			var obj = iEngine.FindMeshObject('person2',0);
			var state = obj.meshObject.QueryInterface('iSpriteCal3DState', 0);
			state.SetAnimCycle(3, 1.0);
			if(this.mlife > 0){
				if(this.mlife > this.mhurt){
					this.mlife = this.mlife - this.mhurt;
					player.life = this.mlife;
				} 
				if(this.mlife < this.mhurt){
					diem = true;
				}
			}
			if(diep || diem){
				if(player.life == monster.life){
					player.life = 0;
					monster.life = 0;
				} else if(player.life > monster.life){
					monster.life = 0;
				} else if(player.life < monster.life){
					player.life = 0;
				}
			}
		}		
	}
	
	/** 属性类 **/
	function propertyClass(name, life, hurt, skills){
		this.name = name;
		this.life = life;
		this.hurt = hurt;
		this.skills = skills;
	}

	/** 全局变量 **/
	var nowrun = false;
	var nowturn = false;
	var entObject;
	var entName = "";
	var diep = false;
	var diem = false;

	function player(){

		/** player **/
		play = new propertyClass();
		play.name = "player";
		play.life = 100;
		play.hurt = 30;

		_this = this;
		this.ent = Entities.CreateEntity();
		this.ent.name = 'test';
		_this.prop_zone = Entities.CreatePropertyClass(this.ent,'pczonemanager');
		_this.prop_pm = Entities.CreatePropertyClass(this.ent,'pcmesh');
		_this.prop_cam = Entities.CreatePropertyClass(this.ent,'pcdefaultcamera');
		_this.prop_input = Entities.CreatePropertyClass(this.ent,'pccommandinput');
		_this.prop_ment = Entities.CreatePropertyClass(this.ent,'pclinearmovement');
		_this.prop_pcactor = Entities.CreatePropertyClass(this.ent,'pcactormove');
		_this.prop_ms = Entities.CreatePropertyClass(this.ent,'pcmeshselect');
		_this.prop_collision = Entities.CreatePropertyClass(this.ent,'pccollisiondetection');
		_this.prop_light = Entities.CreatePropertyClass(this.ent,'pclight');
		_this.prop_timer = Entities.CreatePropertyClass(this.ent,'pctimer');
		
		this.init = function (){

			_this.prop_cam.SetProperty("distance",1);
			_this.prop_cam.PerformAction("SetCamera",['modename','thirdperson']);
			bproc = _this.prop_zone.PerformAction('Load',['path','.'],['file','level_shadowmap.xml']);
			bproc = _this.prop_cam.PerformAction('SetZoneManager',['entity',this.ent.name],['region','main'],['start','Camera']);

			/** 设置entity mesh **/
			var	iEngine = Registry.Get('iEngine');  
			var obj = iEngine.FindMeshObject('person1',0);
			var state_stand = obj.meshObject.QueryInterface('iSpriteCal3DState', 0);
			/** 站立 **/
			state_stand.SetAnimCycle(0, 1.0);

			/**选择mesh**/
			_this.prop_ms.PerformAction('SetCamera',['entity', this.ent.name]);
			_this.prop_ms.PerformAction('SetMouseButtons',['buttons','r']);
			_this.prop_ms.SetProperty('global',true);

			//添加移动和旋转速度 
			_this.prop_pcactor.PerformAction('SetSpeed',['movement',4],['running',2],['rotation',2],['jumping',3]);
			_this.prop_pm.PerformAction('SetMesh',['name','person1']);
			_this.prop_light.PerformAction('SetLight',['name','Lamp']);
			_this.prop_light.PerformAction('ParentMesh',['entity',this.ent.name]);
			_this.prop_pm.PerformAction('SetAnimation',['animation','stand'],['cycle',true]);
			_this.prop_ment.PerformAction('InitCD',['offset',[0, 0.0, 0]],['body',[0.5,0.5,0.5]],['legs',[0.5,0.9,0.5]]);

			/** 功能键 **/
			_this.prop_input.PerformAction('Bind',['trigger','w'],['command','forward']);
			_this.prop_input.PerformAction('Bind',['trigger','s'],['command','backward']);
			_this.prop_input.PerformAction('Bind',['trigger','a'],['command','rotateleft']);
			_this.prop_input.PerformAction('Bind',['trigger','d'],['command','rotateright']);
			_this.prop_input.PerformAction('Bind',['trigger','space'],['command','jump']);	
			_this.prop_input.PerformAction('Bind',['trigger','q'],['command','TESTINGMYquit']);
			_this.prop_input.PerformAction('Bind',['trigger','t'],['command','attack']);

			//控制视角
			_this.prop_input.PerformAction('Bind',['trigger','e'],['command','rotateup']);
			_this.prop_input.PerformAction('Bind',['trigger','c'],['command','rotatedown']);	
			
			//切换不同的视角tab键
			_this.prop_input.PerformAction('Bind',['trigger','tab'],['command','changeview']);		
			_this.prop_input.PerformAction('Bind',['trigger','MouseAxis0'],['command','mousemove']);

			/** timer **/
			//_this.prop_timer.PerformAction('WakeUp', ['time', 4000], ['repeat', false], ['name', 'uge']);

		}

		/** behaviour **/
		_this.ent.behaviour = function(msgid,pc,p1,p2,p3,p4,p5){

			if(msgid.indexOf('forward1') != -1) {
				_this.prop_pcactor.PerformAction('Forward', ['start', true]);
				_this.prop_pm.PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
				nowrun = true;
			}else if(msgid.indexOf('forward0') != -1) {
				_this.prop_pcactor.PerformAction('Forward', ['start', false]);
				if(nowturn) {
					_this.prop_pm.PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
				} else {
					_this.prop_pm.PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
				}
				nowrun = false;
			}
			
			if(msgid.indexOf('TESTINGMYquit0') != -1) {
				System.Quit();
			}
			if(msgid.indexOf('backward1') != -1) {
				_this.prop_pcactor.PerformAction('Backward', ['start', true]);
				_this.prop_pm.PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
				nowrun = true;
			}
			if(msgid.indexOf('backward0') != -1) {
				_this.prop_pcactor.PerformAction('Backward', ['start', false]);
				if(nowturn) {
					_this.prop_pm.PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
				} else {
					_this.prop_pm.PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
				}				
				nowrun = false;
			}
			if(msgid.indexOf('rotateleft1') != -1) {
				_this.prop_pcactor.PerformAction('RotateLeft', ['start', true]);
				_this.prop_pm.PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
				nowturn = true;
			}
			if(msgid.indexOf('rotateleft0') != -1) {
				_this.prop_pcactor.PerformAction('RotateLeft', ['start', false]);
				if(nowrun) {
					_this.prop_pm.PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
				} else {
					_this.prop_pm.PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
				}
				nowturn = false;
			}
			if(msgid.indexOf('rotateright1') != -1) {
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
			if(msgid.indexOf('rotateup1') != -1) {
				_this.prop_cam.SetProperty('pitchvelocity',1.0);
			}		
			if(msgid.indexOf('rotateup0') != -1) {
				_this.prop_cam.SetProperty('pitchvelocity',0.0);
			}		
			if(msgid.indexOf('rotatedown1') != -1) {
				_this.prop_cam.SetProperty('pitchvelocity',-1.0);
			}
			
			if(msgid.indexOf('rotatedown0') != -1) {
				_this.prop_cam.SetProperty('pitchvelocity',0.0);
			}		
			if(msgid.indexOf('changeview0') != -1) {
				_this.prop_pcactor.PerformAction('ToggleCameraMode',[]);
			}		
			if(msgid.indexOf('mousemove') != -1) {
				_this.prop_cam.SetProperty('pitch', -p2[1]); //调整摄像机上下角度
				_this.prop_cam.SetProperty('yaw', p1[1]);
			}
			if(msgid.indexOf('attack0') != -1) {
				if(entName){
					prop_pm = Entities.CreatePropertyClass(entObject, 'pcmesh');
					prop_pm.PerformAction('SetMesh',['name','person2']);
					_this.prop_pm.PerformAction('SetAnimation', ['animation', 'attack'],['cycle', true],['reset', true]);
					_this.prop_timer.PerformAction('WakeUp', ['time', 900], ['repeat', true], ['name', 'life']);
				}
			}
			if(msgid.indexOf('pctimer_life') != -1){
				prop_pm.PerformAction('SetAnimation', ['animation', 'attack'],['cycle', true],['reset', true]);
				_this.prop_pm.PerformAction('SetAnimation', ['animation', 'attack'],['cycle', true],['reset', true]);
				_this.attack(play, monster);
				if(monster.life == 0 || play.life == 0){
					_this.prop_timer.PerformAction('Clear', ['name', 'life']);
					_this.prop_timer.PerformAction('WakeUp', ['time', 0], ['repeat', false], ['name', 'death']);
				}
			}
			if(msgid.indexOf('pctimer_death') != -1){
				if(monster.life == 0 && play.life != 0){
					prop_pm.PerformAction('SetAnimation',['animation','die'],['cycle', false],['reset', true]);
				} else if(play.life == 0 && monster.life != 0){
					_this.prop_pm.PerformAction('SetAnimation',['animation','die'],['cycle', false],['reset', true]);
				} else if(monster.life == 0 && play.life == 0){
					prop_pm.PerformAction('SetAnimation',['animation','die'],['cycle', false],['reset', true]);
					_this.prop_pm.PerformAction('SetAnimation',['animation','die'],['cycle', false],['reset', true]);
				}
			}

			if(msgid.indexOf('pcmeshsel_down') != -1){
				entName = p4[1].name;
				entObject = p4[1];
				alert(entName);
			}

		}
	}

	function monster(){
		/** monster **/
		monster = new propertyClass();
		monster.name = "monster";
		monster.life = 100;
		monster.hurt = 30;

		_mthis = this;
		this.ent = Entities.CreateEntity();
		this.ent.name = "monster";
		_mthis.prop_pm = Entities.CreatePropertyClass(this.ent,'pcmesh');
		_mthis.prop_ment = Entities.CreatePropertyClass(this.ent,'pclinearmovement');
		_mthis.prop_collision = Entities.CreatePropertyClass(this.ent,'pccollisiondetection');
		this.init = function(){  
			_mthis.prop_pm.PerformAction('SetMesh',['name','person2']);
			_mthis.prop_pm.PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
			_mthis.prop_ment.PerformAction('InitCD',['offset',[0,0.0,1]],['body',[0.4,1,0.3]],['legs',[0.3,0.3,0.2]]);

			_mthis.ent.behaviour = function(msgid,pc,p1,p2,p3,p4,p5){	
				
			}
		}
	}

	/* 封装方法 */
	m = new monster();
	player.prototype =new biology();
	p = new player();
	p.init();
	m.init();

}catch(e){
	alert('error:',e);
}