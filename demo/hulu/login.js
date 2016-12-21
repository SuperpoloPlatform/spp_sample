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

	/** 全局变量 **/
	// 当点选一个monster的时候，将该monster的entity付给这个全局变量，以方便之后调用。
	var globalObj;
    	
	// 初始化object layout中各个对象。
	// TODO 以后可能需要将每个对象保存在单个文件中。
	if(!load("/objlayout/layout.js"))
	{
	    alert("Failed to load `/objlayout/layout.js`");
	}
	
	
	// 初始化效果。
	if(!load("/effect.js"))
	{
	    alert("Failed to load `effect.js`");
	}
	

	//下面这个方式，通过传入一个对象来初始化。这里我们以JSON格式来定义这个初始化对象。（比如`PLAYER`）
	//这个对象可以被保存在文件中，可以动态加载，加载进来就可以定义若干entity.
	//这里的entity你可以随意添加属性，就是普通的js对象！
	//我们的编辑器将会编辑产生一个entity def json，加载进来就是Entities.CreateEntity中的参数。

	var CreateEntities = function(){
		//暂时把Player当成全局唯一的。
		/*var */player = Entities.CreateEntity(PLAYER);
		Entities.CreateAI(player, AI_PLAYER);
		
		//player.forward = 0;
		//player.state = "stand";
		//等效于上边，测试spp.mixin:

		var monster = Entities.CreateEntity(MONSTER);
		Entities.CreateAI(monster, AI_MONSTER);
		
		var monster2 = Entities.CreateEntity(MONSTER2);
		Entities.CreateAI(monster2, AI_MONSTER2);
		
		var monster3 = Entities.CreateEntity(MONSTER3);
		Entities.CreateAI(monster3, AI_MONSTER3);
		
		var pig1 = Entities.CreateEntity(PIG1);
		Entities.CreateAI(pig1, AI_PIG1);
		
		var tuzi1 = Entities.CreateEntity(TUZI1);
		Entities.CreateAI(tuzi1, AI_TUZI1);
		
		var yang1 = Entities.CreateEntity(YANG1);
		Entities.CreateAI(yang1, AI_YANG1);
		
		var businessman = Entities.CreateEntity(BUSINESSMAN);
		Entities.CreateAI(businessman, AI_BUSINESSMAN);
		
		/************************************************************************/	
		/*player创建的时候发送"ui.player.status.set"消息，用于初始化player的UI。*/
		/************************************************************************/
		
	}	
	// 在另外一个线程加载场景
	iThreadedLoader = Registry.Get('iThreadedLoader');
	// 目前不知道旗标是做什么用的
	// 可以在`d:\source\depends\crystalspace-src-2.0.0\include\imap\loader.h`找到定义：
	// #define CS_LOADER_NONE 0
	// #define CS_LOADER_CREATE_DUMMY_MATS 1
	iThreadedLoader.flags = 1;
				
	// 加载world文件。
	iThreadReturn = iThreadedLoader.LoadMapFile('/', 'world.xml');
	// alert("LoadMapFile++++++");	
	var pWin = GUI.Windows.Get("progressRoot/Loading");	
	
	//这里的代码当加载完毕后被调用
	iThreadReturn.onfinish = function(){
		// CONSOLE.WriteLine("LoadMapFile------- over");
		
		C3D.engine.Prepare();
		//创建entities
		CreateEntities();
		pWin.SetProperty("CurrentProgress",1.0);
		
		cd = Registry.Get('iCollideSystem');
		bVar = cd.InitializeCollision(engine);
		
		var funcs = function(){
			// CONSOLE.WriteLine('load over in main');
		}
		meval(funcs);
	}
	
	
	var progressUpdata = function(){
		while(true)
		{
			if(!iThreadReturn.IsFinished())
			{
				//如果world文件没有加载完成，进度条步进，目前UI仅仅实现了一个简单的进度条，进度条的绘制是顺序循环的
				pWin.curCount = pWin.curCount + 0.1;
				if(pWin.curCount < 0.999999)
				{
					// CONSOLE.WriteLine("updata.."+pWin.curCount/1.0*100+"%");
					pWin.SetProperty("CurrentProgress",pWin.curCount);
				}
				else
				{
					pWin.curCount = pWin.curCount - 1.0;
					// CONSOLE.WriteLine("reset.."+pWin.curCount/1.0*100+"%");
					pWin.SetProperty("CurrentProgress",pWin.curCount);
				}
			}
			else
			{
				break;
			}
			System.Sleep(100);
		}
	}
	aeval(progressUpdata);
	
}catch(e){
	alert('error:',e);
}