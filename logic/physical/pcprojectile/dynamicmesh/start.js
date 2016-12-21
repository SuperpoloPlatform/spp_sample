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

	//alert("单击“Y”键，添加一头羊！");

	// 全局变量，方便调试。
	var CONSOLE = Registry.Get("iConsole");
	//CONSOLE.Write = function(){};//关闭调试窗口
	//CONSOLE.WriteLine = function(){};//关闭调试窗口
	
	/* 加载基本的JS库。 =============================================== */
	
	// 加载Object Layout库，这是UGE的核心库。
	require("objlayout.js");

	/* 初始化数据。 ================================================== */
	
	// 初始化object layout中各个对象。
	load("/objlayout/player.js");
	load("/objlayout/yang.tpl.js");
	// 初始化效果。
	load("/effect.js");
	
	/* 游戏开始 ===================================================== */
	
	Event.Send("application.open", true);
	
	//下面这个方式，通过传入一个对象来初始化。这里我们以JSON格式来定义这个初始化对象。（比如`PLAYER`）
	//这个对象可以被保存在文件中，可以动态加载，加载进来就可以定义若干entity.
	//这里的entity你可以随意添加属性，就是普通的js对象！
	//我们的编辑器将会编辑产生一个entity def json，加载进来就是Entities.CreateEntity中的参数。
	
	/* 初始化Entity ================================================ */
	
	//暂时把Player当成全局唯一的。
	player = Entities.CreateEntity(PLAYER);
	var yang = false;
	
	engine = Registry.Get('iEngine');
	g3d = Registry.Get('iGraphics3D');
	view = new iView(engine,g3d);
	var count = Event.InstallHelper('3d',view,'frame');

}catch(e){
	alert('error:',e);
}
