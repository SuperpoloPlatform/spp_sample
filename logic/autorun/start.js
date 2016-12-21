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
	
	// 加载Object Layout库，这是UGE的核心库。
	require("objlayout.js");

	/* 初始化数据。 ================================================== */
	
	// 初始化object layout中各个对象。
	load("/objlayout/player.js");
	load("/objlayout/guides.js");
	// 初始化效果。
	load("/effect.js");
	
	/* 游戏开始 ===================================================== */
	
	Event.Send("application.open", true);
	
	//下面这个方式，通过传入一个对象来初始化。这里我们以JSON格式来定义这个初始化对象。（比如`PLAYER`）
	//这个对象可以被保存在文件中，可以动态加载，加载进来就可以定义若干entity.
	//这里的entity你可以随意添加属性，就是普通的js对象！
	//我们的编辑器将会编辑产生一个entity def json，加载进来就是Entities.CreateEntity中的参数。
	
	/* 初始化Entity ================================================ */

	player = Entities.CreateEntity(PLAYER);
	guides = Entities.CreateEntity(GUIDES);
	
	engine = Registry.Get('iEngine');
	g3d = Registry.Get('iGraphics3D');
	view = new iView(engine,g3d);
	var count = Event.InstallHelper('3d',view,'frame');
	
	CONSOLE.WriteLine('\nW S A D : 前进 后退 左转 右转\n');
	CONSOLE.WriteLine("\nE C Esc M : 仰视 俯视 退出 获取两个Entity的当前坐标\n");
	CONSOLE.WriteLine("\nP K L H : 初始化环境 自动寻路1 自动寻路2 暂停寻路\n");
	
	//获得celgraph和celpath对象
	var celgraph_base = Registry.Create("cel.celgraph");
	var celgraph = celgraph_base.QueryInterface("iCelGraph");
	var celpath_base = Registry.Create("cel.celpath");
	var celpath = celpath_base.QueryInterface("iCelPath");
	
	//创建节点信息
	var v0 = [0, 10, 0];
	var gn0 = celgraph.CreateNode("n0",v0);
	var v1 = [0, 10, 5];
	var gn1 = celgraph.CreateNode("n1",v1);
	var v2 = [0, 10, 10];
	var gn2 = celgraph.CreateNode("n2",v2);
	var v3 = [0, 10, 15];
	var gn3 = celgraph.CreateNode("n3",v3);
	var v4 = [5, 10, 0];
	var gn4 = celgraph.CreateNode("n4",v4);
	var v5 = [5, 10, 5];
	var gn5 = celgraph.CreateNode("n5",v5);
	var v6 = [5, 10, 10];
	var gn6 = celgraph.CreateNode("n6",v6);
	var v7 = [5, 10, 15];
	var gn7 = celgraph.CreateNode("n7",v7);
	var v8 = [10, 10, 0];
	var gn8 = celgraph.CreateNode("n8",v8);
	var v9 = [10, 10, 5];
	var gn9 = celgraph.CreateNode("n9",v9);
	var v10 = [10, 10, 10];
	var gn10 = celgraph.CreateNode("n10",v10);
	var v11 = [10, 10, 15];
	var gn11 = celgraph.CreateNode("n11",v11);
	var v12 = [15, 10, 0];
	var gn12 = celgraph.CreateNode("n12",v12);
	var v13 = [15, 10, 5];
	var gn13 = celgraph.CreateNode("n13",v13);
	var v14 = [15, 10, 10];
	var gn14 = celgraph.CreateNode("n14",v14);
	var v15 = [15, 10, 15];
	var gn15 = celgraph.CreateNode("n15",v15);
	
	//连接点成线，可以画在纸上，走路是双向的
	//纵向
	//解释一下AddEdge函数参数，第一个from，第二个to，状态
	//故而应该知道，不会to到from！！
	celgraph.AddEdge(gn0, gn1, true);
	celgraph.AddEdge(gn1, gn2, true);
	celgraph.AddEdge(gn2, gn3, true);
	celgraph.AddEdge(gn3, gn2, true);
	celgraph.AddEdge(gn2, gn1, true);
	celgraph.AddEdge(gn1, gn0, true);

	celgraph.AddEdge(gn4, gn5, true);
	celgraph.AddEdge(gn5, gn6, true);
	celgraph.AddEdge(gn6, gn7, true);
	celgraph.AddEdge(gn7, gn6, true);
	celgraph.AddEdge(gn6, gn5, true);
	celgraph.AddEdge(gn5, gn4, true);

	celgraph.AddEdge(gn8, gn9, true);
	celgraph.AddEdge(gn9, gn10, true);
	celgraph.AddEdge(gn10, gn11, true);
	celgraph.AddEdge(gn11, gn10, true);
	celgraph.AddEdge(gn10, gn9, true);
	celgraph.AddEdge(gn9, gn8, true);

	celgraph.AddEdge(gn12, gn13, true);
	celgraph.AddEdge(gn13, gn14, true);
	celgraph.AddEdge(gn14, gn15, true);
	celgraph.AddEdge(gn15, gn14, true);
	celgraph.AddEdge(gn14, gn13, true);
	celgraph.AddEdge(gn13, gn12, true);
	//横向
	celgraph.AddEdge(gn0, gn4, true);
	celgraph.AddEdge(gn4, gn8, true);
	celgraph.AddEdge(gn8, gn12, true);
	celgraph.AddEdge(gn12, gn8, true);
	celgraph.AddEdge(gn8, gn4, true);
	celgraph.AddEdge(gn4, gn0, true);

	celgraph.AddEdge(gn1, gn5, true);
	celgraph.AddEdge(gn5, gn9, true);
	celgraph.AddEdge(gn9, gn13, true);
	celgraph.AddEdge(gn13, gn9, true);
	celgraph.AddEdge(gn9, gn5, true);
	celgraph.AddEdge(gn5, gn1, true);

	celgraph.AddEdge(gn2, gn6, true);
	celgraph.AddEdge(gn6, gn10, true);
	celgraph.AddEdge(gn10, gn14, true);
	celgraph.AddEdge(gn14, gn10, true);
	celgraph.AddEdge(gn10, gn6, true);
	celgraph.AddEdge(gn6, gn2, true);

	celgraph.AddEdge(gn3, gn7, true);
	celgraph.AddEdge(gn7, gn11, true);
	celgraph.AddEdge(gn11, gn15, true);
	celgraph.AddEdge(gn15, gn11, true);
	celgraph.AddEdge(gn11, gn7, true);
	celgraph.AddEdge(gn7, gn3, true);

}catch(e){
	alert('error:',e);
}
