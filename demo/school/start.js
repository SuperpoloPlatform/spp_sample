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

try {

	// 全局变量，方便调试。
	var CONSOLE = Registry.Get("iConsole");
	Plugin.Load("spp.script.gui.cegui");
	//CONSOLE.Write = function(){};//关闭调试窗口

	require("objlayout.js");

	Event.Send("application.open", true);
	
	require("ui.js");
	
	if(!load("/logic.js"))
	{
	    alert("Failed to load `logic.js`");
	}
	if(!load("/objectlayout/layout.js"))
	{
	    alert("Failed to load `/objectlayout/layout.js`");
	}
	if(!load("/effect.js"))
	{
	    alert("Failed to load `effect.js`");
	}
	var walk_or_run = 1;
	GUI.CreateObjectScheme(UIDATA,"/ui");
	GUI.CreateObjectLayout(UILAYOUT,"/ui");
	
	var count = Event.InstallHelper('3d', 'frame');

	//下面这个方式，通过传入一个对象来初始化。这里我们以JSON格式来定义这个初始化对象。（比如`PLAYER`）
	//这个对象可以被保存在文件中，可以动态加载，加载进来就可以定义若干entity.
	//这里的entity你可以随意添加属性，就是普通的js对象！
	//我们的编辑器将会编辑产生一个entity def json，加载进来就是Entities.CreateEntity中的参数。
	var globalObj;
	
	//暂时把Player当成全局唯一的。
	/*var */player = Entities.CreateEntity(PLAYER);
	//player.forward = 0;
	//player.state = "stand";
	//等效于上边，测试spp.mixin:
/*	spp.mixin(player, {
		life : 100,
		hurt : 10,
		state : "", // 状态分为stand,attack,run，其他的状态想到再补充。
		experience : 0,   //升级所积累的经验值
		level : 1,   //等级
		result : true
	});

	var classmate1 = Entities.CreateEntity(CLASSMATE1);
	spp.mixin(classmate1, {
		text : "",
		life : 100,
		hurt : 2,
		state : "", // 状态分为stand,attack,run,die，其他的状态想到再补充。
		experience : 100,   //杀死怪物所给的经验值
		level : 3,
		result : true   //怪物是否死亡 true 为未死亡，反之，为死亡
	});

	var classmate2 = Entities.CreateEntity(CLASSMATE2);
	spp.mixin(classmate2, {
		text : "",
		life : 100,
		hurt : 5,
		state : "", // 状态分为stand,attack,run，其他的状态想到再补充。
		experience : 300,  
		level : 8,
		result : true
	});
	
	var classmate3 = Entities.CreateEntity(CLASSMATE3);
	spp.mixin(classmate3, {
		text : "",
		life : 100,
		hurt : 10,
		state : "", // 状态分为stand,attack,run，其他的状态想到再补充。
		experience : 500,  
		level : 10,
		result : true
	});
	
	var classmate4 = Entities.CreateEntity(CLASSMATE4);
	spp.mixin(classmate4, {
		text : "",
		life : 100,
		hurt : 10,
		state : "", // 状态分为stand,attack,run，其他的状态想到再补充。
		experience : 500,  
		level : 10,
		result : true
	});

	var classmate5 = Entities.CreateEntity(CLASSMATE5);
	spp.mixin(classmate5, {
		text : "",
		life : 100,
		hurt : 10,
		state : "", // 状态分为stand,attack,run，其他的状态想到再补充。
		experience : 500,  
		level : 10,
		result : true
	});
	
	var classmate6 = Entities.CreateEntity(CLASSMATE6);
	spp.mixin(classmate6, {
		text : "",
		life : 100,
		hurt : 10,
		state : "", // 状态分为stand,attack,run，其他的状态想到再补充。
		experience : 500,  
		level : 10,
		result : true
	});


	var NPC1 = Entities.CreateEntity(NPC1);
	spp.mixin(NPC1, {
		text : "",
		life : 100,
		hurt : 10,
		state : "", // 状态分为stand,attack,run，其他的状态想到再补充。
		experience : 500,  
		level : 10,
		result : true
	});
	
	var businessman1 = Entities.CreateEntity(BUSINESSMAN1);
	spp.mixin(businessman1, {
		text : "",
		life : 1000,
		hurt : 10,
		state : "", // 状态分为stand,attack,run，其他的状态想到再补充。
		experience : 500,  
		level : 10,
		result : true
	});

	var businessman2 = Entities.CreateEntity(BUSINESSMAN2);
	spp.mixin(businessman2, {
		text : "",
		life : 1000,
		hurt : 10,
		state : "", // 状态分为stand,attack,run，其他的状态想到再补充。
		experience : 500,  
		level : 10,
		result : true
	});

	/*	
	var ai = Entities.CreateEntity(AI);
	spp.mixin(ai, {
		player_pos : 0, // player的位置，用来判断攻击范围，以及靠近monster的时候，monster进行攻击。
		monster_sel : 0 // 被鼠标选中的monster，选中该monster用来对他发动攻击。
	});
*/	
	if(!load("/init.js"))
	{
	    alert("Failed to load `init.js`");
	}

}catch(e){
	alert('error:',e);
}
