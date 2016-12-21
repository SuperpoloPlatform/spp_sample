
//biology类，npc继承于它
function biology(name,life,weapon){
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
	this.dailog=function(biology){  
		this.npc=biology;
		//alert("set up a dailog");
	}
	//取消联系
	this.enddaiog=function(){
		this.npc.state=0;
		this.npc=0; 
		this.state=0;   
	}
	//升级
	this.addrank=function(){ 
		var change=this.rank;
		if(10<=this.experience<30)
			this.rank=2;
		else if(30<=this.experience<60)
			this.rank=3;
		else if(60<=this.experience<100)
			this.rank=4;
	//执行升级动作
		if(change!=this.rank){
			//alert("change");
		}
	}
	//攻击操作，每次攻击必须指明npc对象
	this.attack=function(biology){    
		//this.dailog(biology);
		//alert("attack");
		this.npc.state=3;
		this.state=3;
		if (this.npc.life>0){
			this.npc.life=this.npc.life-(this.rank*3+this.attack_value);
		} else {
			this.experience=this.experience+(this.npc.rank*3);
			//alert("rank");
			this.addrank();
		}
	}
}

function propertyClass(name, life, hurt, skills){
	this.name = name;
	this.life = life;
	this.hurt = hurt;
	this.skills = skills;
}

	

/** 全局变量 **/
var entname = "";

function player(){
	/** player **/
	play = new propertyClass();
	play.name = "player";
	play.life = 100;
	play.hurt = 30;

	/** monster **/
	monster = new propertyClass();
	monster.name = "monster";
	monster.life = 100;
	monster.hurt = 10;



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
	_this.prop_pd = Entities.CreatePropertyClass(this.ent,'pcdamage');
	_this.prop_collision = Entities.CreatePropertyClass(this.ent,'pccollisiondetection');
	   
	this.init=function(){    

		_this.prop_cam.SetProperty("distance",6);
		_this.prop_cam.PerformAction("SetCamera",['modename','thirdperson']);
		bproc = _this.prop_zone.PerformAction('Load',['path','.'],['file','level.xml']);
		bproc = _this.prop_cam.PerformAction('SetZoneManager',['entity', _this.ent.name],['region','main'],['start','Camera']);

		/** 设置entity mesh **/
		//var	iEngine = Registry.Get('iEngine');  
		//var obj = iEngine.FindMeshObject('person1',0);
		//var state = obj.meshObject.QueryInterface('iSpriteCal3DState', 0);
		//state.SetAnimCycle(3, 1.0);

		//添加移动和旋转速度 
		_this.prop_pcactor.PerformAction('SetSpeed',['movement',5],['running',3],['rotation',3],['jumping',3]);
		
		_this.prop_pm.PerformAction('SetMesh',['name','person1']);
		_this.prop_pm.PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);

		/**选择mesh**/
		_this.prop_ms.PerformAction('SetCamera',['entity', this.ent.name]);
		_this.prop_ms.PerformAction('SetMouseButtons',['buttons','r']);
		var result = _this.prop_ms.SetProperty('global',true);
		//alert('set cel.property.global = ',result);
		
		/**伤害**/
		_this.prop_pd.PerformAction('SingleDamage',['target', this.ent.name]);
		//alert("pd=" + _this.prop_pd.PerformAction('SingleDamage',['target', this.ent.name]));
		_this.prop_pd.PerformAction('AreaDamage',['radius', 30]);
		//alert("apd=" + _this.prop_pd.PerformAction('AreaDamage',['radius', 30]));
		_this.prop_pd.SetProperty('sector',true);
		//alert("amd=" + _this.prop_pd.SetProperty('sector',true));

		/** entity重量和身高 **/
		_this.prop_ment.PerformAction('InitCD',['offset',[0,0.0,1]],['body',[0.4,1,0.3]],['legs',[0.3,0.3,0.2]]);

		/** 加灯光跟随实体 **/
		_this.prop_light.PerformAction('SetLight',['name','Lamp11']);
		_this.prop_light.PerformAction('ParentMesh',['entity', _this.ent.name]);
		
		/** 键盘输入 **/
		_this.prop_input.PerformAction('Bind',['trigger','w'],['command','forward']);
		_this.prop_input.PerformAction('Bind',['trigger','s'],['command','backward']);
		_this.prop_input.PerformAction('Bind',['trigger','a'],['command','rotateleft']);
		_this.prop_input.PerformAction('Bind',['trigger','d'],['command','rotateright']);
		_this.prop_input.PerformAction('Bind',['trigger','space'],['command','jump']);	
		_this.prop_input.PerformAction('Bind',['trigger','q'],['command','TESTINGMYquit']);
		
		//控制视角
		_this.prop_input.PerformAction('Bind',['trigger','e'],['command','rotateup']);
		_this.prop_input.PerformAction('Bind',['trigger','c'],['command','rotatedown']);

		/** 攻击 **/
		_this.prop_input.PerformAction('Bind',['trigger','t'],['command','attack']);

		var dirdie = false;

		 
		_this.ent.behaviour = function(msgid,pc,p1,p2,p3,p4,p5){	

			if(msgid.indexOf('attack1') != -1){
				if(!dirdie) {

					_this.prop_pm.PerformAction('SetAnimation',['animation','attack'],['cycle',true],['reset', true]);
					

					if(entname != "" && entname != "player"){
						if(entname == "monster"){
							if(monster.life > play.hurt){
								monster.life = monster.life - play.hurt;
							} else {
								monster.life = 0;
							}
						}
					}
				}
			}

			if(msgid.indexOf('attack0') != -1){

				//_this.prop_pm.PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', false]);
				if(entname != "" && entname != "player"){
					if(entname == "monster"){
						monster.life = monster.life;
					}
				}
			}

			if(monster.life == 0){

				var	iEngine = Registry.Get('iEngine');  
				var obj = iEngine.FindMeshObject('person1',0);
				var state = obj.meshObject.QueryInterface('iSpriteCal3DState', 0);
				state.SetAnimCycle(3, 1.0);

				_this.prop_pm.PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);

				dirdie = true;

				//alert("monster die!");
			}

			if(msgid.indexOf('pcdamage_hurt') != -1) {
				//alert("r");
			}

			if(msgid.indexOf('pcmeshsel_down') != -1) {
				alert('pcmeshsel_down,entity name is ',p4[1].name);
				entname = p4[1].name;
				_this.attack(_this.npc);
			}
		  
			if(msgid.indexOf('forward1')!=-1) {
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
		}
	};
}
player.prototype =new biology("player",100,"knife");

function monster(){
	_mthis=this;
	this.ent = Entities.CreateEntity();
	this.ent.name=this.name;
	_mthis.prop_pm = Entities.CreatePropertyClass(this.ent,'pcmesh');
	_mthis.prop_ment = Entities.CreatePropertyClass(this.ent,'pclinearmovement');
	_mthis.prop_pd = Entities.CreatePropertyClass(this.ent,'pcdamage');
	_mthis.prop_collision = Entities.CreatePropertyClass(this.ent,'pccollisiondetection');
	this.init=function(){    
		_mthis.prop_pm.PerformAction('SetMesh',['name','person2']);
		_mthis.prop_pm.PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
		_mthis.prop_ment.PerformAction('InitCD',['offset',[0,0.0,1]],['body',[0.4,1,0.3]],['legs',[0.3,0.3,0.2]]);

		/**伤害**/
		_mthis.prop_pd.PerformAction('SingleDamage',['target', this.ent.name]);
		//alert("mpd=" + _mthis.prop_pd.PerformAction('SingleDamage',['target', this.ent.name]));

		_mthis.ent.behaviour = function(msgid,pc,p1,p2,p3,p4,p5){	
			//alert(msgid);
			if(msgid.indexOf('pcdamage_hurt') != -1) {
				//alert("r");
			}

			if(msgid.indexOf('pcmeshsel_down') != -1) {
				//alert(p4[1].name+"ggg");
				//_mthis.attack(_mthis.npc);
			}
		}
	}
}
monster.prototype =new biology("monster",100,"knife");

function monster2(){
	_m2this=this;
	this.ent = Entities.CreateEntity();
	this.ent.name=this.name;
	_m2this.prop_pm = Entities.CreatePropertyClass(this.ent,'pcmesh');
	_m2this.prop_ment = Entities.CreatePropertyClass(this.ent,'pclinearmovement');
	_m2this.prop_collision = Entities.CreatePropertyClass(this.ent,'pccollisiondetection');
	this.init=function(){ 
		_m2this.prop_pm.PerformAction('SetMesh',['name','person2']);
		_m2this.prop_pm.PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
		_m2this.prop_ment.PerformAction('InitCD',['offset',[0,0.0,1]],['body',[0.4,1,0.3]],['legs',[0.3,0.3,0.2]]);

		_m2this.ent.behaviour = function(msgid,pc,p1,p2,p3,p4,p5){	
			if(msgid.indexOf('pcmeshsel_down') != -1) {
				//alert(p4[1].name+"ggg");
				//_mthis.attack(_mthis.npc);
			}
		}
	}
}
monster2.prototype =new biology("monster2",100,"knife");